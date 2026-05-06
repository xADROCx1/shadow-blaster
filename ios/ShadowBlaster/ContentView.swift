import SwiftUI

struct ContentView: View {
    @EnvironmentObject var subs: SubscriptionManager
    @State private var showPaywall = false
    @State private var pendingWave = 0

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea(.all)
            GameWebView(
                isSubscribed: subs.isSubscribed,
                onPaywallRequest: { wave in
                    pendingWave = wave
                    showPaywall = true
                }
            )
            .ignoresSafeArea(.all)
        }
        .sheet(
            isPresented: $showPaywall,
            onDismiss: {
                subs.notifyPaywallDismissed(purchased: subs.isSubscribed)
            }
        ) {
            PaywallView(blockedAtWave: pendingWave)
                .environmentObject(subs)
                .presentationDragIndicator(.visible)
        }
        .task {
            await subs.refreshSubscription()
            await subs.loadOfferings()
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(SubscriptionManager.shared)
}
