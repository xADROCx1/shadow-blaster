#!/usr/bin/env bash
# Pre-flight check before archiving for App Store. Catches the things you'll
# kick yourself for shipping.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fail=0

ok()   { printf "  \033[32m✓\033[0m %s\n" "$*"; }
warn() { printf "  \033[33m!\033[0m %s\n" "$*"; }
err()  { printf "  \033[31m✗\033[0m %s\n" "$*"; fail=1; }

echo "Pre-flight: Shadow Blaster iOS"
echo

echo "1. Code config"
if grep -q 'appl_REPLACE_WITH_YOUR_REVENUECAT_PUBLIC_KEY' \
        "$ROOT/ios/ShadowBlaster/SubscriptionManager.swift"; then
    err "RevenueCat API key is still the placeholder in SubscriptionManager.swift:14"
else
    ok "RevenueCat API key looks set"
fi

if grep -q 'shadowblaster.app/privacy' "$ROOT/ios/ShadowBlaster/PaywallView.swift"; then
    warn "PaywallView privacy URL still points to shadowblaster.app/privacy — replace with a real, hosted privacy policy"
fi

echo
echo "2. App icon"
ICON="$ROOT/ios/ShadowBlaster/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png"
if [ ! -f "$ICON" ]; then
    err "Missing AppIcon-1024.png"
else
    dims=$(sips -g pixelWidth -g pixelHeight "$ICON" 2>/dev/null | awk '/pixel/ {print $2}' | paste -sd 'x' -)
    if [ "$dims" != "1024x1024" ]; then
        err "AppIcon dimensions are $dims, must be 1024x1024"
    else
        ok "AppIcon is 1024×1024"
    fi
    if file "$ICON" | grep -q 'with alpha'; then
        warn "AppIcon has an alpha channel — Apple rejects icons with transparency. Re-export as opaque PNG."
    fi
fi

echo
echo "3. Web bundle"
WEB="$ROOT/ios/ShadowBlaster/WebContent"
for f in index.html styles.css game.js iosBridge.js fonts/Audiowide-Regular.woff2 fonts/ShareTechMono-Regular.woff2; do
    if [ ! -f "$WEB/$f" ]; then
        err "Missing $WEB/$f"
    fi
done
[ "$fail" -eq 0 ] && ok "All required web assets present"

if grep -q 'fonts.googleapis.com' "$WEB/styles.css"; then
    err "styles.css still references fonts.googleapis.com (must be local for App Review)"
else
    ok "styles.css uses local fonts"
fi

if ! grep -q 'iosBridge.js' "$WEB/index.html"; then
    err "index.html does not include iosBridge.js"
else
    ok "iosBridge.js is wired into index.html"
fi

echo
echo "4. Bundle size"
total_kb=$(du -sk "$WEB" | awk '{print $1}')
total_mb=$(awk "BEGIN{print $total_kb/1024}")
if [ "$total_kb" -gt 200000 ]; then
    warn "WebContent is ${total_mb}MB — over 200MB triggers Wi-Fi-only download warning. Run scripts/optimize-ios-assets.sh"
else
    ok "WebContent is ${total_mb}MB (under 200MB cellular threshold)"
fi

echo
echo "5. Bundle ID + version"
plist="$ROOT/ios/ShadowBlaster/Info.plist"
proj_yml="$ROOT/ios/project.yml"
if grep -q 'PRODUCT_BUNDLE_IDENTIFIER: com.shadowblaster.app' "$proj_yml"; then
    ok "Bundle ID is com.shadowblaster.app"
else
    err "project.yml does not set PRODUCT_BUNDLE_IDENTIFIER to com.shadowblaster.app"
fi

mver=$(awk -F'"' '/MARKETING_VERSION/ {print $2; exit}' "$proj_yml")
bnum=$(awk -F'"' '/CURRENT_PROJECT_VERSION/ {print $2; exit}' "$proj_yml")
ok "Marketing version: $mver, build: $bnum"

echo
if [ "$fail" -eq 0 ]; then
    printf "\033[32mReady for archive.\033[0m  Open ios/ShadowBlaster.xcodeproj → Product → Archive\n"
else
    printf "\033[31mFix the issues above before archiving.\033[0m\n"
    exit 1
fi
