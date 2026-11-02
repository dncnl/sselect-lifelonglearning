import React from 'react';
import { useCurrentFrame } from 'remotion';
import { challenge } from '../content';
import { prog, rise, windowed, wipeUp } from '../lib/anim';
import { Cited, Corners, Scene, SceneProps, Words, useLayout, usePanY } from './common';

// Timing
const LINES_START = 46;
const LINE_GAP = 40;
const OVER_START = 250;
const CARD_GAP = 46;
const CLOSE_START = 470;
export const CHALLENGE_DURATION = 600;

export const Challenge: React.FC<SceneProps> = ({ reduced }) => {
  const frame = useCurrentFrame();
  const { w, h, narrow, compact, pad, fw } = useLayout();

  const phaseA = windowed(frame, 0, OVER_START, 18);
  const phaseB = windowed(frame, OVER_START - 6, CLOSE_START, 18);
  const phaseC = prog(frame, CLOSE_START - 4, 24);

  const pan = usePanY(LINES_START + 20, LINES_START + LINE_GAP * 4 + 10, reduced, h - (pad + 60) * 2);

  const lineSize = narrow ? 21 : fw(2.5, 22, 46);

  return (
    <Scene tone="dark" className="scene--void" label={`${challenge.heading}: ${challenge.subheading}`}>
      <Corners tl="Most significant challenge" tr="Ch. 04" bl="Mampang · 2000s" br="Basco, 2016; Montalvan, 2021" />

      {/* Phase A — title + the challenge, line by line */}
      <div style={{ position: 'absolute', inset: `${pad + 56}px ${pad}px ${pad + 50}px`, opacity: phaseA, overflow: reduced ? 'auto' : 'hidden' }}>
        <div ref={pan.ref} style={{ transform: `translateY(${pan.y}px)`, display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 26 : 70 }}>
          <div style={{ flex: compact ? undefined : '0 0 34%' }}>
            <div className="label" style={{ marginBottom: 18, ...rise(frame, 0, 18, 10) }}>{challenge.heading}</div>
            <h2 className="display" style={{ margin: 0, fontSize: narrow ? fw(11, 38, 56) : fw(5, 54, 92), lineHeight: 0.92 }}>
              <span className="italic" style={{ display: 'block', ...wipeUp(frame, 4) }}>Poverty</span>
              <span className="caps" style={{ display: 'block', fontSize: '0.5em', letterSpacing: '0.04em', lineHeight: 1.1, ...wipeUp(frame, 14) }}>
                and Limited Training Resources
              </span>
            </h2>
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="label" style={{ margin: '0 0 22px', ...rise(frame, 34, 16, 10) }}>{challenge.challengeTitle}</h3>
            {challenge.challengeLines.map((l, i) => {
              const s = LINES_START + i * LINE_GAP;
              const on = prog(frame, s, 22);
              const dimmed = i < 3 ? 1 - prog(frame, s + LINE_GAP + 6, 18) * 0.62 : 1;
              return (
                <p
                  key={i}
                  className="serif"
                  style={{
                    margin: '0 0 0.7em',
                    fontSize: lineSize,
                    lineHeight: 1.3,
                    opacity: on * dimmed,
                    transform: `translateY(${(1 - on) * 24}px)`,
                  }}
                >
                  <Cited text={l} />
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase B — How she overcame it, one card at a time */}
      <div style={{ position: 'absolute', inset: `${pad + 56}px ${pad}px ${pad + 50}px`, opacity: phaseB, display: 'flex', flexDirection: 'column' }}>
        <h3 className="display" style={{ margin: '0 0 24px', fontSize: narrow ? 32 : fw(3.4, 36, 60), lineHeight: 1 }}>
          <span className="italic" style={wipeUp(frame, OVER_START)}>How she</span>{' '}
          <span className="caps" style={wipeUp(frame, OVER_START + 8)}>overcame it</span>
        </h3>
        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            flex: 1,
            position: 'relative',
            display: narrow ? 'block' : 'grid',
            gridTemplateColumns: compact ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: compact ? 18 : 22,
            alignContent: 'center',
          }}
        >
          {challenge.overcome.map((c, i) => {
            const s = OVER_START + 20 + i * CARD_GAP;
            const on = prog(frame, s, 24);
            // On phones each card replaces the previous one.
            const o = narrow ? (i === 3 ? on : Math.min(on, 1 - prog(frame, s + CARD_GAP - 4, 12))) : on;
            return (
              <li
                key={i}
                className="ov-card"
                style={{
                  position: narrow ? 'absolute' : 'relative',
                  inset: narrow ? 0 : undefined,
                  opacity: o,
                  transform: `translateY(${(1 - on) * 50}px)`,
                }}
              >
                <span className="display italic accent-num" style={{ fontSize: narrow ? 64 : fw(4.4, 48, 84), lineHeight: 0.9 }}>
                  {i + 1}
                </span>
                <h4 className="display" style={{ margin: '14px 0 10px', fontSize: narrow ? 26 : fw(2.1, 24, 40), lineHeight: 1.12 }}>{c.title}</h4>
                <p className="body" style={{ margin: 0, fontSize: narrow ? 19 : fw(1.5, 18, 28), lineHeight: 1.35 }}>
                  <Cited text={c.text} />
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Phase C — full-screen italic statement */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${narrow ? pad : w * 0.1}px`,
          opacity: phaseC,
        }}
      >
        <p className="display italic" style={{ margin: 0, textAlign: 'center', fontSize: narrow ? fw(7.6, 26, 40) : Math.min(fw(4.6, 40, 86), h * 0.085), lineHeight: 1.12 }}>
          <Words text={challenge.closing} start={CLOSE_START + 4} end={CLOSE_START + 90} dim={0.08} accentWords={['gold', 'Tokyo']} />
        </p>
      </div>
    </Scene>
  );
};
