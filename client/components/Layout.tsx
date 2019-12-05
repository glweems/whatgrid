import React, { ReactNode } from 'react';
import styled, { StyledComponent, ThemeProvider } from 'styled-components/macro';
import { printCode } from '../utils/helpers';
import ContextProvider, { wrapRootElement, withProviders } from './ContextProvider';
import { StoreProvider } from 'easy-peasy';
import store, { useStoreState } from '../store';
import { GlobalStyle } from '../utils/theme';
import useTheme from '../hooks/useTheme';
import { withApollo } from '../utils/apollo';
const DefaultMain = styled.main``;

// const withStore = (Component: React.ReactNode) => <StoreProvider></StoreProvider>;

interface Props {
  children?: ReactNode;
  Main?: StyledComponent<'main', React.ReactElement, {}, never>;
  Component?: ReactNode;
}

const Layout: React.FC<Props> = ({ children, Main = DefaultMain, ...props }) => {
  const { theme, componentMounted } = useTheme();
  if (!componentMounted) return <div />;
  return (
    // <header>TODO</header>
    // {printCode(props)}
    // <GlobalStyle />
    <Main>{children}</Main>
    //{/* <footer>TODO</footer> */}
  );
};

export default withApollo(Layout);
