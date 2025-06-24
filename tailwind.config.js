
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand': {
          'primary': '#22C55E', 
          'secondary': '#A3E635', 
        },
        'ui': {
          'background': '#F8FAFC', 
          'surface': '#FFFFFF',    
          'border': '#E2E8F0',     
          'hover': '#F1F5F9',      
        },
        'text': {
          'main': '#0F172A',      
          'muted': '#64748B',     
        }
      }
    },
  },
  plugins: [],
}