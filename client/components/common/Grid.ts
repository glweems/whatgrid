import {
  grid,
  space,
  color,
  layout,
  border,
  GridProps,
  BorderProps,
  SpaceProps,
  ColorProps,
  LayoutProps
} from 'styled-system'
import styled from 'styled-components/macro'

import { Theme } from '../../utils/theme'

interface Props
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    BorderProps,
    GridProps {}

interface ThemeProps {
  theme?: Theme
}

export const Grid: React.ComponentType<Props & ThemeProps> = styled.div<Props>`
  ${grid};
  ${color};
  ${border};
  ${layout};
  ${space};
`

Grid.displayName = 'Grid'

export default Grid
