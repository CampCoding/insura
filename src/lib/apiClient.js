import axios from "axios";

// Real backend base URL (see BACKEND.md in the admin project for the full
// API handoff doc).
export const API_BASE_URL = "https://camp-coding.site/insura";

const LANG_STORAGE_KEY = "insura-lang";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Auth calls want a flat, pre-localized string (an error needs one ready-to-
// show message). Content calls (courses, exam, notifications, ...) instead
// want the raw { en, ar } pair -- exactly what tf() already expects -- so
// toggling the site's language is an instant client-side re-render, not a
// refetch. Passing `skipLangHeader: true` through apiPost's `bilingual`
// option opts a call into that second mode; everything else defaults to the
// site's current language automatically (see LanguageProvider.jsx). A caller
// that already set its own "lang" header (the exam's independent language
// picker, if it ever needs the flat shape) is left alone either way.
apiClient.interceptors.request.use((config) => {
  if (config.skipLangHeader) return config;
  if (config.headers.lang) return config;

  let lang = "en";
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "ar" || stored === "en") lang = stored;
  } catch {
    // ignore -- falls back to "en"
  }
  config.headers.lang = lang;
  return config;
});

// The API returns { status: "success" | "error", message: ... } with HTTP 200
// even for business-logic errors -- see apiClient.js's interceptor comment
// above for what shape "message" comes back in. A few endpoints also put
// extra fields next to "message" (read_notification.php's "unread_count",
// list endpoints' "count"); pass `full: true` to get the whole response
// body back instead of just the unwrapped "message".
export async function apiPost(path, body, { bilingual = false, full = false } = {}) {
  const config = bilingual ? { skipLangHeader: true } : undefined;
  const { data } = await apiClient.post(path, body, config);
  if (data.status === "error") {
    throw new Error(typeof data.message === "string" ? data.message : "Request failed.");
  }
  return full ? data : data.message;
}
