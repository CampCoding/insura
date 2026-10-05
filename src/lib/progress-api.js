import { apiPost } from "./apiClient";

// Enrolled courses + per-course progress/exam result for the logged-in
// student. See BACKEND.md in the admin project for the full shape.
export async function getMyCourses(studentId) {
  return apiPost(
    "/user/my_courses/read_my_courses.php",
    { student_id: studentId },
    { bilingual: true }
  );
}

// Full curriculum of one course, with each lesson's real videoUrl and
// watched flag -- the lesson player's main data source.
export async function getProgress({ studentId, slug }) {
  return apiPost(
    "/user/progress/read_progress.php",
    { student_id: studentId, slug },
    { bilingual: true }
  );
}

export async function markLessonComplete({ studentId, slug, lessonKey }) {
  return apiPost("/user/progress/mark_lesson_complete.php", {
    student_id: studentId,
    slug,
    lesson_key: lessonKey,
  });
}
