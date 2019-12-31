import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  color,
  border,
  layout,
  space
} from 'styled-system'

import styled from 'styled-components'
import { ThemeProps } from '../../utils/theme'

type Props = SpaceProps & ColorProps & LayoutProps & BorderProps

export const A: React.ComponentType<Props & ThemeProps> = styled.a<Props>`
  ${color};
  ${border};
  ${layout};
  ${space};
  :hover {
    cursor: pointer;
  }
`

A.defaultProps = {
  m: [1, 2],
  color: 'primary'
}

// A.displayName = 'Anchor'
