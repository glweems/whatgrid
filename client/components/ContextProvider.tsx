/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';

import useTheme from '../hooks/useTheme';
import { GlobalStyle, getTheme } from '../utils/theme';
import store from '../store';

export const ThemeContext = React.createContext({
  theme: getTheme('light'),
  componentMounted: false,
  toggleTheme: () => {},
});

// const ThemeProvider: React.FC = ({ children }) => {
//   const { theme, componentMounted, toggleTheme } = useTheme();

//   return <ThemeContext.Provider value={{ theme, componentMounted, toggleTheme }}>{children}</ThemeContext.Provider>;
// };

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
      contexts={[<StoreProvider store={store} />, <StyledThemeProvider theme={{ ...theme, toggleTheme }} />]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;

export const StyledWrapper: React.FC = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);
  // if (!componentMounted) return <div />;
  return (
    <StyledThemeProvider theme={theme}>
      <>
        {children}
        <GlobalStyle />
      </>
    </StyledThemeProvider>
  );
};

export const wrapRootElement: React.FC<{ element: React.ReactNode }> = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
);

export const wrapPageElement: React.FC<{ element: React.ReactElement }> = ({ element }) => (
  <StyledWrapper>{element}</StyledWrapper>
);

export const withProviders = ({ name = 'hello', ...otherProps }: any) => <div {...otherProps}>Hello {name}!</div>;
