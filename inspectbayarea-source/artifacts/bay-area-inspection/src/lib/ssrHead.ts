export interface HeadMeta {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  /** e.g. "noindex, follow" for pages that exist only as ad destinations or thank-you pages. */
  robots?: string;
  /**
   * Page-specific structured data, emitted alongside the shell's site-wide
   * business schema. Omitted on pages without their own structured data;
   * page-specific blocks must never be inherited from another route.
   */
  jsonLd?: Record<string, unknown>[];
}

let _current: HeadMeta = {};

export function resetHead(): void {
  _current = {};
}

export function setHead(meta: HeadMeta): void {
  Object.assign(_current, meta);
}

export function getHead(): HeadMeta {
  return { ..._current };
}
