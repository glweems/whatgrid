/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import useTheme from '../hooks/useTheme';
import store from '../store';
import UserProvider from './user';

const ProviderComposer: React.FC<{ contexts: any }> = ({ contexts, children }: any) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );

const ContextProvider: React.FC = ({ children }: any) => {
  const { theme, componentMounted, toggleTheme } = useTheme();

  if (!componentMounted) return <div />;

  return (
    <ProviderComposer
      contexts={[
        <StoreProvider store={store} />,
        <StyledThemeProvider theme={{ ...theme, toggleTheme }} />,
        <UserProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
