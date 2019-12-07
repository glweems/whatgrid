import { createGlobalStyle } from 'styled-components';
import { merge, get } from 'lodash';
import { darken } from 'polished';

export const colors = {
  primary: '#4e67eb',
  primaryDark: darken(0.1, '#4e67eb'),
  blacks: [
    'rgba(0,0,0,.0125)',
    'rgba(0,0,0,.025)',
    'rgba(0,0,0,.05)',
    'rgba(0,0,0,.1)',
    'rgba(0,0,0,.2)',
    'rgba(0,0,0,.3)',
    'rgba(0,0,0,.4)',
    'rgba(0,0,0,.5)',
    'rgba(0,0,0,.6)',
    'rgba(0,0,0,.7)',
    'rgba(0,0,0,.8)',
    'rgba(0,0,0,.9)',
  ],
  whites: [
    'rgba(255,255,255,.0125)',
    'rgba(255,255,255,.025)',
    'rgba(255,255,255,.05)',
    'rgba(255,255,255,.1)',
    'rgba(255,255,255,.2)',
    'rgba(255,255,255,.3)',
    'rgba(255,255,255,.4)',
    'rgba(255,255,255,.5)',
    'rgba(255,255,255,.6)',
    'rgba(255,255,255,.7)',
    'rgba(255,255,255,.8)',
    'rgba(255,255,255,.9)',
  ],
};

export const modes = [
  'light',
  'dark',
  // more than two modes can follow...
];

export const baseTheme = {
  breakpoints: [32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  fonts: {
    serif: 'athelas, georgia, times, serif',
    sansSerif:
      '-apple-system, "Noto Sans", BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  },
  borders: [0, '1px solid', '2px solid', '4px solid', '8px solid', '16px solid', '32px solid'],
  radii: [0, 2, 4, 16, 9999, '100%'],
  width: [16, 32, 64, 128, 256],
  heights: [16, 32, 64, 128, 256],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  modes: {
    light: {
      name: 'light',
      text: '#131217',
      bg: '#fff',
      secondary: '#47444e',
    },
    dark: {
      name: 'dark',
      text: '#dcdcdc',
      bg: '#131217',
      secondary: '#47444e',
    },
  },
};

// type BaseTheme = typeof baseTheme;

// type ColorModes = {
//   name: typeof baseTheme.modes.light.name | typeof baseTheme.modes.dark.name;
//   text: typeof baseTheme.modes.light.text | typeof baseTheme.modes.dark.text;
//   bg: typeof baseTheme.modes.light.bg | typeof baseTheme.modes.dark.bg;
//   secondary: typeof baseTheme.modes.light.secondary | typeof baseTheme.modes.dark.secondary;
// };

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    color: ${({ theme }: { theme: Theme }) => theme.colors.text};
    font: 100%/1.5 'Noto Sans', sans-serif;
    font-size: 16px;
    background-color:${({ theme }: { theme: Theme }) => theme.colors.bg};
  }
`;

export const getTheme = (mode = 'light') =>
  merge({}, baseTheme, {
    colors: { ...colors, ...get(baseTheme.modes, mode, colors) },
  });

const defaultTheme = getTheme();

export type Theme = typeof defaultTheme;

export const lightMode = getTheme('light');
export const darkMode = getTheme('dark');

export default baseTheme;
