import { site } from "@/data/site";

/**
 * Official InterNACHI seals.
 *
 * Both link to InterNACHI's own verification record for our member ID. That is
 * the point of a seal: a badge nobody can check is decoration, and anyone can
 * copy the image. The link makes the claim verifiable at the source.
 *
 * The images are self-hosted from the print-resolution originals InterNACHI
 * supplies to members, converted to WebP (1.7 MB of PNG down to 41 KB) and
 * served at 2x the rendered size so they stay sharp on retina displays.
 */

const BASE = import.meta.env.BASE_URL;

const badges = [
  {
    src: `${BASE}images/badges/internachi-certified.webp`,
    alt: "InterNACHI Certified — International Association of Certified Home Inspectors",
    width: 320,
    height: 277,
    label: "InterNACHI Certified",
  },
  {
    src: `${BASE}images/badges/internachi-cpi.webp`,
    alt: "InterNACHI Certified Professional Inspector (CPI)",
    width: 320,
    height: 320,
    label: "Certified Professional Inspector",
  },
];

interface CertificationBadgesProps {
  /** Rendered height of each seal in pixels. */
  size?: number;
  /** Dark backgrounds get lighter caption text. */
  tone?: "light" | "dark";
  className?: string;
  /** Short line under the seals. Omit where surrounding copy already says it. */
  caption?: string;
}

export function CertificationBadges({
  size = 84,
  tone = "light",
  className = "",
  caption,
}: CertificationBadgesProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-5">
        {badges.map((b) => (
          <a
            key={b.src}
            href={site.nachiVerifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Verify our InterNACHI certification (${site.nachiId})`}
            className="inline-block transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded"
          >
            <img
              src={b.src}
              srcSet={`${b.src.replace(".webp", "-192.webp")} 192w, ${b.src} ${b.width}w`}
              sizes={`${size * b.width / b.height}px`}
              alt={b.alt}
              width={b.width}
              height={b.height}
              loading="lazy"
              decoding="async"
              style={{ height: size, width: size * b.width / b.height }}
              className="max-w-full"
            />
            <span className="sr-only">
              {b.label} — opens InterNACHI's verification page in a new tab
            </span>
          </a>
        ))}
      </div>
      {caption && (
        <p
          className={`mt-3 text-xs ${
            tone === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
