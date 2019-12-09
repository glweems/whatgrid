import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSignUpMutation, AuthInput, SignUpDocument } from './Graphql';
import { Label, Input } from '@rebass/forms';
import { Button } from 'rebass/styled-components';
import { useStoreActions } from '../store';

const SignupForm = () => {
  const [signUp] = useSignUpMutation(SignUpDocument);
  const { setUser } = useStoreActions((actions) => actions.user);
  const [msg, setMsg] = useState('');

  const formik = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: ({ email, password }) => {
      signUp({ variables: { input: { email, password } } }).then(({ data }) => setUser(data.register.user));
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
