import { sql } from "drizzle-orm";
import { db } from "@workspace/db";
import { logger } from "../lib/logger";

/**
 * Create the CRM tables if the connected database does not have them.
 *
 * This Repl uses a different database for the workspace than for deployments.
 * The only schema push in the repo lives in scripts/post-merge.sh, which runs on
 * git push and therefore only ever reaches the workspace database. Production
 * was never migrated, so `leads` and `lead_events` did not exist there and every
 * POST /api/quote returned 500 while the identical code worked in development.
 *
 * Running this at boot fixes the class of problem rather than the instance: it
 * uses the very connection the app is about to serve traffic on, so it cannot
 * target the wrong database the way a manually run script can.
 *
 * Safety:
 *   - Every statement is IF NOT EXISTS, so this is a no-op once applied and
 *     costs a few milliseconds on a warm database.
 *   - It only ever creates. Nothing here drops, alters or truncates, so
 *     `bookings`, `contacts` and their data cannot be affected.
 *   - A failure is logged at error level but does not stop the server. The
 *     marketing site and the existing contact and booking forms do not depend
 *     on these tables, and taking the whole site down to protect a lead-capture
 *     feature would be the worse trade.
 *
 * This is a safety net, not a migration system. Real schema changes still belong
 * in lib/db/src/schema and Drizzle. If this file starts accumulating ALTERs,
 * that is the signal to run migrations properly at deploy time instead.
 */
export async function ensureCrmSchema(): Promise<void> {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS leads (
        id                 serial PRIMARY KEY,
        source             text NOT NULL DEFAULT 'other',
        booking_id         integer REFERENCES bookings(id),
        contact_id         integer REFERENCES contacts(id),
        name               text NOT NULL,
        phone              text,
        email              text,
        service            text,
        property_type      text NOT NULL DEFAULT 'unknown',
        address            text,
        city               text,
        zip                text,
        stage              text NOT NULL DEFAULT 'new',
        quoted_value_cents integer,
        won_value_cents    integer,
        lost_reason        text,
        scheduled_for      timestamp,
        closed_at          timestamp,
        notes              text,
        created_at         timestamp NOT NULL DEFAULT now(),
        updated_at         timestamp NOT NULL DEFAULT now()
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS lead_events (
        id         serial PRIMARY KEY,
        lead_id    integer NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        type       text NOT NULL DEFAULT 'note',
        body       text,
        from_stage text,
        to_stage   text,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await db.execute(sql`CREATE INDEX IF NOT EXISTS leads_stage_created_idx ON leads (stage, created_at)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS leads_closed_at_idx ON leads (closed_at)`);
    await db.execute(sql`CREATE INDEX IF NOT EXISTS lead_events_lead_id_idx ON lead_events (lead_id, created_at)`);

    logger.info("CRM schema verified");
  } catch (err) {
    // Deliberately not rethrown — see the safety note above.
    logger.error({ err }, "Could not verify CRM schema; /api/quote and the CRM will fail until this is resolved");
  }
}
