/**
 * Static prerender script — runs after `vite build` to server-render every
 * public marketing route and emit a dedicated HTML file for each one.
 *
 * Each output file ships the correct <title>, <meta name="description">,
 * canonical, og:url, og:title, og:description, twitter:title, and
 * twitter:description in its <head> — so search-engine crawlers and AI bots
 * receive fully-formed, route-specific metadata on the very first HTTP
 * response, without waiting for JavaScript to run.
 *
 * Output structure (relative to dist/public/):
 *   index.html                          → /
 *   services/index.html                 → /services
 *   services/<slug>/index.html          → /services/:slug
 *   pricing/index.html                  → /pricing
 *   blog/index.html                     → /blog
 *   blog/<slug>/index.html              → /blog/:slug
 *   about/index.html                    → /about
 *   service-areas/index.html            → /service-areas
 *   contact/index.html                  → /contact
 *
 * Usage: node prerender.mjs  (called automatically by the "build" npm script)
 */

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Provide env vars required by the Vite SSR server.
process.env.PORT = process.env.PORT || "24052";
process.env.BASE_PATH = process.env.BASE_PATH || "/";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a map from absolute filesystem path → deployed asset URL using the
 * Vite manifest, so /@fs/... dev-server URLs can be rewritten to hashed
 * /assets/... paths that exist in the production build.
 */
function buildFsToAssetMap() {
  const manifestPath = resolve(
    __dirname,
    "dist",
    "public",
    ".vite",
    "manifest.json",
  );
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  } catch {
    console.warn(
      "[prerender] Could not read manifest — /@fs/ rewrites will be skipped.",
    );
    return new Map();
  }

  const map = new Map();
  for (const [key, entry] of Object.entries(manifest)) {
    if (!entry.file) continue;
    const absSourcePath = resolve(__dirname, key);
    map.set(absSourcePath, "/" + entry.file);
  }
  return map;
}

/** Replace /@fs/<absolute-path> refs with hashed /assets/... production URLs. */
function rewriteFsUrls(html, fsToAsset) {
  if (fsToAsset.size === 0) return html;
  return html.replace(/\/@fs([^"'\s>]+)/g, (_match, fsPath) => {
    const mapped = fsToAsset.get(fsPath);
    return mapped ?? "/@fs" + fsPath;
  });
}

/**
 * Escape characters that are special inside HTML attribute values and text
 * nodes, so injected metadata doesn't break the document.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Replace a single meta tag's content attribute value.
 * Works for both name="..." and property="..." variants,
 * and for either attribute ordering (attr before content, or content before attr).
 */
function replaceMeta(html, attr, key, value) {
  // Pattern A: the identifying attribute comes before content=""
  const patternA = new RegExp(
    `(<meta[^>]*${attr}="${escapeRegex(key)}"[^>]*content=")[^"]*("\\s*/?>)`,
    "i",
  );
  if (patternA.test(html)) {
    return html.replace(patternA, (_m, open, close) => open + escapeHtml(value) + close);
  }
  // Pattern B: content="" comes before the identifying attribute
  const patternB = new RegExp(
    `(<meta[^>]*content=")[^"]*("\\s*${attr}="${escapeRegex(key)}"[^>]*/?>)`,
    "i",
  );
  return html.replace(patternB, (_m, open, close) => open + escapeHtml(value) + close);
}

/**
 * Every replacement below that inserts page content uses a function, never a
 * replacement string. In a replacement string `$1`, `$2`, `$&` and `$'` are
 * special, and page content is full of prices: "mold inspections from $279"
 * was read as capture group 2 followed by "79", which closed the meta tag
 * early and leaked the rest of the description into the page body. That
 * shipped on /pricing and all 25 city mold pages before it was caught.
 */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Inject route-specific head metadata into the HTML template string.
 * Replaces <title>, meta description, canonical, og:*, and twitter:* tags.
 */
function injectHeadMeta(html, meta) {
  const {
    title = "",
    description = "",
    canonical = "",
    ogTitle,
    ogDescription,
    ogUrl,
    jsonLd,
    robots,
  } = meta;

  // Ad landing and thank-you pages ask to stay out of search results.
  if (robots) {
    html = replaceMeta(html, "name", "robots", robots);
  }

  // The shell carries only site-wide business data. Page-specific schema is
  // always owned by Seo, including the homepage FAQ generated from shared data.
  // Clear prior route blocks even when this route supplies no structured data.
  html = html.replace(
    /\s*<script type="application\/ld\+json" data-seo-jsonld>[\s\S]*?<\/script>/g,
    "",
  );
  if (jsonLd && jsonLd.length > 0) {
    const blocks = jsonLd
      .map(
        (schema) =>
          `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(
            schema,
          ).replace(/</g, "\\u003c")}</script>`,
      )
      .join("\n    ");
    html = html.replace("</head>", () => `    ${blocks}\n  </head>`);
  }

  // <title>
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
  }

  // <meta name="description">
  if (description) {
    html = replaceMeta(html, "name", "description", description);
  }

  // <link rel="canonical">
  if (canonical) {
    // Pattern A: rel before href
    const canonA = /(<link[^>]*\brel="canonical"[^>]*\bhref=")[^"]*(")/i;
    if (canonA.test(html)) {
      html = html.replace(canonA, (_m, open, close) => open + canonical + close);
    } else {
      // Pattern B: href before rel
      html = html.replace(
        /(<link[^>]*\bhref=")[^"]*("[^>]*\brel="canonical"[^>]*>)/i,
        (_m, open, close) => open + canonical + close,
      );
    }
  }

  // og:title
  if (ogTitle) {
    html = replaceMeta(html, "property", "og:title", ogTitle);
  }

  // og:description
  if (ogDescription) {
    html = replaceMeta(html, "property", "og:description", ogDescription);
  }

  // og:url
  if (ogUrl) {
    html = replaceMeta(html, "property", "og:url", ogUrl);
  }

  // twitter:title
  if (ogTitle) {
    html = replaceMeta(html, "name", "twitter:title", ogTitle);
  }

  // twitter:description
  if (ogDescription) {
    html = replaceMeta(html, "name", "twitter:description", ogDescription);
  }

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function prerender() {
  console.log("[prerender] Starting multi-route prerender…");

  const { createServer } = await import("vite");
  const { default: react } = await import("@vitejs/plugin-react");
  const { default: path } = await import("path");

  const vite = await createServer({
    root: __dirname,
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    mode: "production",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    define: {
      "import.meta.env.BASE_URL": JSON.stringify("/"),
      "import.meta.env.MODE": JSON.stringify("production"),
      "import.meta.env.DEV": JSON.stringify(false),
      "import.meta.env.PROD": JSON.stringify(true),
      "import.meta.env.SSR": JSON.stringify(true),
    },
  });

  try {
    // Load SSR modules.
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const { services } = await vite.ssrLoadModule("/src/data/services/index.ts");
    const { blogPosts } = await vite.ssrLoadModule("/src/data/blog.ts");
    const { cities } = await vite.ssrLoadModule("/src/data/cities/index.ts");
    const { cityOptions } = await vite.ssrLoadModule("/src/data/city-options.ts");
    const expectedCityOptions = cities.map(({ slug, name }) => ({ slug, name }));
    if (JSON.stringify(cityOptions) !== JSON.stringify(expectedCityOptions)) {
      throw new Error("Booking city options must match the city catalog exactly, including order. Update src/data/city-options.ts.");
    }
    const { cityServicePages } = await vite.ssrLoadModule("/src/data/city-service.ts");
    const { landingPages } = await vite.ssrLoadModule("/src/data/landing/index.ts");

    // Read the built HTML template once — used as the base for every page.
    const indexPath = resolve(__dirname, "dist", "public", "index.html");
    let templateHtml = readFileSync(indexPath, "utf-8");

    /*
     * Inline the stylesheet instead of linking it.
     *
     * The LCP element on mobile is the hero <h1>, which is plain text already
     * present in the prerendered HTML — so nothing but the render-blocking
     * stylesheet stands between first byte and first paint. Lighthouse measured
     * that single round trip at 152ms of wasted time on Slow 4G.
     *
     * The bundle is ~12KB brotli, small enough that carrying it in the document
     * costs less than the extra RTT to fetch it. The tradeoff is deliberate:
     * the CSS is no longer separately cacheable across navigations, which is
     * the right call for a site whose visitors overwhelmingly arrive from an
     * ad, land on one page, and convert there.
     *
     * Falls through untouched if the link tag is not found, so a Vite change to
     * the tag shape degrades to the previous behaviour rather than breaking.
     */
    const cssLink = templateHtml.match(
      /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/,
    );
    if (cssLink) {
      const cssPath = resolve(__dirname, "dist", "public", cssLink[1]);
      const css = readFileSync(cssPath, "utf-8");
      templateHtml = templateHtml.replace(cssLink[0], () => `<style>${css}</style>`);
      console.log(
        `[prerender] inlined ${cssLink[1]} (${(css.length / 1024).toFixed(0)} KB raw) — no render-blocking request`,
      );
    } else {
      console.warn("[prerender] stylesheet link not found; left as an external request");
    }

    const fsToAsset = buildFsToAssetMap();

    // Build the list of routes to prerender.
    // Each entry: { path, outFile }
    // `path`    — the URL path passed to render() and used in head metadata
    // `outFile` — path relative to dist/public/ where the HTML is written
    const routes = [
      { path: "/", outFile: "index.html" },
      { path: "/services", outFile: "services/index.html" },
      { path: "/pricing", outFile: "pricing/index.html" },
      { path: "/quote", outFile: "quote/index.html" },
      { path: "/book", outFile: "book/index.html" },
      // Ad landing page and the booking thank-you page: rendered so they load
      // fast and work without JavaScript, but noindex and kept out of the sitemap.
      { path: "/schedule", outFile: "schedule/index.html", sitemap: false },
      { path: "/booking-received", outFile: "booking-received/index.html", sitemap: false },
      { path: "/sample-report", outFile: "sample-report/index.html" },
      { path: "/condo-inspection", outFile: "condo-inspection/index.html" },
      { path: "/real-estate-agents", outFile: "real-estate-agents/index.html" },
      // Single-service landing pages (pre-listing, manufactured home, ADU…)
      ...landingPages.map((p) => ({ path: `/${p.slug}`, outFile: `${p.slug}/index.html` })),
      // Short link that redirects to Google's review form — rendered so it
      // works without JavaScript, but not a page worth indexing.
      { path: "/review", outFile: "review/index.html", sitemap: false },
      { path: "/what-we-inspect", outFile: "what-we-inspect/index.html" },
      { path: "/blog", outFile: "blog/index.html" },
      { path: "/about", outFile: "about/index.html" },
      { path: "/service-areas", outFile: "service-areas/index.html" },
      { path: "/contact", outFile: "contact/index.html" },
      // Service detail pages
      ...services.map((s) => ({
        path: `/services/${s.slug}`,
        outFile: `services/${s.slug}/index.html`,
      })),
      // Blog post pages
      ...blogPosts.map((p) => ({
        path: `/blog/${p.slug}`,
        outFile: `blog/${p.slug}/index.html`,
      })),
      // City landing pages
      ...cities.map((c) => ({
        path: `/service-areas/${c.slug}`,
        outFile: `service-areas/${c.slug}/index.html`,
      })),
      // City × service intersection pages. Only the combinations that cleared
      // the relevance filter in city-service.ts exist, so this list and the
      // router agree by construction.
      ...cityServicePages.map((p) => ({
        path: `/service-areas/${p.citySlug}/${p.serviceSlug}`,
        outFile: `service-areas/${p.citySlug}/${p.serviceSlug}/index.html`,
      })),
    ];

    let successCount = 0;

    for (const route of routes) {
      console.log(`[prerender] Rendering ${route.path}…`);

      const { html: appHtml, head } = render(route.path);

      // Guard against silently emitting an empty shell. If a route is missing
      // from entry-server.tsx's route table, render() returns almost nothing
      // and the page would still be written out looking "successful".
      if (appHtml.length < 2000) {
        console.error(
          `[prerender] FAIL: ${route.path} rendered only ${appHtml.length} bytes — ` +
            `the route is probably missing from src/entry-server.tsx.`,
        );
        process.exit(1);
      }

      let appHtmlClean = rewriteFsUrls(appHtml, fsToAsset);

      // React 19 emits <link rel="preload"> for images it sees during render.
      // Under renderToString those land inline at the top of the app markup
      // instead of being hoisted into <head> the way they are on the client.
      // Left there they cause a hydration mismatch — the server tree has two
      // <link> children inside #root that the client tree does not — and the
      // preloads are also far less useful sitting in the body. Pull them out
      // and inject them into <head> instead.
      const hoistedPreloads = [];
      appHtmlClean = appHtmlClean.replace(
        /<link\b[^>]*\brel="(?:preload|prefetch|modulepreload)"[^>]*\/?>/g,
        (tag) => {
          hoistedPreloads.push(tag);
          return "";
        },
      );

      // Start from the template, inject app HTML, then route-specific head.
      let html = templateHtml.replace(
        '<div id="root"></div>',
        () => `<div id="root">${appHtmlClean}</div>`,
      );
      html = injectHeadMeta(html, head);

      // Discover the city route chunk while parsing HTML instead of waiting
      // for main.tsx to download, execute, and call its dynamic importer.
      // The text LCP remains server-rendered and does not depend on this JS.
      if (/^\/service-areas\/[^/]+$/.test(route.path)) {
        const cityChunk = fsToAsset.get(resolve(__dirname, "src/pages/city-detail.tsx"));
        if (cityChunk) {
          html = html.replace("</head>", () =>
            `    <link rel="modulepreload" href="${cityChunk}" fetchpriority="low">\n  </head>`);
        }
      }

      if (hoistedPreloads.length > 0) {
        html = html.replace("</head>", () => `    ${hoistedPreloads.join("\n    ")}\n  </head>`);
      }

      // Ensure the output directory exists.
      const outAbsPath = resolve(__dirname, "dist", "public", route.outFile);
      const outDir = outAbsPath.substring(0, outAbsPath.lastIndexOf("/"));
      mkdirSync(outDir, { recursive: true });

      writeFileSync(outAbsPath, html);

      // Verify no /@fs/ references remain.
      const remaining = (html.match(/\/@fs\//g) || []).length;
      if (remaining > 0) {
        console.error(
          `[prerender] FAIL: ${remaining} /@fs/ reference(s) remain in ${route.outFile}.`,
        );
        process.exit(1);
      }

      successCount++;
    }

    // Generate sitemap.xml from the same route list that was just rendered, so
    // the two can never drift apart. Priorities: home > services/areas hubs >
    // service + city landing pages > blog.
    const priorityFor = (path) => {
      if (path === "/") return "1.0";
      if (path === "/services" || path === "/service-areas") return "0.9";
      // The quote page is a primary commercial entry point for "how much
      // does a home inspection cost" searches, so it carries real weight.
      if (path === "/pricing") return "0.9";
      // Component-level scope page — the entry point for "does an inspection
      // cover X" searches, which no other page answers.
      if (path === "/what-we-inspect") return "0.9";
      if (path.startsWith("/services/")) return "0.9";
      // A service landing page in all but URL — see condo-inspection.tsx.
      if (path === "/condo-inspection") return "0.9";
      if (landingPages.some((p) => path === `/${p.slug}`)) return "0.9";
      if (path === "/sample-report") return "0.8";
      if (path.startsWith("/service-areas/")) return "0.8";
      if (path.startsWith("/blog/")) return "0.6";
      return "0.7";
    };
    const today = new Date().toISOString().slice(0, 10);
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.filter((r) => r.sitemap !== false).map((r) =>
        [
          "  <url>",
          `    <loc>https://inspectbayarea.com${r.path === "/" ? "/" : r.path}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          "    <changefreq>monthly</changefreq>",
          `    <priority>${priorityFor(r.path)}</priority>`,
          "  </url>",
        ].join("\n"),
      ),
      "</urlset>",
      "",
    ].join("\n");
    writeFileSync(resolve(__dirname, "dist", "public", "sitemap.xml"), sitemap);
    console.log(`[prerender] sitemap.xml written with ${routes.filter((r) => r.sitemap !== false).length} URLs.`);

    // llms.txt, generated from the same data as everything else.
    // It was previously hand-maintained in public/ and went stale twice —
    // still naming Mountain View as the base, still leading with mold, and
    // listing none of the city pages. Generating it removes that failure mode.
    const D = "https://inspectbayarea.com";
    const llms = [
      "# Bay Area Inspection Services",
      "",
      "> Certified home inspections in San Francisco and across the Bay Area, by a former builder. Same-day reports, infrared thermal imaging included on every inspection, with specialist mold and moisture testing available.",
      "",
      "Bay Area Inspection Services LLC provides certified home and property inspection services to buyers, sellers, and real estate professionals. San Francisco is the primary service area, with coverage extending across the Peninsula, South Bay, and East Bay. The company is inspection-only and performs no repairs or remediation, which removes any conflict of interest. Inspections are carried out by a former builder who is InterNACHI certified. Reports are delivered the same day and are backed by infrared thermal imaging and calibrated moisture readings.",
      "",
      "## Services",
      "",
      ...services.map((s) => `- [${s.name}](${D}/services/${s.slug}): ${s.summary}`),
      ...landingPages.map((p) => `- [${p.name}](${D}/${p.slug}): ${p.summary}`),
      `- [Condo Inspection](${D}/condo-inspection): Inspection of a condo or attached unit — everything inside the unit, plus water arriving from neighbouring units. Quoted per unit.`,
      "",
      "## Main Pages",
      "",
      `- [Homepage](${D}/): Overview of services, credentials, and service area.`,
      `- [All Services](${D}/services): Index of the ${services.length} inspection services offered.`,
      `- [Get a Quote](${D}/pricing): How quotes work — every inspection is quoted for the specific property, free, usually within the hour — what changes a quote, and quote FAQs.`,
      `- [What We Inspect](${D}/what-we-inspect): Full component-level checklist of every system and component assessed, plus what a general inspection does not cover.`,
      `- [Sample Report](${D}/sample-report): A real issued report with the client and address removed, showing the rating scale, photo record and next-step format. PDF at ${D}/sample-report.pdf.`,
      `- [For Real Estate Agents](${D}/real-estate-agents): Scheduling, report turnaround and InterNACHI negligent-referral protection for referring agents.`,
      `- [Service Areas](${D}/service-areas): The ${cities.length} cities covered, each with its own page.`,
      `- [About](${D}/about): Company background, certifications, and inspection philosophy.`,
      `- [Book an Inspection](${D}/book): Full online booking form — property details, preferred and backup times, contingency deadline, access and agent. Confirmed by phone, usually within the hour.`,
      `- [Contact](${D}/contact): Contact form and phone number for quotes and scheduling.`,
      "",
      "## Service Areas",
      "",
      "Each city page covers that city's housing stock by era, the findings that come up most often there, the neighbourhoods served, and city-specific FAQs.",
      "",
      ...cities.map(
        (c) => `- [${c.name}, CA](${D}/service-areas/${c.slug}): ${c.heroSubtitle}`,
      ),
      "",
      "## Blog",
      "",
      ...blogPosts.map((p) => `- [${p.title}](${D}/blog/${p.slug}): ${p.excerpt ?? p.summary ?? ""}`),
      `- [Blog Index](${D}/blog): All published articles.`,
      "",
      "## Optional",
      "",
      `- [Sitemap](${D}/sitemap.xml): Full list of indexable URLs.`,
      "",
    ].join("\n");
    writeFileSync(resolve(__dirname, "dist", "public", "llms.txt"), llms);
    console.log(
      `[prerender] llms.txt written — ${services.length} services, ${cities.length} cities, ${blogPosts.length} posts.`,
    );

    console.log(
      `[prerender] Done — ${successCount} pages prerendered successfully.`,
    );
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});
