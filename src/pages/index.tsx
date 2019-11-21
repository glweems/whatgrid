/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components/macro';
import { Layout, Controls, CssGrid } from '../components';

export default function IndexPage() {
  return (
    <Layout Main={Main}>
      <h1 className="title">CSS GRIDZ</h1>
      <Controls />
      <CssGrid />
    </Layout>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'title title'
    'controls css-grid';
  grid-template-rows: auto 1fr;
  grid-template-columns: 300px 1fr;

  .title {
    grid-area: title;
  }
  .Controls {
    grid-area: controls;
  }

  .CssGrid {
    grid-area: css-grid;
  }
`;
