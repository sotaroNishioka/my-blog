/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Noto Sans JP',
        'BIZ UDPGothic',
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        'Meiryo',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        main: {
          800: '#595f63',
          600: '#798184',
          500: '#8d9298',
          400: '#a7abb1',
          300: '#d8dadf',
          100: '#f1f6f9',
          body: 'rgba(3, 10, 18, .81)',
          bg: '#fff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              '@apply text-3xl font-bold text-main-body mb-8': {},
            },
            h2: {
              '@apply text-2xl font-semibold text-main-body mb-6 border-b pb-2': {},
            },
            h3: {
              '@apply text-xl font-semibold text-main-body mb-4': {},
            },
            h4: {
              '@apply text-lg font-semibold text-main-body mb-3': {},
            },
            h5: {
              '@apply text-lg font-semibold text-main-body mb-3': {},
            },
            h6: {
              '@apply text-lg font-semibold text-main-body mb-3': {},
            },
            a: {
              '@apply text-main-800 hover:text-main-600 underline decoration-main-400 hover:decoration-main-500 decoration-dotted decoration-1 underline-offset-4 transition duration-300 ease-in-out':
                {},
              textDecoration: 'underline',
              fontWeight: 'inherit',
            },
            p: {
              '@apply text-main-body': {},
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
