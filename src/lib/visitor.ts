"use client";

const KEY = "howick26_visitor_id";

/**
 * Stable per-browser id used to dedupe anonymous likes. Not auth, not PII —
 * just a random token in localStorage so one browser can't spam the count.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, "");
    window.localStorage.setItem(KEY, id);
  }
  return id;
}
