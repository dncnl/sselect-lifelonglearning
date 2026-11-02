import React, { useState } from 'react';
import { useCurrentFrame } from 'remotion';
import { qualities } from '../content';
import { prog, rise, windowed, wipeUp } from '../lib/anim';
import { Cited, Corners, Photo, Scene, SceneProps, useLayout } from './common';

const SEG = 180;
const WHY_AT = 96;
const SUMMARY = SEG * qualities.items.length;
export const QUALITIES_DURATION = SUMMARY + 170;

type Override = 'open' | 'closed' | undefined;

export const Qualities: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { h, narrow, compact, pad, fw } = useLayout();
  const [override, setOverride] = useState<Record<number, Override>>({});
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [sheet, setSheet] = useState<number | null>(null);

  const inSummary = frame >= SUMMARY - 10;
  const active = Math.min(qualities.items.length - 1, Math.floor(frame / SEG));
  const q = qualities.items[active];

  const toggleFlip = (i: number) =>
    setFlipped((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <Scene tone="light" label={qualities.heading}>
      <h2 className="sr-only">{qualities.heading}</h2>
      <Corners
        tl="Lifelong learner qualities"
        tr={inSummary ? 'Ch. 05 · Summary' : `Ch. 05 · ${q.num}/04`}
        bl={inSummary ? '1991 – 2026' : q.years}
        br={inSummary ? 'Tap a card to flip' : q.source}
      />

      {qualities.items.map((it, i) => {
        const f = frame - i * SEG;
        const vis = windowed(f, i === 0 ? -20 : 0, SEG, 16);
        if (vis <= 0.001) return null;
        const ov = override[i];
        const auto = prog(f, WHY_AT, 26);
        const whyP = ov === 'open' ? 1 : ov === 'closed' ? 0 : auto;
        const isOpen = whyP > 0.5;
        const numSize = narrow ? fw(26, 90, 130) : Math.min(fw(15, 150, 280), h * 0.36);
        return (
          <article
            key={it.num}
            aria-label={`Quality ${it.num}: ${it.title}`}
            style={{
              position: 'absolute',
              inset: `${pad + 52}px ${pad}px ${pad + 44}px`,
              opacity: vis,
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr' : compact ? '1fr 1.2fr' : '1fr 1.15fr 0.62fr',
              gridTemplateRows: narrow ? 'auto 1fr' : '1fr',
              gap: narrow ? 14 : compact ? 32 : 48,
            }}
          >
            {/* Number + title */}
            <header style={{ display: 'flex', flexDirection: 'column', justifyContent: narrow ? 'flex-start' : 'center' }}>
              <span className="display italic accent-num" aria-hidden="true" style={{ fontSize: numSize, lineHeight: 0.8, ...wipeUp(f, 0, 30) }}>
                {it.num}
              </span>
              <h3 className="display" style={{ margin: narrow ? '6px 0 0' : '18px 0 0', fontSize: narrow ? fw(8.6, 28, 40) : fw(3.3, 34, 62), lineHeight: 0.98 }}>
                <span className="italic" style={{ display: 'block', ...wipeUp(f, 8) }}>{it.titleItalic}</span>
                <span className="caps" style={{ display: 'block', fontSize: '0.52em', letterSpacing: '0.06em', lineHeight: 1.25, marginTop: 6, ...wipeUp(f, 16) }}>
                  {it.titleRoman}
                </span>
              </h3>
            </header>

            {/* Evidence + why */}
            <div style={{ position: 'relative', alignSelf: narrow ? 'stretch' : 'center', minHeight: narrow ? 0 : h * 0.5 }}>
              <div style={{ ...rise(f, 24), opacity: prog(f, 24, 22) * (1 - whyP * 0.92), display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div className="label" style={{ marginBottom: 14 }}>Evidence</div>
                {it.evidence.map((p, j) => (
                  <p key={j} className="body" style={{ margin: '0 0 0.8em', fontSize: narrow ? 18 : fw(1.65, 19, 30), lineHeight: 1.35 }}>
                    <Cited text={p} />
                  </p>
                ))}
                <button
                  type="button"
                  className="why-btn"
                  aria-expanded={isOpen}
                  onClick={() => setOverride((o) => ({ ...o, [i]: 'open' }))}
                  style={{ opacity: prog(f, 40, 16), pointerEvents: isOpen ? 'none' : 'auto' }}
                >
                  {qualities.whyLabel} <span aria-hidden="true">+</span>
                </button>
              </div>

              <div
                className="why-panel"
                role="region"
                aria-label={qualities.whyLabel}
                aria-hidden={!isOpen}
                style={{
                  clipPath: `inset(${(1 - whyP) * 100}% 0 0 0)`,
                  transition: ov ? 'clip-path .6s cubic-bezier(.22,1,.36,1)' : undefined,
                }}
              >
                <div className="label" style={{ color: 'var(--accent-bright)', marginBottom: 16 }}>{qualities.whyLabel}</div>
                <p className="serif" style={{ margin: 0, fontSize: narrow ? 23 : fw(2.4, 24, 46), lineHeight: 1.25 }}>
                  <Cited text={it.why} />
                </p>
                <button
                  type="button"
                  className="why-btn why-btn--back"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setOverride((o) => ({ ...o, [i]: 'closed' }))}
                >
                  <span aria-hidden="true">←</span> Back to evidence
                </button>
              </div>
            </div>

            {!compact && (
              <div style={{ alignSelf: 'center', height: h * 0.62, clipPath: `inset(${(1 - prog(f, 10, 34)) * 100}% 0 0 0)` }}>
                <Photo id={it.photo} style={{ height: '100%' }} />
              </div>
            )}
          </article>
        );
      })}

      {/* Summary — four flip cards */}
      {inSummary && (
        <div
          style={{
            position: 'absolute',
            inset: `${pad + 52}px ${pad}px ${pad + 44}px`,
            opacity: prog(frame, SUMMARY, 18),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 className="display" style={{ margin: '0 0 22px', fontSize: narrow ? 28 : fw(2.8, 32, 54), lineHeight: 1 }}>
            <span className="italic">Four qualities</span> <span className="caps" style={{ fontSize: '0.55em', letterSpacing: '0.1em' }}>of a lifelong learner</span>
          </h3>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: narrow ? '1fr 1fr' : compact ? '1fr 1fr' : 'repeat(4, 1fr)', gap: narrow ? 12 : 20 }}>
            {qualities.items.map((it, i) => {
              const on = prog(frame, SUMMARY + 10 + i * 12, 24);
              const isF = flipped.has(i);
              return (
                <button
                  key={it.num}
                  type="button"
                  className={`flip ${isF && !narrow ? 'is-flipped' : ''}`}
                  aria-pressed={narrow ? undefined : isF}
                  aria-label={`${it.num} ${it.title}. ${narrow ? 'Open' : isF ? 'Show title' : 'Show'} why this shows lifelong learning`}
                  onClick={() => (narrow ? setSheet(i) : toggleFlip(i))}
                  style={{ opacity: on, transform: `translateY(${(1 - on) * 40}px)` }}
                >
                  <span className="flip__inner">
                    <span className="flip__face flip__front">
                      <span className="display italic accent-num" style={{ fontSize: narrow ? 46 : fw(4.8, 54, 96), lineHeight: 0.9 }}>{it.num}</span>
                      <span className="display" style={{ fontSize: narrow ? 19 : fw(1.9, 20, 34), lineHeight: 1.12, textAlign: 'left' }}>{it.title}</span>
                      <span className="label">{narrow ? 'Tap to read why' : 'Click to flip ↻'}</span>
                    </span>
                    {!narrow && (
                      <span className="flip__face flip__back">
                        <span className="label" style={{ color: 'var(--accent-bright)' }}>{qualities.whyLabel}</span>
                        <span className="serif" style={{ fontSize: fw(1.65, 18, 30), lineHeight: 1.28, textAlign: 'left' }}>
                          <Cited text={it.why} />
                        </span>
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sheet !== null && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label={qualities.whyLabel} style={{ padding: pad + 8 }}>
          <span className="display italic accent-num" style={{ fontSize: 72, lineHeight: 0.9 }}>{qualities.items[sheet].num}</span>
          <h4 className="display" style={{ fontSize: 26, margin: '8px 0 18px', lineHeight: 1.1 }}>{qualities.items[sheet].title}</h4>
          <div className="label" style={{ color: 'var(--accent-bright)', marginBottom: 12 }}>{qualities.whyLabel}</div>
          <p className="serif" style={{ fontSize: 20, lineHeight: 1.32, margin: 0 }}>
            <Cited text={qualities.items[sheet].why} />
          </p>
          <button type="button" className="why-btn why-btn--back" onClick={() => setSheet(null)} autoFocus>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
    </Scene>
  );
};
