"use client";

import { useQuery } from "@tanstack/react-query";
import { getExam, submitExam } from "./exam-api";
import { useAuth } from "./useAuth";

export function useExam(slug) {
  const { ready: authReady, session } = useAuth();
  const studentId = session?.student_id;
  const enabled = authReady && Boolean(slug) && Boolean(studentId);

  const query = useQuery({
    queryKey: ["exam", slug, studentId],
    queryFn: () => getExam({ studentId, slug }),
    enabled,
  });

  const submit = (answers) => submitExam({ studentId, slug, answers });

  return {
    ready: enabled ? query.isFetched : authReady,
    exam: query.data ?? null,
    error: query.error?.message ?? null,
    submit,
  };
}
