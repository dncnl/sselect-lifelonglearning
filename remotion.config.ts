// Remotion CLI config (used only by `npm run render` / `npm run studio`).
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPublicDir('./public');
