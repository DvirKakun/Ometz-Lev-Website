declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function fbq(
  action: string,
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(action, eventName, params);
  }
}

export function trackPageView() {
  fbq("track", "PageView");
}

export function trackContact() {
  fbq("track", "Contact");
}

export function trackLead() {
  fbq("track", "Lead");
}

export function trackCompleteRegistration(params?: { content_name?: string }) {
  fbq("track", "CompleteRegistration", params);
}

export function trackViewContent(params: {
  content_name: string;
  content_type: "article" | "video";
}) {
  fbq("track", "ViewContent", params);
}

export function trackCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  fbq("trackCustom", eventName, params);
}
