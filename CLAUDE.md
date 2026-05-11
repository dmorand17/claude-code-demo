# Claude Code Demo

This project demonstrates Claude Code capabilities from the AWS AI-Powered SDLC workshop.

## What's here

- **Skills** — reusable slash commands in `.claude/skills/`
- **Custom Agents** — specialist sub-agents in `.claude/agents/`
- **Hooks** — lifecycle enforcement scripts in `.claude/hooks/`
- **MCP** — external service connections in `.mcp.json`
- **Rules** — file-scoped standards in `.claude/rules/`

## Project conventions

- All source files live under `src/`
- Scripts must be executable before running
- Never commit `.env` files

## Key commands

- Run the demo app: `node src/app.js`
- Check hook registrations: look in `.claude/settings.json`
- List available slash commands: type `/` in Claude Code
