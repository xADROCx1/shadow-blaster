#!/usr/bin/env bash
# Re-syncs the canonical web build (root) into the iOS WebView bundle and
# re-applies iOS patches (local fonts + bridge script). Idempotent.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/ios/ShadowBlaster/WebContent"

echo "→ Syncing web → $WEB"
mkdir -p "$WEB/fonts" "$WEB/assets"

cp "$ROOT/game.js"     "$WEB/game.js"
cp "$ROOT/index.html"  "$WEB/index.html"
cp "$ROOT/styles.css"  "$WEB/styles.css"
rm -rf "$WEB/assets/backgrounds"
cp -R "$ROOT/assets/backgrounds" "$WEB/assets/backgrounds"

# 1) Replace remote @import with local @font-face declarations
python3 - <<'PY'
import pathlib, re, sys
css = pathlib.Path("ios/ShadowBlaster/WebContent/styles.css")
src = css.read_text()
remote = '@import url("https://fonts.googleapis.com/css2?family=Audiowide&family=Share+Tech+Mono&display=swap");'
local = '''@font-face {
  font-family: "Audiowide";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("fonts/Audiowide-Regular.woff2") format("woff2");
}

@font-face {
  font-family: "Share Tech Mono";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("fonts/ShareTechMono-Regular.woff2") format("woff2");
}'''
if remote in src:
    css.write_text(src.replace(remote, local, 1))
    print("  styles.css: switched to local @font-face")
elif local in src:
    print("  styles.css: already local")
else:
    print("  styles.css: WARNING — could not find @import to replace", file=sys.stderr)
    sys.exit(1)
PY

# 2) Add iOS meta tags + bridge script tag to index.html
python3 - <<'PY'
import pathlib, sys
idx = pathlib.Path("ios/ShadowBlaster/WebContent/index.html")
src = idx.read_text()

original_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'
ios_viewport = (
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">\n'
    '    <meta name="apple-mobile-web-app-capable" content="yes">\n'
    '    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n'
    '    <meta name="format-detection" content="telephone=no">'
)
if original_viewport in src:
    src = src.replace(original_viewport, ios_viewport, 1)
    print("  index.html: added iOS viewport/meta tags")

if '<script src="iosBridge.js"></script>' not in src:
    src = src.replace(
        '<script src="game.js"></script>',
        '<script src="game.js"></script>\n    <script src="iosBridge.js"></script>',
        1
    )
    print("  index.html: added iosBridge.js tag")

idx.write_text(src)
PY

echo "✓ Web bundle synced. Re-run the app in Xcode to pick up changes."
