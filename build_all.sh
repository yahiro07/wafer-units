#!/usr/bin/env bash

set -euo pipefail

cd ./wavicle && pnpm install && pnpm build && cd ..
echo "build done."
