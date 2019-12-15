import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'rebass/styled-components';
import { AuthInput, useLoginMutation } from './Graphql';
import { useStoreActions } from '../store';
import Form from './common/Form';
import TextField from './TextField';

const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const { setUser } = useStoreActions(actions => actions.user);

  const [msg] = useState('');

  const { handleChange, handleSubmit } = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      await login({
        variables: { input: { email, password } },
      }).then(({ data }) => setUser(data?.login?.user));
    },
  });

  return (
    <Form columns={2} gap="1em" onSubmit={handleSubmit}>
      <p>{msg}</p>
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

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default LoginForm;
