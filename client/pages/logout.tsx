import React from 'react';
import { FPC } from '../@types';

const LogoutPage: FPC = () => {
  return <div>logout</div>;
};

LogoutPage.getInitialProps = async ({ apolloClient }) => {
  apolloClient.resetStore();
  return {};
};

export default LogoutPage;
