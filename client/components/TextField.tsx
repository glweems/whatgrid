import React from 'react'
import { Label as RebassLabel } from '@rebass/forms'
import styled from 'styled-components/macro'
import { Input } from './common/Input'

const defaultProps = {
  type: 'text'
}

/**
 * No need for labels
 */
type Props = {
  label: string
  name: string
  errors: {
    [key: string]: string
  }
} & React.HtmlHTMLAttributes<HTMLInputElement> &
  typeof defaultProps

const TextField: React.FC<Props> = ({ label, name, errors, ...props }) => (
  <Label htmlFor={name}>
    <span>{label}</span>
    <ErrorMsg>{errors[name]}</ErrorMsg>

    <Input id={name} name={name} {...props} />
  </Label>
)

const Label = styled(RebassLabel)`
  display: flex;
  flex-direction: column;
`

const ErrorMsg = styled.span`
  height: 2em;
  color: red;
`

export default TextField
