"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationRead } from "./notifications-api";
import { useAuth } from "./useAuth";

export function useNotifications() {
  const { ready: authReady, session } = useAuth();
  const studentId = session?.student_id ?? "";
  const queryClient = useQueryClient();
  const queryKey = ["notifications", studentId];

  const query = useQuery({
    queryKey,
    queryFn: () => getNotifications(studentId),
    enabled: authReady,
  });

  const data = query.data ?? { notifications: [], unreadCount: 0 };

  const markAsRead = async (notificationId) => {
    if (!studentId) return; // guests have nothing to persist server-side
    const target = data.notifications.find((n) => n.id === notificationId);
    if (!target || target.isRead) return;

    queryClient.setQueryData(queryKey, (prev) => {
      if (!prev) return prev;
      return {
        notifications: prev.notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      };
    });

    try {
      await markNotificationRead({ studentId, notificationId });
    } catch {
      // The optimistic update already happened; a failed server call just
      // means it'll show as unread again next refetch, which is fine.
    }
  };

  return {
    ready: authReady && query.isFetched,
    notifications: data.notifications,
    unreadCount: data.unreadCount,
    refresh: query.refetch,
    markAsRead,
  };
}
