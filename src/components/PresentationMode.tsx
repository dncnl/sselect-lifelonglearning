import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { FPS, scenes } from '../scenes/registry';
import type { Viewport } from '../lib/site';

type Props = { start: number; vp: Viewport; reduced: boolean; grain: boolean; onExit: (index: number) => void };

/** Slide-style mode for presenting from a projector. Each scene plays on arrival. */
export const PresentationMode: React.FC<Props> = ({ start, vp, reduced, grain, onExit }) => {
  const [i, setI] = useState(start);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [idle, setIdle] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scene = scenes[i];

  const go = useCallback((n: number) => setI(Math.max(0, Math.min(scenes.length - 1, n))), []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    onExit(i);
  }, [i, onExit]);

  // Fullscreen on enter (needs the user gesture that opened this mode).
  useEffect(() => {
    rootRef.current?.requestFullscreen?.().catch(() => undefined);
    rootRef.current?.focus();
  }, []);

  // Play each scene on arrival.
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    setProgress(0);
    if (reduced) {
      p.seekTo(scene.durationInFrames - 1);
      setPlaying(false);
      return;
    }
    p.seekTo(0);
    p.play();
    setPlaying(true);
    const onFrame = (e: { detail: { frame: number } }) => setProgress(e.detail.frame / (scene.durationInFrames - 1));
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    p.addEventListener('frameupdate', onFrame);
    p.addEventListener('play', onPlay);
    p.addEventListener('pause', onPause);
    p.addEventListener('ended', onPause);
    return () => {
      p.removeEventListener('frameupdate', onFrame);
      p.removeEventListener('play', onPlay);
      p.removeEventListener('pause', onPause);
      p.removeEventListener('ended', onPause);
    };
  }, [i, reduced, scene.durationInFrames]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isPlaying()) p.pause();
    else {
      if (p.getCurrentFrame() >= scene.durationInFrames - 1) p.seekTo(0);
      p.play();
    }
  }, [scene.durationInFrames]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          if (e.key === 'Enter' && (e.target as HTMLElement)?.tagName === 'BUTTON') return;
          e.preventDefault();
          go(i + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          go(i - 1);
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(scenes.length - 1);
          break;
        case 'Escape':
          if (!document.fullscreenElement) exit();
          break;
        case 'k':
        case 'K':
          toggle();
          break;
        case 'r':
        case 'R':
          playerRef.current?.seekTo(0);
          playerRef.current?.play();
          break;
        case 'q':
        case 'Q':
          exit();
          break;
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [i, go, exit, toggle]);

  // Auto-hide controls while presenting.
  useEffect(() => {
    let t = window.setTimeout(() => setIdle(true), 2500);
    const on = () => {
      setIdle(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), 2500);
    };
    window.addEventListener('mousemove', on);
    window.addEventListener('touchstart', on);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('mousemove', on);
      window.removeEventListener('touchstart', on);
    };
  }, []);

  const onSeek = useCallback((f: number) => {
    playerRef.current?.seekTo(f);
  }, []);
  const inputProps = useMemo(() => ({ mode: 'present' as const, reduced, onSeek }), [reduced, onSeek]);

  return (
    <div
      ref={rootRef}
      className={`present ${idle ? 'is-idle' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Presentation mode"
      tabIndex={-1}
    >
      <Player
        key={scene.id}
        ref={playerRef}
        component={scene.component}
        inputProps={inputProps}
        durationInFrames={scene.durationInFrames}
        fps={FPS}
        compositionWidth={vp.w}
        compositionHeight={vp.h}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        initiallyMuted
        numberOfSharedAudioTags={0}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />

      <div className="present__bar" role="toolbar" aria-label="Presentation controls">
        <button type="button" className="ui-btn" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous scene">
          ←
        </button>
        <button type="button" className="ui-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <span className="present__title label">
          <span className="accent-text">{scene.no}</span> · {scene.title} <span className="present__count">{i + 1} / {scenes.length}</span>
        </span>
        <button type="button" className="ui-btn" onClick={() => go(i + 1)} disabled={i === scenes.length - 1} aria-label="Next scene">
          →
        </button>
        <button type="button" className="ui-btn" onClick={exit}>
          Exit
        </button>
        <div className="present__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <div className="present__dots" aria-hidden="true">
        {scenes.map((s, n) => (
          <span key={s.id} className={n === i ? 'is-active' : n < i ? 'is-past' : ''} />
        ))}
      </div>
      {grain && (
        <div className="film" aria-hidden="true">
          <div className="grain" />
          <div className="vignette" />
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Scene {i + 1} of {scenes.length}: {scene.title}
      </p>
    </div>
  );
};
