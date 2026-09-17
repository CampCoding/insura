"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Flag,
  Maximize,
  XCircle,
} from "lucide-react";
import Button from "@/components/common/Button";
import CaptureGuardOverlay from "@/components/common/CaptureGuardOverlay";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAntiCaptureGuard } from "@/lib/useAntiCaptureGuard";
import { useEnrollment } from "@/lib/useEnrollment";

function ExamQuestionMarker({ index, isCurrent, isAnswered, isMarked, onClick }) {
  const stateClasses = isAnswered
    ? "bg-green-500 text-white"
    : "border-2 border-border text-muted-foreground hover:border-primary/40";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition-all ${stateClasses} ${
        isCurrent ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""
      }`}
    >
      {index + 1}
      {isMarked && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-white">
          <Flag size={9} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

export default function ExamView({ course }) {
  const router = useRouter();
  const rootRef = useRef(null);
  const { ready, enrolled } = useEnrollment(course.slug);
  const questions = course.exam.questions;

  const [stage, setStage] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [marked, setMarked] = useState(() => new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasEnteredFullscreen, setHasEnteredFullscreen] = useState(false);
  const obscured = useAntiCaptureGuard(stage === "exam");

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const score = useMemo(
    () =>
      answers.reduce(
        (sum, answer, i) => (answer === questions[i].correctIndex ? sum + 1 : sum),
        0
      ),
    [answers, questions]
  );

  useEffect(() => {
    if (ready && !enrolled) {
      router.replace(`/courses/${course.slug}`);
    }
  }, [ready, enrolled, course.slug, router]);

  useEffect(() => {
    function handleChange() {
      const active = Boolean(document.fullscreenElement);
      setIsFullscreen(active);
      if (active) setHasEnteredFullscreen(true);
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const requestFullscreen = () => {
    rootRef.current?.requestFullscreen?.().catch(() => {});
  };

  const handleStart = () => {
    requestFullscreen();
    setStage("exam");
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const toggleMark = () => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    setStage("result");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!ready || !enrolled) return null;

  return (
    <div ref={rootRef} className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {course.exam.title}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {course.exam.subject}
          </p>
        </div>
        <ThemeToggle />
      </header>

      {stage === "intro" && (
        <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-12">
          <div className="flex w-full max-w-2xl flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary">
              <ClipboardList size={28} strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
              {course.exam.title}
            </h1>
            <p className="text-muted-foreground">
              {course.exam.subject} · {questions.length} questions
            </p>
            <ul className="flex w-full max-w-md flex-col gap-2 text-left text-sm text-muted-foreground">
              <li>
                The exam opens in fullscreen mode and stays open until you submit.
              </li>
              <li>
                If you exit fullscreen, you will be asked to return before you can
                continue.
              </li>
              <li>
                You can move between questions freely and mark any of them to
                revisit later.
              </li>
            </ul>
            <Button onClick={handleStart} className="mt-3">
              <Maximize size={16} />
              Start Exam
            </Button>
          </div>
        </div>
      )}

      {stage === "exam" && (
        <div
          onContextMenu={(event) => event.preventDefault()}
          className="relative isolate flex flex-1 select-none flex-col overflow-hidden sm:flex-row"
        >
          <aside className="flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-surface p-3 sm:w-auto sm:flex-col sm:items-center sm:overflow-x-hidden sm:overflow-y-auto sm:border-b-0 sm:border-r">
            <div className="flex gap-2 sm:flex-col sm:items-center sm:gap-2.5">
              {questions.map((_, i) => (
                <ExamQuestionMarker
                  key={i}
                  index={i}
                  isCurrent={i === currentIndex}
                  isAnswered={answers[i] !== null}
                  isMarked={marked.has(i)}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto">
            <div className="flex w-full flex-col gap-6 px-8 py-10">
              <p className="text-sm font-medium text-primary">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                {question.question}
              </h2>

              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => {
                  const selected = answers[currentIndex] === i;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(i)}
                      className={`flex items-center gap-3 rounded-card border px-5 py-4 text-left transition-colors ${
                        selected
                          ? "border-primary bg-primary-tint text-primary"
                          : "border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected ? "border-primary" : "border-border"
                        }`}
                      >
                        {selected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={toggleMark}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    marked.has(currentIndex)
                      ? "border-yellow-500 text-yellow-600"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <Flag size={15} strokeWidth={1.75} />
                  {marked.has(currentIndex) ? "Marked for review" : "Mark for review"}
                </button>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    className={currentIndex === 0 ? "pointer-events-none opacity-40" : ""}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>

                  {isLast ? (
                    <Button onClick={handleSubmit}>Submit Exam</Button>
                  ) : (
                    <Button
                      onClick={() =>
                        setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
                      }
                    >
                      Next
                      <ChevronRight size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </main>

          <CaptureGuardOverlay show={obscured} />
        </div>
      )}

      {stage === "result" && (
        <div className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-12">
          <div className="flex w-full max-w-2xl flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-tint text-primary">
              <Award size={28} strokeWidth={1.75} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              You scored {score}/{questions.length}
            </h2>
            <p className="text-muted-foreground">
              {score >= Math.ceil(questions.length * 0.6)
                ? "Great job — you passed the assessment."
                : "Review the related lessons and try again when you're ready."}
            </p>

            <div className="mt-3 flex w-full flex-col gap-2 text-left">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctIndex;
                return (
                  <div
                    key={q.question}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${
                      isCorrect
                        ? "border-border"
                        : "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20"
                    }`}
                  >
                    <span className="min-w-0 flex-1 text-foreground">
                      {i + 1}. {q.question}
                    </span>
                    {isCorrect ? (
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-primary"
                        strokeWidth={1.75}
                      />
                    ) : (
                      <XCircle
                        size={18}
                        className="shrink-0 text-red-500"
                        strokeWidth={1.75}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <Button href={`/learn/${course.slug}`} className="mt-4">
              Back to course
            </Button>
          </div>
        </div>
      )}

      {stage === "exam" && hasEnteredFullscreen && !isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-card bg-surface p-8 text-center shadow-xl">
            <AlertTriangle size={30} className="text-amber-500" strokeWidth={1.75} />
            <p className="text-lg font-semibold text-foreground">
              You exited fullscreen
            </p>
            <p className="text-sm text-muted-foreground">
              Return to fullscreen mode to continue the exam.
            </p>
            <Button onClick={requestFullscreen}>
              <Maximize size={16} />
              Return to Fullscreen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
