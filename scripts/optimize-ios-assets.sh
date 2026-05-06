#!/usr/bin/env bash
# Resize the nebula backgrounds inside the iOS bundle to a sane max edge.
# Originals on disk are 2336x3504 (~19MB each). At 2048 max edge they're ~5MB
# and indistinguishable on iPhone Pro Max / iPad Pro. Web build is untouched.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BG="$ROOT/ios/ShadowBlaster/WebContent/assets/backgrounds"
MAX_EDGE="${MAX_EDGE:-2048}"

if [ ! -d "$BG" ]; then
    echo "✗ $BG does not exist. Run sync-web.sh first." >&2
    exit 1
fi

count=0
saved_kb=0
for png in "$BG"/*.png; do
    [ -f "$png" ] || continue
    before=$(stat -f%z "$png")
    # sips -Z resamples preserving aspect ratio. Skip if already small.
    width=$(sips -g pixelWidth "$png" | awk '/pixelWidth/{print $2}')
    height=$(sips -g pixelHeight "$png" | awk '/pixelHeight/{print $2}')
    long_edge=$(( width > height ? width : height ))
    if [ "$long_edge" -le "$MAX_EDGE" ]; then
        continue
    fi
    sips -Z "$MAX_EDGE" -s format png "$png" --out "$png" >/dev/null 2>&1
    after=$(stat -f%z "$png")
    saved=$(( (before - after) / 1024 ))
    saved_kb=$(( saved_kb + saved ))
    count=$(( count + 1 ))
    printf "  %s: %.1fM → %.1fM (-%dKB)\n" \
        "$(basename "$png")" \
        "$(awk "BEGIN{print $before/1048576}")" \
        "$(awk "BEGIN{print $after/1048576}")" \
        "$saved"
done

if [ "$count" -gt 0 ]; then
    printf "\n✓ Optimized %d images, freed %.1fMB\n" "$count" "$(awk "BEGIN{print $saved_kb/1024}")"
else
    echo "✓ Nothing to do — all images already ≤ ${MAX_EDGE}px on long edge"
fi
