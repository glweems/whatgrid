import React, { useState } from 'react';
import { useMutation, useQuery, MutationTuple } from '@apollo/react-hooks';
import { Formik, useFormik, withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout';
import REGISTER_USER from '../mutations/RegisterUser.graphql';

import { isValidEmail } from '../utils/helpers';
import { AuthInput } from '../graphql-global-types';
import { RegisterUserMutationVariables, RegisterUserMutation } from '../graphql';
// import registerUser from '../graphql/mutations/RegisterUser.graphql';

const SignupForm = () => {
  const [register] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(REGISTER_USER);
  const formik = useFormik<AuthInput>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      register({ variables: { input: values } });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
