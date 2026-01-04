"use client";

import Script from "next/script";

// Google Analytics 4
const GA_MEASUREMENT_ID = "G-7TE7H0K8S1";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

// Microsoft Clarity - Heatmaps & Session Recordings
// Replace CLARITY_PROJECT_ID with your actual Clarity ID
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function MicrosoftClarity() {
  if (!CLARITY_PROJECT_ID) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}

// Plausible Analytics - Privacy-focused alternative
// Self-hosted or cloud at plausible.io
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function PlausibleAnalytics() {
  if (!PLAUSIBLE_DOMAIN) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

// Combined Analytics Provider
export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <PlausibleAnalytics />
    </>
  );
}

// Event tracking helper for GA4
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Common tracking events
export const events = {
  // Font pairing interactions
  viewCombo: (comboName: string) =>
    trackEvent("view_combo", "font_pairing", comboName),

  favoriteCombo: (comboName: string) =>
    trackEvent("favorite", "font_pairing", comboName),

  unfavoriteCombo: (comboName: string) =>
    trackEvent("unfavorite", "font_pairing", comboName),

  compareCombo: (comboName: string) =>
    trackEvent("add_to_compare", "font_pairing", comboName),

  // Export actions
  copyExport: (exportType: string, comboName: string) =>
    trackEvent("copy_export", exportType, comboName),

  // Builder usage
  useBuilder: () =>
    trackEvent("use_builder", "tools"),

  // Filter usage
  applyFilter: (filterType: string, value: string) =>
    trackEvent("apply_filter", filterType, value),

  // Custom text
  useCustomText: () =>
    trackEvent("use_custom_text", "features"),
};
