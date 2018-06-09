// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: { parser: 'babel-eslint' },
  env: { browser: true },
  extends: ['standard'],
  rules: {
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'object-property-newline': 'off',
    'no-debugger': 'error',
    'arrow-parens': 'off',
    'camelcase': 'off',
    'new-cap': 'off',
    'no-eval': 'off',
    'indent': 'off',
    'semi': 'off'
  }
}
