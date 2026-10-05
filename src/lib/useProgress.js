"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProgress, markLessonComplete } from "./progress-api";
import { useAuth } from "./useAuth";

// Progress for one course: the full curriculum with real videoUrl + watched
// flags, driven by the logged-in student. Guests (no session) just get
// ready:true with progress:null -- callers fall back to the public course
// data in that case (see useCourses.js's useCourse).
export function useProgress(slug) {
  const { ready: authReady, session } = useAuth();
  const studentId = session?.student_id;
  const queryClient = useQueryClient();
  const enabled = authReady && Boolean(slug) && Boolean(studentId);
  const queryKey = ["progress", slug, studentId];

  const query = useQuery({
    queryKey,
    queryFn: () => getProgress({ studentId, slug }),
    enabled,
  });

  const markComplete = async (lessonKey) => {
    if (!studentId) return;
    await markLessonComplete({ studentId, slug, lessonKey });
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    ready: enabled ? query.isFetched : authReady,
    progress: query.data ?? null,
    error: query.error?.message ?? null,
    refresh: query.refetch,
    markComplete,
  };
}
