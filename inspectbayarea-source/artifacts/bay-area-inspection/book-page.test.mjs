import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run after building: node --test book-page.test.mjs
const html = readFileSync(new URL("./dist/public/book/index.html", import.meta.url), "utf8");

test("book title is under 60 characters and its H1 includes the target phrase", () => {
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title);
  assert.ok(title.length < 60, `Title length: ${title.length}`);
  assert.ok(title.includes("Bay Area Home Inspection"));
  assert.match(html, /<h1\b[^>]*>Book your Bay Area home inspection<\/h1>/);
});

test("booking information adds 200–300 words of visible paragraph copy below the form", () => {
  const start = html.indexOf('data-testid="booking-details"');
  assert.ok(start > html.indexOf("</form>"));
  const section = html.slice(start, html.indexOf("</section>", start));
  const copy = [...section.matchAll(/<p\b[^>]*>(.*?)<\/p>/gs)]
    .map(m => m[1].replace(/<[^>]*>/g, " ")).join(" ");
  const words = copy.trim().split(/\s+/).length;
  assert.ok(words >= 200 && words <= 300, `Body word count: ${words}`);
  for (const phrase of ["two to four hours", "firm quote", "San Francisco", "Infrared thermal imaging"]) {
    assert.ok(copy.includes(phrase));
  }
});

test("external scripts cannot block parsing and analytics uses an idle loader", () => {
  for (const [tag] of html.matchAll(/<script\b[^>]*\bsrc="[^"]+"[^>]*>/g)) {
    assert.match(tag, /\b(?:async|defer)\b|type="module"/);
  }
  assert.match(html, /requestIdleCallback\(loadPlausible/);
  assert.match(html, /script\.defer = true/);
  assert.doesNotMatch(html, /<script\b[^>]*src="https:\/\/plausible/);
});

test("responsive badge derivatives are available as WebP", () => {
  for (const name of ["internachi-certified", "internachi-cpi"]) {
    const bytes = readFileSync(new URL(`./public/images/badges/${name}-192.webp`, import.meta.url));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    assert.ok(html.includes(`/images/badges/${name}-192.webp 192w`));
  }
});
