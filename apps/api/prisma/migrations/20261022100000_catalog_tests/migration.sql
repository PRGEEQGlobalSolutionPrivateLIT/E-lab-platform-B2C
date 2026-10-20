ALTER TYPE "WorkspaceType" ADD VALUE IF NOT EXISTS 'powerbi';
ALTER TYPE "WorkspaceType" ADD VALUE IF NOT EXISTS 'coding';

ALTER TABLE "problems" ADD COLUMN "config" JSONB;

ALTER TABLE "test_cases" ADD COLUMN "kind" TEXT NOT NULL DEFAULT 'io',
ADD COLUMN "spec" JSONB;