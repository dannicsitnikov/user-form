import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/package-lock.json',
      '**/public',
      '**/build',
      '**/.eslintcache',
      '**/.next',
      '**/*.d.ts',
    ],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports,
      import: fixupPluginRules(_import),
      prettier,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
        },
      },
    },
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.worker,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ignores: ['node_modules', 'package-lock.json', 'public', 'build', '.eslintcache'],
    rules: {
      'comma-dangle': 'off',
      semi: ['error', 'always'],
      'linebreak-style': 'off',
      'no-underscore-dangle': 'off',
      'no-use-before-define': 'off',
      'no-constructor-return': 'off',
      'no-restricted-globals': ['warn', 'always'],
      'no-unused-expressions': 'off',
      'no-param-reassign': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-plusplus': 'off',
      'no-useless-catch': 'off',
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'no-trailing-spaces': 'error',

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],

      'quote-props': [
        'error',
        'as-needed',
        {
          unnecessary: false,
        },
      ],

      'prefer-object-spread': 'off',
      'spaced-comment': 'off',
      'import/newline-after-import': 'error',

      'padded-blocks': [
        'error',
        {
          blocks: 'never',
        },
      ],

      'lines-between-class-members': 'off',
      'consistent-return': 'off',
      'keyword-spacing': 'error',
      'brace-style': 'error',
      'prefer-const': 'error',
      'no-else-return': 'error',
      'no-multi-spaces': 'error',
      'default-case': 'off',
      'prefer-arrow-callback': 'error',

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],

      'arrow-body-style': ['warn', 'as-needed'],

      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          semi: true,
        },
      ],
    },
  },
];
