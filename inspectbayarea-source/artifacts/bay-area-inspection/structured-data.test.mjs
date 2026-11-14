// Run after `pnpm --filter @workspace/bay-area-inspection build`.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { after, before, test } from "node:test";
import { createServer } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const output = path.join(root, "dist/public");
let vite;
let homeFaqs;
let homeFaqSchema;

before(async () => {
  vite = await createServer({
    root,
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    optimizeDeps: { noDiscovery: true },
  });
  ({ homeFaqs, homeFaqSchema } = await vite.ssrLoadModule("/src/data/home-faqs.ts"));
});
after(async () => { await vite?.close(); });

function schemas(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const value = JSON.parse(match[1]);
      return Array.isArray(value) ? value : [value];
    });
}

function faqs(html) {
  return schemas(html).filter((schema) => schema["@type"] === "FAQPage");
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

test("homepage FAQ schema exactly matches the shared visible questions and answers", async () => {
  const html = await readFile(path.join(output, "index.html"), "utf8");
  const pageFaqs = faqs(html);
  assert.equal(pageFaqs.length, 1);
  assert.deepEqual(pageFaqs[0], homeFaqSchema);
  assert.equal(pageFaqs[0].mainEntity.length, 7);
  const section = html.match(/<section\b[^>]*id="faq"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section, "Homepage renders its FAQ section");
  for (const [index, faq] of homeFaqs.entries()) {
    assert.ok(section.includes(escapeHtml(faq.question)), `Visible question: ${faq.question}`);
    assert.equal(pageFaqs[0].mainEntity[index].acceptedAnswer.text, faq.answer);
  }
});

test("hub pages have no inherited FAQPage but retain business structured data", async () => {
  for (const route of ["services", "blog", "about", "service-areas"]) {
    const html = await readFile(path.join(output, route, "index.html"), "utf8");
    assert.equal(faqs(html).length, 0, route);
    assert.ok(schemas(html).some((schema) => [].concat(schema["@type"]).includes("LocalBusiness")), route);
  }
});

test("no non-homepage document inherits the complete homepage FAQ", async () => {
  async function check(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await check(filename);
      else if (entry.name.endsWith(".html") && filename !== path.join(output, "index.html")) {
        const html = await readFile(filename, "utf8");
        for (const schema of faqs(html)) {
          assert.notDeepEqual(schema.mainEntity, homeFaqSchema.mainEntity, filename);
        }
      }
    }
  }
  await check(output);
});

test("detail pages retain route-specific FAQ and breadcrumb schema", async () => {
  const html = await readFile(path.join(output, "services/full-home-inspection/index.html"), "utf8");
  assert.equal(faqs(html).length, 1);
  assert.ok(schemas(html).some((schema) => schema["@type"] === "BreadcrumbList"));
});

test("the source shell contains no page-specific FAQ schema", async () => {
  assert.equal(faqs(await readFile(path.join(root, "index.html"), "utf8")).length, 0);
});
