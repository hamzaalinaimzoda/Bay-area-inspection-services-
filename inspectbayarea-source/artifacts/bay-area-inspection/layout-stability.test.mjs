import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run after the production build: node --test layout-stability.test.mjs
const html = readFileSync(new URL(
  "./dist/public/service-areas/campbell/full-home-inspection/index.html",
  import.meta.url,
), "utf8");

function attributes(tag) {
  const result = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
  if (/\bcrossorigin(?:\s|=|>)/.test(tag)) result.crossorigin ??= "";
  return result;
}

test("Campbell's prerendered page reserves dimensions for every image and embed", () => {
  const media = [...html.matchAll(/<(?:img|iframe|embed|object|video)\b[^>]*>/g)];
  assert.ok(media.length >= 4, "Expected logos and certification badges");
  for (const [tag] of media) {
    const attrs = attributes(tag);
    assert.match(attrs.width ?? "", /^\d+(?:\.\d+)?$/, `Missing numeric width: ${tag}`);
    assert.match(attrs.height ?? "", /^\d+(?:\.\d+)?$/, `Missing numeric height: ${tag}`);
    if (Number(attrs.width) === 0 || Number(attrs.height) === 0) {
      assert.match(attrs.style ?? "", /display\s*:\s*none/, "Zero-size media must be hidden, not visible content");
    }
  }
});

test("lazy badges reserve both rendered dimensions before decoding", () => {
  const badges = [...html.matchAll(/<img\b[^>]*src="[^"]*\/badges\/[^"]*"[^>]*>/g)];
  assert.equal(badges.length, 2);
  for (const [tag] of badges) {
    const attrs = attributes(tag);
    assert.match(attrs.style ?? "", /height:\d+(?:\.\d+)?px/);
    assert.match(attrs.style ?? "", /width:\d+(?:\.\d+)?px/);
  }
});

test("the primary font is preloaded and permits immediate fallback text", () => {
  const preload = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).find(
    a => a.rel === "preload" && a.as === "font" && a.href === "/fonts/inter-latin-var.woff2",
  );
  assert.ok(preload, "Missing same-origin main font preload");
  assert.equal(preload.fetchpriority, "high");
  assert.ok(Object.hasOwn(preload, "crossorigin"), "Font preload must use CORS mode");
  assert.match(html, /@font-face\s*\{[^}]*font-family:\s*["']?Inter["']?[^}]*font-display:\s*swap/);
});

test("the heading and first paragraph exist before client JavaScript runs", () => {
  assert.match(html, /<h1\b[^>]*>Home Inspection in Campbell, CA<\/h1>/);
  assert.match(html, /<main\b[^>]*>[\s\S]*?<section\b[\s\S]*?<p\b/);
});
