/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { StateInspector } from 'reinspect';
import uuid from 'uuid/v4';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import useGrid from '../hooks/useGrid';
import useTheme from '../hooks/useTheme';
import { GlobalStyle, getTheme } from '../utils/theme';

export const ThemeContext = React.createContext({
  theme: getTheme('light'),
  componentMounted: false,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC = ({ children }) => {
  const { theme, componentMounted, toggleTheme } = useTheme();

  return <ThemeContext.Provider value={{ theme, componentMounted, toggleTheme }}>{children}</ThemeContext.Provider>;
};
const GridContext = React.createContext({});

const GridProvider: React.FC = ({ children }) => {
  const grid = useGrid();
  return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};

const ProviderComposer: React.FC<{ contexts: any }> = ({ contexts, children }: any) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );

const ContextProvider: React.FC = ({ children }: any) => {
  return (
    <ProviderComposer
      contexts={[<DndProvider backend={HTML5Backend} />, <ThemeProvider />, <GridProvider key={uuid()} />]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;

const StyledWrapper: React.FC = ({ children }) => {
  const { theme, componentMounted } = React.useContext(ThemeContext);
  if (!componentMounted) return <div />;
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

export const wrapPageElement: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return (
    <StateInspector name="css-grid">
      <StyledWrapper>{element}</StyledWrapper>
    </StateInspector>
  );
};
