import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { setHead } from "@/lib/ssrHead";

interface SeoProps {
  title: string;
  /** Opt out when a concise route title already identifies its area/service. */
  appendSiteName?: boolean;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown>[];
  /** Keep the page out of search results (ad landing and thank-you pages). */
  noindex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({ title, description, path, jsonLd, noindex, appendSiteName = true }: SeoProps) {
  const scriptTagsRef = useRef<HTMLScriptElement[]>([]);

  const fullTitle = !appendSiteName || title.includes(site.name) ? title : `${title} | ${site.name}`;

  // SSR: write metadata to the server-side store so prerender can inject it
  // into the static HTML <head>. typeof document check is reliable because
  // renderToString runs in Node.js where document is undefined.
  if (typeof document === "undefined") {
    const meta = { title: fullTitle, description };
    if (path) {
      const url = `${site.domain}${path}`;
      Object.assign(meta, {
        canonical: url,
        ogTitle: fullTitle,
        ogDescription: description,
        ogUrl: url,
      });
    }
    if (jsonLd && jsonLd.length > 0) {
      Object.assign(meta, { jsonLd });
    }
    if (noindex) Object.assign(meta, { robots: "noindex, follow" });
    setHead(meta);
  }

  useEffect(() => {
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    if (path) {
      const url = `${site.domain}${path}`;
      setMeta("property", "og:url", url);
      setCanonical(url);
    }
  }, [fullTitle, description, path]);

  // Client-side navigation keeps one <head> across pages, so the template's
  // "index, follow" is put back when a noindex page unmounts.
  useEffect(() => {
    if (!noindex) return;
    setMeta("name", "robots", "noindex, follow");
    return () => setMeta("name", "robots", "index, follow");
  }, [noindex]);

  useEffect(() => {
    const prev = scriptTagsRef.current;
    prev.forEach((el) => el.parentNode?.removeChild(el));
    scriptTagsRef.current = [];

    // Drop the copies prerender wrote into the static HTML before adding our
    // own, otherwise hydration leaves the page carrying each schema twice.
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-seo-jsonld]')
      .forEach((el) => el.parentNode?.removeChild(el));

    if (!jsonLd || jsonLd.length === 0) return;

    const created: HTMLScriptElement[] = [];
    for (const schema of jsonLd) {
      const el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-seo-jsonld", "");
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      created.push(el);
    }
    scriptTagsRef.current = created;

    return () => {
      created.forEach((el) => el.parentNode?.removeChild(el));
      scriptTagsRef.current = [];
    };
  }, [jsonLd]);

  return null;
}
