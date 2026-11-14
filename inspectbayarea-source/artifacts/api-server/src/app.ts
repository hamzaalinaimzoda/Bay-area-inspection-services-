import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// The CRM authenticates with a cookie, so credentials must be allowed. Origin is
// reflected rather than "*" because the two cannot be combined.
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

/*
 * The CRM is served by the API server rather than the marketing site on purpose.
 * It lives on the same origin as /api, so the session cookie is sent without any
 * CORS or SameSite gymnastics, and it stays entirely outside the public site's
 * prerender and bundle — 125 static pages and their paint budget are unaffected.
 */
const here = path.dirname(fileURLToPath(import.meta.url));
app.get("/crm", (_req, res) => {
  res.sendFile(path.join(here, "..", "public", "crm.html"));
});

export default app;
