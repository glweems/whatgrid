import styled from 'styled-components/macro';
import {
  space,
  color,
  layout,
  border,
  BorderProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  borderRadius,
  BorderRadiusProps
} from 'styled-system';
import { Theme } from '../../utils/theme';

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  BorderRadiusProps & { className?: string };
interface ThemeProps {
  theme?: Theme;
}

export const Box: React.ComponentType<Props & ThemeProps> = styled.div<Props>`
  ${color};
  ${border};
  ${layout};
  ${space};
  ${borderRadius};
`;

Box.displayName = 'Box';

Box.defaultProps = {
  className: 'Box',
  border: 1,
  borderRadius: 2,
  maxWidth: [500, 700, 900]
};
