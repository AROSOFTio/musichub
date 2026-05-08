ALTER TABLE "languages" ADD COLUMN IF NOT EXISTS "slug" TEXT;

UPDATE "languages"
SET "slug" = lower(regexp_replace(regexp_replace(trim("name"), '[^A-Za-z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
WHERE "slug" IS NULL OR "slug" = '';

UPDATE "languages"
SET "slug" = concat('language-', "id")
WHERE "slug" IS NULL OR "slug" = '';

ALTER TABLE "languages" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "languages_slug_key" ON "languages"("slug");
