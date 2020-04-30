module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    "indent": [
      2,
      2
    ],
    "no-underscore-dangle": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    "semi": [
      "error",
      "never"
    ],
    "eol-last": 0
  }
}
