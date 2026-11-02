import React from 'react';
import { useCurrentFrame } from 'remotion';
import { insights, PLACEHOLDER } from '../content';
import { prog, windowed, wipeUp } from '../lib/anim';
import { Corners, Scene, SceneProps, useLayout } from './common';

const GAP = 80;
const FIRST = 36;
export const INSIGHTS_DURATION = FIRST + GAP * insights.items.length + 40;

/** One member at a time, in big type. */
export const Insights: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { h, narrow, pad, fw } = useLayout();
  const n = insights.items.length;
  const step = Math.max(0, Math.min(n - 1, Math.floor((frame - FIRST) / GAP)));

  return (
    <Scene tone="dark" label={insights.heading}>
      <Corners tl="Personal insights" tr={`Ch. 08 · ${step + 1}/${n}`} bl="BEEd 1-A · 2026" br="Alphabetical by surname" />
      <div style={{ position: 'absolute', inset: `${pad + 52}px ${pad}px ${pad + 44}px`, display: 'flex', flexDirection: 'column' }}>
        <h2 className="display" style={{ margin: '0 0 2vh', fontSize: narrow ? 30 : Math.min(fw(3, 34, 60), h * 0.07), lineHeight: 0.95 }}>
          <span className="italic" style={wipeUp(frame, 0)}>Personal</span>{' '}
          <span className="caps" style={wipeUp(frame, 10)}>Insights</span>
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1, position: 'relative' }}>
          {insights.items.map((m, i) => {
            const s = FIRST + i * GAP;
            const placeholder = m.text === PLACEHOLDER;
            const on = i === n - 1 ? prog(frame, s, 20) : windowed(frame, s, s + GAP + 4, 14);
            if (on <= 0.001) return null;
            const [first, ...rest] = m.name.split(' ');
            const surname = rest.pop() ?? '';
            const long = m.text.length > 300;
            return (
              <li
                key={m.name}
                className={`insight ${placeholder ? 'insight--placeholder' : ''}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  maxWidth: 1300,
                  opacity: on,
                  transform: `translateY(${(1 - prog(frame, s, 24)) * 34}px)`,
                }}
              >
                <div className="label" style={{ marginBottom: 14 }}>
                  <span className="accent-text">0{i + 1}</span> · Personal insight
                  {placeholder && <span className="ph-tag">Placeholder · edit in content.ts</span>}
                </div>
                <h3 className="display" style={{ margin: '0 0 3vh', fontSize: narrow ? 36 : Math.min(fw(4.6, 44, 96), h * 0.11), lineHeight: 1 }}>
                  <span className="italic">{[first, ...rest].join(' ')}</span> <span className="caps">{surname}</span>
                </h3>
                <p
                  className={placeholder ? 'serif italic' : 'serif'}
                  style={{
                    margin: 0,
                    lineHeight: 1.35,
                    fontSize: narrow ? (long ? 18 : 22) : long ? Math.min(fw(1.75, 20, 34), h * 0.034) : fw(2.4, 24, 44),
                  }}
                >
                  {m.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Scene>
  );
};
