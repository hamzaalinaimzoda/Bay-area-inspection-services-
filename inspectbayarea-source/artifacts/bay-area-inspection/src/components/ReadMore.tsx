import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Clamps long prose on phones without ever removing it from the DOM.
 *
 * The body copy on service and city pages is written for search and for AI
 * crawlers, so it is long on purpose. On a 375px screen that turns into a
 * fourteen-line wall nobody reads. This clamps the height below `lg` and
 * offers a "Read more"; above `lg` it renders the children untouched, because
 * desktop never had the problem.
 *
 * The text is ALWAYS in the HTML, collapsed or not — only the height is
 * constrained. A Radix accordion once hid 819 FAQ answers from the markup
 * across 114 pages and we had to undo it site-wide. Do not reach for a
 * component that conditionally renders the children here.
 */
export function ReadMore({
  children,
  clampClass = "max-h-[200px]",
  fade = "white",
  label = "Read more",
}: {
  children: React.ReactNode;
  /** Collapsed height on mobile. Must be a static Tailwind class. */
  clampClass?: string;
  /** Match the section background so the fade blends. */
  fade?: "white" | "gray";
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "relative",
          !open && `${clampClass} overflow-hidden lg:max-h-none lg:overflow-visible`,
        )}
      >
        {children}
        {!open && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-20 lg:hidden bg-gradient-to-t to-transparent",
              fade === "white" ? "from-white" : "from-gray-50",
            )}
          />
        )}
      </div>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="lg:hidden mt-3 inline-flex items-center gap-1.5 font-semibold text-primary min-h-11"
        >
          {label}
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
