import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { before, after, test } from "node:test";
import { fileURLToPath } from "node:url";

let root;
let child;
let base;
const homepage = '<link rel="canonical" href="https://example.com/"><h1>Homepage</h1>';
const servicePage = "<h1>Full home inspection</h1>".repeat(40);

before(async () => {
  // Exercise the production server against an isolated build, without changing
  // the real build output or starting the Vite SPA fallback server.
  root = await mkdtemp(path.join(os.tmpdir(), "inspection-server-"));
  await copyFile(fileURLToPath(new URL("./server.mjs", import.meta.url)), path.join(root, "server.mjs"));
  const fixtures = {
    "index.html": homepage,
    "services/full-home-inspection/index.html": servicePage,
    "blog/home-inspection-checklist/index.html": "<h1>Checklist</h1>",
    "service-areas/san-francisco/index.html": "<h1>San Francisco</h1>",
    "book/index.html": "<h1>Book</h1>",
    "schedule/index.html": "<h1>Schedule</h1>",
    "booking-received/index.html": "<h1>Received</h1>",
    "assets/app-123.js": "console.log('app');",
    "robots.txt": "User-agent: *\nAllow: /",
    "sitemap.xml": "<urlset/>",
  };
  for (const [name, body] of Object.entries(fixtures)) {
    const destination = path.join(root, "dist/public", name);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, body);
  }
  const reservation = net.createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise((resolve, reject) => reservation.close((error) => error ? reject(error) : resolve()));
  base = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, [path.join(root, "server.mjs")], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Static server startup timed out")), 10_000);
    child.once("error", (error) => { clearTimeout(timeout); reject(error); });
    child.once("exit", (code) => { clearTimeout(timeout); reject(new Error(`Server exited: ${code}`)); });
    child.stdout.on("data", (data) => {
      if (data.toString().includes("[server]")) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });
});

after(async () => {
  if (child && child.exitCode === null) {
    const exited = once(child, "exit");
    child.kill();
    await exited;
  }
  if (root) await rm(root, { recursive: true, force: true });
});

test("known prerendered pages, slash variants and static files remain available", async () => {
  for (const route of [
    "/", "/index.html", "/services/full-home-inspection",
    "/services/full-home-inspection/", "/services/full-home-inspection/index.html",
    "/services/full-home-inspection?source=test",
    "/blog/home-inspection-checklist", "/service-areas/san-francisco",
    "/book", "/schedule", "/booking-received",
    "/assets/app-123.js", "/robots.txt", "/sitemap.xml",
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.notEqual(response.headers.get("x-robots-tag"), "noindex", route);
  }
  assert.equal(await (await fetch(base + "/")).text(), homepage);
  assert.equal(await (await fetch(base + "/services/full-home-inspection")).text(), servicePage);
});

test("unknown routes and missing assets return non-indexable 404s without homepage metadata", async () => {
  for (const route of [
    "/typo", "/typo/", "/typo?source=test", "/services/not-a-service",
    "/blog/not-a-post", "/service-areas/not-a-city",
    "/service-areas/san-francisco/not-a-service", "/assets/missing.js",
    "/missing.html", "/missing/index.html",
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404, route);
    assert.equal(response.headers.get("x-robots-tag"), "noindex");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.match(response.headers.get("content-type"), /^text\/plain/);
    const body = await response.text();
    assert.equal(body, "Not found");
    assert.doesNotMatch(body, /canonical|application\/ld\+json|Homepage|<script/i);
  }
});

test("HEAD and conditional requests cannot turn missing routes into successful responses", async () => {
  const home = await fetch(base + "/");
  const etag = home.headers.get("etag");
  const cached = await fetch(base + "/", { headers: { "if-none-match": etag } });
  assert.equal(cached.status, 304);
  for (const method of ["GET", "HEAD"]) {
    const response = await fetch(base + "/services/not-a-service", {
      method,
      headers: { "if-none-match": etag, "accept-encoding": "br, gzip" },
    });
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("x-robots-tag"), "noindex");
    assert.equal(await response.text(), method === "HEAD" ? "" : "Not found");
  }
  const head = await fetch(base + "/services/full-home-inspection", { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

test("compression, asset caching and method restrictions are preserved", async () => {
  const compressed = await fetch(base + "/services/full-home-inspection", {
    headers: { "accept-encoding": "br" },
  });
  assert.equal(compressed.headers.get("content-encoding"), "br");
  assert.equal(await compressed.text(), servicePage);
  const asset = await fetch(base + "/assets/app-123.js");
  assert.equal(asset.headers.get("cache-control"), "public, max-age=31536000, immutable");
  const post = await fetch(base + "/typo", { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");
});
