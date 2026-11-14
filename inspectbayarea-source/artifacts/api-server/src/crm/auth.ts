import crypto from "node:crypto";
import type { Request, Response, NextFunction } from "express";

/**
 * Authentication for the CRM.
 *
 * This guards real customer records — names, phone numbers, home addresses — so
 * it is deliberately fail-closed: if the environment is not configured, every
 * CRM route returns 503 rather than serving data unauthenticated. A missing env
 * var must never silently become an open door.
 *
 * There is no user table because there is exactly one user. A single password
 * checked against an environment variable, exchanged for a signed session
 * cookie, is the right amount of machinery here — a full identity system would
 * be more code, more surface area, and no more secure for a business of one.
 *
 * Required environment variables:
 *   CRM_PASSWORD        the password typed at the login screen
 *   CRM_SESSION_SECRET  random string used to sign session cookies
 *
 * Generate the secret with:  openssl rand -base64 48
 */

const COOKIE_NAME = "crm_session";
/** Sessions last a working week; a solo operator should not log in daily. */
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function config(): { password: string; secret: string } | null {
  const password = process.env.CRM_PASSWORD;
  const secret = process.env.CRM_SESSION_SECRET;
  if (!password || !secret) return null;
  // A short password would make the throttle below the only real defence.
  if (password.length < 10 || secret.length < 24) return null;
  return { password, secret };
}

export function crmConfigured(): boolean {
  return config() !== null;
}

/** Compare without leaking length or content through timing. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // timingSafeEqual throws on length mismatch, so hash first to fix the length.
  const ah = crypto.createHash("sha256").update(ab).digest();
  const bh = crypto.createHash("sha256").update(bb).digest();
  return crypto.timingSafeEqual(ah, bh);
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Token format: `<expiry-ms>.<hmac>` — stateless, so no session store to keep. */
function issueToken(secret: string): string {
  const expires = String(Date.now() + SESSION_TTL_MS);
  return `${expires}.${sign(expires, secret)}`;
}

function tokenValid(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const expires = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!safeEqual(mac, sign(expires, secret))) return false;
  const expiresAt = Number(expires);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

/**
 * Login throttle.
 *
 * In-memory and per-IP. The API server is a single process, so a shared store
 * would be premature; if it is ever scaled horizontally this needs to move to
 * the database or the limit becomes per-instance.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

function clearThrottle(ip: string): void {
  attempts.delete(ip);
}

export function handleLogin(req: Request, res: Response): void {
  const cfg = config();
  if (!cfg) {
    res.status(503).json({ error: "CRM is not configured on this server." });
    return;
  }

  const ip = req.ip ?? "unknown";
  if (throttled(ip)) {
    req.log?.warn({ ip }, "CRM login throttled");
    res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
    return;
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!safeEqual(password, cfg.password)) {
    req.log?.warn({ ip }, "CRM login failed");
    // Deliberately vague: never confirm whether a password was close.
    res.status(401).json({ error: "Incorrect password." });
    return;
  }

  clearThrottle(ip);
  res.cookie(COOKIE_NAME, issueToken(cfg.secret), {
    httpOnly: true,
    sameSite: "lax",
    // Replit terminates TLS in front of the app, so trust the forwarded proto
    // rather than req.secure, which sees plain HTTP at the origin.
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_MS,
    path: "/",
  });
  res.json({ success: true });
}

export function handleLogout(_req: Request, res: Response): void {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ success: true });
}

/** Cheap check the UI calls on load to decide between the app and the login screen. */
export function handleSession(req: Request, res: Response): void {
  const cfg = config();
  if (!cfg) {
    res.status(503).json({ configured: false, authenticated: false });
    return;
  }
  res.json({ configured: true, authenticated: tokenValid(req.cookies?.[COOKIE_NAME], cfg.secret) });
}

/** Gate for every CRM route that touches data. */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const cfg = config();
  if (!cfg) {
    res.status(503).json({ error: "CRM is not configured on this server." });
    return;
  }
  if (!tokenValid(req.cookies?.[COOKIE_NAME], cfg.secret)) {
    res.status(401).json({ error: "Not signed in." });
    return;
  }
  next();
}
