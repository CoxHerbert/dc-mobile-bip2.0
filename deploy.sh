#!/usr/bin/env bash

set -euo pipefail

BUILD_DIR="dist"
TARGET="root@127.0.0.1:/data/wwwroot/rider.bladex.vip"

if [ ! -d "$BUILD_DIR" ]; then
    echo "Build directory '$BUILD_DIR' not found. Run 'npm run build' before deploying." >&2
    exit 1
fi

scp -r "./${BUILD_DIR}/"* "$TARGET"

