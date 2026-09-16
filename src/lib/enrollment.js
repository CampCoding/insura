const STORAGE_KEY = "miras-enrollments";
const EVENT_NAME = "miras-enrollment-change";

function readStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function isEnrolled(slug) {
  return Boolean(readStore()[slug]);
}

export function enroll(slug) {
  const store = readStore();
  if (!store[slug]) store[slug] = { completed: [] };
  writeStore(store);
}

export function unenroll(slug) {
  const store = readStore();
  delete store[slug];
  writeStore(store);
}

export function getCompletedLessons(slug) {
  return readStore()[slug]?.completed ?? [];
}

export function markLessonComplete(slug, lessonKey) {
  const store = readStore();
  if (!store[slug]) store[slug] = { completed: [] };
  if (!store[slug].completed.includes(lessonKey)) {
    store[slug].completed.push(lessonKey);
  }
  writeStore(store);
}

export function getEnrolledSlugs() {
  return Object.keys(readStore());
}

export const ENROLLMENT_EVENT = EVENT_NAME;
