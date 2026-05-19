/*
 * iOS bridge for Shadow Blaster.
 * Translates browser game state into native messages and back.
 * Loaded only inside the iOS WKWebView host — no-op in web browsers.
 */
(function () {
  'use strict';

  var isIOSHost = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.shadowBlaster);
  if (!isIOSHost) return;

  var FREE_WAVE_LIMIT = 3;
  var isSubscribed = !!(window.__shadowBlasterDebugSeed && window.__shadowBlasterDebugSeed.isSubscribed);
  var lastWaveSeen = 1;
  var paywallShown = false;

  function postToNative(payload) {
    try {
      window.webkit.messageHandlers.shadowBlaster.postMessage(payload);
    } catch (e) {
      // Failing post is non-fatal — game continues to function.
    }
  }

  // ── Native → JS callbacks ─────────────────────────────────
  window.__SBSubscriptionUpdate = function (active) {
    isSubscribed = !!active;
    if (isSubscribed) {
      paywallShown = false;
    }
    try {
      window.dispatchEvent(new CustomEvent('shadowBlaster:subscriptionChanged', { detail: { isSubscribed: isSubscribed } }));
    } catch (e) {}
  };

  window.__SBPaywallDismissed = function (purchased) {
    paywallShown = false;
    if (!purchased) {
      // No purchase → drop the player back to the title menu so they
      // cannot brute-force past the gate.
      var menuBtn = document.getElementById('menuButton');
      if (menuBtn) {
        try { menuBtn.click(); } catch (e) {}
      }
    }
  };

  // ── Wave observer ─────────────────────────────────────────
  function attachWaveObserver() {
    var waveEl = document.getElementById('wave');
    if (!waveEl) {
      setTimeout(attachWaveObserver, 200);
      return;
    }

    var fire = function () {
      var wave = parseInt((waveEl.textContent || '').trim(), 10);
      if (!wave || wave === lastWaveSeen) return;

      lastWaveSeen = wave;

      // Fresh run resets the gate so a new game from the menu can re-trigger.
      if (wave <= 1) {
        paywallShown = false;
        return;
      }

      if (wave > FREE_WAVE_LIMIT && !isSubscribed && !paywallShown) {
        paywallShown = true;
        postToNative({ action: 'showPaywall', wave: wave });
      }
    };

    var observer = new MutationObserver(fire);
    observer.observe(waveEl, {
      childList: true,
      characterData: true,
      subtree: true
    });
    fire(); // sync once on startup
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachWaveObserver);
  } else {
    attachWaveObserver();
  }

  // Public surface for the game (and dev console) to query/trigger paywall.
  window.shadowBlasterIOS = {
    get isSubscribed() { return isSubscribed; },
    get freeWaveLimit() { return FREE_WAVE_LIMIT; },
    triggerPaywall: function (wave) {
      if (paywallShown) return;
      paywallShown = true;
      postToNative({ action: 'showPaywall', wave: wave || (FREE_WAVE_LIMIT + 1) });
    }
  };

  postToNative({ action: 'ready' });
})();
