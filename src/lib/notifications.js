const STORAGE_KEY = "insura-notifications-read";
const EVENT_NAME = "insura-notifications-change";

function readStore() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeStore(ids) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getReadIds() {
  return readStore();
}

export function isNotificationRead(id) {
  return readStore().includes(id);
}

export function markNotificationRead(id) {
  const ids = readStore();
  if (!ids.includes(id)) {
    ids.push(id);
    writeStore(ids);
  }
}

export const NOTIFICATIONS_READ_EVENT = EVENT_NAME;
