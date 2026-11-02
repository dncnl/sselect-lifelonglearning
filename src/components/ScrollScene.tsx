import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import type { SceneDef } from '../scenes/registry';
import { FPS } from '../scenes/registry';
import { scrollToY, Viewport } from '../lib/site';

type Props = { scene: SceneDef; vp: Viewport; reduced: boolean; eager?: boolean };

/**
 * A tall section with a sticky, full-viewport Remotion <Player>.
 * Scroll progress through the section is mapped to the Player's frame.
 */
export const ScrollScene: React.FC<Props> = ({ scene, vp, reduced, eager }) => {
  const secRef = useRef<HTMLElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const lastFrame = useRef(-1);
  const [near, setNear] = useState(!!eager);
  const last = scene.durationInFrames - 1;
  const height = reduced ? vp.h : Math.round(vp.h * scene.scrollScreens);

  // Lazy-mount the Player only when the section is near the viewport.
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '120% 0px 120% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sync = useCallback(() => {
    if (reduced) return;
    const el = secRef.current;
    const p = playerRef.current;
    if (!el || !p) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < -vp.h || r.top > vp.h * 2) return;
    const range = Math.max(1, r.height - vp.h);
    const progress = Math.min(1, Math.max(0, -r.top / range));
    const f = Math.round(progress * last);
    if (f !== lastFrame.current) {
      lastFrame.current = f;
      p.seekTo(f);
    }
  }, [reduced, vp.h, last]);

  useEffect(() => {
    if (!near || reduced) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    window.addEventListener('scroll', on, { passive: true });
    lastFrame.current = -1;
    const t = window.setTimeout(sync, 30);
    sync();
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [near, reduced, sync, vp.w]);

  // Interactive elements inside a scene (e.g. timeline years) can jump to a frame.
  const onSeek = useCallback(
    (frame: number) => {
      const el = secRef.current;
      if (!el) return;
      if (reduced) {
        playerRef.current?.seekTo(frame);
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      scrollToY(top + (frame / last) * (height - vp.h));
    },
    [reduced, last, height, vp.h],
  );

  const inputProps = useMemo(() => ({ mode: 'scroll' as const, reduced, onSeek }), [reduced, onSeek]);

  return (
    <section
      id={scene.id}
      ref={secRef}
      className={`scroll-scene tone-${scene.tone}`}
      style={{ height }}
      aria-label={`${scene.no} · ${scene.title}`}
      data-scene={scene.id}
    >
      <div className="scroll-scene__stage" style={{ height: vp.h }}>
        {near ? (
          <Player
            ref={playerRef}
            component={scene.component}
            inputProps={inputProps}
            durationInFrames={scene.durationInFrames}
            fps={FPS}
            compositionWidth={vp.w}
            compositionHeight={vp.h}
            initialFrame={reduced ? last : 0}
            controls={false}
            clickToPlay={false}
            doubleClickToFullscreen={false}
            spaceKeyToPlayOrPause={false}
            moveToBeginningWhenEnded={false}
            initiallyMuted
            numberOfSharedAudioTags={0}
            acknowledgeRemotionLicense
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <div className={`scene-placeholder tone-${scene.tone}`} aria-hidden="true">
            <span className="label">{scene.no} · {scene.title}</span>
          </div>
        )}
      </div>
    </section>
  );
};
