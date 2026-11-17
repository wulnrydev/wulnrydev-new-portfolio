"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";
import Lyrics from "./Lyrics";
import { LYRICS, TRACK } from "@/data/track";
import { useLang } from "@/context/LanguageContext";

/** How long the smooth fade-in takes after pressing play. */
const FADE_IN_MS = 1800;

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function MusicPlayer() {
  const { t } = useLang();
  const p = t.player;

  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);
  /* Current fade multiplier (0 → 1) applied on top of the target volume. */
  const gainRef = useRef(0);
  const fadeStartRef = useRef({ at: 0, from: 0 });
  const volumeRef = useRef(0.7);
  const [playing, setPlaying] = useState(false);
  /* Lyrics stay invisible until the song is actually started. */
  const [revealed, setRevealed] = useState(false);
  const [current, setCurrent] = useState(TRACK.startTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const activeIndex = useMemo(
    () => LYRICS.reduce((acc, line, index) => (current >= line.time ? index : acc), -1),
    [current]
  );

  const progress = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;

  /* Target volume changes are applied straight to the media element,
     scaled by the current fade gain so a slider move never breaks a fade. */
  useEffect(() => {
    volumeRef.current = volume;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = clamp(volume * gainRef.current);
    audio.muted = muted;
  }, [volume, muted]);

  /* Smooth progress/lyrics tracking + fade envelope, without re-rendering
     on every animation frame. */
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = -1;

    const tick = () => {
      const audio = audioRef.current;
      if (audio) {
        const time = audio.currentTime;

        /* Fade in from wherever the gain was when playback resumed. */
        const { at, from } = fadeStartRef.current;
        const fadeIn = at
          ? from + (1 - from) * easeOutCubic(clamp((performance.now() - at) / FADE_IN_MS))
          : 1;

        /* Fade out towards the end of the track. */
        const fadeOut =
          time >= TRACK.fadeOutStart
            ? clamp(1 - (time - TRACK.fadeOutStart) / (TRACK.fadeOutEnd - TRACK.fadeOutStart))
            : 1;

        const gain = clamp(Math.min(fadeIn, fadeOut));
        if (Math.abs(gain - gainRef.current) > 0.004) {
          gainRef.current = gain;
          audio.volume = clamp(volumeRef.current * gain);
        }

        if (Math.abs(time - last) >= 0.15) {
          last = time;
          setCurrent(time);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  /** Jump to 02:55 without ever autoplaying. */
  const seekToStart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = TRACK.startTime;
    } catch {
      /* Seeking before the buffer is ready is harmless. */
    }
    setCurrent(TRACK.startTime);
  }, []);

  /* Metadata can resolve before React hydrates, so check readyState too. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncMetadata = () => {
      setDuration(audio.duration || 0);
      /* Position the playhead at 02:55, but never start playback. */
      if (!startedRef.current && audio.currentTime < TRACK.startTime) seekToStart();
    };

    if (audio.readyState >= 1) syncMetadata();
    audio.addEventListener("loadedmetadata", syncMetadata);
    return () => audio.removeEventListener("loadedmetadata", syncMetadata);
  }, [seekToStart]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    /* The very first press always starts at 02:55, even if the
       initial metadata seek was ignored by the browser. */
    if (!startedRef.current) {
      startedRef.current = true;
      if (audio.readyState >= 1) {
        seekToStart();
      } else {
        audio.addEventListener("loadedmetadata", seekToStart, { once: true });
      }
    }

    setRevealed(true);

    /* Fade in softly from the current gain (0 on the first press). */
    fadeStartRef.current = { at: performance.now(), from: gainRef.current };

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }, [seekToStart]);

  const handleMute = () => {
    if (muted) {
      setMuted(false);
      return;
    }
    if (volume === 0) {
      setVolume(0.7);
      return;
    }
    setMuted(true);
  };

  const volumePercent = muted ? 0 : Math.round(volume * 100);

  return (
    <section id="now-playing" className={styles.section}>
      <div className={styles.stage}>
        <h2 className={styles.title}>{TRACK.title}</h2>

        <div className={styles.progress}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.timeRow}>
            <span>{formatTime(current)}</span>
            <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>

        <div className={styles.transport}>
          <button
            type="button"
            className={styles.playBtn}
            onClick={togglePlay}
            aria-label={playing ? p.pause : p.play}
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1.4" />
                <rect x="14" y="4" width="4" height="16" rx="1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 4.7v14.6a1 1 0 0 0 1.53.85l11.2-7.3a1 1 0 0 0 0-1.7L9.53 3.85A1 1 0 0 0 8 4.7Z" />
              </svg>
            )}
          </button>

          <div className={`${styles.bars} ${playing ? styles.barsActive : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className={styles.volumeGroup}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleMute}
              aria-label={muted || volume === 0 ? p.unmute : p.mute}
              aria-pressed={muted || volume === 0}
            >
              {muted || volume === 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  <path d="m17 9 4 6M21 9l-4 6" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  <path d="M16 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 6a8.5 8.5 0 0 1 0 12" />
                </svg>
              )}
            </button>
            <input
              type="range"
              className={styles.volume}
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                setMuted(next === 0);
              }}
              style={{ "--volume": `${volumePercent}%` } as React.CSSProperties}
              aria-label={p.volume}
            />
          </div>
        </div>
      </div>

      <Lyrics lines={LYRICS} activeIndex={activeIndex} visible={revealed} />

      <audio
        ref={audioRef}
        src={encodeURI(TRACK.src)}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setRevealed(false);
          gainRef.current = 0;
          const audio = audioRef.current;
          if (audio) audio.volume = 0;
          seekToStart();
        }}
      />
    </section>
  );
}
