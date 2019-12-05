import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Layout from '../components/Layout';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
};

export default RegisterPage;
