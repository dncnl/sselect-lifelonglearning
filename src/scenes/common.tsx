import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  getRemotionEnvironment,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { photos } from '../photos';
import { asset } from '../lib/assets';
import { easeInOut, prog } from '../lib/anim';

export type SceneMode = 'scroll' | 'present' | 'render';

export type SceneProps = {
  mode?: SceneMode;
  reduced?: boolean;
  /** Jump to a frame of this scene (scrolls the page in scroll mode). */
  onSeek?: (frame: number) => void;
};

export type Tone = 'dark' | 'light';

/** Responsive layout helpers, derived from the composition size (= viewport size on the site). */
export function useLayout() {
  const { width: w, height: h } = useVideoConfig();
  const narrow = w < 760;
  const compact = w < 1100;
  const pad = narrow ? 18 : compact ? 32 : 44;
  /** Fluid size: n% of width, clamped. */
  const fw = (n: number, min: number, max: number) => Math.max(min, Math.min(max, (w * n) / 100));
  /** Fluid size from the smaller dimension. */
  const fm = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, (Math.min(w, h * 1.5) * n) / 100));
  return { w, h, narrow, compact, pad, fw, fm };
}

/** Wraps APA in-text citations such as "(Basco, 2016)" in a styled <cite>. */
export function Cited({ text }: { text: string }) {
  const parts = text.split(/(\([^()]*\d{4}[^()]*\))/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\([^()]*\d{4}[^()]*\)$/.test(p) ? (
          <cite key={i} className="cite">
            {p}
          </cite>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

export const Scene: React.FC<{
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}> = ({ tone, children, className = '', style, label }) => (
  <AbsoluteFill
    className={`scene scene--${tone} ${className}`}
    style={style}
    aria-label={label}
  >
    {children}
  </AbsoluteFill>
);

/** Magazine corner labels: section / chapter / year / source */
export const Corners: React.FC<{
  tl?: React.ReactNode;
  tr?: React.ReactNode;
  bl?: React.ReactNode;
  br?: React.ReactNode;
  start?: number;
  opacity?: number;
}> = ({ tl, tr, bl, br, start = 0, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { pad, narrow } = useLayout();
  const o = prog(frame, start, 24) * opacity;
  const base: React.CSSProperties = { position: 'absolute', opacity: o, maxWidth: narrow ? '46%' : '40%' };
  const top = pad;
  return (
    <div className="corners" aria-hidden="true">
      {tl && <div className="label" style={{ ...base, top, left: pad }}>{tl}</div>}
      {tr && <div className="label" style={{ ...base, top, right: pad, textAlign: 'right' }}>{tr}</div>}
      {bl && <div className="label" style={{ ...base, bottom: pad, left: pad }}>{bl}</div>}
      {br && <div className="label" style={{ ...base, bottom: pad, right: pad, textAlign: 'right' }}>{br}</div>}
    </div>
  );
};

const loaded = new Map<string, boolean>();

/** Black-and-white photo slot with credit, or an editorial placeholder until the file exists. */
export const Photo: React.FC<{
  id: keyof typeof photos | string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  className?: string;
  credit?: boolean;
  caption?: boolean;
  fill?: boolean;
}> = ({ id, style, imgStyle, className = '', credit = true, caption = false, fill = false }) => {
  const p = photos[id as string] ?? { file: '', slot: String(id), alt: '', caption: '', credit: '' };
  const src = asset(`assets/photos/${p.file}`);
  const [ok, setOk] = useState<boolean | null>(loaded.has(src) ? loaded.get(src)! : null);
  const [handle] = useState(() =>
    getRemotionEnvironment().isRendering && !loaded.has(src) ? delayRender(`photo ${p.file}`) : null,
  );
  const released = useRef(false);
  const settle = (v: boolean) => {
    loaded.set(src, v);
    setOk(v);
    if (handle !== null && !released.current) {
      released.current = true;
      continueRender(handle);
    }
  };
  return (
    <figure className={`photo ${fill ? 'photo--fill' : ''} ${className}`} style={style}>
      {ok !== false && (
        <img
          src={src}
          alt={p.alt}
          loading={handle !== null ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => settle(true)}
          onError={() => settle(false)}
          style={{ objectPosition: p.focus ?? 'center', opacity: ok ? 1 : 0, ...imgStyle }}
        />
      )}
      {ok !== true && (
        <div className="photo__placeholder" role="img" aria-label={`Placeholder: ${p.alt}`}>
          <span className="photo__ph-text">[Photo: {p.slot}]</span>
          <span className="label photo__ph-file">assets/photos/{p.file}</span>
        </div>
      )}
      {(credit || caption) && (
        <figcaption className="photo__credit">
          {caption && <span className="photo__caption">{p.caption}</span>}
          {credit && <span className="smallcaps">{p.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};

/**
 * Vertical pan for content that may be taller than the screen (mobile).
 * Returns a ref for the content and the current translateY.
 * In reduced-motion mode no transform is applied (the container scrolls natively instead).
 */
export function usePanY(from: number, to: number, reduced?: boolean, viewport?: number) {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const ref = useRef<HTMLDivElement>(null);
  const [ch, setCh] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = () => setCh(el.scrollHeight);
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const overflow = Math.max(0, ch - (viewport ?? height));
  const y = reduced
    ? 0
    : -interpolate(frame, [from, to], [0, overflow], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: easeInOut,
      });
  return { ref, y, overflow };
}

/** Reveal text word by word between start and end frames. */
export const Words: React.FC<{ text: string; start: number; end: number; dim?: number; accentWords?: string[] }> = ({
  text,
  start,
  end,
  dim = 0.12,
  accentWords = [],
}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const span = (end - start) / words.length;
  return (
    <>
      {words.map((w, i) => {
        const o = interpolate(frame, [start + i * span, start + i * span + Math.max(6, span * 3)], [dim, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const clean = w.replace(/[.,;]/g, '');
        return (
          <span key={i} style={{ opacity: o }} className={accentWords.includes(clean) ? 'accent-text' : undefined}>
            {w}{' '}
          </span>
        );
      })}
    </>
  );
};

export const Logo: React.FC<{ size?: number }> = ({ size = 34 }) => {
  const [ok, setOk] = useState(true);
  const src = asset('assets/logo.png');
  const [handle] = useState(() => (getRemotionEnvironment().isRendering ? delayRender('logo') : null));
  const released = useRef(false);
  const done = (v: boolean) => {
    setOk(v);
    if (handle !== null && !released.current) {
      released.current = true;
      continueRender(handle);
    }
  };
  return ok ? (
    <img
      src={src}
      alt="Angeles University Foundation logo"
      style={{ height: size, width: 'auto', display: 'block', filter: 'grayscale(1) brightness(1.4)' }}
      onLoad={() => done(true)}
      onError={() => done(false)}
    />
  ) : (
    <span className="logo-fallback" style={{ width: size, height: size, fontSize: size * 0.3 }}>
      AUF
    </span>
  );
};

/** Grain that is deterministic per frame (used in the MP4 render). */
export const RenderGrain: React.FC = () => {
  const frame = useCurrentFrame();
  const x = (frame * 73) % 200;
  const y = (frame * 131) % 200;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div className="grain grain--static" style={{ backgroundPosition: `${x}px ${y}px` }} />
      <div className="vignette" />
    </AbsoluteFill>
  );
};
