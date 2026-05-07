import SwiftUI
import RevenueCat

struct PaywallView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject var subs: SubscriptionManager
    var blockedAtWave: Int

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color(red: 0.02, green: 0.03, blue: 0.075),
                    Color(red: 0.06, green: 0.08, blue: 0.18)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ).ignoresSafeArea()

            ScrollView {
                VStack(spacing: 18) {
                    if blockedAtWave > 0 {
                        Text("WAVE \(blockedAtWave) LOCKED")
                            .font(.system(.caption, design: .monospaced))
                            .foregroundStyle(Color(red: 1, green: 0.21, blue: 0.37))
                            .padding(.top, 6)
                    }

                    Text("SHADOW\nBLASTER")
                        .font(.system(size: 40, weight: .black, design: .rounded))
                        .multilineTextAlignment(.center)
                        .foregroundStyle(
                            LinearGradient(
                                colors: [Color(red: 1, green: 0.88, blue: 0.4),
                                         Color(red: 1, green: 0.21, blue: 0.37),
                                         Color(red: 0.14, green: 0.85, blue: 1.0)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )

                    Text("UNLOCK PREMIUM")
                        .font(.system(.title3, design: .rounded).weight(.heavy))
                        .foregroundStyle(Color(red: 1, green: 0.88, blue: 0.4))
                        .padding(.top, -4)

                    VStack(alignment: .leading, spacing: 10) {
                        bullet("Unlimited waves & boss battles")
                        bullet("Warp Gate — 5 nebula destinations")
                        bullet("Daily Challenge with bonus rewards")
                        bullet("Hall of Fame — Top 25 leaderboard")
                        bullet("All ship skins, weapon mods & upgrades")
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 28)
                    .padding(.top, 4)

                    Spacer(minLength: 16)

                    if let pkg = primaryPackage {
                        PaywallCTA(package: pkg)
                            .padding(.horizontal, 22)
                    } else if subs.lastError != nil {
                        VStack(spacing: 10) {
                            Text("Couldn't load subscription")
                                .font(.callout).foregroundStyle(.white)
                            Text(subs.lastError ?? "")
                                .font(.caption2)
                                .foregroundStyle(.white.opacity(0.6))
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 22)
                            Button("Try again") {
                                Task {
                                    await subs.loadOfferings()
                                    await subs.refreshSubscription()
                                }
                            }
                            .font(.callout)
                            .foregroundStyle(.white)
                        }
                    } else {
                        ProgressView().tint(.white).padding()
                    }

                    Button {
                        Task {
                            if await subs.restore() { dismiss() }
                        }
                    } label: {
                        Text("Restore Purchases")
                            .font(.footnote)
                            .foregroundStyle(.white.opacity(0.75))
                    }
                    .padding(.top, 4)

                    HStack(spacing: 18) {
                        Link("Terms",
                             destination: URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!)
                        Link("Privacy",
                             destination: URL(string: "https://xadrocx1.github.io/shadow-blaster/privacy-policy.html")!)
                    }
                    .font(.caption2)
                    .foregroundStyle(.white.opacity(0.55))

                    Button("Maybe later") { dismiss() }
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.5))
                        .padding(.bottom, 12)
                }
                .padding(.top, 24)
            }
        }
    }

    private var primaryPackage: Package? {
        subs.offerings?.current?.availablePackages.first
            ?? subs.offerings?.all.values.first?.availablePackages.first
    }

    @ViewBuilder
    private func bullet(_ text: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundStyle(Color(red: 0.28, green: 1, blue: 0.6))
                .font(.system(size: 18))
            Text(text)
                .foregroundStyle(.white)
                .font(.system(.body, design: .rounded))
            Spacer(minLength: 0)
        }
    }
}

private struct PaywallCTA: View {
    @EnvironmentObject var subs: SubscriptionManager
    @Environment(\.dismiss) private var dismiss
    let package: Package

    var body: some View {
        VStack(spacing: 10) {
            Button {
                Task {
                    if await subs.purchase(package: package) {
                        dismiss()
                    }
                }
            } label: {
                ZStack {
                    RoundedRectangle(cornerRadius: 16)
                        .fill(
                            LinearGradient(
                                colors: [Color(red: 1, green: 0.37, blue: 0.49),
                                         Color(red: 0.72, green: 0.08, blue: 0.23)],
                                startPoint: .top,
                                endPoint: .bottom
                            )
                        )
                        .shadow(color: Color(red: 1, green: 0.21, blue: 0.37).opacity(0.4),
                                radius: 12, y: 4)
                    VStack(spacing: 2) {
                        Text(ctaTopLine)
                            .font(.system(.headline, design: .rounded).weight(.heavy))
                            .foregroundStyle(.white)
                        Text(ctaSubLine)
                            .font(.system(.caption2, design: .rounded))
                            .foregroundStyle(.white.opacity(0.85))
                    }
                    .padding(.vertical, 16)
                }
                .frame(maxWidth: .infinity)
                .frame(height: 64)
            }
            .disabled(subs.isLoading)

            if subs.isLoading {
                ProgressView().tint(.white)
            }
        }
    }

    private var introOffer: StoreProductDiscount? {
        package.storeProduct.introductoryDiscount
    }

    private var ctaTopLine: String {
        if introOffer != nil {
            return "Start Free Trial"
        }
        return "Subscribe — \(package.localizedPriceString)"
    }

    private var ctaSubLine: String {
        if let intro = introOffer {
            let trialLength = "\(intro.subscriptionPeriod.value) \(unit(intro.subscriptionPeriod.unit, value: intro.subscriptionPeriod.value))"
            return "\(trialLength) free, then \(package.localizedPriceString)/mo • cancel anytime"
        }
        return "auto-renews monthly • cancel anytime"
    }

    private func unit(_ u: SubscriptionPeriod.Unit, value: Int) -> String {
        let plural = value != 1
        switch u {
        case .day: return plural ? "days" : "day"
        case .week: return plural ? "weeks" : "week"
        case .month: return plural ? "months" : "month"
        case .year: return plural ? "years" : "year"
        @unknown default: return "period"
        }
    }
}

#Preview {
    PaywallView(blockedAtWave: 11)
        .environmentObject(SubscriptionManager.shared)
}
