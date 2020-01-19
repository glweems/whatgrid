/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { FPC } from '../@types';
import Layout from '../components/Layout';

interface Props extends WithRouterProps {
  query: {
    register: boolean;
  };
}

const WelcomePage: FPC<Props> = ({ router: { query } }) => {
  return (
    <Layout>
      <pre>
        <code>{query.register}</code>
      </pre>
    </Layout>
  );
};

export default withRouter(WelcomePage);
