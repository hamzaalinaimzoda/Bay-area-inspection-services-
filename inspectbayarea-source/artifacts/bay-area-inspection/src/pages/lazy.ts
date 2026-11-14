import { lazy, createElement, type ComponentType } from "react";
import { isLandingSlug } from "@/data/landing/slugs";

/**
 * Route-level code splitting.
 *
 * Every page previously shipped in one chunk, so a homepage visitor downloaded
 * all 28 city pages and all seven expanded service pages as JavaScript and then
 * used none of it. These dynamic imports let Vite emit a chunk per page.
 *
 * `entry-server.tsx` deliberately keeps eager imports — the prerenderer needs
 * every page synchronously.
 *
 * Hydration is the subtle part. `React.lazy` suspends on its *first* render
 * even when the underlying module is already in the bundler's module cache,
 * because lazy only starts tracking the promise once it has been rendered at
 * least once. During hydration that meant Suspense rendered its null fallback,
 * React threw away the prerendered markup, logged a recoverable hydration
 * error (#418) on every page, and repainted from scratch — defeating the point
 * of prerendering.
 *
 * So each route is a small wrapper rather than a bare `lazy()`: once
 * `preloadForPath` has resolved the module, the wrapper renders it
 * synchronously and never suspends. Client-side navigation to a not-yet-loaded
 * route still falls through to the lazy component and its Suspense boundary.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = any;
type PageModule = { default: ComponentType<AnyProps> };
type RouteKey = keyof typeof importers;

const importers = {
  home: () => import("./home"),
  services: () => import("./services"),
  serviceDetail: () => import("./service-detail"),
  pricing: () => import("./pricing"),
  quote: () => import("./quote"),
  book: () => import("./book"),
  schedule: () => import("./schedule"),
  bookingReceived: () => import("./booking-received"),
  sampleReport: () => import("./sample-report"),
  condoInspection: () => import("./condo-inspection"),
  realEstateAgents: () => import("./real-estate-agents"),
  landing: () => import("./landing"),
  review: () => import("./review"),
  whatWeInspect: () => import("./what-we-inspect"),
  blog: () => import("./blog"),
  blogPost: () => import("./blog-post"),
  about: () => import("./about"),
  serviceAreas: () => import("./service-areas"),
  cityDetail: () => import("./city-detail"),
  cityService: () => import("./city-service"),
  contact: () => import("./contact"),
  notFound: () => import("./not-found"),
} as const;

/** Modules resolved via preloadForPath, renderable without suspending. */
const resolved = new Map<RouteKey, ComponentType<AnyProps>>();

function route(key: RouteKey) {
  const Lazy = lazy(importers[key] as () => Promise<PageModule>);
  return function RoutePage(props: AnyProps) {
    const Ready = resolved.get(key);
    return createElement(Ready ?? Lazy, props);
  };
}

export const LazyHome = route("home");
export const LazyServices = route("services");
export const LazyServiceDetail = route("serviceDetail");
export const LazyPricing = route("pricing");
export const LazyQuote = route("quote");
export const LazyBook = route("book");
export const LazySchedule = route("schedule");
export const LazyBookingReceived = route("bookingReceived");
export const LazySampleReport = route("sampleReport");
export const LazyCondoInspection = route("condoInspection");
export const LazyRealEstateAgents = route("realEstateAgents");
export const LazyLanding = route("landing");
export const LazyReview = route("review");
export const LazyWhatWeInspect = route("whatWeInspect");
export const LazyBlog = route("blog");
export const LazyBlogPost = route("blogPost");
export const LazyAbout = route("about");
export const LazyServiceAreas = route("serviceAreas");
export const LazyCityDetail = route("cityDetail");
export const LazyCityService = route("cityService");
export const LazyContact = route("contact");
export const LazyNotFound = route("notFound");

/**
 * The page module a pathname needs. Kept in the same order as the router's
 * <Switch> so the two agree on which page wins.
 */
function keyForPath(pathname: string): RouteKey {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let p = pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length);
  p = p.replace(/\/+$/, "") || "/";

  if (p === "/") return "home";
  if (p === "/services") return "services";
  if (p.startsWith("/services/")) return "serviceDetail";
  if (p === "/pricing") return "pricing";
  if (p === "/quote") return "quote";
  if (p === "/book") return "book";
  if (p === "/schedule") return "schedule";
  if (p === "/booking-received") return "bookingReceived";
  if (p === "/sample-report") return "sampleReport";
  if (p === "/condo-inspection") return "condoInspection";
  if (p === "/real-estate-agents") return "realEstateAgents";
  if (isLandingSlug(p.slice(1))) return "landing";
  if (p === "/review") return "review";
  if (p === "/what-we-inspect") return "whatWeInspect";
  if (p === "/blog") return "blog";
  if (p.startsWith("/blog/")) return "blogPost";
  if (p === "/about") return "about";
  if (p === "/service-areas") return "serviceAreas";
  if (p.startsWith("/service-areas/")) {
    // /service-areas/<city> is the city page; /service-areas/<city>/<service>
    // is the intersection page. Segment count is what separates them.
    const segs = p.split("/").filter(Boolean);
    return segs.length >= 3 ? "cityService" : "cityDetail";
  }
  if (p === "/contact") return "contact";
  return "notFound";
}

/**
 * Resolve the chunk for this URL and record it, so the matching route renders
 * synchronously during hydration instead of suspending. Called by main.tsx
 * before hydrateRoot.
 */
export async function preloadForPath(pathname: string): Promise<void> {
  const key = keyForPath(pathname);
  const mod = (await importers[key]()) as PageModule;
  resolved.set(key, mod.default);
}
