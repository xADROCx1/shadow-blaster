import SwiftUI
import WebKit

struct GameWebView: UIViewRepresentable {
    var isSubscribed: Bool
    var onPaywallRequest: (Int) -> Void

    func makeCoordinator() -> Coordinator { Coordinator(parent: self) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.userContentController.add(context.coordinator, name: "shadowBlaster")
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.suppressesIncrementalRendering = false

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.bouncesZoom = false
        webView.scrollView.maximumZoomScale = 1.0
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 0.02, green: 0.03, blue: 0.075, alpha: 1.0)
        webView.scrollView.backgroundColor = webView.backgroundColor

        if #available(iOS 16.4, *) {
            #if DEBUG
            webView.isInspectable = true
            #endif
        }

        if let baseURL = Bundle.main.url(forResource: "WebContent", withExtension: nil) {
            let indexURL = baseURL.appendingPathComponent("index.html")
            webView.loadFileURL(indexURL, allowingReadAccessTo: baseURL)
        } else {
            webView.loadHTMLString(
                "<html><body style='background:#050713;color:#f5f7ff;font-family:system-ui;padding:24px;'>WebContent bundle missing.</body></html>",
                baseURL: nil
            )
        }

        SubscriptionManager.shared.attach(webView: webView)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let active = isSubscribed ? "true" : "false"
        webView.evaluateJavaScript(
            "window.__SBSubscriptionUpdate && window.__SBSubscriptionUpdate(\(active));",
            completionHandler: nil
        )
    }

    final class Coordinator: NSObject, WKScriptMessageHandler {
        let parent: GameWebView

        init(parent: GameWebView) { self.parent = parent }

        func userContentController(_ ucc: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "shadowBlaster",
                  let body = message.body as? [String: Any],
                  let action = body["action"] as? String else { return }

            switch action {
            case "showPaywall":
                let wave = body["wave"] as? Int ?? 11
                DispatchQueue.main.async { self.parent.onPaywallRequest(wave) }

            case "ready":
                #if DEBUG
                print("[ShadowBlaster] JS bridge ready")
                #endif

            case "log":
                #if DEBUG
                let msg = body["message"] as? String ?? ""
                print("[ShadowBlaster JS] \(msg)")
                #endif

            default:
                break
            }
        }
    }
}
