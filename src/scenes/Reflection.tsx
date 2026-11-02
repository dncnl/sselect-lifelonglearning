import React from 'react';
import { useCurrentFrame } from 'remotion';
import { reflection } from '../content';
import { prog, rise, windowed, wipeUp } from '../lib/anim';
import { Corners, Scene, SceneProps, useLayout } from './common';

export const REFLECTION_DURATION = 390;
const STARTS = [50, 160, 270];

export const Reflection: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { h, compact, narrow, pad, fw } = useLayout();
  const stacked = compact; // one essay at a time on tablets / phones
  const step = stacked ? Math.min(2, frame < STARTS[1] ? 0 : frame < STARTS[2] ? 1 : 2) : -1;

  return (
    <Scene tone="light" label={reflection.heading}>
      <Corners tl="Group reflection" tr="Ch. 07" bl="BEEd 1-A · 2026" br="Our words" />
      <div style={{ position: 'absolute', inset: `${pad + 52}px ${pad}px ${pad + 44}px`, display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', alignItems: narrow ? 'flex-start' : 'flex-end', gap: narrow ? 10 : 40, borderBottom: '2px solid var(--ink)', paddingBottom: 18, marginBottom: narrow ? 18 : 30 }}>
          <h2 className="display" style={{ margin: 0, fontSize: narrow ? 36 : Math.min(fw(5.4, 50, 100), h * 0.12), lineHeight: 0.9 }}>
            <span className="italic" style={wipeUp(frame, 0)}>Our Group’s</span>{' '}
            <span className="caps" style={wipeUp(frame, 10)}>Reflection</span>
          </h2>
          <p className="serif italic" style={{ margin: 0, fontSize: narrow ? 18 : fw(1.6, 20, 28), lineHeight: 1.2, maxWidth: 520, ...rise(frame, 22) }}>
            {reflection.intro}
          </p>
        </header>

        <div style={{ flex: 1, position: 'relative', display: stacked ? 'block' : 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 44 }}>
          {reflection.items.map((r, i) => {
            const s = STARTS[i];
            const on = stacked
              ? i === 2
                ? prog(frame, s, 22)
                : windowed(frame, s, STARTS[i + 1] + 4, 16)
              : prog(frame, s, 26);
            const words = r.body.split(' ');
            const first = words[0];
            return (
              <section
                key={r.num}
                className="essay"
                style={{
                  position: stacked ? 'absolute' : 'relative',
                  inset: stacked ? 0 : undefined,
                  opacity: on,
                  transform: `translateY(${(1 - prog(frame, s, 26)) * 30}px)`,
                  borderLeft: !stacked && i > 0 ? '1px solid var(--rule)' : undefined,
                  paddingLeft: !stacked && i > 0 ? 44 : 0,
                  marginLeft: !stacked && i > 0 ? -44 : 0,
                }}
                aria-hidden={stacked && step !== i ? true : undefined}
              >
                <div className="label" style={{ marginBottom: 10 }}>
                  <span className="accent-text">No. {r.num}</span> · Lesson
                </div>
                <h3 className="display" style={{ margin: '0 0 16px', fontSize: narrow ? 30 : fw(2.4, 28, 46), lineHeight: 1.06 }}>{r.title}</h3>
                <p className="body essay__body" style={{ margin: 0, fontSize: narrow ? 20 : fw(1.7, 20, 32), lineHeight: 1.4 }}>
                  <span className="dropcap" aria-hidden="true">{first.charAt(0)}</span>
                  <span className="sr-only">{first.charAt(0)}</span>
                  {first.slice(1)} {words.slice(1).join(' ')}
                </p>
              </section>
            );
          })}
        </div>
        {stacked && (
          <div className="label" style={{ display: 'flex', gap: 14, marginTop: 10 }} aria-hidden="true">
            {reflection.items.map((r, i) => (
              <span key={r.num} style={{ opacity: i === step ? 1 : 0.35 }}>
                {r.num}
              </span>
            ))}
          </div>
        )}
      </div>
    </Scene>
  );
};
