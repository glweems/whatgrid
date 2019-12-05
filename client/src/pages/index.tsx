/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components/macro';
import Layout from '../components/Layout';
import CssGrid from '../components/CssGrid';
import Sidebar from '../components/Sidebar';

export default function IndexPage() {
  return (
    <Layout Main={Main}>
      <Sidebar />
      <CssGrid />
    </Layout>
  );
}

const Main = styled.main`
  position: relative;
  display: grid;
  grid-template-areas: 'sidebar css-grid';
  grid-template-rows: 1fr;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  .title {
    grid-area: title;
  }
  .Sidebar {
    grid-area: sidebar;
    height: 100%;
    /* background-color: pink; */
  }

  .CssGrid {
    grid-area: css-grid;
  }
`;
