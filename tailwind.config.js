// tailwind.config.js
const globalStyles = require("./content/data/style.json");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: globalStyles.primaryColor,
        secondary: globalStyles.secondaryColor,
        accent: globalStyles.accentColor,
        background: globalStyles.backgroundColor,
        text: globalStyles.textColor,
      },
      fontFamily: {
        sans: [globalStyles.fontFamily, 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'custom': `${globalStyles.borderRadius}px`,
      },
    },
  },
  plugins: [],
};
