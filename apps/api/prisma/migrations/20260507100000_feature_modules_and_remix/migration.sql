CREATE TYPE "RemixJobStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED');

CREATE TABLE "feature_modules" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT NOT NULL,
  "enabledPublic" BOOLEAN NOT NULL DEFAULT true,
  "enabledAdmin" BOOLEAN NOT NULL DEFAULT true,
  "enabledApi" BOOLEAN NOT NULL DEFAULT true,
  "isCore" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "feature_modules_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "remix_projects" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "sourceSongId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "status" "RemixJobStatus" NOT NULL DEFAULT 'QUEUED',
  "bpm" INTEGER,
  "pitchShift" INTEGER NOT NULL DEFAULT 0,
  "tempo" DOUBLE PRECISION NOT NULL DEFAULT 1,
  "volume" DOUBLE PRECISION NOT NULL DEFAULT 1,
  "bassBoost" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "trebleBoost" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reverb" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "echo" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "previewFile" TEXT,
  "outputFile" TEXT,
  "errorMessage" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "remix_projects_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "feature_modules_key_key" ON "feature_modules"("key");
CREATE INDEX "feature_modules_category_sortOrder_idx" ON "feature_modules"("category", "sortOrder");
CREATE UNIQUE INDEX "remix_projects_slug_key" ON "remix_projects"("slug");
CREATE INDEX "remix_projects_userId_createdAt_idx" ON "remix_projects"("userId", "createdAt");
CREATE INDEX "remix_projects_sourceSongId_idx" ON "remix_projects"("sourceSongId");
CREATE INDEX "remix_projects_status_idx" ON "remix_projects"("status");

ALTER TABLE "remix_projects" ADD CONSTRAINT "remix_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "remix_projects" ADD CONSTRAINT "remix_projects_sourceSongId_fkey" FOREIGN KEY ("sourceSongId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
