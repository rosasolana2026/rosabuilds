/**
 * AgentMart v1 — Shared JS
 * Referral tracking, utilities
 */

(function () {
  // ─── Referral System ───────────────────────────────────────────────
  // On any page load, check for ?ref= param and persist it
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref) {
    localStorage.setItem('agentmart_ref', ref);
    localStorage.setItem('agentmart_ref_ts', Date.now().toString());
    // Log referral event
    try {
      const log = JSON.parse(localStorage.getItem('agentmart_ref_log') || '[]');
      log.push({
        ref,
        page: window.location.pathname + window.location.search,
        ts: new Date().toISOString()
      });
      // Keep last 100 entries
      if (log.length > 100) log.splice(0, log.length - 100);
      localStorage.setItem('agentmart_ref_log', JSON.stringify(log));
    } catch (e) {}
  }

  // ─── Referral helpers (global) ─────────────────────────────────────
  window.AgentMart = {
    getRef: function () {
      return localStorage.getItem('agentmart_ref') || null;
    },
    getRefLog: function () {
      try {
        return JSON.parse(localStorage.getItem('agentmart_ref_log') || '[]');
      } catch { return []; }
    },
    clearRef: function () {
      localStorage.removeItem('agentmart_ref');
      localStorage.removeItem('agentmart_ref_ts');
    },
    buildBuyUrl: function (baseUrl, productId) {
      const ref = this.getRef();
      const url = new URL(baseUrl);
      if (ref) {
        url.searchParams.set('client_reference_id', `agentmart_ref_${ref}_${productId}`);
      }
      return url.toString();
    }
  };

  // ─── Append ref to buy buttons on page ─────────────────────────────
  function tagBuyButtons() {
    const ref = window.AgentMart.getRef();
    if (!ref) return;
    document.querySelectorAll('a.btn-buy, a[data-stripe]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.includes('stripe.com')) {
        try {
          const url = new URL(href);
          url.searchParams.set('client_reference_id', `ref_${ref}`);
          a.setAttribute('href', url.toString());
        } catch (e) {}
      }
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tagBuyButtons);
  } else {
    tagBuyButtons();
  }
})();
