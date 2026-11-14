import type { Service } from "./types";
import { moldInspection } from "./mold-inspection";
import { fullHomeInspection } from "./full-home-inspection";
import { gasLeakDetection } from "./gas-leak-detection";
import { moistureWaterDamage } from "./moisture-water-damage";
import { homeMoldBundle } from "./home-mold-bundle";

export type {
  Service,
  ServiceFaq,
  ServiceIncluded,
  ServiceEquipment,
  ServiceFinding,
  ServiceAudience,
} from "./types";

/**
 * Display order across the site — drives the navbar dropdown, the footer, the
 * services index, and the service cards on all 28 city pages.
 *
 * Full home inspection leads: it is the service we most want to be hired for
 * and the larger search market. Mold follows as the specialism that
 * differentiates us, rather than as the headline offer.
 */
export const services: Service[] = [
  fullHomeInspection,
  moldInspection,
  gasLeakDetection,
  moistureWaterDamage,
  homeMoldBundle,
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
