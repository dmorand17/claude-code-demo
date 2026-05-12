#!/bin/bash
# Prints a session summary when Claude finishes all work.
set -euo pipefail

LOG_FILE="${PROJECT_DIR:-$(pwd)}/.claude/audit.log"
SESSION="${SESSION_ID:-unknown}"
SHORT_ID="${SESSION:0:8}"

echo ""
echo "=== Session Summary [${SHORT_ID}] ==="

if [ -f "$LOG_FILE" ]; then
  CALL_COUNT=$({ grep "$SHORT_ID" "$LOG_FILE" 2>/dev/null || true; } | wc -l | tr -d ' ')
  echo "Tool calls this session: ${CALL_COUNT}"

  echo "Tools used:"
  { grep "$SHORT_ID" "$LOG_FILE" 2>/dev/null || true; } \
    | awk '{print $3}' \
    | sort | uniq -c | sort -rn \
    | awk '{printf "  %-6s %s\n", $1, $2}'

  FILES_CHANGED=$({ grep "$SHORT_ID" "$LOG_FILE" 2>/dev/null || true; } \
    | awk '$3 ~ /^Edit|^Write/ {print $4}' \
    | { grep -v '^$' || true; } | sort -u | wc -l | tr -d ' ')
  echo "Files modified: ${FILES_CHANGED}"
else
  echo "No audit log found."
fi

echo "================================"
exit 0
