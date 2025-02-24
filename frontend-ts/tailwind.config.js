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
        primary: '#0d542b',
        1: {
          //Arizona Cardinals
          primary: '#97233F',
          secondary: '#FFFFFF',
          tertiary: '#000000',
        },
        2: {
          //Atlanta Falcons
          primary: '#000000',
          secondary: '#A71930',
          tertiary: '#A5ACAF',
        },
        3: {
          //Baltimore Ravens
          primary: '#24135F',
          secondary: '#000000',
          tertiary: '#9A7611',
        },
        4: {
          //Buffalo Bills
          primary: '#00338D',
          secondary: '#C60C30',
          tertiary: '#707271',
        },
        5: {
          //Carolina Panthers
          primary: '#000000',
          secondary: '#0085CA',
          tertiary: '#BFC0BF',
        },
        6: {
          //Chicago Bears
          primary: '#0B162A',
          secondary: '#E64100',
          tertiary: '#FFFFFF',
        },
        7: {
          //Cincinnati Bengals
          primary: '#000000',
          secondary: '#FB4F14',
          tertiary: '#FFFFFF',
        },
        8: {
          //Cleveland Browns
          primary: '#311D00',
          secondary: '#FF3300',
          tertiary: '#FFFFFF',
        },
        9: {
          //Dallas Cowboys
          primary: '#002244',
          secondary: '#B0B7BC',
          tertiary: '#00338D',
        },
        10: {
          //Denver Broncos
          primary: '#FC4C02',
          secondary: '#0A2343',
          tertiary: '#FFFFFF',
        },
        11: {
          //Detroit Lions
          primary: '#0076B6',
          secondary: '#B0B7BC',
          tertiary: '#000000',
        },
        12: {
          //Green Bay Packers
          primary: '#203731',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        13: {
          //Houston Texans
          primary: '#021018',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        14: {
          //Indianapolis Colts
          primary: '#013369',
          secondary: '#FFFFFF',
          tertiary: '#A5ACAF',
        },
        15: {
          //Jacksonville Jaguars
          primary: '#006778',
          secondary: '#000000',
          tertiary: '#9F792C',
        },
        16: {
          //Kansas City Chiefs
          primary: '#E31837',
          secondary: '#FFB612',
          tertiary: '#FFFFFF',
        },
        29: {
          //Los Angeles Chargers
          primary: '#0080C6',
          secondary: '#FFC20E',
          tertiary: '#FFFFFF',
        },
        32: {
          //Los Angeles Rams
          primary: '#003594',
          secondary: '#FFD100',
          faded: '#407eed',
        },
        25: {
          //Las Vegas Raiders
          primary: '#C8C7C7',
          secondary: '#000000',
        },
        19: {
          //Miami Dolphins
          primary: '#008E97',
          secondary: '#FC4C02',
          tertiary: '#FFFFFF',
        },
        20: {
          //Minnesota Vikings
          primary: '#4F2683',
          secondary: '#FFC62F',
          tertiary: '#FFFFFF',
        },
        21: {
          //New England Patriots
          primary: '#002244',
          secondary: '#C60C30',
          tertiary: '#B0B7BC',
        },
        22: {
          //New Orleans Saints
          primary: '#D3BC8D',
          secondary: '#000000',
          tertiary: '#FFFFFF',
        },
        23: {
          //New York Giants
          primary: '#0B2265',
          secondary: '#A71930',
          tertiary: '#FFFFFF',
        },
        24: {
          //New York Jets
          primary: '#115740',
          secondary: '#FFFFFF',
          tertiary: '#000000',
        },
        26: {
          //Philadelphia Eagles
          primary: '#004851',
          secondary: '#A2AAAD',
          tertiary: '#000000',
        },
        28: {
          //Pittsburgh Steelers
          primary: '#000000',
          secondary: '#FFB612',
        },
        30: {
          //Seattle Seahawks
          primary: '#002244',
          secondary: '#69BE28',
          tertiary: '#A5ACAF',
        },
        31: {
          //San Francisco 49ers
          primary: '#AA0000',
          secondary: '#B3995D',
          tertiary: '#FFFFFF',
        },
        33: {
          //Tampa Bay Buccaneers
          primary: '#A71930',
          secondary: '#322F2B',
          tertiary: '#DC4405',
        },
        34: {
          //Tennessee Titans
          primary: '#002244',
          secondary: '#4B92DB',
          tertiary: '#C60C30',
        },
        35: {
          //Washington Commanders
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
