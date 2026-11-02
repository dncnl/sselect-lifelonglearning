import React from 'react';
import { useCurrentFrame } from 'remotion';
import { biography } from '../content';
import { photos } from '../photos';
import { map, prog, windowed } from '../lib/anim';
import { Cited, Corners, Photo, Scene, SceneProps, useLayout } from './common';

const SEG = 160;
export const BIO_DURATION = SEG * biography.chapters.length;

export const Biography: React.FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { w, narrow, pad, fw, h } = useLayout();
  const active = Math.min(biography.chapters.length - 1, Math.floor(frame / SEG));
  const ch = biography.chapters[active];

  return (
    <Scene tone="dark" label={biography.heading}>
      <h2 className="sr-only">{biography.heading}</h2>
      {biography.chapters.map((c, i) => {
        const f = frame - i * SEG;
        const last = i === biography.chapters.length - 1;
        const vis = i === 0 ? (last ? 1 : 1 - prog(f, SEG - 14, 14)) : last ? prog(f, -6, 18) : windowed(f, -6, SEG, 16);
        if (vis <= 0.001) return null;
        const titleX = map(f, [0, SEG], [w * 0.22, -w * 0.18]);
        const twoStep = narrow;
        const p1 = twoStep ? windowed(f, 26, 92, 14) : prog(f, 28, 24);
        const p2 = twoStep ? prog(f, 88, 20) : prog(f, 46, 24);
        const textOut = last ? 1 : 1 - prog(f, SEG - 22, 14);
        return (
          <section key={c.id} aria-label={c.label} style={{ position: 'absolute', inset: 0, opacity: vis }}>
            <div style={{ position: 'absolute', inset: 0, transform: `scale(${map(f, [-10, SEG], [1.12, 1.0])})` }}>
              <Photo id={c.photo} fill credit={false} />
            </div>
            <div className="shade" />

            <div className="label" style={{ position: 'absolute', left: pad, top: pad + 44, opacity: prog(f, 4, 18) }}>
              Chapter 0{i + 1} · {c.place}
            </div>

            {/* Huge title sliding across the photo */}
            <h3
              className="display"
              style={{
                position: 'absolute',
                left: 0,
                top: narrow ? h * 0.15 : h * 0.16,
                margin: 0,
                whiteSpace: 'nowrap',
                fontSize: narrow ? w * 0.21 : Math.min(w * 0.15, h * 0.26),
                lineHeight: 0.9,
                transform: `translateX(${titleX + pad}px)`,
                opacity: prog(f, 0, 20),
              }}
            >
              <span className="italic">{c.title.italic} </span>
              <span className="caps">{c.title.roman}</span>
            </h3>

            {/* Paragraphs */}
            <div
              style={{
                position: 'absolute',
                left: pad,
                right: narrow ? pad : undefined,
                bottom: pad + 42,
                maxWidth: narrow ? undefined : Math.min(1500, w * 0.86),
                display: 'grid',
                gridTemplateColumns: narrow ? '1fr' : '1fr 1fr',
                gap: narrow ? 0 : 36,
                opacity: textOut,
              }}
            >
              {c.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="body"
                  style={{
                    margin: 0,
                    fontSize: narrow ? 19 : fw(1.75, 20, 32),
                    lineHeight: 1.35,
                    gridRow: narrow ? 1 : undefined,
                    gridColumn: narrow ? 1 : undefined,
                    opacity: j === 0 ? p1 : p2,
                    transform: `translateX(${(1 - (j === 0 ? p1 : p2)) * 80}px)`,
                  }}
                >
                  {j === 0 && <span className="label" style={{ display: 'block', marginBottom: 12, color: 'var(--paper)' }}>{c.label}</span>}
                  <Cited text={p} />
                </p>
              ))}
            </div>
          </section>
        );
      })}

      <Corners tl="Background" tr={`Ch. 02 · ${active + 1}/3`} bl={ch.years} br={ch.source} />
      <div className="photo-credit-float smallcaps" style={{ position: 'absolute', right: pad, left: narrow ? pad : undefined, top: narrow ? pad + 72 : pad + 44, textAlign: narrow ? 'left' : 'right' }}>
        {/* credit of the active photo */}
        <PhotoCredit id={ch.photo} />
      </div>
    </Scene>
  );
};

const PhotoCredit: React.FC<{ id: string }> = ({ id }) => <>{photos[id].credit}</>;
