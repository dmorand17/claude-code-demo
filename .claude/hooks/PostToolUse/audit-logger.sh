#!/bin/bash
# Appends a log entry for every tool call to .claude/audit.log.
# PostToolUse — exit code is logged but does not block the operation.
set -euo pipefail

LOG_FILE="${PROJECT_DIR:-$(pwd)}/.claude/audit.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION="${SESSION_ID:-unknown}"

# Extract file_path from TOOL_INPUT if present (not all tools have it)
FILE_PATH=$(echo "${TOOL_INPUT:-{}}" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('file_path', d.get('command', '')))
except Exception:
    print('')
" 2>/dev/null || echo "")

echo "${TIMESTAMP} [${SESSION:0:8}] ${TOOL_NAME:-unknown} ${FILE_PATH}" >> "$LOG_FILE"
exit 0
