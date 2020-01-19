import React from 'react';
import { Label as RebassLabel } from '@rebass/forms';
import styled, { StyledComponent } from 'styled-components/macro';
import { fontSize, borderRadius, border } from 'styled-system';
import { Input } from './common/Input';

const defaultProps = {
  type: 'text'
};

/**
 * No need for labels
 */
type Props = {
  label: string;
  name: string;
} & React.HtmlHTMLAttributes<HTMLInputElement> &
  typeof defaultProps;

const TextField: React.FC<Props> = ({ label, name, ...props }) => (
  <Label htmlFor={name}>
    {label}
    <Input id={name} name={name} {...props} />
  </Label>
);
type LabelProps = React.HTMLProps<HTMLLabelElement>;

const Label: StyledComponent<typeof RebassLabel, LabelProps> = styled(
  RebassLabel
)`
  ${fontSize}
  display: flex;
  flex-direction: column;
`;

Label.defaultProps = {
  fontSize: 3
};

export default TextField;
