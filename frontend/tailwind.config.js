export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          gold: '#D4AF37',
          bronze: '#CD7F32',
          copper: '#B87333',
          sandstone: '#E6D5B8',
          terracotta: '#E2725B',
        },
        celestial: {
          navy: '#1A1F3A',
          deepblue: '#2C3E50',
          midnight: '#0F1419',
          starlight: '#E8F4F8',
          cosmos: '#4A5568',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
