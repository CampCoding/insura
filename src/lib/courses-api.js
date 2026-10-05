import { apiPost } from "./apiClient";

// Bilingual ({ en, ar }) content. Passing a slug returns one course's full
// detail (curriculum, attachments, reviews, exam header); omitting it
// returns the list (card-level fields only). `studentId` unlocks
// `isEnrolled`/per-lesson `locked` for a logged-in visitor; guests (empty
// studentId) only ever see preview lessons unlocked. See BACKEND.md in the
// admin project for the full shape.
export async function getCourses(studentId) {
  return apiPost(
    "/user/courses/read_course.php",
    { student_id: studentId || "" },
    { bilingual: true }
  );
}

export async function getCourse(slug, studentId) {
  return apiPost(
    "/user/courses/read_course.php",
    { slug, student_id: studentId || "" },
    { bilingual: true }
  );
}
