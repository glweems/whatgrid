import { css } from 'styled-components/macro'
import { fontWeight } from 'styled-system'
import { colors, fontSizes, Theme, fontWeights } from './theme'

export const linCss = css({})

export const linkCss = css({
  color: 'primary',
  fontSize: 2,
  fontWeight: 500,
  backgroundColor: 'transparent',
  ':hover': {
    color: 'primary',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  ':active': { color: 'blues' },
  ':disabled': { opacity: 0.75, pointer: 'not-allowed' }
})
