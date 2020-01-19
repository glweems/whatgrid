import { createGlobalStyle, css } from 'styled-components/macro'
import { darken } from 'polished'
import {
  ResponsiveValue,
  TLengthStyledSystem,
  BorderWidthProps,
  BorderStyleProps,
  BorderColorProps,
  BorderRadiusProps,
  BorderTopProps,
  BorderRightProps,
  BorderBottomProps,
  BorderLeftProps
} from 'styled-system'
import * as CSS from 'csstype'

export type ValuesOf<T extends any[]> = T[number]

export const colors = {
  primary: '#4e67eb',
  blues: [
    '#4e67eb',
    darken(0.05, '#4e67eb'),
    darken(0.2, '#4e67eb'),
    darken(0.3, '#4e67eb'),
    darken(0.5, '#4e67eb')
  ],
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
    'rgba(255,255,255,.9)',
    'rgba(255,255,255)'
  ]
}

const colorModes: Modes = {
  light: {
    text: '#131217',
    bg: '#fff',
    secondary: '#47444e'
  },
  dark: {
    text: '#dcdcdc',
    bg: '#131217',
    secondary: '#47444e'
  }
}

export type DefaultVariants = 'default' | 'primary' | 'secondary'

export type ColorProps = {
  color?: ResponsiveValue<keyof ColorMode> | CSS.ColorProperty
  bg?: ResponsiveValue<keyof ColorMode> | CSS.ColorProperty
  opacity?: ResponsiveValue<CSS.GlobalsNumber>
}

export const modes = [
  'light',
  'dark'
  // more than two modes can follow...
]

export interface Modes {
  light: ColorMode
  dark: ColorMode
}

export type ColorMode = {
  text: string
  bg: string
  secondary: string
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
// eslint-disable-next-line @typescript-eslint/no-use-before-define

export interface Theme {
  colors: ColorMode
}

export interface ThemeProps {
  theme?: Theme
}
export const layout = {
  navbarHeight: 35,
  sidebarWidth: 300
}
export const breakpoints = [32, 48, 64]
export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]
export const fontSizes = [12, 14, 16, 20, 24, 36, 48, 80, 96]
export const borders = [
  0,
  '1px solid',
  '2px solid',
  '4px solid',
  '8px solid',
  '16px solid',
  '32px solid'
]

export const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export type Borders = ValuesOf<typeof borders>

/**
 * The border CSS property sets an element's border. It's a shorthand for border-width, border-style,
 * and border-color.
 *
 * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
 */
export type BorderProps<TLength = TLengthStyledSystem> = BorderWidthProps &
  BorderStyleProps &
  BorderColorProps &
  BorderRadiusProps &
  BorderTopProps &
  BorderRightProps &
  BorderBottomProps &
  BorderLeftProps & {
    border?: Borders & ResponsiveValue<CSS.BorderProperty<TLength>>
    borderX?: Borders & ResponsiveValue<CSS.BorderProperty<TLength>>
    borderY?: Borders & ResponsiveValue<CSS.BorderProperty<TLength>>
  }

export const baseTheme = {
  layout,
  breakpoints,
  space,
  fontSizes,
  fontWeights,
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
  borders,
  radii: [0, 2, 4, 16, 9999, '100%'],
  width: [16, 32, 64, 128, 256],
  heights: [16, 32, 64, 128, 256],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  modes: {
    light: {
      text: '#131217',
      bg: '#fff',
      secondary: '#47444e'
    },
    dark: {
      text: '#dcdcdc',
      bg: '#131217',
      secondary: '#47444e'
    }
  }
}

const getColors: GetColors = (mode) => ({ ...colors, ...colorModes[mode] })
export const getTheme: GetTheme = (mode) => ({
  ...baseTheme,
  mode,
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
