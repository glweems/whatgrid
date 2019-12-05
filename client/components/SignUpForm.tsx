import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSignUpMutation, AuthInput, SignUpDocument } from './Graphql';
import CodeHelper from './CodeHelper';

const SignupForm = () => {
  const [signUp, options] = useSignUpMutation(SignUpDocument);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!options.loading) {
      setMsg('success');
    }
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

export default SignupForm;
