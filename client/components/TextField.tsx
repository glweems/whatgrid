import React, { useContext } from 'react';
import { Label as RebassLabel } from '@rebass/forms';
import styled, { StyledComponent } from 'styled-components/macro';
import { fontSize } from 'styled-system';
import { Input } from './common/Input';
import { FormErrorsContext } from './Form';

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

const TextField: React.FC<Props> = ({ label, name, ...props }) => {
  const formErrors = useContext(FormErrorsContext);
  const hasError = formErrors?.[name] !== undefined;
  const error = formErrors?.[name];

  return (
    <Label htmlFor={name}>
      <span className="TextField_Label">{label}</span>
      <Input id={name} name={name} {...props} error={hasError} />
      {error && <span className="TextField_Error">{error}</span>}
    </Label>
  );
};
type LabelProps = {
  error: boolean;
} & React.HTMLProps<HTMLLabelElement>;

const Label: StyledComponent<typeof RebassLabel, LabelProps> = styled(
  RebassLabel
)`
  ${fontSize}
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  .TextField_Label {
    color: ${({ theme }) => theme.colors.text};
  }

  .TextField_Error {
    height: 14px;
    color: ${({ theme }) => theme.colors.error};
    font-size: 12px;
  }
`;

Label.defaultProps = {
  fontSize: 'inherit',
  fontWeight: 'bold',
  my: 1,
  pt: 1
};

export default TextField;
