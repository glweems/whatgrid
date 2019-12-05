import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSignUpMutation, AuthInput, SignUpDocument } from './Graphql';
import CodeHelper from './CodeHelper';
import { useLoginMutation } from '../components/Graphql';
const LoginForm: React.FC = () => {
  const [login] = useLoginMutation();
  const [msg, setMsg] = useState('');

  const formik = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      login({ variables: { input: { email, password } } });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>{msg}</p>
      <label htmlFor="email">
        Email Address
        <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
      </label>

      <label htmlFor="password">
        Last Name
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;