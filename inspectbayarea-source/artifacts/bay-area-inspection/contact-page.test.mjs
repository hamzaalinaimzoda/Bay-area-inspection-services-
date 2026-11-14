import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run after building: node --test contact-page.test.mjs
const html = readFileSync(new URL("./dist/public/contact/index.html", import.meta.url), "utf8");

test("contact metadata is concise, benefit-first, area-specific, and actionable", () => {
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(description && description.length < 155);
  assert.ok(description.startsWith("Get a firm quote"));
  assert.ok(description.includes("Bay Area home inspection"));
  assert.ok(description.endsWith("Call or message us today."));
  assert.match(html, /<title>Contact for a Bay Area home inspection<\/title>/);
  assert.match(html, /<h1\b[^>]*>Get in touch about your Bay Area home inspection<\/h1>/);
});

test("200–300 words of contact information are added after the unchanged form position", () => {
  const start = html.indexOf('data-testid="contact-details"');
  assert.ok(start > html.indexOf("</form>"));
  const section = html.slice(start, html.indexOf("</section>", start));
  const copy = [...section.matchAll(/<p\b[^>]*>(.*?)<\/p>/gs)]
    .map(m => m[1].replace(/<[^>]*>/g, " ")).join(" ");
  const words = copy.trim().split(/\s+/).length;
  assert.ok(words >= 200 && words <= 300, `Paragraph word count: ${words}`);
  for (const fact of ["Peninsula", "Monday through Saturday", "within the hour", "(628) 230-0357", "info@inspectbayarea.com"]) {
    assert.ok(copy.includes(fact));
  }
});

test("scripts are non-blocking and any visible embed must load lazily", () => {
  for (const [tag] of html.matchAll(/<script\b[^>]*\bsrc="[^"]+"[^>]*>/g)) {
    assert.match(tag, /\b(?:async|defer)\b|type="module"/);
  }
  for (const [tag] of html.matchAll(/<(?:iframe|embed)\b[^>]*>/g)) {
    if (/display\s*:\s*none/.test(tag)) continue;
    assert.match(tag, /loading="lazy"/, `Eager embed: ${tag}`);
  }
  assert.match(html, /requestIdleCallback\(loadPlausible/);
});

test("contact-page images are compressed WebP, sized, and lazy below the header", () => {
  const tags = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  assert.ok(tags.length >= 4);
  for (const [index, tag] of tags.entries()) {
    assert.match(tag, /\bsrc="[^"]+\.webp"/);
    assert.match(tag, /\bwidth="\d+"/);
    assert.match(tag, /\bheight="\d+"/);
    if (index > 0) assert.match(tag, /loading="lazy"/);
  }
  assert.ok(html.includes("/images/badges/internachi-certified-192.webp 192w"));
});
