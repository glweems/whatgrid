import styled from 'styled-components'
import { grid, GridProps, padding, SpaceProps } from 'styled-system'

type Props = GridProps & SpaceProps

export const Form = styled.form<Props>`
  ${grid};
  ${padding};
`

Form.defaultProps = {
  gridGap: '1em',
  padding: 1
}

Form.displayName = 'WhatForm'
