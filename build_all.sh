#!/usr/bin/env bash

set -euo pipefail

cd ./wavicle && npm install && npm run build && cd ..
echo "build done."
