/* tailwind.config.js */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* --- Colours & font --- */
      fontFamily: {
        round: ['"Fira Sans"', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#364F6B',
        'accent-yellow': '#FCE698',
      },
      /* --- Extra screens to match the old media-queries --- */
      screens: {
        xs:  '425px',   //  ≤ 425 px   (matches your 425 media-query)
        ssm: '532px',   //  ≤ 532 px
        mdx: '918px',   //  ≤ 918 px
        lg:  '1024px',  //  default lg already 1024 – kept for clarity
      },
    },
  },
  plugins: [],
};
