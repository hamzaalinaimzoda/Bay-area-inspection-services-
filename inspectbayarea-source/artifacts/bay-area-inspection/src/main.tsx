import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { preloadForPath } from "./pages/lazy";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

const rootEl = document.getElementById("root")!;
const prerendered = rootEl.innerHTML.trim().length > 0;

function mount() {
  if (prerendered) {
    hydrateRoot(rootEl, <App />);
  } else {
    createRoot(rootEl).render(<App />);
  }
  initAnalytics();
}

if (prerendered) {
  // Pages are code-split, so the chunk for this URL must resolve before
  // hydration begins. Otherwise React suspends on the route, discards the
  // prerendered markup and repaints when the chunk lands — undoing the point of
  // prerendering, and logging a recoverable hydration error on every page.
  // preloadForPath records the resolved module so the route renders
  // synchronously rather than through React.lazy, which always suspends on its
  // first render regardless of whether the module is already cached.
  //
  // Mounting anyway on failure is deliberate: a missing chunk should degrade to
  // a client render rather than a blank page.
  preloadForPath(window.location.pathname).then(mount, mount);
} else {
  mount();
}
