import { Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  LazyNotFound,
  LazyHome,
  LazyServices,
  LazyServiceDetail,
  LazyPricing,
  LazyQuote,
  LazyBook,
  LazySchedule,
  LazyBookingReceived,
  LazySampleReport,
  LazyCondoInspection,
  LazyRealEstateAgents,
  LazyLanding,
  LazyReview,
  LazyWhatWeInspect,
  LazyBlog,
  LazyBlogPost,
  LazyAbout,
  LazyServiceAreas,
  LazyCityDetail,
  LazyCityService,
  LazyContact,
} from "@/pages/lazy";
import { LANDING_SLUGS } from "@/data/landing/slugs";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LazyHome} />
      <Route path="/services" component={LazyServices} />
      <Route path="/services/:slug">{(params) => <LazyServiceDetail slug={params.slug} />}</Route>
      <Route path="/pricing" component={LazyPricing} />
      <Route path="/quote" component={LazyQuote} />
      <Route path="/book" component={LazyBook} />
      <Route path="/schedule" component={LazySchedule} />
      <Route path="/booking-received" component={LazyBookingReceived} />
      <Route path="/sample-report" component={LazySampleReport} />
      <Route path="/condo-inspection" component={LazyCondoInspection} />
      <Route path="/real-estate-agents" component={LazyRealEstateAgents} />
      {LANDING_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`}>{() => <LazyLanding slug={slug} />}</Route>
      ))}
      <Route path="/review" component={LazyReview} />
      <Route path="/what-we-inspect" component={LazyWhatWeInspect} />
      <Route path="/blog" component={LazyBlog} />
      <Route path="/blog/:slug">{(params) => <LazyBlogPost slug={params.slug} />}</Route>
      <Route path="/about" component={LazyAbout} />
      <Route path="/service-areas" component={LazyServiceAreas} />
      {/* More specific route first — wouter matches in order. */}
      <Route path="/service-areas/:citySlug/:serviceSlug">
        {(params) => <LazyCityService citySlug={params.citySlug} serviceSlug={params.serviceSlug} />}
      </Route>
      <Route path="/service-areas/:slug">{(params) => <LazyCityDetail slug={params.slug} />}</Route>
      <Route path="/contact" component={LazyContact} />
      <Route component={LazyNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {/*
            The initial route's chunk is preloaded in main.tsx before hydration,
            so this boundary does not fire on first paint and the prerendered
            markup is preserved. It only comes into play on client-side
            navigation to a route whose chunk has not been fetched yet, where
            rendering nothing briefly is better than blocking the transition.
          */}
          <Suspense fallback={null}>
            <Router />
          </Suspense>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
