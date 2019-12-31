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
} & React.HtmlHTMLAttributes<HTMLInputElement> &
  typeof defaultProps

const TextField: React.FC<Props> = ({ label, name, ...props }) => (
  <Label htmlFor={name}>
    <span>{label}</span>
    <Input id={name} name={name} {...props} />
  </Label>
)

const Label = styled(RebassLabel)`
  display: flex;
  flex-direction: column;
`

export default TextField
