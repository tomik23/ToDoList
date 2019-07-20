module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-url': {
      url: 'inline',
      maxSize: 50,
    },
    'postcss-css-variables': {},
    cssnano: {
      safe: true,
    },
  },
};
