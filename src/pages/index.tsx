import React from 'react';
import { Layout, Grid, Box } from '../components';
import useGrid from '../hooks/useGrid';

export default function IndexPage() {
  const { state, addRow } = useGrid();
  console.log('TCL: IndexPage -> state', state);
  return (
    <Layout>
      <p>Hello, world!</p>
      {JSON.stringify(state)}
      {/* <Controls /> */}
      <button onClick={addRow}>click</button>
      <Grid {...state}></Grid>
    </Layout>
  );
}
