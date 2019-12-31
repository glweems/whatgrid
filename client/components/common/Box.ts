import styled from 'styled-components/macro'
import {
  space,
  color,
  layout,
  border,
  BorderProps,
  SpaceProps,
  ColorProps,
  LayoutProps
} from 'styled-system'
import { Theme } from '../../utils/theme'

type Props = SpaceProps & ColorProps & LayoutProps & BorderProps

interface ThemeProps {
  theme?: Theme
}

export const Box: React.ComponentType<Props & ThemeProps> = styled.div<Props>`
  ${color};
  ${border};
  ${layout};
  ${space};
`

Box.displayName = 'Box'

Box.defaultProps = {
  border: 1
}
