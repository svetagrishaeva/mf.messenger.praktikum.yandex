module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  env: {
    es6: true,
    browser: true,
    mocha: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  rules: {
    react: "off",
    "no-unused-vars": "off"
  },
  settings: {
    "import/resolver": "webpack"
  }
}