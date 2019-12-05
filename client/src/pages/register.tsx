import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Layout from '../components/Layout';

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  return (
    <Layout>
      <RegistrationForm />
    </Layout>
  );
};

export default RegisterPage;
