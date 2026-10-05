"use client";

import { useCallback, useEffect, useState } from "react";
import { AUTH_EVENT, getSession } from "./auth";

export function useAuth() {
  const [session, setSession] = useState(undefined);

  const sync = useCallback(() => {
    setSession(getSession());
  }, []);

  useEffect(() => {
    // Session lives in localStorage, which the server cannot read: reading it
    // during render would make the hydrated tree differ from the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return {
    ready: session !== undefined,
    isAuthenticated: Boolean(session),
    session,
  };
}
