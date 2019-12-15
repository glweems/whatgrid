import React, { ReactNode } from 'react';
import styled, { StyledComponent } from 'styled-components/macro';
import useTheme from '../hooks/useTheme';
import Navbar from './Navbar';
import { GlobalStyle } from '../utils/theme';
// import { Flex, Box, Text } from 'rebass/styled-components';
import Sidebar from './Sidebar';
import { withApollo } from '@apollo/react-hoc';
import Grid from './common/Grid';

// const withStore = (Component: React.ReactNode) => <StoreProvider></StoreProvider>;

interface Props {
  children?: ReactNode;
  Main?: StyledComponent<'main', React.ReactElement, {}, never>;
  Component?: ReactNode;
}

const Layout: React.FC<any> = ({ children, Main = styled.main`` }) => {
  const { componentMounted } = useTheme();
  if (!componentMounted) return <div />;

  return (
    <Wrapper>
      <Navbar />
      <Sidebar />
      <Main>{children}</Main>
      <GlobalStyle />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
    'navbar navbar'
    'sidebar css-grid';
  grid-template-rows: auto 1fr;
  grid-template-columns: 300px 1fr;
  height: 100%;
  height: 100vh;
  overflow-y: auto;

  header {
    grid-area: navbar;
  }

  .title {
    grid-area: title;
  }

  .Sidebar {
    grid-area: sidebar;
    height: 100%;
  }

  ${Grid as any} {
    grid-area: css-grid;
  }
`;

export default Layout;
