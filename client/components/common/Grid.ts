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
import { ThemeProps } from '../../utils/theme'

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  GridProps & {}

export const Grid: React.ComponentType<Props & ThemeProps> = styled.div<Props>`
  ${grid};
  ${color};
  ${border};
  ${layout};
  ${space};
`

Grid.displayName = 'Grid'
