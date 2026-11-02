import { continueRender, delayRender, registerRoot, staticFile } from 'remotion';
import { Root } from './Root';
import { setAssetResolver } from '../lib/assets';
import { loadFonts } from '../theme/fonts';

setAssetResolver((p) => staticFile(p));

const fontsHandle = delayRender('Loading Google Fonts');
loadFonts().then(() => continueRender(fontsHandle));

registerRoot(Root);
