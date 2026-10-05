// Pure helpers still used across the site. The static COURSES/NOTIFICATIONS
// mock data that used to live here was removed once the real backend took
// over (see lib/courses-api.js, lib/notifications-api.js, lib/settings-api.js,
// lib/progress-api.js, lib/exam-api.js) -- SITE below only survives as
// SettingsProvider's fallback shape while the real /user/settings fetch is
// in flight.
export const SITE = {
  name: "Insura",
  tagline: "Medical rehabilitation training for practicing specialists",
  whatsappNumber: "201091332282",
  email: "info@insura.example",
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com",
  },
};

export function buildWhatsAppLink(message, whatsappNumber = SITE.whatsappNumber) {
  const text = encodeURIComponent(message ?? "");
  return `https://wa.me/${whatsappNumber}${text ? `?text=${text}` : ""}`;
}

// Still used for purely decorative, non-course marketing photos (Hero,
// ClinicalBand, DifferentiatorsSection) -- real course/instructor images
// come back as full URLs from the API now, no id-to-URL expansion needed.
export function unsplashUrl(id, width, height) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function formatMinutes(minutes, lang = "en") {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (lang === "ar") {
    if (minutes < 60) return `${minutes} د`;
    return rest ? `${hours} س ${rest} د` : `${hours} س`;
  }

  if (minutes < 60) return `${minutes}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}
