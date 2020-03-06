module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the eslint parser
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ecmaFeatures: {
    jsx: true,
  },
  parserOptiosn: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
