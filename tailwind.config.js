const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      screens: {
        '2xl': '1536px',
        mobile: {
          max: '639px',
        },
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.justify-self-start': {
          'justify-self': 'flex-start',
        },
        '.justify-self-end': {
          'justify-self': 'flex-end',
        },
      };

      addUtilities(newUtilities, ['responsive']);
    }),
  ],
};
