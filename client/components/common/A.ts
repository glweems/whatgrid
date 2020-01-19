import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  color,
  border,
  layout,
  space,
  typography,
  TypographyProps
} from 'styled-system';

import styled from 'styled-components';
import { ThemeProps } from '../../utils/theme';
import { linkCss } from '../../utils/css';

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps;

export const A: React.ComponentType<Props & ThemeProps> = styled.a<Props>`
  ${color};
  ${border};
  ${layout};
  ${space};
  ${linkCss};
  ${typography};
`;

A.defaultProps = {
  m: [1, 2],
  color: 'primary',
  fontSize: 2,
  py: 1,
  px: 2
};

// A.displayName = 'Anchor'
