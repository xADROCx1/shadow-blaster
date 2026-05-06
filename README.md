# Shadow Blaster

Arcade space shooter, originally a web game, now packaged as a native iOS app
with a $0.99/month subscription unlocking play past wave 10.

## Repo layout

```
.
├── index.html            # Web (browser) entry point
├── styles.css            # Game styles
├── game.js               # Game logic (~3.4k lines, vanilla JS)
├── assets/backgrounds/   # Nebula PNGs
├── ios/                  # iOS app (SwiftUI + WKWebView)
│   ├── project.yml       # xcodegen config — regenerates the .xcodeproj
│   ├── ShadowBlaster.xcodeproj
│   ├── ShadowBlaster/    # Swift sources + bundled web build
│   └── scripts/
│       └── make-placeholder-icon.swift
└── docs/
    ├── LAUNCH_CHECKLIST.md
    ├── REVENUECAT_SETUP.md
    └── APP_STORE_METADATA.md
```

## iOS architecture

```
SwiftUI App
└─ ContentView
   ├─ GameWebView (WKWebView)
   │  └─ ios/ShadowBlaster/WebContent/  ← bundled web game + iosBridge.js
   └─ PaywallView (sheet, RevenueCat-driven)
```

The web game runs unchanged inside `WKWebView`. `iosBridge.js` watches the
`#wave` HUD element via a `MutationObserver`. When the wave passes 10 and the
user is not subscribed, it posts a `showPaywall` message to native, which
presents the RevenueCat-backed paywall. On successful purchase the JS
`__SBSubscriptionUpdate(true)` callback fires and play continues.

## Local development

### Web game (browser)

```bash
# any static server
python3 -m http.server 8000
# → http://localhost:8000/
```

### iOS app

Prereqs: Xcode 16+, an Apple Developer account, [xcodegen](https://github.com/yonaskolb/XcodeGen).

```bash
cd ios
xcodegen generate         # regenerates ShadowBlaster.xcodeproj from project.yml
open ShadowBlaster.xcodeproj
```

In Xcode: select the **ShadowBlaster** scheme + a simulator → Run.

### Re-syncing the web build into the iOS bundle

After editing `index.html`, `styles.css`, `game.js`, or `assets/`:

```bash
./scripts/sync-web.sh
```

This copies the latest web files into `ios/ShadowBlaster/WebContent/` and
re-applies the iOS-specific patches (local fonts, bridge script tag).

## Going live

See [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) for the full path:
RevenueCat setup → App Store Connect listing → IAP product → archive →
TestFlight → submit for review.
