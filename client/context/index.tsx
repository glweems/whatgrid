/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import useTheme from '../hooks/useTheme';
import store from '../store';
import UserProvider from './user';
import withApollo from '../apollo/withApollo';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';

const ProviderComposer: React.FC<{ contexts: React.ReactNode[] | any }> = ({
  contexts,
  children,
}: any) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );

type Props = { apolloClient: typeof ApolloClient };

const ContextProvider: React.FC<Props> = ({ children, apolloClient }) => {
  const { theme, componentMounted, toggleTheme } = useTheme();

  if (!componentMounted && !apolloClient) return <div />;

  return (
    <ApolloProvider client={apolloClient}>
      <ProviderComposer
        contexts={[
          <StoreProvider store={store} />,
          <StyledThemeProvider theme={{ ...theme, toggleTheme }} />,
          <UserProvider />,
        ]}
      >
        {children}
      </ProviderComposer>
    </ApolloProvider>
  );
};

export default withApollo(ContextProvider);
