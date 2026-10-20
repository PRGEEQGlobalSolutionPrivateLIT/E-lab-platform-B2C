UPDATE "problems" SET "problemStatement" = $elab$Complete GlobalExceptionHandler using @RestControllerAdvice and @ExceptionHandler. Handle IllegalArgumentException thrown by any controller and respond with HTTP 400 Bad Request, using the exception message as the plain-text response body.

Example: a controller that throws new IllegalArgumentException("Invalid request") must produce status 400 with the body Invalid request.$elab$, "outputFormat" = $elab$HTTP 400 with the exception message as the plain-text response body.$elab$, "updatedAt" = NOW() WHERE "slug" = 'springboot-exception-handler' AND "organizationId" IS NULL;

UPDATE "problems" SET "problemStatement" = $elab$Create a Course model, CourseService and CourseController that keep courses in memory.

Endpoints:
- POST /courses accepts JSON {"title": "Java Basics", "duration": 30}, assigns sequential ids starting at 1 and returns HTTP 201 Created with the saved course.
- GET /courses returns HTTP 200 with every saved course in creation order ([] when there are none).

Example:
POST /courses {"title":"Java Basics","duration":30} returns 201 {"id":1,"title":"Java Basics","duration":30}
GET /courses returns 200 [{"id":1,"title":"Java Basics","duration":30}]$elab$, "outputFormat" = $elab$JSON with the fields id, title and duration. POST returns 201 with the saved course; GET returns 200 with the course list.$elab$, "updatedAt" = NOW() WHERE "slug" = 'springboot-course-api' AND "organizationId" IS NULL;

UPDATE "problems" SET "problemStatement" = $elab$Create Student, StudentDto, StudentService and StudentController that keep students in memory.

Endpoints:
- POST /students accepts JSON {"name": "Asha", "score": 91}. Validate the body with @Valid on StudentDto (name must not be blank, score must be between 0 and 100). A valid student is saved with the next sequential id starting at 1 and returned with HTTP 201 Created. Invalid data returns HTTP 400 and is not saved.
- GET /students returns HTTP 200 with every saved student in creation order ([] when there are none).

Example:
POST /students {"name":"Asha","score":91} returns 201 {"id":1,"name":"Asha","score":91}
POST /students {"name":"","score":50} returns 400$elab$, "outputFormat" = $elab$JSON with the fields id, name and score. Valid POST returns 201, invalid POST returns 400, GET returns 200 with the student list.$elab$, "updatedAt" = NOW() WHERE "slug" = 'springboot-student-management-api' AND "organizationId" IS NULL;
