/**
 * ALL on-screen text lives here. Edit freely; components read from this file.
 * Text is condensed from the group's content guide for big, readable slides.
 * Keep every in-text citation attached to the claim it supports.
 */

export const meta = {
  kicker: 'Modelling a Lifelong Learner',
  firstName: 'Hidilyn',
  lastName: 'Diaz',
  subtitle: 'From lifting wood under a sampaloc tree to teaching in a university classroom',
  members: ['Marychu Bernardo', 'Daniel Martin Canlapan', 'King Marrys Nuguid', 'Aljhon Yumul'],
  course: 'BEEd 1-A, College of Education, Angeles University Foundation',
  courseShort: 'BEEd 1-A · AUF',
  instructor: 'Kimberly Illeah Marie Francisco',
  date: 'November 2, 2026',
};

export const intro = {
  heading: { italic: 'Why', roman: 'Hidilyn Diaz?' },
  lead:
    'The first Filipino to win an Olympic gold medal. She went back to college after her first Olympic medal, finished her degree at 32, and became a university teacher in 2026 (Daily Tribune, 2023; Gutierrez, 2026).',
  pullQuote: 'Learning does not only happen inside a classroom.',
  relevance:
    'As future elementary teachers, we see in her the teacher we want to become. Before teaching at UP Diliman, she became a student again and took a Teaching Effectiveness Course (Gutierrez, 2026). As a child, she went to school with only three pesos as baon (Basco, 2016).',
  photo: 'zamboanga2015portrait',
  source: 'Daily Tribune, 2023; Gutierrez, 2026',
};

export type Chapter = {
  id: string;
  label: string;
  title: { italic: string; roman: string };
  place: string;
  years: string;
  photo: string; // key in photos.ts
  paragraphs: string[];
  source: string;
};

export const biography: { heading: string; chapters: Chapter[] } = {
  heading: 'Background: A Brief Biography',
  chapters: [
    {
      id: 'mampang',
      label: 'Humble beginnings in Mampang',
      title: { italic: 'Humble', roman: 'Beginnings' },
      place: 'Mampang, Zamboanga City',
      years: '1991 – 2000s',
      photo: 'zamboanga2015',
      paragraphs: [
        'Born February 20, 1991 in Barangay Mampang, Zamboanga City, the 5th of six children. Their house had no running water (Montalvan, 2021).',
        'With her cousins, she trained under a sampaloc tree, lifting ipil-ipil wood and cement barbells (Basco, 2016).',
      ],
      source: 'Montalvan, 2021; Basco, 2016',
    },
    {
      id: 'rise',
      label: 'Rise in international weightlifting',
      title: { italic: 'The', roman: 'Rise' },
      place: 'Beijing · London · Rio · Tokyo',
      years: '2008 – 2021',
      photo: 'london2012',
      paragraphs: [
        'Four Olympics: a wild card in Beijing 2008, flag bearer in London 2012, silver in Rio 2016, and the country’s first Olympic gold in Tokyo 2020, held in 2021 (Montalvan, 2021).',
        'She also rose to Staff Sergeant in the Philippine Air Force (Salterio, 2025).',
      ],
      source: 'Montalvan, 2021; Salterio, 2025',
    },
    {
      id: 'after',
      label: 'Life after the gold medal',
      title: { italic: 'After', roman: 'the Gold' },
      place: 'Benilde · UP Diliman',
      years: '2023 – 2026',
      photo: 'gold2021',
      paragraphs: [
        'Instead of retiring, she finished her Business Management degree at De La Salle–College of Saint Benilde in 2023 (Daily Tribune, 2023).',
        'In 2026 she began teaching PE weightlifting classes at UP Diliman (Malasig, 2026).',
      ],
      source: 'Daily Tribune, 2023; Malasig, 2026',
    },
  ],
};

export type TimelineItem = {
  year: string;
  text: string;
  photo?: string;
  climax?: boolean;
};

export const timeline: { heading: string; items: TimelineItem[]; sources: string } = {
  heading: 'Timeline at a glance',
  items: [
    { year: '1991', text: 'Born in Barangay Mampang, Zamboanga City; fifth of six children.' },
    { year: 'Early 2000s', text: 'Lifts ipil-ipil wood and cement barbells under a sampaloc tree.' },
    { year: '2008', text: 'Beijing Olympics wild card; first Filipina weightlifter at the Olympics.' },
    { year: '2012', text: 'Flag bearer in London; fails all three clean and jerk attempts (DNF).', photo: 'london2012' },
    { year: '2013–2014', text: 'Joins the Air Force; injured and dropped from most lineups.' },
    { year: '2016', text: 'Silver in Rio, the country’s first Olympic medal in 20 years.', photo: 'silver2016' },
    { year: '2017', text: 'Returns to college on a scholarship at Benilde.' },
    { year: '2019', text: 'Wrongly named in an “ouster matrix”; receives online threats.' },
    { year: '2020', text: 'Trains in Malaysia with a bamboo stick and water bottles.' },
    { year: '2021', text: 'Gold in Tokyo, the Philippines’ first-ever Olympic gold.', photo: 'gold2021', climax: true },
    { year: '2023', text: 'Graduates from Benilde at 32, after six years of study.' },
    { year: '2025', text: 'SEA Games (4th place) while coaching young lifters.' },
    { year: '2026', text: 'Completes a Teaching Effectiveness Course; teaches PE weightlifting at UP Diliman.' },
  ],
  sources: 'Sources: Basco (2016); Montalvan (2021); Salterio (2025); Daily Tribune (2023, 2025); The POST (2025); Gutierrez (2026).',
};

export const challenge = {
  heading: 'Most Significant Challenge',
  subheading: 'Poverty and Limited Training Resources',
  challengeTitle: 'The challenge',
  challengeLines: [
    'A sport that needs expensive equipment, coaching, and proper food, and a family that was poor.',
    'Some nights, dinner was only salt and soy sauce (Basco, 2016).',
    'To pay her fare to the gym, she washed jeepneys and sold vegetables and fish (Basco, 2016; Montalvan, 2021).',
    'After training: boiled cassava with shrimp paste (Basco, 2016).',
  ],
  overcomeTitle: 'How she overcame it',
  overcome: [
    {
      title: 'She trained with what she had.',
      text: 'Wood, cement barbells, and a makeshift gym built with her cousin (Basco, 2016).',
    },
    {
      title: 'She worked while training.',
      text: 'Odd jobs paid for her commute (Montalvan, 2021).',
    },
    {
      title: 'She learned from people around her.',
      text: 'Her cousins Catalino and Allen Jayfrus Diaz taught her the basics (Basco, 2016).',
    },
    {
      title: 'She turned success into opportunity.',
      text: 'When gyms in Malaysia closed in the pandemic, she trained with a bamboo stick and water bottles (Montalvan, 2021).',
    },
  ],
  closing:
    'The resourcefulness she learned under a sampaloc tree in Mampang carried her through lockdown to gold in Tokyo.',
};

export type Quality = {
  num: string;
  years: string;
  title: string;
  titleItalic: string;
  titleRoman: string;
  evidence: string[];
  why: string;
  photo: string;
  source: string;
};

export const qualities: { heading: string; whyLabel: string; items: Quality[] } = {
  heading: 'Why Hidilyn Diaz Is a Lifelong Learner',
  whyLabel: 'Why this shows lifelong learning',
  items: [
    {
      num: '01',
      years: '2008 – 2016',
      title: 'Resilience, she learns from failure',
      titleItalic: 'Resilience,',
      titleRoman: 'she learns from failure',
      evidence: [
        'Second to last in 2008. All three clean and jerk attempts failed in 2012. Then injury kept her out of most lineups until 2014 (Basco, 2016; Montalvan, 2021).',
      ],
      why: 'She treated each setback as a lesson, lost five kilograms to move down a weight class, and won silver in 2016 (Basco, 2016).',
      photo: 'london2012',
      source: 'Basco, 2016; Montalvan, 2021',
    },
    {
      num: '02',
      years: '2000s – 2021',
      title: 'Adaptability and resourcefulness',
      titleItalic: 'Adaptability',
      titleRoman: 'and resourcefulness',
      evidence: [
        'From ipil-ipil wood in Mampang to water bottles in Malaysia, she kept finding ways to improve (Basco, 2016; Montalvan, 2021).',
      ],
      why: 'A lifelong learner changes methods when the situation changes. She did not wait for perfect conditions.',
      photo: 'gold2021',
      source: 'Basco, 2016; Montalvan, 2021',
    },
    {
      num: '03',
      years: '2017 – 2023',
      title: 'Commitment to education at every stage',
      titleItalic: 'Commitment',
      titleRoman: 'to education at every stage',
      evidence: [
        'Back to school on a Benilde scholarship in 2017, taking online exams while training for Tokyo (BusinessMirror, 2021). She graduated in July 2023 at 32 (Daily Tribune, 2023).',
        'She proved a person can go back to school even after stopping (De La Salle–College of Saint Benilde, 2023).',
      ],
      why: 'She already had fame and medals, yet she still finished her degree. Learning is part of who she is.',
      photo: 'silver2016',
      source: 'BusinessMirror, 2021; Daily Tribune, 2023; De La Salle–College of Saint Benilde, 2023',
    },
    {
      num: '04',
      years: '2025 – 2026',
      title: 'Learning in order to teach others',
      titleItalic: 'Learning',
      titleRoman: 'in order to teach others',
      evidence: [
        'She coaches young lifters (Daily Tribune, 2025). In January 2026 she took a Teaching Effectiveness Course, then began teaching two PE weightlifting sections at UP Diliman (Gutierrez, 2026; Malasig, 2026).',
      ],
      why: 'Being an expert is not enough to teach well. Good teachers keep learning how to teach.',
      photo: 'zamboanga2015portrait',
      source: 'Daily Tribune, 2025; Gutierrez, 2026; Malasig, 2026',
    },
  ],
};

/** Only numbers that already appear in the content guide. */
export const numbers = {
  heading: { italic: 'By the', roman: 'Numbers' },
  items: [
    { value: 4, prefix: '', suffix: '', label: 'Olympics', cite: '(Montalvan, 2021)' },
    { value: 1, prefix: '', suffix: 'st', label: 'Filipino Olympic gold', cite: '(Montalvan, 2021)', accent: true },
    { value: 6, prefix: '', suffix: '', label: 'Years studying while training', cite: '(Daily Tribune, 2023)' },
    { value: 32, prefix: '', suffix: '', label: 'Age at graduation', cite: '(Daily Tribune, 2023)' },
    { value: 3, prefix: '₱', suffix: '', label: 'Baon as a schoolgirl', cite: '(Basco, 2016)' },
    { value: 2, prefix: '', suffix: '', label: 'PE sections she teaches at UP', cite: '(Gutierrez, 2026; Malasig, 2026)' },
  ],
};

export const reflection = {
  heading: 'Our Group’s Reflection',
  intro: 'Her story changed how we look at learning in three ways.',
  items: [
    {
      num: '1',
      title: 'Learning does not wait for perfect resources',
      body: 'She learned weightlifting with wood and cement. As future teachers, we can use free materials, libraries, and the people around us, and teach well even where resources are limited.',
    },
    {
      num: '2',
      title: 'Success is not the finish line',
      body: 'After an Olympic medal, she went back to school. Graduation is not the end of learning. We will keep improving as our pupils and classrooms change.',
    },
    {
      num: '3',
      title: 'Lifelong learning is shared',
      body: 'Her cousins taught her; now she teaches others. Learning is a cycle: we learn from our community and give back to it.',
    },
  ],
};

/** Alphabetical by surname. */
export const insights = {
  heading: 'Personal Insights',
  items: [
    {
      name: 'Marychu Bernardo',
      text: 'After senior high school, I was unsure about which university to attend or whether I should take a gap year. I applied for scholarships at AUF, but while waiting for the results, I also enrolled at NU Clark. It was a confusing time because I didn’t know what would happen next or if I was making the right choice. Like Hidilyn Diaz, I learned that life does not always go as planned. Despite facing many challenges, she continued working toward her goals and never stopped learning. Her story inspires me to stay strong, accept changes, and make the most of the opportunities I have. I may still be figuring things out, but I know that learning and growing should never stop, even after graduation.',
    },
    {
      name: 'Daniel Martin Canlapan',
      text: 'As an irregular computer science student taking this subject with BEEd 1-A, I relate to Hidilyn Diaz more than I expected. She also started in computer science at Universidad de Zamboanga before leaving it, and she went back to school years later to finish a different degree at 32. Being irregular can feel like falling behind, but her story shows that a different path is not the end of learning. I try to remain optimistic and keep learning at my own pace, as finishing my degree and continuing to grow after it is a goal I’m trying to achieve.',
    },
    {
      name: 'King Marrys Nuguid',
      text: 'Learning about Hidilyn Diaz’s life and journey made me realize that success does not happen overnight. Her experiences taught me that every failure, rejection, and challenge can become a stepping stone toward achieving our dreams. Despite facing financial difficulties, disappointments, and many struggles throughout her career, she continued to work hard and believe in herself until she finally achieved her dream of becoming the first Filipino Olympic gold medalist. Her story reminds me that we should never allow our circumstances or failures to determine what we can achieve in life. As a student, I also experience challenges and moments when I feel discouraged or doubt my abilities. However, Hidilyn’s journey inspires me to remain patient, continue learning, and trust the process even when progress seems slow. I also realized that being a lifelong learner means being willing to improve ourselves, accept failures, and learn from every experience.',
    },
    {
      name: 'Aljhon Yumul',
      text: 'Before I got my scholarship from AUF, I applied to many schools and was turned down again and again. At times I wondered if I was simply not good enough. Reading about Hidilyn Diaz changed how I see those rejections. She placed second to last in 2008 and failed all her lifts in 2012, yet each failure taught her something that helped her win silver and then gold. In the same way, every “no” I received made me better at preparing, at not giving up, and at appreciating the “yes” when it finally came. Hidilyn also took a scholarship to go back to school, and I know how much a scholarship can open a door that seemed closed. Now, as a future teacher, I want to remember how it felt to be passed over, so I can notice and encourage students who are still waiting for their chance. Hidilyn learned in order to teach others, and I want to do the same.',
    },
  ],
};

export const conclusion = {
  heading: 'Conclusion',
  text: 'A lifelong learner is not defined by where they started or by one achievement. She went from a barangay without running water to the Olympic podium, a college graduation, and a university classroom. She learned from failure, adjusted when resources ran out, and now shares what she knows. Her story encourages us to keep learning even after this course ends.',
  finalLine: 'Her story encourages us to keep learning even after this course ends.',
};

export type Reference = {
  author: string;
  date: string;
  title: string;
  source?: string;
  url: string;
};

/** APA 7. Exactly as listed in the content guide. */
export const references: Reference[] = [
  { author: 'Basco, K. C. G.', date: '2016', title: 'How Mampang carried Hidilyn Diaz to Olympic glory', source: 'ABS-CBN News', url: 'https://www.abs-cbn.com/hidilyn-diaz' },
  { author: 'BBC Sport.', date: '2021', title: 'Hidilyn Diaz: From accusations of anti-government plot to historic Olympic gold', source: 'BBC', url: 'https://www.bbc.com/sport/weightlifting/59660304' },
  { author: 'BusinessMirror.', date: '2021, March 19', title: 'Training, education do mix', source: 'PressReader', url: 'https://www.pressreader.com/philippines/businessmirror/20210319/281934545712595' },
  { author: 'Daily Tribune.', date: '2023, July 29', title: 'Olympic champ Diaz lifts college degree', url: 'https://tribune.net.ph/2023/07/29/olympic-champ-diaz-lifts-college-degree' },
  { author: 'Daily Tribune.', date: '2025, October 28', title: 'Hidilyn juggles coaching, SEAG prep', url: 'https://tribune.net.ph/2025/10/28/hidilyn-juggles-coaching-seag-prep' },
  { author: 'De La Salle–College of Saint Benilde.', date: '2023', title: 'Winning inside and outside the classroom', url: 'https://benilde.edu.ph/winning-inside-and-outside-the-classroom' },
  { author: 'Gutierrez, V.', date: '2026, January 20', title: 'Another gold! Hidilyn Diaz, isa nang guro sa UP Diliman', source: 'Balita', url: 'https://balita.mb.com.ph/2026/01/20/another-gold-hidilyn-diaz-isa-nang-guro-sa-up-diliman/' },
  { author: 'Malasig, J.', date: '2026, March 23', title: '‘I said yes’: Hidilyn Diaz shares glimpse of life as weightlifting teacher in UP Diliman', source: 'Interaksyon', url: 'https://interaksyon.philstar.com/?p=310711' },
  { author: 'Manila Bulletin.', date: '2021, July 27', title: 'Benilde pays tribute to student-athlete Diaz', url: 'https://mb.com.ph/2021/7/27/benilde-pays-tribute-to-student-athlete-diaz' },
  { author: 'Montalvan, A. J., II.', date: '2021, July 27', title: 'Hidilyn Diaz converts her ordeals to gold', source: 'VERA Files', url: 'https://verafiles.org/articles/hidilyn-diaz-converts-her-ordeals-gold' },
  { author: 'Salterio, L.', date: '2025, October 20', title: 'Hidylyn strikes teaching from her bucket list', source: 'Journal News', url: 'https://journalnews.com.ph/?p=330374' },
  { author: 'The POST.', date: '2025, December 15', title: 'Diaz fails to land in podium in SEA Games return', url: 'https://thepost.net.ph/sports/overtime/diaz-fails-to-land-in-podium-in-sea-games-return/' },
];
