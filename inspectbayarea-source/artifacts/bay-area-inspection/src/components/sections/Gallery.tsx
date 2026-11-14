import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { photos as P } from "@/data/photos";

const tabs = [
  {
    id: "home",
    label: "Home Inspection",
    photos: [P.crawlspace, P.foundation, P.electricalOutlet, P.atticInsulation, P.kitchen, P.window],
  },
  {
    id: "mold",
    label: "Mold Inspection",
    photos: [P.moldExpert, P.thermalMold, P.basementMold, P.crawlspaceMold, P.protectiveSuit, P.dehumidifier],
  },
  {
    id: "gas",
    label: "Gas Leak Detection",
    photos: [P.appliance, P.kitchen, P.crawlspace],
  },
  {
    id: "moisture",
    label: "Moisture & Water",
    photos: [P.thermalMold, P.bathroomLeak, P.windowCondensation, P.remediationPlan, P.carpetMold, P.hvacMold],
  },
  {
    id: "bundle",
    label: "Full Bundle",
    photos: [P.labReport, P.moldExpert, P.thermalMold, P.foundation, P.moldPrevention],
  },
];

export function Gallery() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activePhotos = tabs.find((t) => t.id === activeTab)?.photos ?? [];

  useEffect(() => {
    if (!lightbox) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="py-20 bg-white scroll-mt-20" data-testid="section-gallery">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work in Action</h2>
          <p className="text-lg text-gray-600">
            What we check on every job, and the conditions we're looking for when we check it.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide justify-start md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo grid — feature layout: 1 large + 4 small */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {/* Feature photo — spans 2 rows on desktop */}
            <button
              type="button"
              aria-label={`View photo: ${activePhotos[0]?.alt ?? "inspection photo"}`}
              className="col-span-2 md:col-span-1 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] md:aspect-auto p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                if (activePhotos[0]) setLightbox(activePhotos[0]);
              }}
            >
              <img
                src={activePhotos[0]?.src}
                alt={activePhotos[0]?.alt}
                width={1200}
                height={900}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 drop-shadow-lg" />
              </div>
            </button>

            {/* 4 smaller photos */}
            {activePhotos.slice(1).map((photo, i) => (
              <button
                type="button"
                key={i}
                aria-label={`View photo: ${photo.alt}`}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setLightbox(photo);
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 drop-shadow-lg" />
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Inspection photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close image viewer"
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm px-4">
              {lightbox.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
