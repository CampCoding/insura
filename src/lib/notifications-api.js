import { apiPost } from "./apiClient";

// Bilingual ({ en, ar }) content, server-tracked read state per student.
// Returns { notifications, unreadCount } -- see BACKEND.md in the admin
// project for each notification's full shape. `id` is added as an alias of
// `notification_id` so the existing notification components (which predate
// the real API) don't need to change their prop names.
export async function getNotifications(studentId) {
  const data = await apiPost(
    "/user/notifications/read_notification.php",
    { student_id: studentId || "" },
    { bilingual: true, full: true }
  );
  const notifications = (data.message ?? []).map((n) => ({ ...n, id: n.notification_id }));
  return { notifications, unreadCount: data.unread_count ?? 0 };
}

export async function markNotificationRead({ studentId, notificationId }) {
  return apiPost("/user/notifications/mark_notification_read.php", {
    student_id: studentId,
    notification_id: notificationId,
  });
}
