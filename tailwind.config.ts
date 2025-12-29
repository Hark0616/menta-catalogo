import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondos - Menta como protagonista
        mint: {
          DEFAULT: '#E3EDCA',
          soft: '#EDF3E0',
          border: '#C5D4B0',
        },
        // Textos - Verdes profundos
        jungle: {
          DEFAULT: '#1A2E23',
          deep: '#0A1612',
          muted: '#4A5D52',
        },
        // Acento luxury
        gold: '#9A7B4F',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
