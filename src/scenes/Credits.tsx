import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { meta, references } from '../content';
import { photoCredits } from '../photos';
import { prog } from '../lib/anim';
import { Corners, Logo, Scene, SceneProps, useLayout, usePanY } from './common';

export const CREDITS_DURATION = 660;

export const ReferenceItem: React.FC<{ r: (typeof references)[number] }> = ({ r }) => (
  <li className="ref">
    {r.author} ({r.date}). <i>{r.title}</i>.{r.source ? ` ${r.source}.` : ''}{' '}
    <a href={r.url} target="_blank" rel="noopener noreferrer">
      {r.url}
    </a>
  </li>
);

export const PhotoCreditList: React.FC = () => (
  <ul className="refs">
    {photoCredits.map((p) => (
      <li key={p.file} className="ref">
        <i>{p.caption}</i>. {p.credit.replace('Photo: ', '')}.{' '}
        <a href={p.source} target="_blank" rel="noopener noreferrer">
          {p.source}
        </a>
      </li>
    ))}
  </ul>
);

export const Credits: React.FC<SceneProps> = ({ reduced }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { h, narrow, pad, fw } = useLayout();
  const pan = usePanY(0, durationInFrames - 40, true);
  // Roll from below the screen to the end of the list.
  const y = reduced
    ? 0
    : interpolate(frame, [0, durationInFrames - 40], [h * 0.75, -pan.overflow - h * 0.12], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return (
    <Scene tone="dark" className="scene--void" label="End credits and references">
      <Corners tl="End credits" tr="Ch. 10" bl={meta.date} br="APA 7th edition" opacity={0.9} />
      <div
        style={{ position: 'absolute', inset: 0, overflowY: reduced ? 'auto' : 'hidden', maskImage: reduced ? undefined : 'linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%)', WebkitMaskImage: reduced ? undefined : 'linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%)' }}
      >
        <div ref={pan.ref} className="credits" style={{ transform: `translate3d(0, ${y}px, 0)`, padding: `${pad * 2}px ${pad}px`, opacity: prog(frame, 0, 20) }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
            <Logo size={narrow ? 48 : 64} />
          </div>
          <p className="label">A group narrative</p>
          <h2 className="display" style={{ fontSize: narrow ? 34 : fw(3.6, 40, 70), margin: '10px 0 60px', lineHeight: 1 }}>
            <span className="italic">Modelling a</span> <span className="caps">Lifelong Learner</span>
          </h2>

          <dl className="credits__dl">
            <dt className="label">Group members</dt>
            {meta.members.map((m) => (
              <dd key={m} className="display credits__name">{m}</dd>
            ))}
            <dt className="label">Course / Section</dt>
            <dd className="serif credits__line">{meta.course}</dd>
            <dt className="label">Instructor</dt>
            <dd className="serif credits__line">{meta.instructor}</dd>
            <dt className="label">Date</dt>
            <dd className="serif credits__line">{meta.date}</dd>
          </dl>

          <h3 className="display" style={{ fontSize: narrow ? 30 : fw(2.8, 32, 52), margin: '90px 0 30px' }}>
            <span className="italic">References</span>
          </h3>
          <ol className="refs refs--credits">
            {references.map((r) => (
              <ReferenceItem key={r.url} r={r} />
            ))}
          </ol>
          <h3 className="display" style={{ fontSize: narrow ? 24 : fw(1.8, 24, 36), margin: '60px 0 20px' }}>
            <span className="italic">Photo credits</span>
          </h3>
          <PhotoCreditList />
          <p className="label" style={{ marginTop: 60 }}>Angeles University Foundation · College of Education</p>
        </div>
      </div>
    </Scene>
  );
};
