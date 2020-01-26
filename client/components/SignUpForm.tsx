import React, { useState } from 'react';
import { useFormik } from 'formik';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Button from './Button';
import TextField from './TextField';
import Form from './Form';
import * as GQL from '../utils/generated';
import { signupValidationSchema } from '../utils/formValidation';
import { useStoreActions } from '../store';

const SignupForm: React.FC<WithRouterProps> = ({ router }) => {
  const [signup] = GQL.useSignupMutation();
  const [error, setError] = useState<{ message: string }[]>([]);
  const { setSession } = useStoreActions(store => store.session);
  const [msg, setMsg] = useState('');

  const { handleChange, handleSubmit, isSubmitting, errors } = useFormik<
    GQL.SignupMutationVariables
  >({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signupValidationSchema,
    validateOnChange: false,
    onSubmit: async values => {
      await signup({
        variables: { ...values }
      })
        .then(({ data }) => {
          setSession(data.signup.user);
          router.push('/dashboard');
        })
        .catch(err => setError(err));
    }
  });

  return (
    <Form onSubmit={handleSubmit} errors={errors}>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        onChange={handleChange}
      />

      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleChange}
      />

      <TextField
        label="Phone Number"
        name="phoneNumber"
        type="text"
        onChange={handleChange}
      />

      <TextField
        label="Username"
        name="username"
        type="text"
        onChange={handleChange}
      />

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
        autoCorrect="current-password"
        onChange={handleChange}
      />

      <Button type="submit" variant="primary" loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

export default withRouter(SignupForm);
