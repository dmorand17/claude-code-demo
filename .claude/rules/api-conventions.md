---
globs: ["src/routes/**/*.js"]
---

# API Route Conventions

These rules apply whenever you are editing files under `src/routes/`.

## Response format

- Errors always use `{ "error": "message" }` — never `{ "message": "..." }` or a bare string
- Success responses wrap data: `{ "data": ... }` for collections, bare object for single resources

## HTTP status codes

| Operation | Status |
|-----------|--------|
| GET (found) | 200 |
| POST (created) | 201 |
| PUT/PATCH (updated) | 200 |
| DELETE (success) | 204 (no body) |
| Not found | 404 |
| Validation error | 400 |
| Server error | 500 |

## Input validation

- Validate all required fields before any business logic
- Return 400 with a specific error message identifying the missing field
- Never pass raw user input to database queries or shell commands

## Error handling

- All async route handlers must be wrapped in try/catch
- Catch blocks must log the error and return a 500 response
- Never expose stack traces or internal error details to clients
