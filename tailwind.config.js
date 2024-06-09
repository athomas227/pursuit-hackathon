/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        positiveHover: '#FFD700', // Gold
        negativeHover: '#6C9DC6', // LightSkyBlue
        energeticHover: '#32CD32', // LimeGreen
        neutralHover: '#F06A85', // LightCoral
        productiveHover: '#B77DED', // Purple
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
}

