import uuid from 'uuid/v4';
import { useReducer } from 'reinspect';
import { Boxes } from '../components';

export const availableUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem'];

export const initialRows: GridItem[] = [
  { id: uuid(), type: 'ROW', value: '1fr' },
  { id: uuid(), type: 'ROW', value: '1fr' },
  { id: uuid(), type: 'ROW', value: '1fr' },
];

export const initialColumns: GridItem[] = [
  { id: uuid(), type: 'COLUMN', value: '1fr' },
  { id: uuid(), type: 'COLUMN', value: '1fr' },
  { id: uuid(), type: 'COLUMN', value: '1fr' },
];

export const initialGridItems = [...initialRows, ...initialColumns];

type GridGap = { amount: number; unit: 'px' | 'em' | 'rem' | 'vw' | 'vh' };
const defaultGridGap: GridGap = { amount: 1, unit: 'em' };

export const initialState = {
  gridItems: initialGridItems,
  horizontalGap: defaultGridGap,
  verticalGap: defaultGridGap,
  updating: false,
};

type Action = { type: string; payload: { id: string; type: 'ROW' | 'COLUMN'; value: string } };

export const gridReducer: (state: typeof initialState, payload?: any) => typeof initialState = (state, action) => {
  switch (action.type) {
    case 'ADD_GRID_ITEM':
      return {
        ...state,
        gridItems: [...state.gridItems, action.payload],
      };

    case 'DELETE_GRID_ITEM':
      return {
        ...state,
        gridItems: state.gridItems.filter((item) => item.id !== action.payload.id),
      };

    case 'UPDATE_GRID_ITEM':
      return {
        ...state,
        gridItems: state.gridItems.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };

    case 'UPDATING':
      return {
        ...state,
        updating: true,
      };

    case 'UPDATED':
      return {
        ...state,
        updating: false,
      };

    default:
      return state;
  }
};

export const actionTypes = {
  ADD_GRID_ITEM: 'ADD_GRID_ITEM',
  DELETE_GRID_ITEM: 'DELETE_GRID_ITEM',
  UPDATE_GRID_ITEM: 'UPDATE_GRID_ITEM',
  UPDATING: 'UPDATING',
  UPDATED: 'UPDATED',
};

const useGrid = () => {
  const [state, dispatch] = useReducer(gridReducer, initialState, 'css-grid');

  const awaitUpdate = (event: Action) => {
    dispatch({ type: actionTypes.UPDATING });
    dispatch(event);
    dispatch({ type: actionTypes.UPDATED });
  };

  const addGridItem = (item: GridItem) =>
    awaitUpdate({
      type: actionTypes.ADD_GRID_ITEM,
      payload: { id: uuid(), ...item },
    });

  const deleteGridItem = (item: GridItem) =>
    awaitUpdate({
      type: actionTypes.DELETE_GRID_ITEM,
      payload: item,
    });

  const updateGridItem = (item: GridItem) =>
    awaitUpdate({
      type: actionTypes.UPDATE_GRID_ITEM,
      payload: item,
    });

  const addRow = () =>
    awaitUpdate({
      type: actionTypes.ADD_GRID_ITEM,
      payload: { id: uuid(), type: 'ROW', value: '1fr' },
    });

  const addColumn = () =>
    awaitUpdate({
      type: actionTypes.ADD_GRID_ITEM,
      payload: { id: uuid(), type: 'COLUMN', value: '1fr' },
    });

  const deleteRow = (row: { id: string; type: 'ROW'; value: string }) => deleteGridItem({ type: 'ROW', ...row });

  const deleteColumn = (column: { id: string; type: 'COLUMN'; value: string }) =>
    deleteGridItem({ type: 'COLUMN', ...column });

  const rows = state.gridItems.filter(({ type }) => type === 'ROW');
  const columns = state.gridItems.filter(({ type }) => type === 'COLUMN');

  const getGridTemplateCss = (values: GridItem[]): string => {
    let css = '';
    values.forEach(({ value }) => {
      css += `${value} `;
    });
    return css;
  };

  const gridTemplateRows = getGridTemplateCss(rows);
  const gridTemplateColumns = getGridTemplateCss(columns);

  const gap = `${state.verticalGap.amount}${state.verticalGap.unit} ${state.horizontalGap.amount}${state.horizontalGap.unit}`;

  const GridItems = () => Boxes({ rows, columns });

  return {
    dispatch,
    rows,
    columns,
    addRow,
    deleteRow,
    addColumn,
    deleteColumn,
    updateGridItem,
    gridTemplateRows,
    gridTemplateColumns,
    gap,
    GridItems,
  };
};

export type UseGrid = typeof useGrid;

export default useGrid;
