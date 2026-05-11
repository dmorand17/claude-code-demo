#!/bin/bash
# Blocks tool calls that attempt to read or write sensitive files.
# Exit 2 = block (stderr becomes the message Claude sees).
set -euo pipefail

SENSITIVE_PATTERN='\.env$|\.env\.|secrets?\.|credentials?\.|\.pem$|\.key$|id_rsa|id_ed25519'

if echo "${TOOL_INPUT:-}" | grep -qiE "$SENSITIVE_PATTERN"; then
  echo "BLOCKED: Attempted access to a sensitive file pattern." >&2
  echo "Matched: .env, secrets, credentials, .pem, .key, or SSH key files." >&2
  echo "Use environment variables instead of reading these files directly." >&2
  exit 2
fi

exit 0
