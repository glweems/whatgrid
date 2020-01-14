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
import { DefaultVariants } from '../utils/theme'
import * as LoadingSpinner from './LoadingSpinner'

type ButtonProps = React.HTMLProps<HTMLButtonElement>

type Props = ButtonProps &
  ColorProps & {
    loading?: boolean
    variant?: DefaultVariants
  }

const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  variant,
  loading,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={loading}
      {...rest}
    >
      {loading ? <LoadingSpinner.Ripple /> : children}
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

  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }

  :hover {
    opacity: 0.9;
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
          border: 0,
          ':disabled': {
            bg: whites[2]
          }
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
