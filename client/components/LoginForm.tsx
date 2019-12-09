import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AuthInput } from './Graphql';
import { useLoginMutation } from '../components/Graphql';
import { Label, Input } from '@rebass/forms';
import { Button } from 'rebass/styled-components';
import { useStoreActions } from '../store';

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const { setUser } = useStoreActions((actions) => actions.user);

  const [msg] = useState('');

  const formik = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      login({ variables: { input: { email, password } } }).then(({ data: { login: { user } } }) => setUser(user));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>{msg}</p>
      <Label htmlFor="email">
        Email Address
        <br />
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email Address"
        />
      </Label>

      <Label htmlFor="password">
        Password
        <Input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
      </Label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
