"use client";

import { useEffect, useState } from "react";

const CLIPBOARD_NOTICE =
  "Screenshots of protected Miras course content are not permitted.";

function overwriteClipboard() {
  const helper = document.createElement("textarea");
  helper.value = CLIPBOARD_NOTICE;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-1000px";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  helper.remove();

  if (!copied) {
    navigator.clipboard?.writeText(CLIPBOARD_NOTICE).catch(() => {});
  }
}

export function useAntiCaptureGuard(active) {
  const [obscured, setObscured] = useState(false);

  useEffect(() => {
    if (!active) return;

    let hideTimer;
    let unfocused = false;
    let wipeTimers = [];

    // Windows writes the snip to the clipboard slightly after focus returns to
    // the browser, so a single wipe loses the race.
    function wipeClipboardRepeatedly() {
      overwriteClipboard();
      wipeTimers = [150, 400, 800, 1400, 2200].map((delay) =>
        window.setTimeout(overwriteClipboard, delay)
      );
    }

    function loseFocus() {
      if (unfocused) return;
      unfocused = true;
      window.clearTimeout(hideTimer);
      setObscured(true);
    }

    function regainFocus() {
      if (!unfocused) return;
      unfocused = false;
      setObscured(false);
      wipeClipboardRepeatedly();
    }

    function handleCaptureKey(event) {
      const isPrintScreen = event.key === "PrintScreen";
      const isMacCapture =
        event.metaKey && event.shiftKey && ["3", "4", "5"].includes(event.key);
      if (!isPrintScreen && !isMacCapture) return;

      setObscured(true);
      overwriteClipboard();
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        if (!unfocused) setObscured(false);
      }, 1200);
    }

    // The Windows snipping overlay never dispatches a key or blur event to the
    // page, so focus is polled instead of waiting for one.
    const focusPoll = window.setInterval(() => {
      if (document.hasFocus() && !document.hidden) {
        regainFocus();
      } else {
        loseFocus();
      }
    }, 120);

    window.addEventListener("keydown", handleCaptureKey);
    window.addEventListener("keyup", handleCaptureKey);

    return () => {
      window.clearInterval(focusPoll);
      window.clearTimeout(hideTimer);
      wipeTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("keydown", handleCaptureKey);
      window.removeEventListener("keyup", handleCaptureKey);
    };
  }, [active]);

  return obscured;
}
