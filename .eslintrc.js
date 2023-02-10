module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  overrides: [
    {
      files: ['frontend/**/*.js', 'frontend/**/*.jsx'],
      extends: ['plugin:react/recommended'],
      rules: {
        'react/react-in-jsx-scope': 'on',
      },
      plugins: ['jsx'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 1,
  },
};
