import React from 'react';
import { useCurrentFrame } from 'remotion';
import { intro } from '../content';
import { prog, rise, wipeUp, windowed } from '../lib/anim';
import { Cited, Corners, Photo, Scene, SceneProps, Words, useLayout } from './common';

export const INTRO_DURATION = 270;

export const Intro: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { w, h, narrow, compact, pad, fw } = useLayout();

  const a = windowed(frame, 0, 105, 18); // heading + lead
  const b = windowed(frame, 95, 185, 16); // pull quote
  const c = prog(frame, 180, 22); // relevance

  const headSize = narrow ? fw(16, 54, 90) : Math.min(fw(9.5, 80, 170), h * 0.2);
  const inner = { position: 'absolute' as const, left: pad, right: pad, top: pad + 50, bottom: pad + 40 };

  return (
    <Scene tone="light" label="Introduction">
      <Corners tl="Introduction" tr="Ch. 01" bl="2026" br={intro.source} />

      {/* Phase A — heading + lead */}
      <div style={{ ...inner, opacity: a, display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 24 : 60, alignItems: compact ? 'flex-start' : 'center', justifyContent: 'center' }}>
        <h2 className="display" style={{ margin: 0, fontSize: headSize, lineHeight: 0.86, flex: compact ? undefined : '1.25' }}>
          <span className="italic" style={{ display: 'block', ...wipeUp(frame, 4) }}>{intro.heading.italic}</span>
          <span className="caps" style={{ display: 'block', ...wipeUp(frame, 14) }}>Hidilyn</span>
          <span className="caps" style={{ display: 'block', ...wipeUp(frame, 22) }}>
            Diaz<span className="accent-text">?</span>
          </span>
        </h2>
        <p className="body" style={{ margin: 0, flex: compact ? undefined : '1', maxWidth: 760, fontSize: narrow ? 20 : fw(1.9, 21, 36), lineHeight: 1.35, ...rise(frame, 34) }}>
          <span className="label" style={{ display: 'block', marginBottom: 14 }}>The first Filipino Olympic gold medalist</span>
          <Cited text={intro.lead} />
        </p>
      </div>

      {/* Phase B — oversized italic pull-quote */}
      <blockquote
        className="serif italic"
        style={{
          ...inner,
          margin: 0,
          opacity: b,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: narrow ? fw(11, 38, 56) : Math.min(fw(6.6, 60, 130), h * 0.15),
          lineHeight: 1.05,
          maxWidth: 1250,
          marginInline: 'auto',
        }}
      >
        <span className="display accent-text" aria-hidden="true" style={{ fontSize: '2.6em', lineHeight: 0.6, height: '0.55em' }}>“</span>
        <span>
          <Words text={intro.pullQuote} start={100} end={150} dim={0.1} accentWords={['inside', 'classroom']} />
        </span>
      </blockquote>

      {/* Phase C — relevance to BEEd */}
      <div
        style={{
          ...inner,
          opacity: c,
          display: 'flex',
          flexDirection: narrow ? 'column' : 'row',
          gap: narrow ? 18 : 56,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Photo
          id={intro.photo}
          style={{
            width: narrow ? '100%' : Math.min(w * 0.3, 420),
            height: narrow ? h * 0.24 : h * 0.62,
            flexShrink: 0,
            transform: `translateY(${(1 - c) * 30}px)`,
          }}
        />
        <div style={{ maxWidth: 620, ...rise(frame, 190) }}>
          <h3 className="label" style={{ margin: '0 0 16px' }}>For us, as future BEEd teachers</h3>
          <p className="body" style={{ margin: 0, fontSize: narrow ? 19 : fw(1.8, 20, 34), lineHeight: 1.35 }}>
            <Cited text={intro.relevance} />
          </p>
        </div>
      </div>
    </Scene>
  );
};
