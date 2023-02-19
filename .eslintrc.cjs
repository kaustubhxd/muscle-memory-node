module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // extends: 'standard',
  extends: [
    'standard',
    'plugin:node/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'node/file-extension-in-import': ['error', 'always']
  }
}
