import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      'no-console': 'warn',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: {
            order: 'asc',
          },
          pathGroups: [
            {
              pattern: './**/*.scss',
              group: 'sibling',
              position: 'after',
            },
          ],
        },
      ],
      'react-refresh/only-export-components': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg'],
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      react: {
        version: 'detect',
      },
    },
  },
);
