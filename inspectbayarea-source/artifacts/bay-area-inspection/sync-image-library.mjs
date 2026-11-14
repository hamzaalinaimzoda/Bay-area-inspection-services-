#!/usr/bin/env node
/**
 * Sync the generated image manifest with what is actually on disk.
 *
 * Scans public/images/library/ for .webp files, cross-checks them against the
 * declared library in src/data/images.ts, and rewrites src/data/imageManifest.ts
 * with the ids that are genuinely available. City galleries filter against that
 * manifest, so an image that has not been licensed yet never renders.
 *
 * Run after dropping new photos in:
 *   node artifacts/bay-area-inspection/sync-image-library.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const libraryDir = resolve(__dirname, "public", "images", "library");
const imagesTs = resolve(__dirname, "src", "data", "images.ts");
const manifestTs = resolve(__dirname, "src", "data", "imageManifest.ts");

if (!existsSync(libraryDir)) {
  mkdirSync(libraryDir, { recursive: true });
  console.log(`[images] created ${libraryDir}`);
}

// Declared ids, read straight out of images.ts so the two cannot drift.
const declared = [...readFileSync(imagesTs, "utf-8").matchAll(/^\s{4}id: "([a-z0-9-]+)",$/gm)].map(
  (m) => m[1],
);

const onDisk = readdirSync(libraryDir)
  .filter((f) => f.endsWith(".webp"))
  .map((f) => f.replace(/\.webp$/, ""));

const available = declared.filter((id) => onDisk.includes(id));
const unknown = onDisk.filter((id) => !declared.includes(id));
const missing = declared.filter((id) => !onDisk.includes(id));

writeFileSync(
  manifestTs,
  `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Regenerate with:
 *   node artifacts/bay-area-inspection/sync-image-library.mjs
 *
 * Lists the library image ids that actually have a file in
 * public/images/library/. City galleries filter against this, so an image
 * declared in images.ts but not yet licensed simply does not render — no
 * broken <img> tags ship while photos are still being sourced.
 */

export const availableImageIds: string[] = [
${available.map((id) => `  "${id}",`).join("\n")}
];
`.replace("[\n\n];", "[];"),
);

console.log(`[images] ${available.length}/${declared.length} library images available`);
if (unknown.length) {
  console.log(`[images] WARNING — files not declared in images.ts (they will not render):`);
  unknown.forEach((id) => console.log(`           ${id}.webp`));
}
if (missing.length) {
  console.log(`[images] still to source (${missing.length}):`);
  missing.forEach((id) => console.log(`           ${id}.webp`));
}
