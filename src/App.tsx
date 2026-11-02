import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { scenes } from './scenes/registry';
import { ScrollScene } from './components/ScrollScene';
import { ChapterNav } from './components/ChapterNav';
import { PresentationMode } from './components/PresentationMode';
import { PhotoCreditList, ReferenceItem } from './scenes/Credits';
import { meta, references } from './content';
import { scrollToY, setLenis, getLenis, storageGet, storageSet, usePrefersReducedMotion, useViewport } from './lib/site';

export const App: React.FC = () => {
  const vp = useViewport();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [grain, setGrain] = useState(() => storageGet('grain') !== 'off');
  const presentStart = useRef(0);
  const narrow = vp.w < 760;

  // Smooth scrolling
  useEffect(() => {
    if (reduced) return;
    const l = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, syncTouch: false });
    setLenis(l);
    return () => {
      l.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // Active chapter
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.5;
        let idx = 0;
        scenes.forEach((s, i) => {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= mid) idx = i;
        });
        setActive(idx);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-grain', !grain);
    storageSet('grain', grain ? 'on' : 'off');
  }, [grain]);

  const jump = useCallback((i: number, immediate = false) => {
    const el = document.getElementById(scenes[i].id);
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY, immediate);
  }, []);

  const startPresenting = useCallback(() => {
    presentStart.current = active;
    getLenis()?.stop();
    setPresenting(true);
  }, [active]);

  const stopPresenting = useCallback(
    (i: number) => {
      setPresenting(false);
      getLenis()?.start();
      // Land at the end of the scene the presenter stopped on.
      const el = document.getElementById(scenes[i].id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        scrollToY(top + el.offsetHeight - vp.h, true);
      }
    },
    [vp.h],
  );

  // Global shortcuts: P = present, G = grain
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (presenting || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement;
      if (t?.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t?.tagName)) return;
      if (e.key === 'p' || e.key === 'P') startPresenting();
      if (e.key === 'g' || e.key === 'G') setGrain((g) => !g);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [presenting, startPresenting]);

  return (
    <>
      <a className="skip-link" href="#references">Skip to references</a>
      <div className="progress-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${(active + 1) / scenes.length})` }} />
      </div>

      <ChapterNav
        active={active}
        onJump={jump}
        onPresent={startPresenting}
        grain={grain}
        onToggleGrain={() => setGrain((g) => !g)}
        narrow={narrow}
      />

      <main id="main" aria-hidden={presenting || undefined}>
        {scenes.map((s, i) => (
          <ScrollScene key={s.id} scene={s} vp={vp} reduced={reduced} eager={i === 0} />
        ))}

        <section id="references" className="refs-page" aria-labelledby="refs-title">
          <div className="refs-page__inner">
            <p className="label">Ch. 10 · Reference list · APA 7th edition</p>
            <h2 id="refs-title" className="display">
              <span className="italic">References</span>
            </h2>
            <ol className="refs">
              {references.map((r) => (
                <ReferenceItem key={r.url} r={r} />
              ))}
            </ol>
            <h3 className="display italic" style={{ fontSize: 32, margin: '64px 0 24px' }}>Photo credits</h3>
            <PhotoCreditList />
          </div>
          <footer className="site-footer">
            <div>
              <p className="label">Group members</p>
              <p className="serif">{meta.members.join(' · ')}</p>
            </div>
            <div>
              <p className="label">Course / Section</p>
              <p className="serif">{meta.course}</p>
            </div>
            <div>
              <p className="label">Instructor · Date</p>
              <p className="serif">
                {meta.instructor} · {meta.date}
              </p>
            </div>
            <button type="button" className="ui-btn" onClick={() => jump(0)}>
              Back to top ↑
            </button>
          </footer>
        </section>
      </main>

      {presenting && (
        <PresentationMode start={presentStart.current} vp={vp} reduced={reduced} grain={grain} onExit={stopPresenting} />
      )}

      <div className="film" aria-hidden="true">
        <div className="grain" />
        <div className="vignette" />
      </div>
    </>
  );
};
