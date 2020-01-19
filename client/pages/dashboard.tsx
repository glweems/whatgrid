import React, { FC } from 'react';
import Layout from '../components/Layout';
import { FPC } from '../@types';

interface Props {
  id: any;
}

const DashboardPage: FPC<Props> = ({ id }) => {
  return <Layout sidebar={<Sidebar />}>{id}</Layout>;
};

DashboardPage.getInitialProps = async () => {
  return { id: 12345 };
};

const Sidebar: FC = () => (
  <div>
    <ul>
      <li key="245">grids</li>
      <li key="asdf">settings</li>
    </ul>
  </div>
);

export default DashboardPage;
