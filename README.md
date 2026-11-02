# Modelling a Lifelong Learner: Hidilyn Diaz

A scroll-driven editorial presentation website for **BEEd 1-A, College of Education, Angeles University Foundation**.
Group: Marychu Bernardo · Daniel Canlapan · King Marrys Nuguid · Aljhon Yumul. Instructor: Kimberly Illeah Marie Francisco.

Built with **Vite + React + TypeScript** and **Remotion**. Each scene is a Remotion composition rendered in a `<Player>`, and scrolling scrubs its timeline. Lenis provides smooth scrolling.

---

## Run it

```bash
npm install
npm run dev        # open the printed http://localhost:5173 link
```

Production build: `npm run build`, then `npm run preview`.

## Presenting in class

| Action | Key |
| --- | --- |
| Start presentation mode | **P**, or the projector icon on the right edge (on phones it's in the round chapter button) |
| Next / previous scene | **→ / Space / PageDown** and **← / PageUp** |
| Pause / play the current scene | **K** |
| Replay scene | **R** |
| First / last scene | **Home / End** |
| Exit | **Esc** (twice if fullscreen) or **Q** |
| Toggle film grain | **G**, or the grain icon |

Presentation mode goes fullscreen and plays each scene's animation when it arrives. It starts from the chapter you are currently scrolled to. Controls hide after 2.5 seconds without mouse movement.

Interactive bits: click any **year** on the timeline to jump to it. On each quality, the **"Why this shows lifelong learning +"** button opens the explanation early. The four summary **cards flip** on click (on phones they open a panel instead).

## Edit the text: `src/content.ts`

All words on the site live in this file: intro, biography, timeline, challenge, qualities, numbers, reflection, personal insights, conclusion, and references. Components never contain copy.

- **Personal insights:** replace `PLACEHOLDER` with each member's text in `insights.items`. The order is alphabetical by surname. While a placeholder remains, it shows as a dashed "Placeholder" box.
- In-text citations such as `(Basco, 2016)` are detected and styled automatically. Keep them inside the sentence they support.

## Photos: `src/photos.ts` + `public/assets/photos/`

All five photos are **public domain, from Wikimedia Commons**. Each one is credited on the image itself, in the end credits, and under "Photo credits" on the references page, with a link to its Commons page:

| Key | File | What it shows | Source |
| --- | --- | --- | --- |
| `gold2021` | `tokyo-2021-gold.jpg` | Holding her Tokyo gold, 2021 | PTV News |
| `silver2016` | `rio-2016-silver.jpg` | Davao City, Aug 2016, after Rio | Presidential Communications Operations Office |
| `london2012` | `london-2012-homecoming.jpg` | Arriving home from London 2012 | unknown author |
| `zamboanga2015` | `zamboanga-2015-honors.jpg` | Honoured by Zamboanga City, 2015 | unknown author |
| `zamboanga2015portrait` | `zamboanga-2015-portrait.jpg` | Zamboanga City, 2015 | unknown author |

No free photos exist of Beijing 2008, the Benilde graduation, or UP Diliman, so those moments reuse the photos above with accurate captions.

To swap a photo, drop a file into `public/assets/photos/` and update its entry (alt, caption, credit, source). Use the key in `content.ts`. Set `focus` (e.g. `'center 20%'`) to keep her face in frame. Photos are always shown in black and white. A missing file shows a labelled placeholder frame.

**AUF logo:** put it at `public/assets/logo.png`. Until then a small "AUF" monogram is shown.

## Change the look

- **Accent colour:** `--accent` at the top of `src/styles/global.css`. It's the only colour on the site. A lighter tint (`--accent-bright`) is derived from it automatically for text on black.
- **Fonts:** `src/theme/fonts.ts`. Change `DISPLAY_FONT` (e.g. to `"'Bodoni Moda'"`) and the Google Fonts URL. For a purchased font, add an `@font-face` in `global.css` and set `DISPLAY_FONT` to its name.
- **Scroll length per scene:** `scrollScreens` in `src/scenes/registry.ts` (default ≈ 80 animation frames per screen of scrolling).

## Export an MP4 (offline backup)

```bash
npm run render
# → out/hidilyn-diaz-presentation.mp4  (1920×1080, 30 fps, ~3 minutes)
```

The first render downloads a headless Chrome. If that download is blocked on your network, point Remotion at your installed Chrome:

```bash
npx remotion render src/remotion/index.ts FullPresentation out/hidilyn-diaz-presentation.mp4 --browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

`npm run studio` opens Remotion Studio to preview or tweak each scene on its own. `node scripts/stills.mjs out/stills 390 844 "<chrome path>"` renders key frames of every scene at any size, which is useful for checking layouts.

## Deploy

**Vercel:** push this folder to a GitHub repo, then import it at vercel.com/new. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). Or run `npx vercel` from this folder.

**GitHub Pages:** `vite.config.ts` uses `base: './'`, so the build works from any sub-path.

```bash
npm run build
npx gh-pages -d dist      # publishes dist/ to the gh-pages branch
```

Then in the repo go to **Settings → Pages → Source: gh-pages branch**.

## Accessibility & performance

- Each scene is a labelled `<section>`. Headings run in order (one `h1` in the opening, `h2` per scene), every photo has alt text, and all controls are real buttons you can reach with the keyboard.
- With **prefers-reduced-motion**, scrubbing and smooth scrolling are turned off. Each scene shows its final frame, and long scenes scroll natively.
- Players mount only when their scene is near the viewport, and photos lazy-load.
- A full, plain-HTML reference list (with links) sits after the last scene at `#references`.

## Project structure

```
src/
  content.ts          ← all text
  photos.ts           ← photo slots, alt text, credits
  scenes/             ← one Remotion composition per scene + registry.ts
  components/         ← ScrollScene (scroll→frame), PresentationMode, ChapterNav
  remotion/           ← Remotion root for MP4 rendering
  styles/global.css   ← design tokens + styles
  theme/fonts.ts      ← font choices (swap in one place)
public/assets/        ← logo.png and photos/
```
