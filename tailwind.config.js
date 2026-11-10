/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F7F2',
        charcoal: '#202622',
        'charcoal-muted': '#58615A',
        'emerald-muted': '#47765B',
        'emerald-dark': '#385F48',
        'sage-soft': '#E7EEE7',
        'sage-subtle': '#F0F4F0',
        'border-subtle': '#E5E7E3',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
