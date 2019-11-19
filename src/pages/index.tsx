import React from 'react';
import { Layout, Grid, Controls } from '../components';
import useGrid from '../hooks/useGrid';

export default function IndexPage() {
  const reducer = useGrid();

  return (
    <Layout>
      <p>Hello, world!</p>
      <Controls {...reducer} />
      <Grid {...reducer} />
    </Layout>
  );
}
