/**
 * Production static server for the prerendered marketing site.
 *
 * Replaces Replit's built-in `serve = "static"`, which sends every response
 * uncompressed and with `cache-control: private`. On a throttled mobile
 * connection that was the dominant cost on the page: the HTML alone was
 * 129 KB instead of 17 KB, and the render-blocking CSS 86 KB instead of 14 KB.
 * Measured effect of adding compression, with no other changes: Lighthouse
 * mobile performance 64 -> 95 (FCP 5.4s -> 1.8s, LCP 6.3s -> 2.8s).
 *
 * Deliberately dependency-free (Node stdlib only) so it adds nothing to install
 * or audit, and cannot break the deploy through a transitive dependency.
 *
 * Behaviour:
 *   - Text assets are compressed once at startup and held in memory (brotli and
 *     gzip). No per-request compression, which would block the event loop and
 *     starve image responses.
 *   - Content-hashed files under /assets/ are immutable and cached for a year.
 *     HTML must revalidate so deploys are picked up immediately.
 *   - Prerendered routes resolve to their own directory index (/services ->
 *     /services/index.html); unmatched paths return a non-indexable 404,
 *     never the homepage's HTML or SEO metadata.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "dist/public");
const PORT = Number(process.env.PORT || 24052);

if (!fs.existsSync(ROOT)) {
  console.error(`[server] build output missing at ${ROOT} — run the build first`);
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  // The sample report. Without this it was served as octet-stream, which with
  // nosniff forces a download instead of opening in the browser's viewer.
  ".pdf": "application/pdf",
};

// Already-compressed formats (images, woff2) must not be re-compressed.
const COMPRESSIBLE = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ".xml", ".webmanifest"]);

/** @type {Map<string, {buf: Buffer, br: Buffer|null, gz: Buffer|null, type: string, cache: string, etag: string}>} */
const files = new Map();

function cacheFor(rel) {
  // Vite emits content-hashed names under /assets/; the URL changes whenever the
  // bytes do, so those are safe to cache forever.
  if (rel.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  // HTML is the deploy entry point and must never be served stale.
  if (rel.endsWith(".html")) return "public, max-age=0, must-revalidate";
  // Fonts, images and icons live at stable paths, so they cannot be immutable —
  // replacing one reuses its URL. A week keeps repeat visits cheap while still
  // letting an updated asset roll out reasonably quickly.
  return "public, max-age=604800";
}

function load(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      load(full);
      continue;
    }
    const rel = "/" + path.relative(ROOT, full).split(path.sep).join("/");
    const ext = path.extname(rel).toLowerCase();
    const buf = fs.readFileSync(full);
    const compressible = COMPRESSIBLE.has(ext) && buf.length > 512;
    files.set(rel, {
      buf,
      br: compressible ? zlib.brotliCompressSync(buf, {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
      }) : null,
      gz: compressible ? zlib.gzipSync(buf, { level: 9 }) : null,
      type: MIME[ext] || "application/octet-stream",
      cache: cacheFor(rel),
      etag: `"${crypto.createHash("sha1").update(buf).digest("base64url").slice(0, 20)}"`,
    });
  }
}

load(ROOT);

function resolve(urlPath) {
  if (files.has(urlPath)) return urlPath;
  const asIndex = (urlPath.endsWith("/") ? urlPath + "index.html" : urlPath + "/index.html");
  if (files.has(asIndex)) return asIndex;
  return null;
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" });
    return res.end();
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end();
  }
  if (urlPath.includes("\0") || urlPath.includes("..")) {
    res.writeHead(400);
    return res.end();
  }

  const key = resolve(urlPath);
  const f = files.get(key);
  if (!f) {
    const body = "Not found";
    res.writeHead(404, {
      "content-type": "text/plain; charset=utf-8",
      "content-length": Buffer.byteLength(body),
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
      "x-content-type-options": "nosniff",
    });
    return res.end(req.method === "HEAD" ? undefined : body);
  }

  const headers = {
    "content-type": f.type,
    "cache-control": f.cache,
    etag: f.etag,
    "x-content-type-options": "nosniff",
  };

  if (req.headers["if-none-match"] === f.etag) {
    res.writeHead(304, headers);
    return res.end();
  }

  const accept = req.headers["accept-encoding"] || "";
  let body = f.buf;
  if (f.br && /\bbr\b/.test(accept)) {
    body = f.br;
    headers["content-encoding"] = "br";
    headers.vary = "Accept-Encoding";
  } else if (f.gz && /\bgzip\b/.test(accept)) {
    body = f.gz;
    headers["content-encoding"] = "gzip";
    headers.vary = "Accept-Encoding";
  }
  headers["content-length"] = body.length;

  res.writeHead(200, headers);
  if (req.method === "HEAD") return res.end();
  res.end(body);
});

server.listen(PORT, "0.0.0.0", () => {
  const compressed = [...files.values()].filter((f) => f.br).length;
  console.log(`[server] ${files.size} files from ${ROOT} (${compressed} precompressed) on :${PORT}`);
});
