/**
 * TYPE SYSTEM — swap fonts in ONE place.
 * To use a premium display font later: add its @font-face in global.css
 * and change DISPLAY_FONT below (the Google URL can then drop that family).
 */
export const DISPLAY_FONT = "'Playfair Display'"; // alt: "'Bodoni Moda'"
export const SERIF_FONT = "'Cormorant Garamond'";
export const SANS_FONT = "'Inter'";

export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Playfair+Display:ital,wght@0,400..900;1,400..900',
    'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500',
    'family=Inter:wght@400;500;600',
  ].join('&') +
  '&display=swap';

/** Injects the stylesheet + CSS variables. Returns a promise that resolves when fonts are ready. */
export function loadFonts(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (!document.getElementById('gf-fonts')) {
    const link = document.createElement('link');
    link.id = 'gf-fonts';
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }
  const root = document.documentElement.style;
  root.setProperty('--font-display', `${DISPLAY_FONT}, 'Bodoni Moda', Didot, 'Times New Roman', serif`);
  root.setProperty('--font-serif', `${SERIF_FONT}, Garamond, Georgia, serif`);
  root.setProperty('--font-sans', `${SANS_FONT}, 'Helvetica Neue', Arial, sans-serif`);
  return new Promise((resolve) => {
    const link = document.getElementById('gf-fonts') as HTMLLinkElement;
    const done = () =>
      Promise.all([
        document.fonts.load(`400 40px ${DISPLAY_FONT}`),
        document.fonts.load(`italic 400 40px ${DISPLAY_FONT}`),
        document.fonts.load(`italic 400 40px ${SERIF_FONT}`),
        document.fonts.load(`500 12px ${SANS_FONT}`),
      ])
        .catch(() => undefined)
        .then(() => resolve());
    if (link.sheet) done();
    else {
      link.addEventListener('load', done, { once: true });
      link.addEventListener('error', () => resolve(), { once: true });
      setTimeout(resolve, 6000);
    }
  });
}
