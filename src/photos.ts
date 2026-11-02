/**
 * PHOTOS — all from Wikimedia Commons, free to use (public domain).
 * Files live in public/assets/photos/. To swap one, replace the file (keep the name)
 * or change `file` + update alt/caption/credit/source.
 * All photos are displayed in black and white automatically.
 */

export type PhotoSlot = {
  file: string; // filename inside public/assets/photos/ ('' = no photo, slot is hidden)
  slot: string; // placeholder label if the file is missing
  alt: string;
  caption: string;
  credit: string; // shown in small caps on every photo
  source?: string; // where the photo came from
  /** CSS object-position, to keep her face in frame, e.g. 'center 20%' */
  focus?: string;
};

const COMMONS = 'Wikimedia Commons, public domain';

export const photos: Record<string, PhotoSlot> = {
  /** Hidilyn holding her Tokyo 2020 gold medal (2021). */
  gold2021: {
    file: 'tokyo-2021-gold.jpg',
    slot: 'Tokyo 2021 gold medal',
    alt: 'Hidilyn Diaz smiling and holding up her Tokyo 2020 Olympic gold medal in 2021',
    caption: 'With her Olympic gold, 2021',
    credit: `Photo: PTV News · ${COMMONS}`,
    source: 'https://commons.wikimedia.org/wiki/File:Hidilyn_Diaz_with_her_gold_medal_2021_(1-44_screenshot).jpg',
    focus: 'center 22%',
  },
  /** Portrait from August 2016, shortly after her Rio silver. */
  silver2016: {
    file: 'rio-2016-silver.jpg',
    slot: 'Rio 2016 silver medal',
    alt: 'Portrait of Hidilyn Diaz in uniform in Davao City, August 2016, after winning Olympic silver in Rio',
    caption: 'Davao City, August 2016, after Rio',
    credit: `Photo: Presidential Communications Operations Office · ${COMMONS}`,
    source: 'https://commons.wikimedia.org/wiki/File:Hidilyn_Diaz_poses_with_President_Rodrigo_Duterte_(cropped).jpg',
    focus: 'center 20%',
  },
  /** Arriving home after the London 2012 Olympics. */
  london2012: {
    file: 'london-2012-homecoming.jpg',
    slot: 'London 2012 Olympics',
    alt: 'Hidilyn Diaz being welcomed at the airport after returning from the London 2012 Olympics',
    caption: 'Home from London, 2012',
    credit: `Photo: unknown author · ${COMMONS}`,
    source: 'https://commons.wikimedia.org/wiki/File:Hidilyn_Diaz_Arriving_in_the_airport_after_the_2012_Summer_Olympics.jpg',
    focus: '40% 30%',
  },
  /** Being honoured in her home city, Zamboanga, 2015. */
  zamboanga2015: {
    file: 'zamboanga-2015-honors.jpg',
    slot: 'Zamboanga City',
    alt: 'Hidilyn Diaz holding a certificate as she is honoured by Zamboanga City in 2015',
    caption: 'Honoured at home, Zamboanga City, 2015',
    credit: `Photo: unknown author · ${COMMONS}`,
    source: 'https://commons.wikimedia.org/wiki/File:Cecil_Atilano,_Hidilyn_Diaz,_Beng_Climaco_and_Nestor_Colonia_2015.jpg',
    focus: '40% 30%',
  },
  zamboanga2015portrait: {
    file: 'zamboanga-2015-portrait.jpg',
    slot: 'Zamboanga City portrait',
    alt: 'Hidilyn Diaz smiling while holding a certificate of recognition in Zamboanga City, 2015',
    caption: 'Zamboanga City, 2015',
    credit: `Photo: unknown author · ${COMMONS}`,
    source: 'https://commons.wikimedia.org/wiki/File:Hidilyn_Diaz_2015c.jpg',
    focus: 'center 15%',
  },
};

/** Photos credited at the end of the presentation. */
export const photoCredits = Object.values(photos).filter((p) => p.file && p.source);
