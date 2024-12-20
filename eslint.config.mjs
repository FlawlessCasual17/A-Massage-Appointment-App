import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticJs from '@stylistic/eslint-plugin-js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [...compat.extends('next/core-web-vitals'), {
  plugins: {
    '@stylistic/js': stylisticJs
  },
  rules: {
    quotes: ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'quote-props': ['error', 'as-needed'],
    '@stylistic/js/object-curly-spacing': [
      'error', 'always', { objectsInObjects: false }
    ]
  }
}]
