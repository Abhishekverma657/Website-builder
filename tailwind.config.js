/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        webflow: {
          bg: '#1e1e1e',
          panel: '#2c2c2c',
          panelBorder: '#383838',
          hover: '#3a3a3a',
          active: '#444444',
          accent: '#146ef5',
          accentHover: '#0d5cd0',
          text: '#dedede',
          muted: '#8e8e8e',
          highlight: '#2980b9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
