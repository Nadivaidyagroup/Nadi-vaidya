// src/components/SiteStats.jsx
// हर पेज खुलने पर अपनी वेबसाइट की visitor गिनती (api/stats/hit.php) — कोई नाम/फ़ोन/IP नहीं।
// साथ में, अगर src/config/analytics.js में ID डाली हो, तो Google Analytics / Microsoft Clarity भी।

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ANALYTICS } from "../config/analytics.js";

const safe = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

// हर browser का एक random नंबर — "कितने अलग लोग" गिनने के लिए
function visitorId() {
  return safe(() => {
    let v = localStorage.getItem("nv_vid");
    if (!/^[a-z0-9]{16}$/.test(v || "")) {
      v = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
      localStorage.setItem("nv_vid", v);
    }
    return v;
  }, "");
}

function send(data) {
  const body = JSON.stringify(data);
  const url = "/api/stats/hit.php";
  if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }))) return;
  fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

function loadExternal() {
  if (window.__nvAnalyticsLoaded) return;
  window.__nvAnalyticsLoaded = true;
  if (ANALYTICS.gaId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS.gaId)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS.gaId, { send_page_view: false });
  }
  if (ANALYTICS.clarityId) {
    window.clarity =
      window.clarity ||
      function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${encodeURIComponent(ANALYTICS.clarityId)}`;
    document.head.appendChild(s);
  }
}

export default function SiteStats() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (/^(localhost|127\.)/.test(window.location.hostname)) return;

    // नई visit? (इस tab में पहला पेज) → कहाँ से आए, वह भी भेजो
    const isNew = !safe(() => sessionStorage.getItem("nv_visit"));
    if (isNew) safe(() => sessionStorage.setItem("nv_visit", "1"));
    const utm = safe(() => new URLSearchParams(search).get("utm_source"), "") || "";

    send({
      p: pathname,
      v: visitorId(),
      n: isNew ? 1 : 0,
      r: isNew ? document.referrer || "" : "",
      s: isNew ? utm : "",
    });

    loadExternal();
    if (ANALYTICS.gaId && window.gtag) {
      window.gtag("event", "page_view", { page_path: pathname, page_location: window.location.href });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
