import { Easing, interpolate } from 'remotion';
import type { CSSProperties } from 'react';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const ease = Easing.bezier(0.22, 1, 0.36, 1); // editorial ease-out
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0 → 1 between start and start+dur */
export function prog(frame: number, start: number, dur = 20, easing = ease) {
  return interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });
}

/** 0 → 1 → 0 window (in, hold, out) */
export function windowed(frame: number, start: number, end: number, fadeDur = 15) {
  const a = prog(frame, start, fadeDur);
  const b = 1 - prog(frame, end - fadeDur, fadeDur, easeInOut);
  return Math.min(a, b);
}

export function map(v: number, inR: number[], outR: number[], easing?: (t: number) => number) {
  return interpolate(v, inR, outR, { ...clamp, easing });
}

/** Fade + rise */
export function rise(frame: number, start: number, dur = 22, dist = 40): CSSProperties {
  const p = prog(frame, start, dur);
  return { opacity: p, transform: `translate3d(0, ${(1 - p) * dist}px, 0)` };
}

/** Clip-path reveal from bottom (for headline lines) */
export function wipeUp(frame: number, start: number, dur = 26): CSSProperties {
  const p = prog(frame, start, dur);
  return {
    clipPath: `inset(${(1 - p) * 100}% 0 0 0)`,
    transform: `translate3d(0, ${(1 - p) * 0.35}em, 0)`,
  };
}

export function fade(frame: number, start: number, dur = 20): CSSProperties {
  return { opacity: prog(frame, start, dur) };
}
