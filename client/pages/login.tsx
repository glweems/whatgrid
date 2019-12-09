import React from 'react';
import LoginForm from '../components/LoginForm';
import { withApollo } from '../utils/apollo';
import Layout from '../components/Layout';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
