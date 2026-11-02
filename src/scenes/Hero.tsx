import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { meta } from '../content';
import { map, prog, rise, wipeUp } from '../lib/anim';
import { Corners, Logo, Photo, Scene, SceneProps, useLayout } from './common';

export const HERO_DURATION = 180;

export const Hero: React.FC<SceneProps> = ({ mode }) => {
  const frame = useCurrentFrame();
  const { w, h, narrow, pad, fw } = useLayout();
  const kicker = meta.kicker.toUpperCase();

  // Phase 1: tracked letters, centred. Phase 2: they rise to the top as the portrait arrives.
  const settle = prog(frame, 48, 34);
  const kickerSize = narrow ? fw(4.4, 13, 22) : fw(1.5, 14, 26);
  const kickerY = interpolate(settle, [0, 1], [h * 0.47, narrow ? pad + 44 : pad + 52]);

  const photoP = prog(frame, 50, 50);
  const photoW = narrow ? w * 0.74 : Math.min(w * 0.34, h * 0.56);
  const photoH = narrow ? h * 0.52 : h * 0.65;

  const diazSize = narrow ? w * 0.36 : Math.min(w * 0.3, h * 0.5);
  const hidSize = narrow ? w * 0.2 : Math.min(w * 0.12, h * 0.2);

  return (
    <Scene tone="dark" label="Opening title">
      <Corners
        start={60}
        tl={
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo size={narrow ? 26 : 34} />
            {!narrow && <span>{meta.courseShort}</span>}
          </span>
        }
        tr="No. 00 · Opening"
        bl="1991 — 2026"
        br={narrow ? 'Group narrative' : 'A group narrative · College of Education'}
      />

      <h1 className="sr-only">
        {meta.kicker}: {meta.firstName} {meta.lastName}. {meta.subtitle}
      </h1>

      {/* Tracked kicker letters */}
      <div
        aria-hidden="true"
        className="display"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: kickerY,
          textAlign: 'center',
          fontSize: kickerSize,
          letterSpacing: `${interpolate(frame, [0, 70], [0.9, 0.32], { extrapolateRight: 'clamp' })}em`,
          zIndex: 4,
          padding: `0 ${pad}px`,
          lineHeight: 1.6,
        }}
      >
        {kicker.split('').map((c, i) => (
          <span key={i} style={{ opacity: prog(frame, 4 + i * 1.4, 16) }}>
            {c}
          </span>
        ))}
      </div>

      {/* DIAZ behind the portrait */}
      <div
        aria-hidden="true"
        className="display caps"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: narrow ? h * 0.62 : h * 0.36,
          textAlign: 'center',
          fontSize: diazSize,
          lineHeight: 0.8,
          letterSpacing: '-0.02em',
          zIndex: narrow ? 3 : 1,
          textShadow: narrow ? '0 6px 40px rgba(0,0,0,.5)' : undefined,
          ...wipeUp(frame, 70, 34),
          color: 'var(--paper)',
        }}
      >
        {meta.lastName}
      </div>

      {/* Portrait */}
      <div
        style={{
          position: 'absolute',
          left: (w - photoW) / 2,
          top: narrow ? h * 0.2 : h * 0.17,
          width: photoW,
          height: photoH,
          zIndex: 2,
          opacity: photoP,
          transform: `scale(${map(frame, [50, 180], [1.08, 1])})`,
          clipPath: `inset(${(1 - photoP) * 50}% 0 ${(1 - photoP) * 50}% 0)`,
        }}
      >
        <Photo id="gold2021" fill />
      </div>

      {/* Hidilyn, italic, over the portrait */}
      <div
        aria-hidden="true"
        className="display italic"
        style={{
          position: 'absolute',
          left: narrow ? pad : w * 0.5 - photoW * 0.95,
          top: narrow ? h * 0.36 : h * 0.3,
          fontSize: hidSize,
          lineHeight: 1,
          zIndex: 3,
          ...rise(frame, 84, 30, 60),
          textShadow: '0 4px 40px rgba(0,0,0,.45)',
        }}
      >
        {meta.firstName}
      </div>

      {/* Subtitle */}
      <p
        className="serif italic"
        style={{
          position: 'absolute',
          left: pad,
          right: pad,
          bottom: narrow ? pad + 54 : pad + 44,
          margin: 0,
          textAlign: 'center',
          fontSize: narrow ? fw(5, 18, 24) : fw(1.9, 20, 32),
          lineHeight: 1.25,
          zIndex: 4,
          ...rise(frame, 116, 30, 24),
        }}
      >
        {meta.subtitle}
      </p>

      {mode === 'scroll' && (
        <div
          className="label scroll-hint"
          style={{ position: 'absolute', left: 0, right: 0, bottom: pad + 6, textAlign: 'center', opacity: 1 - prog(frame, 10, 20) }}
        >
          Scroll to begin ↓
        </div>
      )}
    </Scene>
  );
};
