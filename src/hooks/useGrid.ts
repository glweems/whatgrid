import { GridColumnProperty, GridProperty } from 'csstype';
import uuid from 'uuid/v4';
import { useReducer } from 'react';

class GridItem {
  id: string;
  amount: number;
  unit: GridUnit;
  value: string;
  constructor(amount: number = 1, unit: GridUnit = 'fr') {
    this.id = uuid();
    this.amount = amount;
    this.unit = unit;
    this.value = `${amount}${unit}`;
  }
}

export const initialState: GridData = {
  rows: [new GridItem(1, 'fr'), new GridItem(1, 'fr'), new GridItem(1, 'fr')],
  columns: [
    new GridItem(1, 'fr'),
    new GridItem(1, 'fr'),
    new GridItem(1, 'fr'),
  ],
  gap: {
    amount: 10,
    unit: 'px',
  },
};

type GridReducer = (
  state: GridData,
  action: { type: string; payload?: any },
) => GridData;

const reducer: GridReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        ...state,
        rows: [...state.rows, new GridItem()],
      };

    case 'DELETE_ROW':
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.payload.id),
      };

    case 'ADD_COLUMN':
      return {
        ...state,
        columns: [...state.columns, new GridItem()],
      };

    case 'DELETE_COLUMN':
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export type UseGridValues = {
  state: GridData;
  addRow: () => void;
  deleteRow: (item: GridValue) => void;
  addColumn: () => void;
  deleteColumn: (item: GridValue) => void;
};

const useGrid = (): UseGridValues => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (state) => state,
    'css-grid',
  );

  const addRow = () => {
    dispatch({ type: 'ADD_COLUMN' });
  };

  const deleteRow = (item: GridValue) => {
    dispatch({ type: 'DELETE_COLUMN', payload: item });
  };

  const addColumn = () => {
    dispatch({ type: 'ADD_COLUMN' });
  };

  const deleteColumn = (item: GridValue) => {
    dispatch({ type: 'DELETE_COLUMN', payload: item });
  };

  return {
    state,
    addRow,
    deleteRow,
    addColumn,
    deleteColumn,
  };
};

export default useGrid;
