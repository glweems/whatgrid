import React from 'react';
import LoginForm from '../components/LoginForm';
import { withApollo } from '../utils/apollo';

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default withApollo(LoginPage);
