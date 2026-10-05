"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";
import { parseVimeoVideo } from "@/lib/vimeo";
import Player from "@vimeo/player";
import {
  Gauge,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const HIDE_DELAY = 2500;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const total = Math.max(0, Math.round(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function buildEmbedSrc(video) {
  if (!video) return null;
  const params = new URLSearchParams({
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    vimeo_logo: "0",
    dnt: "1",
  });
  if (video.hash) params.set("h", video.hash);
  return `https://player.vimeo.com/video/${video.id}?${params.toString()}`;
}

// Fully custom control bar over a Vimeo iframe with controls:0 (so Vimeo's
// own UI — including the branding/share icons we can't suppress via URL
// params alone — never renders). Playback itself still runs inside Vimeo's
// iframe; this just drives it through the official @vimeo/player SDK and
// draws every visible control ourselves.
export default function VimeoPlayer({ videoUrl, title, className = "" }) {
  const { t, isRtl } = useLanguage();
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const destroyTimerRef = useRef(null);
  const barRef = useRef(null);
  const lastVolumeRef = useRef(1);

  const [embedSrc] = useState(() => buildEmbedSrc(parseVimeoVideo(videoUrl)));
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [quality, setQuality] = useState("auto");
  const [qualityOpen, setQualityOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [dragTime, setDragTime] = useState(null);
  const speedOpenRef = useRef(speedOpen);
  const qualityOpenRef = useRef(qualityOpen);

  useEffect(() => {
    speedOpenRef.current = speedOpen;
  }, [speedOpen]);

  useEffect(() => {
    qualityOpenRef.current = qualityOpen;
  }, [qualityOpen]);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (!speedOpenRef.current && !qualityOpenRef.current) setControlsVisible(false);
    }, HIDE_DELAY);
  }, []);

  const showControls = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setControlsVisible(true);
  }, []);

  const wake = useCallback(() => {
    setControlsVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    if (!embedSrc || !iframeRef.current) return undefined;

    // React 18/19 Strict Mode (next dev) mounts this effect, cleans it up,
    // then mounts it again synchronously. @vimeo/player's destroy() rips the
    // iframe it was given out of the DOM, so calling it from that synthetic
    // cleanup would permanently break the *real* mount that follows a tick
    // later (video stuck "loading" forever). If a pending destroy from a
    // previous cleanup hasn't fired yet, cancel it — the Player constructor
    // below returns that same still-live instance for this iframe anyway.
    if (destroyTimerRef.current) {
      clearTimeout(destroyTimerRef.current);
      destroyTimerRef.current = null;
    }

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player
      .ready()
      .then(() => {
        setLoading(false);
        return Promise.all([player.getDuration(), player.getVolume()]);
      })
      .then(([d, v]) => {
        setDuration(d);
        setVolume(v);
        if (v > 0) lastVolumeRef.current = v;
      })
      .catch(() => setErrored(true));

    player.getQualities().then(setQualities).catch(() => {});
    player.getQuality().then(setQuality).catch(() => {});

    player.on("play", () => {
      setPlaying(true);
      scheduleHide();
    });
    player.on("pause", () => {
      setPlaying(false);
      showControls();
    });
    player.on("ended", () => {
      setPlaying(false);
      showControls();
    });
    player.on("timeupdate", (data) => {
      setCurrentTime(data.seconds);
      setDuration(data.duration);
    });
    player.on("progress", (data) => setBuffered(data.percent * data.duration));
    player.on("volumechange", (data) => {
      setVolume(data.volume);
      if (data.volume > 0) lastVolumeRef.current = data.volume;
    });
    player.on("qualitychange", (data) => setQuality(data.quality));
    player.on("error", () => setErrored(true));

    return () => {
      player.off("play");
      player.off("pause");
      player.off("ended");
      player.off("timeupdate");
      player.off("progress");
      player.off("volumechange");
      player.off("qualitychange");
      player.off("error");
      destroyTimerRef.current = setTimeout(() => {
        player.destroy().catch(() => {});
        destroyTimerRef.current = null;
      }, 0);
    };
  }, [embedSrc, scheduleHide, showControls]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) player.pause().catch(() => {});
    else player.play().catch(() => {});
  }, [playing]);

  const seekToFraction = useCallback(
    (fraction) => {
      const player = playerRef.current;
      if (!player || !duration) return;
      const clamped = Math.min(1, Math.max(0, fraction));
      const target = clamped * duration;
      player.setCurrentTime(target).catch(() => {});
      setCurrentTime(target);
    },
    [duration],
  );

  const fractionFromEvent = useCallback((event) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    return (clientX - rect.left) / rect.width;
  }, []);

  const handleScrubStart = useCallback(
    (event) => {
      wake();
      const fraction = fractionFromEvent(event);
      setDragTime(fraction * duration);

      const handleMove = (moveEvent) => {
        const f = fractionFromEvent(moveEvent);
        setDragTime(Math.min(1, Math.max(0, f)) * duration);
      };
      const handleEnd = (upEvent) => {
        const f = fractionFromEvent(upEvent);
        seekToFraction(f);
        setDragTime(null);
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    },
    [duration, fractionFromEvent, seekToFraction, wake],
  );

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (volume > 0) {
      lastVolumeRef.current = volume;
      player.setVolume(0).catch(() => {});
    } else {
      player.setVolume(lastVolumeRef.current || 1).catch(() => {});
    }
  }, [volume]);

  const handleVolumeChange = useCallback((event) => {
    const value = Number(event.target.value) / 100;
    playerRef.current?.setVolume(value).catch(() => {});
  }, []);

  const changeSpeed = useCallback((rate) => {
    playerRef.current
      ?.setPlaybackRate(rate)
      .then(() => setSpeed(rate))
      .catch(() => {});
    setSpeedOpen(false);
  }, []);

  const changeQuality = useCallback((id) => {
    playerRef.current
      ?.setQuality(id)
      .then(() => setQuality(id))
      .catch(() => {});
    setQualityOpen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName))
        return;
      wake();
      const player = playerRef.current;
      if (!player) return;
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.key === "ArrowRight") {
        player
          .setCurrentTime(Math.min(duration, currentTime + 5))
          .catch(() => {});
      } else if (event.key === "ArrowLeft") {
        player.setCurrentTime(Math.max(0, currentTime - 5)).catch(() => {});
      } else if (event.key === "m") {
        toggleMute();
      } else if (event.key === "f") {
        toggleFullscreen();
      }
    },
    [currentTime, duration, togglePlay, toggleMute, toggleFullscreen, wake],
  );

  if (!embedSrc) {
    return (
      <div
        className={`flex items-center justify-center text-sm text-background/60 ${className}`}
      >
        {t("Video not available yet.", "الفيديو غير متاح حاليًا.")}
      </div>
    );
  }

  const playedFraction = duration ? (dragTime ?? currentTime) / duration : 0;
  const bufferedFraction = duration ? buffered / duration : 0;
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={wake}
      onMouseLeave={() => playing && setControlsVisible(false)}
      className={`group/player relative isolate overflow-hidden bg-black outline-none ${className}`}
    >
      <iframe
        ref={iframeRef}
        src={embedSrc}
        title={title}
        allow="autoplay; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? t("Pause", "إيقاف مؤقت") : t("Play", "تشغيل")}
        className="absolute inset-0 h-full w-full cursor-pointer"
      />

      {(loading || errored) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          {errored ? (
            <p className="px-4 text-center text-sm text-white/80">
              {t("This video could not be loaded.", "تعذّر تحميل هذا الفيديو.")}
            </p>
          ) : (
            <Loader2
              size={28}
              className="animate-spin text-white/80"
              strokeWidth={1.75}
            />
          )}
        </div>
      )}

      {!loading && !errored && !playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={t("Play", "تشغيل")}
          className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform hover:scale-105"
        >
          <Play size={26} className={isRtl ? "" : ""} fill="currentColor" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2 pt-6 transition-opacity duration-200 ${
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        dir="ltr"
      >
        <div
          ref={barRef}
          onMouseDown={handleScrubStart}
          onTouchStart={handleScrubStart}
          className="group/bar relative mb-2 h-3 w-full cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/40"
              style={{ width: `${bufferedFraction * 100}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              style={{ width: `${playedFraction * 100}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-opacity group-hover/bar:opacity-100"
            style={{ left: `${playedFraction * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-1 text-white">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? t("Pause", "إيقاف مؤقت") : t("Play", "تشغيل")}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
          >
            {playing ? (
              <Pause size={17} fill="currentColor" />
            ) : (
              <Play size={17} fill="currentColor" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={
              volume === 0 ? t("Unmute", "تشغيل الصوت") : t("Mute", "كتم الصوت")
            }
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
          >
            <VolumeIcon size={17} strokeWidth={1.75} />
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={handleVolumeChange}
            aria-label={t("Volume", "مستوى الصوت")}
            className="hidden w-16 accent-[var(--color-primary)] sm:block"
          />

          <span className="ml-1 shrink-0 whitespace-nowrap text-xs tabular-nums text-white/90">
            {formatTime(dragTime ?? currentTime)} / {formatTime(duration)}
          </span>

          <span className="flex-1" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setSpeedOpen((v) => !v)}
              aria-label={t("Playback speed", "سرعة التشغيل")}
              className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium transition-colors hover:bg-white/15"
            >
              <Gauge size={15} strokeWidth={1.75} />
              {speed}x
            </button>
            {speedOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-24 overflow-hidden rounded-lg bg-black/90 py-1 text-sm shadow-lg">
                {SPEEDS.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => changeSpeed(rate)}
                    className={`block w-full px-3 py-1.5 text-left transition-colors hover:bg-white/10 ${
                      rate === speed ? "text-primary" : "text-white"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {qualities.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setQualityOpen((v) => !v)}
                aria-label={t("Video quality", "جودة الفيديو")}
                className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium transition-colors hover:bg-white/15"
              >
                <Settings size={15} strokeWidth={1.75} />
                {quality === "auto" ? t("Auto", "تلقائي") : quality}
              </button>
              {qualityOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-24 overflow-hidden rounded-lg bg-black/90 py-1 text-sm shadow-lg">
                  {qualities.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => changeQuality(q.id)}
                      className={`block w-full px-3 py-1.5 text-left transition-colors hover:bg-white/10 ${
                        q.id === quality ? "text-primary" : "text-white"
                      }`}
                    >
                      {q.id === "auto" ? t("Auto", "تلقائي") : q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={
              fullscreen
                ? t("Exit fullscreen", "الخروج من ملء الشاشة")
                : t("Fullscreen", "ملء الشاشة")
            }
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
          >
            {fullscreen ? (
              <Minimize size={16} strokeWidth={1.75} />
            ) : (
              <Maximize size={16} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
