const PREFIX = "insura-notes-";

function storageKey(courseSlug, lessonKey) {
  return `${PREFIX}${courseSlug}:${lessonKey}`;
}

export function loadDrafts(courseSlug, lessonKey) {
  try {
    const raw = localStorage.getItem(storageKey(courseSlug, lessonKey));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDrafts(courseSlug, lessonKey, drafts) {
  try {
    localStorage.setItem(storageKey(courseSlug, lessonKey), JSON.stringify(drafts));
  } catch {
    // storage unavailable or full — notes just won't persist this session
  }
}

export function createDraft(label) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    text: "",
    elements: [],
    updatedAt: Date.now(),
  };
}
