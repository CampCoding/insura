import { apiPost } from "./apiClient";

// Site-wide info (WhatsApp number, social links, support email). Fetched
// once and provided through SettingsProvider -- see
// components/layout/SettingsProvider.jsx.
//
// Note: the backend's `tagline` field is NOT bilingual (it's hardcoded to
// pick en/ar server-side based on the lang header, defaulting to English
// when none is sent) -- use `tagline_i18n` ({ en, ar }) with tf() instead.
export async function getSettings() {
  return apiPost("/user/settings/read_settings.php", {}, { bilingual: true });
}
