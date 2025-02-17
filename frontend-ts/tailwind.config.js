import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'], // Default body font
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        cardinals: {
          primary: '#97233F',
          secondary: '#FFFFFF',
          tertiary: '#000000',
        },
        falcons: {
          primary: '#000000',
          secondary: '#A71930',
          tertiary: '#A5ACAF',
        },
        ravens: {
          primary: '#24135F',
          secondary: '#000000',
          tertiary: '#9A7611',
        },
        bills: {
          primary: '#00338D',
          secondary: '#C60C30',
          tertiary: '#707271',
        },
        panthers: {
          primary: '#000000',
          secondary: '#0085CA',
          tertiary: '#BFC0BF',
        },
        bears: {
          primary: '#0B162A',
          secondary: '#E64100',
          tertiary: '#FFFFFF',
        },
        bengals: {
          primary: '#000000',
          secondary: '#FB4F14',
          tertiary: '#FFFFFF',
        },
        browns: {
          primary: '#311D00',
          secondary: '#FF3300',
          tertiary: '#FFFFFF',
        },
        cowboys: {
          primary: '#002244',
          secondary: '#B0B7BC',
          tertiary: '#00338D',
        },
        broncos: {
          primary: '#FC4C02',
          secondary: '#0A2343',
          tertiary: '#FFFFFF',
        },
        lions: {
          primary: '#0076B6',
          secondary: '#B0B7BC',
          tertiary: '#000000',
        },
        packers: {
          primary: '#203731',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        texans: {
          primary: '#021018',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        colts: {
          primary: '#013369',
          secondary: '#FFFFFF',
          tertiary: '#A5ACAF',
        },
        jaguars: {
          primary: '#006778',
          secondary: '#000000',
          tertiary: '#9F792C',
        },
        chiefs: {
          primary: '#E31837',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        chargers: {
          primary: '#0080C6',
          secondary: '#FFC20E',
          tertiary: '#FFFFFF',
        },
        rams: { primary: '#003594', secondary: '#FFD100', faded: '#407eed' },
        raiders: { primary: '#C8C7C7', secondary: '#000000' },
        dolphins: {
          primary: '#008E97',
          secondary: '#FC4C02',
          tertiary: '#FFFFFF',
        },
        vikings: {
          primary: '#4F2683',
          secondary: '#FFC62F',
          tertiary: '#FFFFFF',
        },
        patriots: {
          primary: '#002244',
          secondary: '#C60C30',
          tertiary: '#B0B7BC',
        },
        saints: {
          primary: '#D3BC8D',
          secondary: '#000000',
          tertiary: '#FFFFFF',
        },
        giants: {
          primary: '#0B2265',
          secondary: '#A71930',
          tertiary: '#FFFFFF',
        },
        jets: { primary: '#115740', secondary: '#FFFFFF', tertiary: '#000000' },
        eagles: {
          primary: '#004851',
          secondary: '#A2AAAD',
          tertiary: '#000000',
        },
        steelers: { primary: '#000000', secondary: '#FFB612' },
        seahawks: {
          primary: '#002244',
          secondary: '#69BE28',
          tertiary: '#A5ACAF',
        },
        fortyniners: {
          primary: '#AA0000',
          secondary: '#B3995D',
          tertiary: '#FFFFFF',
        },
        buccaneers: {
          primary: '#A71930',
          secondary: '#322F2B',
          tertiary: '#DC4405',
        },
        titans: {
          primary: '#002244',
          secondary: '#4B92DB',
          tertiary: '#C60C30',
        },
        commanders: {
          primary: '#5A1414',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
