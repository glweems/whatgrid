/* eslint-disable max-len */
import * as React from 'react';
import { StateInspector } from 'reinspect';
import uuid from 'uuid/v4';
import useGrid, { UseGrid, initialRows, initialColumns } from '../hooks/useGrid';

const GridContext = React.createContext({
  rows: initialRows,
  columns: initialColumns,
  addRow: () => {},
  deleteRow: () => {},
  addColumn: () => {},
  deleteColumn: () => {},
  updateGridItem: () => {},
  gridTemplateRows: '1fr 1fr 1fr',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1em 1em',
});

const GridProvider: React.FC = ({ children }) => {
  const grid = useGrid();
  return <GridContext.Provider value={{ ...grid }}>{children}</GridContext.Provider>;
};

const ProviderComposer: React.FC<{ contexts: any }> = ({ contexts, children }: any) =>
  contexts.reduceRight(
    (kids: any, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );

const ContextProvider: React.FC = ({ children }: any) => (
  <ProviderComposer contexts={[<GridProvider key={uuid()} />]}>{children}</ProviderComposer>
);

export default ContextProvider;

export const wrapPageElement: React.FC<{ element: React.ReactNode }> = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
);

export const wrapRootElement: React.FC<{ element: React.ReactElement }> = ({ element }) => (
  <StateInspector name="css-grid">{element}</StateInspector>
);
