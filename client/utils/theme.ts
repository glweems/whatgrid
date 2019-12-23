import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

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
    'rgba(0,0,0,.9)'
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
    'rgba(255,255,255,.9)'
  ]
}

const colorModes: Modes = {
  light: {
    name: 'light',
    text: '#131217',
    bg: '#fff',
    secondary: '#47444e'
  },
  dark: {
    name: 'dark',
    text: '#dcdcdc',
    bg: '#131217',
    secondary: '#47444e'
  }
}

export const modes = [
  'light',
  'dark'
  // more than two modes can follow...
]

export interface ThemeRoot {
  breakpoints: number[]
  space: number[]
  fontSizes: number[]
  fontWeights: number[]
  lineHeights: LineHeights
  letterSpacings: LetterSpacings
  fonts: Fonts
  borders: (number | string)[]
  radii: (number | string)[]
  width: number[]
  heights: number[]
  maxWidths: number[]
  modes: Modes
}

export interface Modes {
  light: ColorMode
  dark: ColorMode
}

interface ColorMode {
  name: string
  text: string
  bg: string
  secondary: string
}

interface Fonts {
  serif: string
  sansSerif: string
}
/**
 * Letter spacings
 */
interface LetterSpacings {
  normal: string
  tracked: string
  tight: string
  mega: string
}

interface LineHeights {
  solid: number
  title: number
  copy: number
}

export type Mode = keyof Modes
export type BaseColors = typeof colors
export type Colors = BaseColors & Modes[Mode]
export type GetColors = (mode: Mode) => Colors
export type GetTheme = (mode: Mode) => Theme

/**
 * breakpoints: number[];
 *
 */
export type Theme = { colors: Colors } & ThemeRoot

export const baseTheme: ThemeRoot = {
  breakpoints: [32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em'
  },
  fonts: {
    serif: 'athelas, georgia, times, serif',
    sansSerif:
      '-apple-system, "Noto Sans", BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif'
  },
  borders: [
    0,
    '1px solid',
    '2px solid',
    '4px solid',
    '8px solid',
    '16px solid',
    '32px solid'
  ],
  radii: [0, 2, 4, 16, 9999, '100%'],
  width: [16, 32, 64, 128, 256],
  heights: [16, 32, 64, 128, 256],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  modes: {
    light: {
      name: 'light',
      text: '#131217',
      bg: '#fff',
      secondary: '#47444e'
    },
    dark: {
      name: 'dark',
      text: '#dcdcdc',
      bg: '#131217',
      secondary: '#47444e'
    }
  }
}

const getColors: GetColors = (mode) => ({ ...colors, ...colorModes[mode] })
export const getTheme: GetTheme = (mode) => ({
  ...baseTheme,
  colors: getColors(mode)
})

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
`

export default baseTheme
