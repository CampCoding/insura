"use client";

import { useCallback, useEffect, useState } from "react";
import {
  NOTIFICATIONS_READ_EVENT,
  getReadIds,
  markNotificationRead as markNotificationReadFn,
} from "./notifications";

export function useNotificationsRead() {
  const [readIds, setReadIds] = useState([]);

  const sync = useCallback(() => {
    setReadIds(getReadIds());
  }, []);

  useEffect(() => {
    // Read state lives in localStorage, which the server cannot see: reading it
    // during render would make the hydrated tree differ from the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    sync();
    window.addEventListener(NOTIFICATIONS_READ_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(NOTIFICATIONS_READ_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return {
    readIds,
    isRead: (id) => readIds.includes(id),
    markAsRead: markNotificationReadFn,
  };
}
