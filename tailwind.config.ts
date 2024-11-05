module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Be Vietnam Pro"','Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      animation: {
        typing: 'typing 5s infinite alternate, cursor 2s step-end infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          // '100%': { width: '0%' },
        },
        cursor: {
          '50%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
};