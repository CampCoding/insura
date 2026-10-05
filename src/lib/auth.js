import { apiPost } from "./apiClient";

const SESSION_KEY = "insura-auth";
const DEVICE_KEY = "insura-device-token";
const EVENT_NAME = "insura-auth-change";

// Auth messages are flat, pre-localized strings (see apiClient.js) -- that's
// apiPost's default (non-bilingual) mode, so every call below can just pass
// path + body.
const post = apiPost;

export function getDeviceToken() {
  if (typeof window === "undefined") return "";
  let token = window.localStorage.getItem(DEVICE_KEY);
  if (!token) {
    const random = Math.random().toString(36).slice(2, 10);
    token = `device-web-${random}`;
    window.localStorage.setItem(DEVICE_KEY, token);
  }
  return token;
}

function readSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVENT_NAME));
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getSession() {
  return readSession();
}

export function isAuthenticated() {
  return Boolean(readSession());
}

export async function registerUser({ name, birthdate, email, phone, password, confirmPassword }) {
  return post("/user/auth/register_user.php", {
    name,
    birthdate,
    email,
    phone,
    password,
    confirm_password: confirmPassword,
  });
}

export async function loginUser({ email, password }) {
  const session = await post("/user/auth/login_user.php", {
    email,
    password,
    deviceToken: getDeviceToken(),
  });
  writeSession(session);
  return session;
}

export async function logoutUser() {
  const session = readSession();
  clearSession();
  if (!session) return;
  try {
    await post("/user/auth/logout_user.php", { student_id: session.student_id });
  } catch {
    // The local session is already cleared either way -- a failed logout
    // call on the server shouldn't trap the user in a "still logged in" UI.
  }
}

export async function updateProfile({ name, phone, birthdate, oldPassword, newPassword }) {
  const session = readSession();
  if (!session) throw new Error("Not logged in.");

  const body = { student_id: session.student_id, name, phone, birthdate };
  if (oldPassword && newPassword) {
    body.old_password = oldPassword;
    body.new_password = newPassword;
  }

  // The server returns the fresh account (same shape as login), so the
  // session picks up anything it normalized server-side instead of just
  // echoing back whatever the form happened to hold.
  const updated = await post("/user/auth/update_profile.php", body);
  writeSession(updated);
  return updated;
}

// Re-fetches the current account from the server (e.g. on the profile page
// mount), in case it changed since login. Does not touch the session if the
// call fails -- a stale session is better than silently logging someone out.
export async function refreshProfile() {
  const session = readSession();
  if (!session) throw new Error("Not logged in.");

  const fresh = await post("/user/auth/read_profile.php", { student_id: session.student_id });
  writeSession(fresh);
  return fresh;
}

export const AUTH_EVENT = EVENT_NAME;
