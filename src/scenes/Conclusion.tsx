import React from 'react';
import { useCurrentFrame } from 'remotion';
import { conclusion } from '../content';
import { map, prog, windowed } from '../lib/anim';
import { Corners, Photo, Scene, SceneProps, useLayout } from './common';

const sentences = conclusion.text.match(/[^.]+\./g)!.map((s) => s.trim());
const SEG = 66;
export const CONCLUSION_DURATION = SEG * sentences.length + 60;

export const Conclusion: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { w, h, narrow, pad, fw } = useLayout();
  const last = sentences.length - 1;

  return (
    <Scene tone="dark" className="scene--void" label={conclusion.heading}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.22 * prog(frame, 0, 60), transform: `scale(${map(frame, [0, CONCLUSION_DURATION], [1.15, 1])})` }}>
        <Photo id="silver2016" fill credit={false} />
      </div>
      <div className="shade shade--full" />
      <Corners tl="Conclusion" tr="Ch. 09" bl="2026 —" br="Fin." opacity={0.8} />
      <h2 className="sr-only">{conclusion.heading}</h2>
      <div className="sr-only">{conclusion.text}</div>

      {sentences.map((s, i) => {
        const start = i * SEG;
        const o = i === last ? prog(frame, start, 34) : windowed(frame, start, start + SEG + 6, 24);
        if (o <= 0.001) return null;
        const isLast = i === last;
        return (
          <p
            key={i}
            aria-hidden="true"
            className={isLast ? 'display italic' : 'serif'}
            style={{
              position: 'absolute',
              left: narrow ? pad : w * 0.14,
              right: narrow ? pad : w * 0.14,
              top: 0,
              bottom: 0,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: isLast ? (narrow ? fw(8.4, 28, 42) : Math.min(fw(4.6, 44, 88), h * 0.1)) : narrow ? fw(6.4, 22, 32) : Math.min(fw(3, 30, 56), h * 0.07),
              lineHeight: 1.2,
              opacity: o,
              letterSpacing: `${map(frame - start, [0, SEG], [0.02, 0])}em`,
              transform: `translateY(${(1 - prog(frame, start, 40)) * 20}px)`,
            }}
          >
            {s}
          </p>
        );
      })}

      <div className="label" style={{ position: 'absolute', left: 0, right: 0, bottom: pad + 50, textAlign: 'center', opacity: prog(frame, last * SEG + 40, 30) }}>
        — Keep learning —
      </div>
    </Scene>
  );
};
