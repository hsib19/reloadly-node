import type { Config } from 'prettier';

const config: Config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  plugins: ['prettier-plugin-organize-imports'],
};

export default config;
