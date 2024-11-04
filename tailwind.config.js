module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 2s infinite alternate, cursor .5s step-end infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        cursor: {
          '50%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
};