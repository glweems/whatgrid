const GridContext = React.createContext<GridContext>({
  rows: initialRows,
  setRows: () => null,
  columns: initialColumns,
  setColumns: () => null,
});

const GridProvider: React.FC = ({ children }) => {
  const {
    rows,
    setRows,
    columns,
    setColumns,
    updating,
    setUpdating,
  } = useGrid();
  return (
    <GridContext.Provider
      value={{ rows, setRows, columns, setColumns, updating, setUpdating }}
    >
      {children}
    </GridContext.Provider>
  );
};
