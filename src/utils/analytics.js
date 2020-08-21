export function trackAnalyticsEvent(event) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}
