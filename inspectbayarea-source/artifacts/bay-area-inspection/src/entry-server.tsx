import { Suspense } from "react";
import { renderToString } from "react-dom/server";
import { Router, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { resetHead, getHead, type HeadMeta } from "@/lib/ssrHead";
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import Pricing from "@/pages/pricing";
import Quote from "@/pages/quote";
import Book from "@/pages/book";
import Schedule from "@/pages/schedule";
import BookingReceived from "@/pages/booking-received";
import SampleReport from "@/pages/sample-report";
import CondoInspection from "@/pages/condo-inspection";
import RealEstateAgents from "@/pages/real-estate-agents";
import Landing from "@/pages/landing";
import Review from "@/pages/review";
import { LANDING_SLUGS } from "@/data/landing/slugs";
import WhatWeInspect from "@/pages/what-we-inspect";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import About from "@/pages/about";
import ServiceAreas from "@/pages/service-areas";
import CityDetail from "@/pages/city-detail";
import CityService from "@/pages/city-service";
import ContactPage from "@/pages/contact";

/**
 * Creates a minimal SSR-safe location hook for wouter.
 *
 * wouter's memoryLocation uses useSyncExternalStore without getServerSnapshot,
 * which React 19's server renderer requires. This hook bypasses
 * useSyncExternalStore entirely: it just returns the given path statically.
 */
function makeServerLocationHook(path: string) {
  function useServerLocation(): [string, (p: string) => void] {
    return [path, () => {}];
  }
  (useServerLocation as { searchHook?: () => string }).searchHook = () => "";
  return useServerLocation;
}

export interface RenderResult {
  html: string;
  head: HeadMeta;
}

/**
 * The server route table.
 *
 * Deliberately its own component rather than an inline <Switch>, so that the
 * server tree has the same depth as App.tsx, which wraps its own route table
 * in a `Router` component. See the comment in `render` below.
 */
function ServerRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug">
        {(params) => <ServiceDetail slug={params.slug} />}
      </Route>
      <Route path="/pricing" component={Pricing} />
      <Route path="/quote" component={Quote} />
      <Route path="/book" component={Book} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/booking-received" component={BookingReceived} />
      <Route path="/sample-report" component={SampleReport} />
      <Route path="/condo-inspection" component={CondoInspection} />
      <Route path="/real-estate-agents" component={RealEstateAgents} />
      {LANDING_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`}>{() => <Landing slug={slug} />}</Route>
      ))}
      <Route path="/review" component={Review} />
      <Route path="/what-we-inspect" component={WhatWeInspect} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug">
        {(params) => <BlogPost slug={params.slug} />}
      </Route>
      <Route path="/about" component={About} />
      <Route path="/service-areas" component={ServiceAreas} />
      {/* More specific route first — wouter matches in order. */}
      <Route path="/service-areas/:citySlug/:serviceSlug">
        {(params) => (
          <CityService citySlug={params.citySlug} serviceSlug={params.serviceSlug} />
        )}
      </Route>
      <Route path="/service-areas/:slug">
        {(params) => <CityDetail slug={params.slug} />}
      </Route>
      <Route path="/contact" component={ContactPage} />
    </Switch>
  );
}

export function render(path: string = "/"): RenderResult {
  resetHead();

  const queryClient = new QueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useServerLocation = makeServerLocationHook(path) as any;

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router hook={useServerLocation} base="">
          {/*
            The Suspense boundary and the ServerRoutes component wrapper below
            exist purely to mirror App.tsx's tree shape. They are not needed for
            rendering — every page module here is imported eagerly, so nothing
            ever suspends on the server.

            They matter because React's useId encodes a component's position in
            the tree. App.tsx nests the route table two levels deeper (inside a
            Suspense and inside its own Router component), so without these the
            server generated different ids than the client for every Radix
            component using useId — the accordions and form items on nearly
            every page. That shifted every id and made React throw a hydration
            mismatch (#418) site-wide, discarding the prerendered markup.

            If the tree in App.tsx changes shape, this must change with it.
          */}
          <Suspense fallback={null}>
            <ServerRoutes />
          </Suspense>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );

  return { html, head: getHead() };
}
