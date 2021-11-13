module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};
