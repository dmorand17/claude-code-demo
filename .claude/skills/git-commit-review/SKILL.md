---
name: git-commit-review
description: "Review staged changes and suggest a conventional commit message"
user-invocable: true
argument-hint: "[scope]"
allowed-tools:
  - Bash
---

Review the staged git diff and suggest a commit message following conventional commits format.

Scope hint (if provided): $ARGUMENTS

Current staged diff:
!git diff --cached 2>/dev/null || echo "No staged changes"!

Changed files:
!git diff --cached --name-only 2>/dev/null!

## Conventional commit format

```
type(scope): short description under 50 chars

Optional body explaining WHY (not what) for complex changes.
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Rules
- First line must be under 50 characters
- Use imperative mood ("Add feature" not "Added feature")
- The body explains WHY, not WHAT — the diff already shows what changed
- Scope is optional but helpful (e.g. `feat(auth):`, `fix(routes):`)

Suggest 2-3 candidate commit messages ranked by quality, then explain which you recommend and why.
