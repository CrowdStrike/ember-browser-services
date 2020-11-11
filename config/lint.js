'use strict';

const baseRules = {
  // "Liberal Let": https://madhatted.com/2016/1/25/let-it-be
  // See, related: https://github.com/emberjs/eslint-plugin-ember-internal
  //   "no-const-outside-module-scope"
  'prefer-const': 'off',

  'spaced-comment': [
    'error',
    'always',
    {
      block: {
        balanced: true,
        exceptions: ['*', '/'],
      },
    },
  ],

  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: 'break' },
    { blankLine: 'always', prev: '*', next: 'block-like' },
    { blankLine: 'always', prev: 'block-like', next: '*' },
    { blankLine: 'always', prev: ['const', 'let'], next: '*' },
    { blankLine: 'always', prev: '*', next: ['const', 'let'] },
    { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
  ],

  'prettier/prettier': [
    'error',
    {
      arrowParens: 'always',
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'all',
    },
  ],
};

const parsers = {
  ts: {
    parser: '@typescript-eslint/parser',
  },
  js: {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        legacyDecorators: true,
      },
    },
  },
};

const configs = {
  ts: [
      'eslint:recommended',
      'plugin:ember/octane',
      'plugin:decorator-position/ember',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/@typescript-eslint',
    ],
  js: [
      'eslint:recommended',
      'plugin:ember/octane',
      'plugin:prettier/recommended',
      'plugin:decorator-position/ember',
      'prettier',
    ],
};

const plugins = {
  ts: ['ember', 'prettier', 'qunit', 'decorator-position'],
  js: ['ember', 'prettier', 'qunit', 'decorator-position'],
};

const rules = {
  base: baseRules,
  ts: {
    // allow unused vars starting with _,
    // handy for destructuring and declaring all events
    // for greater context.
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // this rule doesn't work for module-based execution context
    '@typescript-eslint/no-use-before-define': 'off',

    // for consistency, whenever we declare an interface or type,
    // such as for Component args definitions.
    '@typescript-eslint/no-empty-interface': 'off',

    // member-accessibility is handled by native JS.
    // private fields / methods are stage 3 at the time of writing.
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // prefer inference
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // better handled by prettier:
    '@typescript-eslint/indent': 'off',

    // much concise
    '@typescript-eslint/prefer-optional-chain': 'error',
  },
  js: {},
};

module.exports = { parsers, configs, plugins, rules };
