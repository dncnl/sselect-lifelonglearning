import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { numbers } from '../content';
import { ease, prog, wipeUp } from '../lib/anim';
import { Corners, Scene, SceneProps, useLayout } from './common';

export const NUMBERS_DURATION = 230;

export const Numbers: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { h, narrow, compact, pad, fw } = useLayout();
  const cols = narrow ? 2 : 3;
  const numSize = narrow ? fw(17, 54, 84) : Math.min(fw(8, 80, 150), h * 0.17);

  return (
    <Scene tone="dark" label="By the numbers">
      <Corners tl="Interlude" tr="Ch. 06" bl="1991 — 2026" br="Montalvan, 2021; Daily Tribune, 2023; Basco, 2016" />
      <div style={{ position: 'absolute', inset: `${pad + 52}px ${pad}px ${pad + 46}px`, display: 'flex', flexDirection: 'column' }}>
        <h2 className="display" style={{ margin: '0 0 3vh', fontSize: narrow ? 34 : fw(3.6, 40, 66), lineHeight: 1 }}>
          <span className="italic" style={wipeUp(frame, 0)}>{numbers.heading.italic}</span>{' '}
          <span className="caps" style={wipeUp(frame, 8)}>{numbers.heading.roman}</span>
        </h2>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            flex: 1,
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridAutoRows: '1fr',
            columnGap: compact ? 18 : 40,
          }}
        >
          {numbers.items.map((n, i) => {
            const start = 18 + i * 16;
            const s = spring({ frame: frame - start, fps, config: { damping: 200 }, durationInFrames: 50 });
            const v = Math.round(interpolate(ease(prog(frame, start, 48, (t) => t)), [0, 1], [0, n.value]));
            const on = prog(frame, start, 20);
            return (
              <li
                key={i}
                style={{
                  borderTop: '1px solid var(--rule)',
                  paddingTop: narrow ? 10 : 18,
                  opacity: on,
                  transform: `translateY(${(1 - s) * 30}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: 0,
                }}
              >
                <span
                  className={`display ${n.accent ? 'accent-num' : ''}`}
                  aria-label={`${n.prefix}${n.value}${n.suffix}`}
                  style={{ fontSize: numSize, lineHeight: 0.92, fontVariantNumeric: 'lining-nums tabular-nums' }}
                >
                  {n.prefix && <span style={{ fontSize: '0.55em', verticalAlign: '0.5em' }}>{n.prefix}</span>}
                  {v}
                  {n.suffix && <span className="italic" style={{ fontSize: '0.5em' }}>{n.suffix}</span>}
                </span>
                <span className="body" style={{ fontSize: narrow ? 16 : fw(1.6, 18, 30), marginTop: 8, lineHeight: 1.3 }}>
                  {n.label} <cite className="cite">{n.cite}</cite>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Scene>
  );
};
