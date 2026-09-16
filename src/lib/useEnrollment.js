"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ENROLLMENT_EVENT,
  enroll as enrollFn,
  getCompletedLessons,
  isEnrolled,
  markLessonComplete as markLessonCompleteFn,
  unenroll as unenrollFn,
} from "./enrollment";

const INITIAL_STATE = { ready: false, enrolled: false, completed: [] };

export function useEnrollment(slug) {
  const [state, setState] = useState(INITIAL_STATE);

  const sync = useCallback(() => {
    setState({
      ready: true,
      enrolled: isEnrolled(slug),
      completed: getCompletedLessons(slug),
    });
  }, [slug]);

  useEffect(() => {
    // Enrollment lives in localStorage, which the server cannot read: reading it
    // during render would make the hydrated tree differ from the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    sync();
    window.addEventListener(ENROLLMENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ENROLLMENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return {
    ready: state.ready,
    enrolled: state.enrolled,
    completed: state.completed,
    enroll: () => enrollFn(slug),
    unenroll: () => unenrollFn(slug),
    markLessonComplete: (key) => markLessonCompleteFn(slug, key),
  };
}
