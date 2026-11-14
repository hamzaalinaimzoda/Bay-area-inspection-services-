-- Creates the CRM tables in a database that does not have them yet.
--
-- Why this file exists: this Repl uses separate databases for the workspace and
-- for deployments. `pnpm --filter db push` in scripts/post-merge.sh only ever
-- reaches the workspace database, so the production database never received the
-- `leads` and `lead_events` tables and every POST /api/quote returned a 500.
--
-- Run once against the PRODUCTION database. Safe to re-run: every statement is
-- guarded, so it does nothing if the tables already exist. It only creates —
-- it never drops or alters an existing table, so `bookings` and `contacts` and
-- their data are untouched.
--
-- Generated from the live schema with pg_dump, not written by hand, so it
-- matches exactly what Drizzle expects.

CREATE TABLE IF NOT EXISTS public.leads (
  id                  serial PRIMARY KEY,
  source              text NOT NULL DEFAULT 'other',
  booking_id          integer REFERENCES public.bookings(id),
  contact_id          integer REFERENCES public.contacts(id),
  name                text NOT NULL,
  phone               text,
  email               text,
  service             text,
  property_type       text NOT NULL DEFAULT 'unknown',
  address             text,
  city                text,
  zip                 text,
  stage               text NOT NULL DEFAULT 'new',
  quoted_value_cents  integer,
  won_value_cents     integer,
  lost_reason         text,
  scheduled_for       timestamp,
  closed_at           timestamp,
  notes               text,
  created_at          timestamp NOT NULL DEFAULT now(),
  updated_at          timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.lead_events (
  id          serial PRIMARY KEY,
  lead_id     integer NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  type        text NOT NULL DEFAULT 'note',
  body        text,
  from_stage  text,
  to_stage    text,
  created_at  timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_stage_created_idx  ON public.leads      USING btree (stage, created_at);
CREATE INDEX IF NOT EXISTS leads_source_idx         ON public.leads      USING btree (source);
CREATE INDEX IF NOT EXISTS leads_closed_at_idx      ON public.leads      USING btree (closed_at);
CREATE INDEX IF NOT EXISTS lead_events_lead_id_idx  ON public.lead_events USING btree (lead_id, created_at);
