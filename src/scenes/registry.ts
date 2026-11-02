import type React from 'react';
import type { SceneProps } from './common';
import { Hero, HERO_DURATION } from './Hero';
import { Intro, INTRO_DURATION } from './Intro';
import { Biography, BIO_DURATION } from './Biography';
import { Timeline, TIMELINE_DURATION } from './Timeline';
import { Challenge, CHALLENGE_DURATION } from './Challenge';
import { Qualities, QUALITIES_DURATION } from './Qualities';
import { Numbers, NUMBERS_DURATION } from './Numbers';
import { Reflection, REFLECTION_DURATION } from './Reflection';
import { Insights, INSIGHTS_DURATION } from './Insights';
import { Conclusion, CONCLUSION_DURATION } from './Conclusion';
import { Credits, CREDITS_DURATION } from './Credits';

export const FPS = 30;

export type SceneDef = {
  id: string;
  /** Remotion composition id (no spaces). */
  compId: string;
  no: string;
  title: string;
  tone: 'dark' | 'light';
  component: React.FC<SceneProps>;
  durationInFrames: number;
  /** How many viewport-heights of scrolling it takes to play this scene. */
  scrollScreens: number;
};

const s = (frames: number) => Math.max(1.6, frames / 80); // ~80 frames per screen of scroll

export const scenes: SceneDef[] = [
  { id: 'opening', compId: 'Opening', no: '00', title: 'Opening', tone: 'dark', component: Hero, durationInFrames: HERO_DURATION, scrollScreens: s(HERO_DURATION) },
  { id: 'introduction', compId: 'Introduction', no: '01', title: 'Introduction', tone: 'light', component: Intro, durationInFrames: INTRO_DURATION, scrollScreens: s(INTRO_DURATION) },
  { id: 'background', compId: 'Background', no: '02', title: 'Background', tone: 'dark', component: Biography, durationInFrames: BIO_DURATION, scrollScreens: s(BIO_DURATION) },
  { id: 'timeline', compId: 'Timeline', no: '03', title: 'Timeline', tone: 'light', component: Timeline, durationInFrames: TIMELINE_DURATION, scrollScreens: s(TIMELINE_DURATION) },
  { id: 'challenge', compId: 'Challenge', no: '04', title: 'The Challenge', tone: 'dark', component: Challenge, durationInFrames: CHALLENGE_DURATION, scrollScreens: s(CHALLENGE_DURATION) },
  { id: 'qualities', compId: 'Qualities', no: '05', title: 'Four Qualities', tone: 'light', component: Qualities, durationInFrames: QUALITIES_DURATION, scrollScreens: s(QUALITIES_DURATION) },
  { id: 'numbers', compId: 'Numbers', no: '06', title: 'By the Numbers', tone: 'dark', component: Numbers, durationInFrames: NUMBERS_DURATION, scrollScreens: s(NUMBERS_DURATION) },
  { id: 'reflection', compId: 'Reflection', no: '07', title: 'Group Reflection', tone: 'light', component: Reflection, durationInFrames: REFLECTION_DURATION, scrollScreens: s(REFLECTION_DURATION) },
  { id: 'insights', compId: 'Insights', no: '08', title: 'Personal Insights', tone: 'dark', component: Insights, durationInFrames: INSIGHTS_DURATION, scrollScreens: s(INSIGHTS_DURATION) },
  { id: 'conclusion', compId: 'Conclusion', no: '09', title: 'Conclusion', tone: 'dark', component: Conclusion, durationInFrames: CONCLUSION_DURATION, scrollScreens: s(CONCLUSION_DURATION) },
  { id: 'credits', compId: 'Credits', no: '10', title: 'Credits & References', tone: 'dark', component: Credits, durationInFrames: CREDITS_DURATION, scrollScreens: s(CREDITS_DURATION) },
];
