"use client";

import { useQuery } from "@tanstack/react-query";
import { SITE } from "@/lib/site-data";
import { getSettings } from "@/lib/settings-api";

// The static SITE object's shape, shown until the real fetch resolves (and
// kept as a fallback if the request ever fails) so nothing on the page
// flashes empty -- see lib/site-data.js.
const FALLBACK_SETTINGS = {
  name: SITE.name,
  tagline_i18n: { en: SITE.tagline, ar: SITE.tagline },
  whatsappNumber: SITE.whatsappNumber,
  email: SITE.email,
  social: SITE.social,
};

// No-op passthrough kept so layout.js doesn't need touching -- the real
// shared cache now lives in react-query (see useSettings below), so there's
// nothing left for a context provider to own.
export function SettingsProvider({ children }) {
  return children;
}

export function useSettings() {
  const query = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Infinity, // site-wide config, rarely changes -- one fetch per session is enough
  });

  return {
    settings: query.data ?? FALLBACK_SETTINGS,
    ready: query.isFetched,
  };
}
