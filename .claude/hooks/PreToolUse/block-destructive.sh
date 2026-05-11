#!/bin/bash
# Blocks destructive bash commands before Claude executes them.
# Exit 2 = block (stderr becomes the message Claude sees).
set -euo pipefail

if [ "${TOOL_NAME:-}" = "Bash" ]; then
  if echo "${TOOL_INPUT:-}" | grep -qiE 'rm -rf|drop table|truncate [a-z]|> /dev/(sd|nvme|null)'; then
    echo "BLOCKED: Destructive command detected in Bash input." >&2
    echo "Matched pattern: rm -rf, DROP TABLE, TRUNCATE, or device overwrite." >&2
    echo "If this is intentional, run the command directly in your terminal." >&2
    exit 2
  fi
fi

exit 0
