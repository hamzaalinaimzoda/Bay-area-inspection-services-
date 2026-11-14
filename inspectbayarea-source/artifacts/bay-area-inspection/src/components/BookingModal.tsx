import { Link, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarCheck } from "lucide-react";
import { QuickBookingForm } from "@/components/booking/QuickBookingForm";
import { discountNote } from "@/data/policies";
import { saveBookingSummary } from "@/lib/booking-summary";

/**
 * The booking popup every "Book" button on the site opens.
 *
 * It holds the same short form as the ad landing page /schedule
 * (QuickBookingForm), so a booking from anywhere on the site gets the owner's
 * email with the confirm button and the "Came from" line, the customer's
 * checklist email, and the Ads conversion — and finishes on /booking-received
 * like the other two forms.
 */

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** A SERVICE_OPTIONS id to preselect when the modal opens, e.g. "full-home-inspection-condo". */
  initialServiceId?: string;
}

export function BookingModal({ open, onClose, initialServiceId }: BookingModalProps) {
  const [, navigate] = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = window.requestAnimationFrame(() => {
      const firstControl = dialogRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      (firstControl ?? dialogRef.current)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.tabIndex >= 0 && el.getClientRects().length > 0 && !el.closest('[aria-hidden="true"]'));
      if (controls.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      if (openerRef.current?.isConnected) openerRef.current.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              tabIndex={-1}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close booking form"
                className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-primary px-6 sm:px-8 pt-8 pb-6 rounded-t-2xl text-white">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarCheck className="w-5 h-5 text-secondary" />
                  <span className="text-secondary text-sm font-semibold uppercase tracking-wide">Schedule Online · No Deposit</span>
                </div>
                <h2 id="booking-modal-title" className="text-2xl font-bold">Book Your Inspection</h2>
                <p className="text-white/70 text-sm mt-1">Takes about a minute. We'll call to confirm the time and price.</p>
              </div>

              <div className="px-6 sm:px-8 py-6 grid gap-5">
                <QuickBookingForm
                  bare
                  initialServiceId={initialServiceId}
                  onSuccess={(summary) => {
                    saveBookingSummary(summary);
                    onClose();
                    navigate("/booking-received");
                  }}
                />

                <p className="text-xs text-gray-600 text-center">{discountNote}</p>

                <p className="text-center text-sm text-gray-600">
                  Want to give us every detail up front?{" "}
                  <Link href="/book" onClick={onClose} className="font-semibold text-primary hover:text-secondary">
                    Use the full booking form
                  </Link>
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 pt-3 border-t">
                  <span>✓ Same-day availability</span>
                  <span>✓ No deposit required</span>
                  <span>✓ Confirmation within 1 hour</span>
                  <span>✓ Report same day</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
