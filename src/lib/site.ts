import { useEffect, useState } from 'react';
import type Lenis from 'lenis';

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export const getLenis = () => lenis;

export function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate, duration: immediate ? 0 : 1.1, force: true });
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}

export type Viewport = { w: number; h: number };

const read = (): Viewport => ({
  w: document.documentElement.clientWidth || window.innerWidth,
  h: window.innerHeight,
});

/** Viewport size that ignores the small height jitter of mobile address bars. */
export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read);
  useEffect(() => {
    let t = 0;
    const on = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const n = read();
        setVp((o) => (o.w !== n.w || Math.abs(o.h - n.h) > 120 ? n : o));
      }, 120);
    };
    window.addEventListener('resize', on);
    window.addEventListener('orientationchange', on);
    return () => {
      window.removeEventListener('resize', on);
      window.removeEventListener('orientationchange', on);
    };
  }, []);
  return vp;
}

export function usePrefersReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)';
  const [r, setR] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setR(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return r;
}

export function storageGet(k: string) {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}
export function storageSet(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
}
