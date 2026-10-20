ALTER TABLE "technologies" ADD COLUMN "pathName" TEXT,
ADD COLUMN "pathShortName" TEXT,
ADD COLUMN "pathDescription" TEXT;

ALTER TABLE "domains" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "stacks" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "stack_modules" (
    "id" TEXT NOT NULL,
    "stackId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologySlug" TEXT,
    "topics" JSONB NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "stack_modules_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "stack_module_problems" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "stack_module_problems_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "practice_stages" (
    "id" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" "PathLevel" NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "practice_stages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "practice_stage_problems" (
    "id" TEXT NOT NULL,
    "stageId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    CONSTRAINT "practice_stage_problems_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "stack_modules_stackId_position_idx" ON "stack_modules"("stackId", "position");
CREATE UNIQUE INDEX "stack_modules_stackId_slug_key" ON "stack_modules"("stackId", "slug");
CREATE INDEX "stack_module_problems_moduleId_position_idx" ON "stack_module_problems"("moduleId", "position");
CREATE UNIQUE INDEX "stack_module_problems_moduleId_problemId_key" ON "stack_module_problems"("moduleId", "problemId");
CREATE UNIQUE INDEX "practice_stages_slug_key" ON "practice_stages"("slug");
CREATE INDEX "practice_stages_technologyId_position_idx" ON "practice_stages"("technologyId", "position");
CREATE INDEX "practice_stage_problems_stageId_position_idx" ON "practice_stage_problems"("stageId", "position");
CREATE UNIQUE INDEX "practice_stage_problems_stageId_problemId_key" ON "practice_stage_problems"("stageId", "problemId");

ALTER TABLE "stack_modules" ADD CONSTRAINT "stack_modules_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "stack_module_problems" ADD CONSTRAINT "stack_module_problems_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "stack_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "stack_module_problems" ADD CONSTRAINT "stack_module_problems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_stages" ADD CONSTRAINT "practice_stages_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_stage_problems" ADD CONSTRAINT "practice_stage_problems_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "practice_stages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "practice_stage_problems" ADD CONSTRAINT "practice_stage_problems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
