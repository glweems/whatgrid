import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { useLoginMutation, LoginMutationVariables } from '../utils/generated';
import { Form } from './common/Form';
import TextField from './TextField';
import Button from './Button';
import { useStoreActions } from '../store';
import ErrorList from './ErrorList';
import { Box } from './common';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .min(3, 'Please enter no more than 40 characters')
    .required('Please enter your first name')
});

const LoginForm: React.FC<WithRouterProps> = ({ router }) => {
  const { setSession } = useStoreActions(store => store.session);
  const [login] = useLoginMutation();

  const [msg, setMsg] = useState('');

  const { handleChange, handleSubmit, isSubmitting, errors } = useFormik<
    LoginMutationVariables
  >({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: async ({ email, password }) => {
      await login({
        variables: { email, password }
      }).then(({ data }) => {
        setMsg(data.login.user.email);
        setSession(data.login.user);
      });
    }
  });

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <TextField
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
      />

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default withRouter(LoginForm);
