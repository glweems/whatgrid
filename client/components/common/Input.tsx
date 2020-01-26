import styled, { StyledComponent } from 'styled-components';
import { Input as RebassInput } from '@rebass/forms';
import * as System from 'styled-system';

const utility = System.compose(
  System.borderRadius,
  System.border,
  System.space,
  System.color
);

type Props = {} & System.SpaceProps &
  System.BorderProps &
  System.BorderRadiusProps &
  System.ColorProps;

type InputProps = { error: boolean } & React.HTMLProps<HTMLButtonElement>;

export const Input: StyledComponent<
  typeof RebassInput,
  InputProps,
  Props,
  never
> = styled.input<{ error: boolean }>`
  ${utility};
  display: block;
  box-sizing: border-box;
  min-width: 0;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.errors[7] : theme.colors.shades[5]};
  appearance: none;
  :focus {
    border: ${({ theme }) => `${theme.borders[1]} ${theme.colors.primary}`};
    border-color: ${({ theme, error }) =>
      error ? theme.colors.errors[10] : theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blues[1]};
  }
`;

Input.defaultProps = {
  padding: 1,
  w: '100%',
  border: 1,
  m: 0,
  borderRadius: 2,
  bg: 'white',
  borderColor: 'whites[2]'
};

Input.displayName = 'Input';
