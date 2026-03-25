/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'sp-4': '0px 2px 4px rgba(0,0,0,0.14), 0px 0px 2px rgba(0,0,0,0.12)',
      },
      fontFamily: {
        'segoe': ['"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
