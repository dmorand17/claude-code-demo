#!/bin/bash
# Appends a log entry for every tool call to .claude/audit.log.
# PostToolUse — exit code is logged but does not block the operation.
set -euo pipefail

LOG_FILE="${PROJECT_DIR:-$(pwd)}/.claude/audit.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Hook data arrives as JSON on stdin
HOOK_JSON=$(cat)

SESSION=$(echo "$HOOK_JSON"  | jq -r '.session_id // "unknown"' | tr -d '\000-\037\177')
TOOL_NAME=$(echo "$HOOK_JSON" | jq -r '.tool_name  // "unknown"' | tr -d '\000-\037\177')
# Prefer file_path, fall back to command, empty string if neither present
# Strip control characters (including \n and \r) to prevent log injection via crafted filenames
FILE_PATH=$(echo "$HOOK_JSON" | jq -r '.tool_input.file_path // .tool_input.command // ""' | tr -d '\000-\037\177')

printf '%s [%s] %s %s\n' "$TIMESTAMP" "${SESSION:0:8}" "$TOOL_NAME" "$FILE_PATH" >> "$LOG_FILE"
exit 0
