import * as React from 'react';
import useGrid, { initialState, UseGridValues } from '../hooks/useGrid';
import { StateInspector } from 'reinspect';

const GridContext = React.createContext<UseGridValues>({
  state: initialState,
  addRow: () => {},
  deleteRow: (item: GridValue) => {},
  addColumn: () => {},
  deleteColumn: (item: GridValue) => {},
});

const GridProvider: React.FC = ({ children }) => {
  const { state, addRow, deleteRow, addColumn, deleteColumn } = useGrid();
  return (
    <GridContext.Provider
      value={{ state, addRow, deleteRow, addColumn, deleteColumn }}
    >
      <StateInspector>{children}</StateInspector>
    </GridContext.Provider>
  );
};

const ProviderComposer = ({ contexts, children }: any) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return React.cloneElement(parent, {
      children: kids,
    });
  }, children);
};

const ContextProvider: React.FC = ({ children }: any) => (
  <ProviderComposer contexts={[<GridProvider />]}>{children}</ProviderComposer>
);

export default ContextProvider;

export const wrapRootElement: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => (
  <ContextProvider>
    <StateInspector name="css grid" initialState={initialState}>
      {element}
    </StateInspector>
  </ContextProvider>
);

// export const wrapPageElement: React.FC = ({ children }) => <>{children}</>;
