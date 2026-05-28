#!/usr/bin/env bash

set -euo pipefail

pnpm install
pnpm build:all
echo "build done."
