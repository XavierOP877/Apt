/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgba(2,0,36,1)',
        customYellow: 'rgba(121,112,9,0.3310574229691877)',
        customBlack: 'rgba(0,0,0,0.7792366946778712)',
      },
    },
  },
  plugins: [],
};
