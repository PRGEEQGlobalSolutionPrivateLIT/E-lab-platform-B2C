UPDATE "test_cases"
SET "spec" = '{"title": "Renders the greeting", "expectedOutput": "Hello, World!"}'::jsonb
WHERE "kind" = 'framework'
  AND "spec" = '{"type": "text", "text": "Hello, World!"}'::jsonb
  AND "problemId" IN (SELECT "id" FROM "problems" WHERE "slug" = 'vue-hello-world');