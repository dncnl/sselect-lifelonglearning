// Renders key frames of every scene as PNGs for visual QA.
// Usage: node scripts/stills.mjs <outDir> [width] [height] [chromePath]
import path from 'node:path';
import fs from 'node:fs';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

const [outDir = 'out/stills', w = '1920', h = '1080', chrome] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const plan = {
  Opening: [30, 179],
  Introduction: [70, 150, 269],
  Background: [100, 260, 479],
  Timeline: [120, 434, 600],
  Challenge: [200, 380, 599],
  Qualities: [70, 160, 520, 889],
  Numbers: [229],
  Reflection: [120, 389],
  Insights: [130, 367],
  Conclusion: [120, 389],
  Credits: [250, 659],
};

const serveUrl = await bundle({ entryPoint: path.resolve('src/remotion/index.ts'), publicDir: path.resolve('public') });
for (const [id, frames] of Object.entries(plan)) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable: chrome, inputProps: {} });
  const comp = { ...composition, width: Number(w), height: Number(h) };
  for (const f of frames) {
    const frame = Math.min(f, composition.durationInFrames - 1);
    const output = path.join(outDir, `${id}-${frame}.png`);
    await renderStill({ serveUrl, composition: comp, frame, output, browserExecutable: chrome, inputProps: {} });
    console.log('✓', output);
  }
}
