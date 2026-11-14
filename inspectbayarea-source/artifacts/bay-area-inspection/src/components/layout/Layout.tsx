import { type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      {/* overflow-x-hidden contains the scroll-reveal animations: several sections
          slide in from translateX(±20px) and are full-width on mobile, so the
          +20px variants pushed the page 20px wider than the viewport and created
          a horizontal scrollbar. Applied here rather than on html/body so the
          fixed navbar and scroll-smooth behaviour are unaffected. */}
      <main className="flex-1 mt-[72px] lg:mt-[80px] overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
