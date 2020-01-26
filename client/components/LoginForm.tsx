import React, { useState } from 'react';
import { useFormik } from 'formik';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { useLoginMutation, LoginMutationVariables } from '../utils/generated';
import Form from './Form';
import TextField from './TextField';
import Button from './Button';
import { useStoreActions } from '../store';
import { loginValidationSchema } from '../utils/formValidation';
import ErrorList from './ErrorList';

const LoginForm: React.FC<WithRouterProps> = ({ router }) => {
  const { setSession } = useStoreActions(store => store.session);
  const [login] = useLoginMutation();
  const [errors, setErrors] = useState<{
    graphQLErrors: { message: string }[];
  }>({ graphQLErrors: [] });
  const [error, setError] = useState<{ message: string }[]>([]);
  const { handleChange, handleSubmit, errors: formErrors } = useFormik<
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
      })
        .then(({ data }) => {
          setSession(data.login.user);
          router.push('/dashboard', '/dashboard');
        })
        .catch(err => setErrors(err));
    }
  });

  return (
    <Form onSubmit={handleSubmit} errors={formErrors}>
      <ErrorList errors={errors.graphQLErrors} />
      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
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
