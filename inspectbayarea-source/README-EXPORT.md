# Inspect Bay Area — source code export

The existing project folder structure has been preserved.

- artifacts/bay-area-inspection/: website pages, components, styling, analytics, schema, fonts and public images.
- artifacts/api-server/: backend, contact and booking endpoints, email handling and CRM code.
- artifacts/mockup-sandbox/: existing visual prototype/design source.
- lib/: shared API specifications, generated clients, validation and database schema.
- scripts/: maintenance and verification scripts.
- Root package and TypeScript files: pnpm workspace configuration and dependency lockfile.

Uses Node.js and pnpm. Install dependencies with `pnpm install` from this folder. Package-specific development/build commands are in each package.json.

Secrets, environment files, installed dependencies, compiled output, database records, private Agent state and temporary files are intentionally excluded. Configure your own environment variables and database separately before running backend features. No live website changes were made for this export.
