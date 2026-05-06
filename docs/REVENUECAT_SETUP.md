# RevenueCat — Exact Configuration

This is what the iOS app expects. Names must match **exactly**.

| Concept | Identifier (case-sensitive) |
|---|---|
| Bundle ID (App Store) | `com.shadowblaster.app` |
| App Store IAP Product ID | `com.shadowblaster.app.premium.monthly` |
| RevenueCat Entitlement | `premium` |
| RevenueCat Offering | `default` |
| RevenueCat Package | `$rc_monthly` |

## Where each name is read in code

- `SubscriptionManager.entitlementID = "premium"` →
  [`ios/ShadowBlaster/SubscriptionManager.swift`](../ios/ShadowBlaster/SubscriptionManager.swift)
- `SubscriptionManager.revenueCatAPIKey = "appl_…"` → same file, top of class
- The current Offering and its first available Package power the paywall
  (`PaywallView.primaryPackage`)

## Step-by-step

### 1. Create the project

- Log in to [app.revenuecat.com](https://app.revenuecat.com)
- **Projects → New Project** → `Shadow Blaster`

### 2. Add the App Store app

- **Apps → New → App Store**
- Name: `Shadow Blaster`
- Bundle ID: **`com.shadowblaster.app`**
- App-specific shared secret: leave blank for now (you can add it later from
  App Store Connect → Users and Access → Integrations → In-App Purchase)
- App Store Connect API: optional but recommended (paste a key issued from
  App Store Connect → Users and Access → Integrations → App Store Connect API)

### 3. Copy the API key

- **Project settings → API keys**
- Copy the **public app-specific** key (`appl_…`) — **not** the secret one
- Paste into `SubscriptionManager.swift`:
  ```swift
  static let revenueCatAPIKey = "appl_xxxxxxxxxxxxxxxxxxxxx"
  ```

### 4. Define the Product

After you've created the IAP in App Store Connect (see
`LAUNCH_CHECKLIST.md` Phase 2b), come back here:

- **Products → New**
- Identifier: **`com.shadowblaster.app.premium.monthly`**
- Type: **Subscription**
- Store: **App Store**

### 5. Define the Entitlement

- **Entitlements → New**
- Identifier: **`premium`**
- Description: `Unlocks unlimited waves and all premium modes.`
- Attach the product from step 4

### 6. Define the Offering

- **Offerings → New**
- Identifier: **`default`**
- Mark as **Current Offering**
- **Add Package**:
  - Identifier: **`$rc_monthly`** (the dollar-sign prefix is a built-in
    convention RevenueCat recognizes)
  - Attach the product from step 4

### 7. Verify

- **Customers** tab will populate as soon as a sandbox tester subscribes
- A successful subscribe:
  - Customer card shows **active subscription**
  - Webhook event `INITIAL_PURCHASE` fires
  - In the app, `SubscriptionManager.isSubscribed` becomes `true`
- A successful restore on a fresh install fires `RESTORE` and re-grants the
  entitlement

## Troubleshooting

**Paywall says "Couldn't load subscription" or shows the spinner forever**

- Wrong API key. The app log will show
  `Error fetching offerings: There was an issue with your configuration`
- Public key (`appl_…`) is correct; secret key (`sk_…`) is not. Don't use
  the secret key in client code.

**Paywall loads but tap does nothing / errors out**

- The IAP product in App Store Connect is not yet **Ready to Submit** /
  attached to a build. Sandbox purchases require **Approved** OR submitted
  alongside a TestFlight build.

**`Purchases.shared.purchase(package:)` succeeds but `isSubscribed` stays false**

- Entitlement identifier mismatch. RevenueCat dashboard entitlement must be
  literally `premium`. The product must be attached to that entitlement.

**Sandbox account already used the trial**

- A sandbox account can only consume the introductory offer once per
  subscription group. Create a new sandbox tester (App Store Connect →
  Users and Access → Sandbox Testers).

## Optional but recommended

- **Server-side receipt validation:** RevenueCat does this for you. No work
  needed — just don't trust client-side `Purchases.shared` calls in any
  custom server logic; query the RevenueCat REST API instead.
- **Webhook to your backend:** Project settings → Integrations → Webhooks.
  Useful when you add server features later (cloud saves, leaderboard).
