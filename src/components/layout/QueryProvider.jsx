"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Every data hook (useCourses, useNotifications, useSettings, useProgress,
// useExam) is keyed by endpoint + params through react-query, so when the
// same data is needed by multiple components on one page (e.g. Header's
// notifications bell + the notifications page, or CoursesDropdown +
// CoursesPreview both wanting the course list) they share one in-flight
// request and one cache entry instead of each firing its own fetch.
export default function QueryProvider({ children }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
