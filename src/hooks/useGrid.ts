import uuid from 'uuid/v4';
import { useReducer } from 'reinspect';
import { Boxes } from '../components';

export const availableUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem'];

export const initialRows: GridItem[] = [
  { id: uuid(), type: 'ROW', amount: 1, unit: 'fr' },
  { id: uuid(), type: 'ROW', amount: 1, unit: 'fr' },
  { id: uuid(), type: 'ROW', amount: 1, unit: 'fr' },
];

export const initialColumns: GridItem[] = [
  { id: uuid(), type: 'COLUMN', amount: 1, unit: 'fr' },
  { id: uuid(), type: 'COLUMN', amount: 1, unit: 'fr' },
  { id: uuid(), type: 'COLUMN', amount: 1, unit: 'fr' },
];

export const initialGridItems = [...initialRows, ...initialColumns];

type GridGap = { amount: number; unit: 'px' | 'em' | 'rem' | 'vw' | 'vh' };
const defaultGridGap: GridGap = { amount: 1, unit: 'em' };

export const initialState = {
  gridItems: initialGridItems,
  horizontalGap: defaultGridGap,
  verticalGap: defaultGridGap,
};

type State = {
  gridItems: GridItem[];
  horizontalGap: GridGap;
  verticleGap: GridGap;
};

export const actionTypes = {
  ADD_GRID_ITEM: 'ADD_GRID_ITEM',
  DELETE_GRID_ITEM: 'DELETE_GRID_ITEM',
  UPDATE_GRID_ITEM: 'UPDATE_GRID_ITEM',
  UPDATING: 'UPDATING',
  UPDATED: 'UPDATED',
};

type Action = {
  type: typeof actionTypes[keyof typeof actionTypes];
  payload?: any;
};

export const gridReducer: (state: State, action: Action) => any = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_GRID_ITEM:
      return {
        ...state,
        gridItems: [...state.gridItems, action.payload],
      };

    case actionTypes.DELETE_GRID_ITEM:
      return {
        ...state,
        gridItems: state.gridItems.filter((item) => item.id !== action.payload.id),
      };

    case actionTypes.UPDATE_GRID_ITEM:
      return {
        ...state,
        gridItems: state.gridItems.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

const useGrid = () => {
  const [state, dispatch] = useReducer(gridReducer, initialState, 'css-grid');

  const addGridItem = (item: NoIdGridItem) =>
    dispatch({
      type: actionTypes.ADD_GRID_ITEM,
      payload: { id: uuid(), ...item },
    });

  const deleteGridItem = (item: GridItem) =>
    dispatch({
      type: actionTypes.DELETE_GRID_ITEM,
      payload: item,
    });

  const updateGridItem = (item: GridItem) =>
    dispatch({
      type: actionTypes.UPDATE_GRID_ITEM,
      payload: item,
    });

  const rows: GridItem[] = state.gridItems.filter((item: GridItem) => item.type === 'ROW');
  const columns: GridItem[] = state.gridItems.filter((item: GridItem) => item.type === 'COLUMN');

  const getGridTemplateCss = (values: GridItem[]): string => {
    let css = '';
    values.forEach(({ amount, unit }) => {
      css += `${amount}${unit} `;
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
    addGridItem,
    deleteGridItem,
    updateGridItem,
    gridTemplateRows,
    gridTemplateColumns,
    gap,
    GridItems,
  };
};

export type UseGrid = typeof useGrid;

export default useGrid;
