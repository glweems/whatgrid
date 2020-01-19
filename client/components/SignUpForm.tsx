import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from './Button';
import TextField from './TextField';
import { Form } from './common';
import * as Gen from '../utils/generated';

const SignupForm = () => {
  const [signup] = Gen.useSignupMutation();
  const [msg, setMsg] = useState('');

  const { handleChange, handleSubmit, isSubmitting } = useFormik<
    Gen.SignupMutationVariables
  >({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: async ({ email, password }) => {
      await signup({
        variables: { email, password }
      }).then(({ data }) => {
        setMsg(data.signup.user.email);
      });
    }
  });

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        label="Email Address"
        name="email"
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
        label="Password"
        name="password"
        type="password"
        autoCorrect="current-password"
        onChange={handleChange}
      />

      <div>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
