// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module 'package-without-declarations';

// And to shim assets, use (one file extension per `declare`):
// declare module '*.png';
// My css.d.ts file
import { Theme } from './utils/theme';
import defaut from '../node_modules/@types/styled-components/index.d';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
  export type styled = typeof defaut;
}
