module.exports = {
  extends: [
    'airbnb-base',
    'plugin:flowtype/recommended',
  ],
  parser: "babel-eslint",
  rules: {
    'no-plusplus': 'off',
    'no-bitwise': 'off',
  },
  plugins: [
    "flowtype",
  ],
};
