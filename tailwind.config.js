/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          800: '#595f63',
          600: '#798184',
          500: '#8d9298',
          400: '#a7abb1',
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
              '@apply text-3xl font-bold text-neutral-800 mb-8': {},
            },
            h2: {
              '@apply text-2xl font-semibold text-neutral-800 mb-6 border-b pb-2': {},
            },
            h3: {
              '@apply text-xl font-semibold text-neutral-800 mb-4': {},
            },
            h4: {
              '@apply text-lg font-semibold text-neutral-800 mb-3': {},
            },
            h5: {
              '@apply text-lg font-semibold text-neutral-800 mb-3': {},
            },
            h6: {
              '@apply text-lg font-semibold text-neutral-800 mb-3': {},
            },
            a: {
              '@apply text-main-800 hover:text-main-600 underline decoration-main-400 hover:decoration-main-500 decoration-dotted decoration-1 underline-offset-4 transition duration-250 ease-in-out':
                {},
              textDecoration: 'underline',
              fontWeight: 'inherit',
            },
            p: {},
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
