import styled, { StyledComponent } from 'styled-components'
import { Input as RebassInput } from '@rebass/forms'
import { border, space, BorderProps, SpaceProps } from 'styled-system'

type Props = {} & SpaceProps & BorderProps

type InputProps = React.HTMLProps<HTMLButtonElement>

export const Input: StyledComponent<
  typeof RebassInput,
  InputProps,
  Props,
  never
> = styled(RebassInput)`
  ${border};
  ${space};
  :focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

Input.defaultProps = {
  padding: 2,
  border: 2
}

Input.displayName = 'Input'
