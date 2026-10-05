"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourse, getCourses } from "./courses-api";
import { useAuth } from "./useAuth";

export function useCourses() {
  const { ready: authReady, session } = useAuth();
  const studentId = session?.student_id ?? "";

  const query = useQuery({
    queryKey: ["courses", studentId],
    queryFn: () => getCourses(studentId),
    enabled: authReady,
  });

  return { ready: authReady && query.isFetched, courses: query.data ?? [] };
}

export function useCourse(slug) {
  const { ready: authReady, session } = useAuth();
  const studentId = session?.student_id ?? "";

  const query = useQuery({
    queryKey: ["course", slug, studentId],
    queryFn: () => getCourse(slug, studentId),
    enabled: authReady && Boolean(slug),
  });

  return {
    ready: authReady && query.isFetched,
    course: query.data ?? null,
    error: query.error?.message ?? null,
    refresh: query.refetch,
  };
}
