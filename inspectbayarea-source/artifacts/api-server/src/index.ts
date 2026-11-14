import app from "./app";
import { ensureCrmSchema } from "./db/ensure-schema";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Verify the CRM tables exist before serving. Deployments use a different
// database than the workspace, and the repo's only schema push runs on git push,
// so production would otherwise never be migrated. Awaited so the check is done
// before the first request, but non-fatal — see ensure-schema.ts.
await ensureCrmSchema();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
