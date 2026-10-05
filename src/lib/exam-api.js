import { apiPost } from "./apiClient";

// Bilingual ({ en, ar }) content -- the exam screen picks whichever language
// it wants per question/option itself (its own independent language choice,
// separate from the site-wide one), so this never sends a "lang" header at
// all. Correct answers never come back here; submitExam scores server-side.
export async function getExam({ studentId, slug }) {
  return apiPost(
    "/user/exam/read_exam.php",
    { student_id: studentId, slug },
    { bilingual: true }
  );
}

// answers: [{ question_id, selectedIndex }]
export async function submitExam({ studentId, slug, answers }) {
  return apiPost(
    "/user/exam/submit_exam.php",
    { student_id: studentId, slug, answers },
    { bilingual: true }
  );
}
