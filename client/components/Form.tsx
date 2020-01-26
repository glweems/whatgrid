import React, { FormEvent } from 'react';
import styled, { StyledComponent } from 'styled-components/macro';
import * as System from 'styled-system';
import { FormikErrors } from 'formik';

export const FormErrorsContext = React.createContext({});

interface Props {
  errors?: FormikErrors<any>;
  onSubmit: (e?: FormEvent<HTMLFormElement>) => void;
  children: any;
}

type FormProps = React.ReactHTMLElement<HTMLFormElement> & StyleProps;

type StyleProps = System.GridProps &
  System.SpaceProps &
  System.BorderProps &
  System.BorderRadiusProps &
  System.LayoutProps &
  System.ColorProps;

const FormComponent: React.FC<Props> = ({ children, errors, ...props }) => {
  return (
    <FormErrorsContext.Provider value={errors}>
      <Form {...props}>{children}</Form>
    </FormErrorsContext.Provider>
  );
};

export default FormComponent;

export const Form: StyledComponent<'form', FormProps, any> = styled.form`
  ${System.compose(
    System.grid,
    System.space,
    System.border,
    System.borderRadius,
    System.layout,
    System.color
  )};
  display: grid;
  justify-content: stretch;
  justify-items: stretch;
  [type='submit'] {
    align-self: flex-end;
    text-align: center;
  }
`;

Form.defaultProps = {
  // bg: 'text',
  color: 'bg',
  maxWidth: 400,
  mx: 'auto',
  gridGap: '1em',
  gridTemplateColumns: '100%',
  gridAutoRows: '1fr',
  padding: 3,
  borderRadius: 3,
  border: 2
};

Form.displayName = 'Form';
