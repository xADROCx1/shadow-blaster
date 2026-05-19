import Foundation
import RevenueCat
import WebKit

@MainActor
final class SubscriptionManager: ObservableObject {
    static let shared = SubscriptionManager()

    // ─────────────────────────────────────────────────────────────
    // CONFIG — replace these with values from your RevenueCat dashboard.
    // The launch checklist (docs/REVENUECAT_SETUP.md) walks through it.
    // ─────────────────────────────────────────────────────────────
    static let revenueCatAPIKey = "appl_wYJDZgOIFKwYQnMqgSXAfHycRUf"
    static let entitlementID = "premium"
    // ─────────────────────────────────────────────────────────────

    @Published private(set) var isSubscribed: Bool = {
        #if DEBUG
        return true
        #else
        return false
        #endif
    }() {
        didSet { notifySubscriptionChanged() }
    }
    @Published private(set) var offerings: Offerings?
    @Published private(set) var isLoading: Bool = false
    @Published private(set) var lastError: String?

    private weak var webView: WKWebView?

    private init() {}

    func attach(webView: WKWebView) {
        self.webView = webView
        #if DEBUG
        self.isSubscribed = true
        #endif
    }

    func refreshSubscription() async {
        #if DEBUG
        self.isSubscribed = true
        return
        #endif

        do {
            let info = try await Purchases.shared.customerInfo()
            self.isSubscribed = info.entitlements[Self.entitlementID]?.isActive == true
        } catch {
            self.lastError = error.localizedDescription
        }
    }

    func loadOfferings() async {
        do {
            self.offerings = try await Purchases.shared.offerings()
        } catch {
            self.lastError = error.localizedDescription
        }
    }

    func purchase(package: Package) async -> Bool {
        #if DEBUG
        self.isSubscribed = true
        return true
        #endif

        isLoading = true
        defer { isLoading = false }
        do {
            let result = try await Purchases.shared.purchase(package: package)
            self.isSubscribed = result.customerInfo.entitlements[Self.entitlementID]?.isActive == true
            return self.isSubscribed
        } catch {
            self.lastError = error.localizedDescription
            return false
        }
    }

    func restore() async -> Bool {
        #if DEBUG
        self.isSubscribed = true
        return true
        #endif

        isLoading = true
        defer { isLoading = false }
        do {
            let info = try await Purchases.shared.restorePurchases()
            self.isSubscribed = info.entitlements[Self.entitlementID]?.isActive == true
            return self.isSubscribed
        } catch {
            self.lastError = error.localizedDescription
            return false
        }
    }

    func notifyPaywallDismissed(purchased: Bool) {
        let arg = purchased ? "true" : "false"
        webView?.evaluateJavaScript(
            "window.__SBPaywallDismissed && window.__SBPaywallDismissed(\(arg));",
            completionHandler: nil
        )
    }

    private func notifySubscriptionChanged() {
        let arg = isSubscribed ? "true" : "false"
        webView?.evaluateJavaScript(
            "window.__SBSubscriptionUpdate && window.__SBSubscriptionUpdate(\(arg));",
            completionHandler: nil
        )
    }
}
