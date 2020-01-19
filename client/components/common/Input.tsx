import styled, { StyledComponent } from 'styled-components';
import { Input as RebassInput } from '@rebass/forms';
import {
  border,
  space,
  borderRadius,
  BorderProps,
  SpaceProps,
  BorderRadiusProps,
  ColorProps,
  color
} from 'styled-system';

type Props = {} & SpaceProps & BorderProps & BorderRadiusProps & ColorProps;

type InputProps = React.HTMLProps<HTMLButtonElement>;

export const Input: StyledComponent<
  typeof RebassInput,
  InputProps,
  Props,
  never
> = styled(RebassInput)`
  ${borderRadius};
  ${border};
  ${space};
  ${color};
  :focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

Input.defaultProps = {
  padding: 2,
  border: 2,
  borderRadius: 2,
  bg: ''
};

Input.displayName = 'Input';
