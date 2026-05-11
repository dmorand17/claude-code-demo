---
name: validate-route
description: "Validate an Express route file against project API conventions"
user-invocable: true
argument-hint: "<route-file-path>"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

Validate the route file: $ARGUMENTS

Check against these standards:
1. All handlers validate input before processing
2. Error responses use `{ error: "message" }` format
3. Correct HTTP status codes (201 for create, 204 for delete, 200 for reads)
4. No direct file I/O — must use abstraction layer functions
5. All async operations wrapped in try/catch with error handling
6. No hardcoded secrets or credentials

Current project structure:
!find src -name "*.js" 2>/dev/null | head -20!

Report findings as:
- **Critical** — security issues, missing error handling, data loss risk
- **Warning** — convention violations, incorrect status codes
- **Suggestion** — improvements to readability or robustness
