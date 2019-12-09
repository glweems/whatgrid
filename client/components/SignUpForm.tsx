import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSignUpMutation, AuthInput, SignUpDocument } from './Graphql';
import { Label, Input } from '@rebass/forms';
import { Button } from 'rebass/styled-components';

const SignupForm = () => {
  const [signUp, { data }] = useSignUpMutation(SignUpDocument);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    console.log(data);
  }, []);

  const formik = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: ({ email, password }) => {
      signUp({ variables: { input: { email, password } } });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>{msg}</p>
      <Label htmlFor="email">
        Email
        <Input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
      </Label>

      <Label htmlFor="password">
        Password
        <Input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignupForm;
