import React from 'react'
import { Button as RebassButton } from 'rebass/styled-components'
import styled from 'styled-components/macro'
import {
  ColorProps,
  variant as variantFn,
  border,
  borderRadius,
  BorderProps,
  BorderRadiusProps
} from 'styled-system'

type ButtonProps = React.HTMLProps<HTMLButtonElement>

type Props = ButtonProps &
  ColorProps & {
    loading?: boolean
    variant?: 'default' | 'primary' | 'secondary'
  }

const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  variant,
  loading
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={loading}
    >
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  variant: 'default'
}

type StyledButtonProps = Props & BorderProps & BorderRadiusProps

const StyledButton: React.ComponentType<StyledButtonProps> = styled(
  RebassButton
)<Props & BorderRadiusProps>`
  ${border};
  ${borderRadius};

  :hover {
    opacity: 0.9;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }

  ${({ theme: { colors } }) => {
    const { text, bg, whites, primary, secondary } = colors

    return variantFn({
      variants: {
        default: {
          color: text,
          bg,
          ':disabled': {
            bg: whites[2]
          }
        },

        primary: {
          color: whites[11],
          bg: primary,
          border: 0
        },

        secondary: {
          color: whites[11],
          bg: secondary,
          border: 0
        }
      }
    })
  }};
`
StyledButton.defaultProps = {
  borderRadius: 2,
  border: 2
}

export default Button
