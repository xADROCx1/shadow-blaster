# Shadow Blaster — Launch Checklist

The fastest path from "code generated" to "live on the App Store". Open Chrome
for the browser steps, Terminal for the shell steps, and Xcode for the build steps.

> **Estimated time, all phases:** 60–90 minutes of active work. Apple review
> after submission typically takes **24–72 hours**.

---

## Phase 0 — Prep (5 min)

- [ ] Apple Developer Program account is **active** (not "pending"). Verify at
      [developer.apple.com/account](https://developer.apple.com/account)
- [ ] Apple Developer Program **Paid Apps Agreement** is in **Active** state in
      App Store Connect → Business → Agreements (required for IAP / subscriptions)
- [ ] Tax forms + banking info filled out in App Store Connect → Business
- [ ] App icon (1024×1024 PNG, opaque, no transparency, no rounded corners) ready
      to drop in
- [ ] Privacy policy URL hosted somewhere (placeholder OK for first review)

---

## Phase 1 — RevenueCat account & API key (10 min, Chrome)

1. Sign up / log in at [app.revenuecat.com](https://app.revenuecat.com)
2. **Projects → New Project** → name it `Shadow Blaster`
3. Inside the project: **Apps → New** → **App Store** →
   - **App name:** Shadow Blaster
   - **App Bundle ID:** `com.shadowblaster.app` (must match exactly)
4. **Project Settings → API keys** → copy the **public app-specific** key
   (starts with `appl_…`)
5. In your editor, open
   `ios/ShadowBlaster/SubscriptionManager.swift` and replace
   `appl_REPLACE_WITH_YOUR_REVENUECAT_PUBLIC_KEY` with your real key
6. Stay logged in — you'll come back in Phase 3

---

## Phase 2 — App Store Connect: app + subscription (30 min, Chrome)

### 2a. Create the app

1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → **My Apps → +**
2. **New App**
   - Platform: iOS
   - Name: **Shadow Blaster** _(if taken, try "Shadow Blaster: Arcade" or similar)_
   - Primary Language: English (U.S.)
   - Bundle ID: select **com.shadowblaster.app** _(if it isn't in the dropdown
     yet, register it first at developer.apple.com → Certificates, Identifiers
     & Profiles → Identifiers → +)_
   - SKU: `shadowblaster001`
   - User Access: Full Access
3. Click **Create**

### 2b. Configure the auto-renewable subscription

1. In the new app: left sidebar → **Subscriptions** → **+** next to
   "Subscription Groups"
2. Group reference name: **Shadow Blaster Premium**
3. Inside the group, click **+** → **Auto-Renewable Subscription**
   - Reference Name: `Premium Monthly`
   - Product ID: `com.shadowblaster.app.premium.monthly`
4. **Subscription Duration:** 1 Month
5. **Subscription Prices** → **+** → choose **$0.99 USD** as base price
   (App Store auto-converts to other currencies)
6. **App Store Localizations → +** → English (U.S.)
   - Display Name: `Premium`
   - Description: `Unlimited waves, all skins, mods, daily challenges, warp gate destinations, and the Hall of Fame leaderboard. Auto-renewing monthly.`
7. **Introductory Offer** → **+**
   - Type: **Free Trial**
   - Duration: **7 Days**
   - Eligible: New Subscribers
   - Countries: All
8. **Review Information** → upload a screenshot of the paywall (you'll have this
   after Phase 5 simulator run; for now use any 1024×1024 PNG to unblock)
9. Click **Save**

### 2c. Pricing & availability for the app itself

1. Sidebar → **Pricing and Availability**
2. Price: **Free** (the subscription is the IAP)
3. Availability: All countries (or pick subset)

### 2d. App Privacy

1. Sidebar → **App Privacy** → **Get Started**
2. Data collected: answer truthfully. Default for this build:
   - **Identifiers** (RevenueCat anonymous user ID): used for app functionality
   - No tracking, no third-party analytics added
3. Click **Publish**

---

## Phase 3 — Wire RevenueCat to the App Store product (10 min, Chrome)

Back in [app.revenuecat.com](https://app.revenuecat.com), inside your project:

1. **Products → New** →
   - Identifier: `com.shadowblaster.app.premium.monthly`
   - Type: **Subscription**
   - Store: App Store
2. **Entitlements → New** →
   - Identifier: **`premium`** _(must match `entitlementID` in
     `SubscriptionManager.swift`)_
   - Attach the product you just created
3. **Offerings → New** →
   - Identifier: **`default`**
   - Mark as **Current**
   - Add Package: identifier `$rc_monthly`, attach the product
4. Verify by visiting **Project Settings → API keys**:
   the public key you pasted in Phase 1 is what the app uses

---

## Phase 4 — Drop in the real assets & verify locally (10 min, Terminal/Xcode)

```bash
cd "/Users/xadrocx/Documents/Claude/Projects/Shadow Blaster"
```

1. Replace the placeholder icon. Drop your final 1024×1024 PNG at:
   `ios/ShadowBlaster/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png`
   _(overwrite the placeholder; keep the filename)_
2. Update the privacy URL in `ios/ShadowBlaster/PaywallView.swift` (search
   for `shadowblaster.app/privacy`) to your real one
3. Confirm `SubscriptionManager.swift` line 14 has your real RevenueCat key
4. Open Xcode and run on a simulator:

```bash
cd ios && open ShadowBlaster.xcodeproj
```

5. In Xcode:
   - Select the **ShadowBlaster** target → **Signing & Capabilities** →
     pick your **Team**
   - Select an iPhone simulator → **▶ Run**
6. Verify:
   - Title screen loads
   - "Start Run" begins gameplay
   - Free play through wave 10 works
   - Wave 11 triggers the paywall sheet
   - "Maybe later" returns to title screen
   - Restore Purchases works (will be empty pre-launch)

---

## Phase 5 — Sandbox test the purchase flow (15 min)

1. App Store Connect → **Users and Access → Sandbox Testers → +**
2. Create a tester (use a fresh email, not your real Apple ID)
3. On a real iPhone (sandbox doesn't work fully on simulator):
   - Settings → App Store → Sandbox Account → sign in with the tester
4. Open Shadow Blaster (via Xcode → Run on connected iPhone)
5. Trigger paywall (play to wave 11)
6. Tap **Start Free Trial**
7. Confirm purchase, sandbox shouldn't charge
8. Verify: gameplay continues past wave 10, paywall doesn't reappear
9. Kill app, relaunch — verify entitlement persists
10. Test **Restore Purchases** from a fresh install

> If RevenueCat dashboard shows the purchase under **Customers** (search by
> the sandbox email), the loop is wired correctly.

---

## Phase 6 — Archive & upload to App Store Connect (10 min, Xcode)

1. In Xcode, set scheme destination to **Any iOS Device (arm64)**
2. Increment version if needed (`project.yml` → `MARKETING_VERSION`); after
   editing project.yml, run `cd ios && xcodegen generate`
3. **Product → Archive** _(Xcode will require Mac to be signed in to your
   Apple Developer account — Xcode → Settings → Accounts)_
4. When the Organizer opens: **Distribute App → App Store Connect → Upload**
5. Choose:
   - Automatically manage signing: ✅
   - Upload symbols: ✅
   - Manage version & build number: ✅ (uses what's in project.yml)
6. Wait for upload (~1–3 min) + Apple processing (~5–15 min)
7. Build appears in App Store Connect → TestFlight tab

---

## Phase 7 — TestFlight (15 min, optional but strongly recommended)

1. App Store Connect → **TestFlight** → select the new build
2. Provide **Test Information** (just enough to satisfy the form):
   - Beta App Description: copy from `docs/APP_STORE_METADATA.md`
   - Email + URL: yours
3. **Internal Testing → +** → add yourself
4. Install **TestFlight** on your iPhone → install Shadow Blaster
5. Verify all flows again on the production-signed build

---

## Phase 8 — Submit for App Review (15 min, Chrome → wait 24–72h)

1. App Store Connect → app → **App Store** tab → version **1.0**
2. Fill in (use `docs/APP_STORE_METADATA.md` as the source):
   - **Promotional Text**
   - **Description**
   - **Keywords**
   - **Support URL** (your privacy/contact page is fine)
   - **Marketing URL** (optional)
   - **Version** = `1.0`
   - **Copyright** = `2026 [Your Name]`
3. **App Review Information**
   - Demo account: not needed (free first 10 waves)
   - Notes: _"Free play through wave 10. Wave 11+ requires the auto-renewing
     monthly subscription with a 7-day free trial. Subscribed users get
     unlimited waves and access to Warp Gate, Daily Challenge, and full
     ship customization."_
4. **Screenshots** — required: 6.7" iPhone Pro Max (1290×2796).
   You can capture from the simulator: ⌘S in the simulator while the game runs.
   Required: 3–10 screenshots. Show: title, gameplay, garage, paywall, warp gate.
5. **Build** → click **+** → select the build you uploaded in Phase 6
6. **Subscription** section → confirm the auto-renewable subscription is
   attached and submitted **with this version** (must be approved together
   on first submission)
7. **Save → Add for Review → Submit for Review**

Wait. Apple status flow: _Waiting for Review → In Review → Pending Developer
Release / Ready for Sale_. You can choose **Manual** release if you want to
decide the go-live moment, or **Automatic** to ship when approved.

---

## Common rejection reasons (and how this build addresses each)

| Reason | Mitigation in this build |
|---|---|
| 3.1.1 — IAP required for digital content | ✅ Uses StoreKit via RevenueCat |
| 3.1.2 — Subscription terms missing | ✅ Paywall shows price, period, "auto-renews monthly", links to Terms (Apple EULA) and Privacy |
| 3.1.2(a) — Restore purchases | ✅ "Restore Purchases" button on paywall |
| 5.1.1 — Privacy policy missing | ⚠️ You must host one; placeholder URL in `PaywallView.swift` needs replacing |
| 4.0 — Spam / minimum functionality | ✅ Game has 10 free waves, multiple modes, leaderboards |
| 2.1 — Crashes | ✅ Validated locally; sandbox-test before submission |
| Free trial unclear | ✅ Paywall CTA shows "X days free, then $0.99/mo" when intro offer is active |

---

## When Apple approves

1. App Store Connect → version → **Release this version**
   (if you chose Manual release)
2. Live within ~30 minutes
3. Share the link: `https://apps.apple.com/app/idXXXXXXXX`
