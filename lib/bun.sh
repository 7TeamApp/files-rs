#!/bin/bash

if [ $# -lt 1 ]; then
  echo "Использование: $0 [параметры]"
  exit 1
fi

if command -v bun &> /dev/null; then
  sudo bun "$@"
else
  sudo vite-node "$@"
fi
