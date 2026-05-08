ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "slug" TEXT;

UPDATE "events"
SET "slug" = lower(regexp_replace(regexp_replace(trim("title"), '[^A-Za-z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
WHERE "slug" IS NULL OR "slug" = '';

UPDATE "events"
SET "slug" = concat('event-', "id")
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "events" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_key" ON "events"("slug");
