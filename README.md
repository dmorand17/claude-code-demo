# Claude Code Demo

A hands-on reference project for the **AWS AI-Powered SDLC** workshop. It demonstrates how to extend Claude Code with custom skills, sub-agents, hooks, rules, and MCP server integrations.

## What's included

| Feature | Location | Purpose |
|---|---|---|
| Skills | `.claude/skills/` | Reusable slash commands |
| Sub-agents | `.claude/agents/` | Specialist AI reviewers |
| Hooks | `.claude/hooks/` | Lifecycle enforcement |
| Rules | `.claude/rules/` | File-scoped coding standards |
| MCP servers | `.mcp.json` | External service connections |

## Project structure

```
claude-code-demo/
├── src/
│   ├── app.js          # In-memory task store
│   └── routes/
│       └── tasks.js    # Express-style route handlers (demo with intentional bugs)
├── .claude/
│   ├── agents/         # code-reviewer, security-auditor, test-writer
│   ├── hooks/          # PreToolUse, PostToolUse, Stop lifecycle hooks
│   ├── rules/          # api-conventions.md (auto-loaded for src/routes/ files)
│   ├── skills/         # git-commit-review, validate-route
│   └── settings.json   # Permissions and hook registrations
├── .mcp.json           # MCP server config (aws-knowledge, github)
├── .env.example        # Required environment variables
└── CLAUDE.md           # Project-level Claude instructions
```

## Getting started

```bash
# Install dependencies (if any are added)
node src/app.js

# Copy and fill in environment variables
cp .env.example .env
```

## Skills (slash commands)

### `/git-commit-review [scope]`
Reviews staged changes and suggests a conventional commit message ranked by quality.

### `/validate-route <route-file-path>`
Validates a route file against the project's API conventions (status codes, error format, input validation, async error handling).

## Sub-agents

Invoked automatically by Claude or on demand for specialist review tasks:

- **code-reviewer** — correctness, security, performance, error handling, edge cases
- **security-auditor** — OWASP Top 10, injection, auth flaws, secret leakage
- **test-writer** — unit and integration tests for a given source file

## Hooks

| Hook | Script | What it does |
|---|---|---|
| PreToolUse (Bash) | `block-destructive.sh` | Blocks `rm -rf`, `DROP TABLE`, and device overwrites |
| PreToolUse (Read/Edit/Write) | `block-secrets.sh` | Blocks access to `.env`, keys, and credential files |
| PostToolUse | `audit-logger.sh` | Logs every tool call for the session |
| Stop | `session-summary.sh` | Prints a summary when the session ends |

## MCP servers

- **aws-knowledge** — AWS documentation and service recommendations
- **github** — GitHub API access (requires `GITHUB_TOKEN` in environment)

## API conventions

Rules in `.claude/rules/api-conventions.md` are automatically applied when editing `src/routes/` files:

- Error responses: `{ "error": "message" }`
- Success collections: `{ "data": [...] }`
- Status codes: 201 for create, 204 for delete, 404 for not found
- All async handlers must be wrapped in try/catch

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | For GitHub MCP | Personal access token for the GitHub MCP server |
