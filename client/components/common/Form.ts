import styled, { StyledComponent } from 'styled-components';
import {
  grid,
  GridProps,
  space,
  SpaceProps,
  LayoutProps,
  BorderProps,
  BorderRadiusProps,
  ColorProps,
  border,
  borderRadius,
  layout,
  color
} from 'styled-system';
import { Box } from './Box';

type Props = GridProps &
  SpaceProps &
  BorderProps &
  BorderRadiusProps &
  LayoutProps &
  ColorProps;

type FormProps = React.ReactHTMLElement<HTMLFormElement>;
export const Form: StyledComponent<'form', FormProps, Props> = styled.form`
  ${grid};
  ${space};
  ${border};
  ${borderRadius};
  ${layout};
  ${color};
  display: grid;
  justify-content: stretch;
  justify-items: stretch;

  [type='submit'] {
    align-self: flex-end;
    text-align: center;
  }
`;

Form.defaultProps = {
  bg: 'text',
  color: 'bg',
  maxWidth: 400,
  mx: 'auto',
  gridGap: '1em',
  gridTemplateColumns: '100%',
  gridAutoRows: '1fr',
  padding: 3,
  borderRadius: 3,
  border: 2
};

Form.displayName = 'Form';
