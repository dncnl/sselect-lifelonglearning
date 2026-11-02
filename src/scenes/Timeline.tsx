import React from 'react';
import { useCurrentFrame } from 'remotion';
import { timeline } from '../content';
import { ease, map, prog, rise, wipeUp } from '../lib/anim';
import { Corners, Photo, Scene, SceneProps, useLayout } from './common';

const INTRO = 36;
const STEP = 44;
const N = timeline.items.length;
export const TIMELINE_DURATION = INTRO + (N - 1) * STEP + 56;

/** Frame where item i is settled at centre. */
export const timelineFrameFor = (i: number) => INTRO + i * STEP + 2;

const short = (y: string) => {
  const m = y.match(/\d{4}/);
  if (!m) return y;
  const yy = m[0].slice(2);
  return y.startsWith('Early') ? `’${yy}s` : `’${yy}`;
};

export const Timeline: React.FC<SceneProps> = ({ onSeek }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const { w, h, pad, fw } = L;
  // Vertical timeline on phones, tablets and portrait screens.
  const narrow = L.narrow || w < 900 || h > w * 1.1;

  // Continuous position with a "dwell" on each year.
  const raw = map(frame, [INTRO, INTRO + (N - 1) * STEP], [0, N - 1]);
  const base = Math.floor(raw);
  const frac = raw - base;
  const t = Math.min(N - 1, base + ease(Math.max(0, (frac - 0.4) / 0.6)));
  const active = Math.round(t);
  const item = timeline.items[active];
  const climax = !!item.climax && Math.abs(t - active) < 0.3;

  const itemW = narrow ? w : Math.min(w * 0.44, 680);
  const itemH = narrow ? h * 0.38 : h;
  const centerX = narrow ? 0 : w * 0.36;
  const centerY = narrow ? h * 0.2 : 0;
  const trackX = narrow ? 0 : centerX - t * itemW - itemW / 2 + itemW / 2;
  const trackY = narrow ? centerY - t * itemH : 0;
  const baselineY = narrow ? 0 : h * 0.6;

  const intro = prog(frame, 0, 24);

  return (
    <Scene tone="light" label={timeline.heading}>
      <Corners tl="Timeline at a glance" tr="Ch. 03" bl={item.year} br={narrow ? 'Basco; Montalvan; et al.' : timeline.sources.replace('Sources: ', '')} />

      <h2
        className="display"
        style={{ position: 'absolute', left: pad, top: pad + 40, margin: 0, fontSize: narrow ? 30 : fw(2.6, 30, 48), lineHeight: 1, zIndex: 3 }}
      >
        <span className="italic" style={{ ...wipeUp(frame, 0) }}>1991</span>{' '}
        <span className="caps" style={{ fontSize: '0.6em', letterSpacing: '0.12em', ...wipeUp(frame, 8) }}>to</span>{' '}
        <span className="italic" style={{ ...wipeUp(frame, 14) }}>2026</span>
      </h2>

      {/* Baseline + progress (desktop) */}
      {!narrow && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: baselineY, height: 1, background: 'var(--rule)', opacity: intro }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: -1,
              height: climax ? 3 : 1,
              width: `${(t / (N - 1)) * 100}%`,
              background: 'var(--accent)',
              transition: 'height .3s',
            }}
          />
        </div>
      )}

      {/* The track */}
      <ol
        className="tl-track"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          listStyle: 'none',
          transform: `translate3d(${trackX}px, ${trackY}px, 0)`,
          opacity: intro,
        }}
      >
        {timeline.items.map((it, i) => {
          const d = Math.abs(i - t);
          if (d > (narrow ? 1.6 : 3.2)) return null;
          const near = Math.max(0, 1 - d);
          const fadeFar = narrow ? map(d, [0.8, 1.5], [1, 0]) : 1;
          const isClimax = !!it.climax;
          const yearLen = it.year.length;
          const yearBase = narrow ? Math.min(w * 0.3, h * 0.13) : Math.min(itemW * 0.42, h * 0.26);
          const yearSize = yearLen > 4 ? yearBase * (narrow ? 0.44 : 0.52) : yearBase;
          const textO = map(d, [0.15, 0.55], [1, 0]);
          return (
            <li
              key={it.year}
              style={{
                position: 'absolute',
                left: narrow ? pad : i * itemW,
                top: narrow ? i * itemH : 0,
                width: narrow ? w - pad * 2 : itemW,
                height: narrow ? itemH : h,
              }}
            >
              <button
                type="button"
                className={`tl-year display ${isClimax ? 'is-climax' : ''}`}
                onClick={() => onSeek?.(timelineFrameFor(i))}
                aria-label={`${it.year}: ${it.text}`}
                aria-current={i === active ? 'step' : undefined}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: narrow ? 0 : baselineY - yearSize * 0.92,
                  fontSize: yearSize,
                  lineHeight: 1,
                  opacity: map(d, [0, 1, 2], [1, 0.2, 0.06]) * fadeFar,
                  transform: `scale(${0.62 + near * 0.38})`,
                  transformOrigin: narrow ? 'left top' : 'left bottom',
                  color: isClimax && d < 0.5 ? 'var(--accent)' : undefined,
                  whiteSpace: 'nowrap',
                }}
              >
                <span className={yearLen > 4 ? 'italic' : undefined}>{it.year}</span>
              </button>

              {it.photo && (
                <div
                  style={{
                    position: 'absolute',
                    left: narrow ? undefined : itemW * 0.5,
                    right: narrow ? 0 : undefined,
                    top: narrow ? 0 : pad + 110,
                    width: narrow ? Math.min(w * 0.24, 200) : Math.min(itemW * 0.36, (baselineY - yearSize * 0.95 - pad - 126) * 0.8),
                    height: narrow ? yearBase * 1.15 : Math.max(80, baselineY - yearSize * 0.95 - pad - 126),
                    opacity: map(d, [0.2, 0.9], [1, 0]),
                    transform: `translateY(${map(d, [0, 1], [0, 30])}px)`,
                  }}
                >
                  <Photo id={it.photo} credit={!narrow} />
                </div>
              )}

              <p
                className="body"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: narrow ? yearSize * 1.25 : baselineY + 26,
                  width: narrow ? '100%' : Math.min(itemW * 0.95, 640),
                  margin: 0,
                  fontSize: narrow ? 20 : fw(1.9, 21, 36),
                  lineHeight: 1.3,
                  opacity: textO,
                  transform: `translateY(${(1 - textO) * 16}px)`,
                }}
              >
                {isClimax && <span className="label accent-text" style={{ display: 'block', marginBottom: 8 }}>The climax · First Olympic gold</span>}
                {it.text}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Year index — click to jump */}
      <nav
        aria-label="Timeline years"
        style={{
          position: 'absolute',
          left: pad,
          right: pad,
          bottom: pad + 34,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          ...rise(frame, 10, 20, 10),
        }}
      >
        {timeline.items.map((it, i) => (
          <button
            key={it.year}
            type="button"
            className={`tl-pill ${i === active ? 'is-active' : ''} ${it.climax ? 'is-climax' : ''}`}
            onClick={() => onSeek?.(timelineFrameFor(i))}
            aria-label={`Jump to ${it.year}`}
          >
            {narrow ? short(it.year) : it.year.replace('Early ', '').replace('–2014', '–14')}
          </button>
        ))}
      </nav>

      {!narrow && (
        <div className="label" style={{ position: 'absolute', right: pad, top: pad + 44, opacity: intro }}>
          {String(active + 1).padStart(2, '0')} / {N}
        </div>
      )}
    </Scene>
  );
};
