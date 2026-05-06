import SwiftUI
import RevenueCat

@main
struct ShadowBlasterApp: App {
    @StateObject private var subs = SubscriptionManager.shared

    init() {
        Purchases.logLevel = .info
        Purchases.configure(withAPIKey: SubscriptionManager.revenueCatAPIKey)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(subs)
                .preferredColorScheme(.dark)
                .statusBarHidden(true)
                .persistentSystemOverlays(.hidden)
        }
    }
}
