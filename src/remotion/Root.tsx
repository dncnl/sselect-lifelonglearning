import React from 'react';
import { AbsoluteFill, Composition, Series } from 'remotion';
import { FPS, scenes } from '../scenes/registry';
import { RenderGrain } from '../scenes/common';
import '../styles/global.css';

const W = 1920;
const H = 1080;
const total = scenes.reduce((a, s) => a + s.durationInFrames, 0);

/** Every scene back-to-back, with film grain — exported by `npm run render`. */
const FullPresentation: React.FC = () => (
  <AbsoluteFill style={{ background: 'var(--ink)' }}>
    <Series>
      {scenes.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.durationInFrames}>
          <s.component mode="render" />
        </Series.Sequence>
      ))}
    </Series>
    <RenderGrain />
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="FullPresentation" component={FullPresentation} durationInFrames={total} fps={FPS} width={W} height={H} />
    {scenes.map((s) => (
      <Composition
        key={s.id}
        id={s.compId}
        component={s.component}
        durationInFrames={s.durationInFrames}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{ mode: 'render' as const }}
      />
    ))}
  </>
);
