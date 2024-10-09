#!/bin/bash

if command -v bun &> /dev/null; then
  alias bun='bun'
else
  alias bun='vite-node'
fi
