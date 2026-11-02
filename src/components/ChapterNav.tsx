import React, { useEffect, useState } from 'react';
import { scenes } from '../scenes/registry';

type Props = {
  active: number;
  onJump: (i: number) => void;
  onPresent: () => void;
  grain: boolean;
  onToggleGrain: () => void;
  narrow: boolean;
};

const PresentIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8l5 2.5-5 2.5z" fill="currentColor" />
    <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const GrainIcon = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {on && [[9, 9], [14, 8], [12, 13], [8, 14], [15, 15], [11, 17]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" fill="currentColor" />)}
    {!on && <path d="M6 18L18 6" stroke="currentColor" strokeWidth="1.5" />}
  </svg>
);

export const ChapterNav: React.FC<Props> = ({ active, onJump, onPresent, grain, onToggleGrain, narrow }) => {
  const [open, setOpen] = useState(false);
  const tone = scenes[active]?.tone ?? 'dark';

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  if (narrow) {
    return (
      <>
        <button type="button" className={`nav-fab on-${tone}`} aria-expanded={open} aria-controls="chapter-sheet" onClick={() => setOpen(true)}>
          <span className="sr-only">Open chapters</span>
          <span aria-hidden="true">{scenes[active]?.no}</span>
        </button>
        {open && (
          <div id="chapter-sheet" className="nav-sheet" role="dialog" aria-modal="true" aria-label="Chapters">
            <div className="nav-sheet__head">
              <span className="label">Chapters</span>
              <button type="button" className="ui-btn" onClick={() => setOpen(false)} autoFocus>
                Close ×
              </button>
            </div>
            <ol>
              {scenes.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={i === active ? 'is-active' : ''}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => {
                      setOpen(false);
                      onJump(i);
                    }}
                  >
                    <span className="label">{s.no}</span>
                    <span className="display">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="nav-sheet__tools">
              <button type="button" className="ui-btn" onClick={() => { setOpen(false); onPresent(); }}>
                <PresentIcon /> Present
              </button>
              <button type="button" className="ui-btn" aria-pressed={grain} onClick={onToggleGrain}>
                <GrainIcon on={grain} /> Film grain {grain ? 'on' : 'off'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <nav className={`chapter-nav on-${tone}`} aria-label="Chapters">
      <ol>
        {scenes.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => onJump(i)}
            >
              <span className="chapter-nav__title">{s.title}</span>
              <span className="chapter-nav__no">{s.no}</span>
              <span className="chapter-nav__tick" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <div className="chapter-nav__tools">
        <button type="button" className="ui-icon" onClick={onPresent} title="Presentation mode (P)">
          <PresentIcon />
          <span className="sr-only">Start presentation mode</span>
        </button>
        <button type="button" className="ui-icon" onClick={onToggleGrain} aria-pressed={grain} title={`Film grain ${grain ? 'on' : 'off'} (G)`}>
          <GrainIcon on={grain} />
          <span className="sr-only">Toggle film grain</span>
        </button>
      </div>
    </nav>
  );
};
