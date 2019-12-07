import React, { ReactNode } from 'react';
import styled, { StyledComponent } from 'styled-components/macro';
import useTheme from '../hooks/useTheme';
import Navbar from './Navbar';
const DefaultMain = styled.main``;

// const withStore = (Component: React.ReactNode) => <StoreProvider></StoreProvider>;

interface Props {
  children?: ReactNode;
  Main?: StyledComponent<'main', React.ReactElement, {}, never>;
  Component?: ReactNode;
}

const Layout: React.FC<Props> = ({ children, Main = DefaultMain }) => {
  const { componentMounted } = useTheme();
  if (!componentMounted) return <div />;
  return (
    // <header>TODO</header>
    // {printCode(props)}
    // <GlobalStyle />
    <>
      <Main>
        <Navbar />
        {children}
      </Main>
    </>
    //{/* <footer>TODO</footer> */}
  );
};

export default Layout;
