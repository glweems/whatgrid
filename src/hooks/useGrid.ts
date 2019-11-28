/* eslint-disable import/no-cycle */
import uuid from 'uuid/v4';
import { useReducer } from 'reinspect';
import { Boxes } from '../components';

export const availableUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem', 'auto'];

const defaultInputProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  type: 'number',
};

export const initialRows: GridItem[] = [
  { id: uuid(), type: 'row', amount: 1, unit: 'fr', inputProps: defaultInputProps },
  { id: uuid(), type: 'row', amount: 1, unit: 'fr', inputProps: defaultInputProps },
  { id: uuid(), type: 'row', amount: 1, unit: 'fr', inputProps: defaultInputProps },
];

export const initialColumns: GridItem[] = [
  { id: uuid(), type: 'column', amount: 1, unit: 'fr', inputProps: defaultInputProps },
  { id: uuid(), type: 'column', amount: 1, unit: 'fr', inputProps: defaultInputProps },
  { id: uuid(), type: 'column', amount: 1, unit: 'fr', inputProps: defaultInputProps },
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
};

type Action =
  | {
      type: typeof actionTypes[keyof typeof actionTypes];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: GridItem;
    }
  | undefined;

type Reducer = (state: typeof initialState, action?: Action) => typeof initialState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducer: Reducer = (state, action) => {
  switch (action?.type) {
    case actionTypes.ADD_GRID_ITEM:
      return {
        ...state,
        gridItems: [...state.gridItems, action?.payload],
      };

    case actionTypes.DELETE_GRID_ITEM:
      return {
        ...state,
        gridItems: state.gridItems.filter((item) => item.id !== action?.payload.id),
      };

    case actionTypes.UPDATE_GRID_ITEM:
      return {
        ...state,
        gridItems: state.gridItems.map(({ id, type, amount, unit, inputProps }) => {
          const { payload } = action;
          const { id: payloadId, unit: payloadUnit, amount: payloadAmount } = payload;
          const isItem = id === payloadId;
          const shouldUpdate = isItem && amount === payloadAmount;

          let item = { id, type, amount, unit, inputProps };

          if (isItem) item = payload;

          if (shouldUpdate && payloadUnit === 'fr')
            item = { ...item, amount: 1, inputProps: { ...item.inputProps, step: 1, type: 'number' } };
          if (shouldUpdate && payloadUnit === '%')
            item = { ...item, amount: 25, inputProps: { ...item.inputProps, min: 0, max: 100, step: 5 } };
          if (shouldUpdate && payloadUnit === 'px')
            item = { ...item, amount: 500, inputProps: { ...item.inputProps, min: 0, max: 10000, step: 5 } };
          if (shouldUpdate && payloadUnit === 'vw') item.amount = 25;
          if (shouldUpdate && payloadUnit === 'vh') item.amount = 25;
          if (shouldUpdate && payloadUnit === 'em') item.amount = 25;
          if (shouldUpdate && payloadUnit === 'rem') item.amount = 25;
          if (shouldUpdate && payloadUnit === 'auto')
            item = { ...item, amount: 0, inputProps: { ...item.inputProps, disabled: true } };

          return item;
        }),
      };

    default:
      return state;
  }
};

const useGrid = () => {
  const [state, dispatch] = useReducer(reducer, initialState, 'css-grid');

  const rows: GridItem[] = state.gridItems.filter(({ type: rowType }) => rowType === 'row');

  const columns: GridItem[] = state.gridItems.filter(({ type: colType }) => colType === 'column');

  const addGridItem = ({ type }: { type: string }) =>
    dispatch({
      type: actionTypes.ADD_GRID_ITEM,
      payload: {
        ...state.gridItems.filter((item) => type === item.type)[
          state.gridItems.filter((item) => type === item.type).length - 1
        ],
        id: uuid(),
      },
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

  const getGridTemplateCss = (values: GridItem[]): string => {
    let css = '';
    values.forEach(({ amount, unit }) => {
      css += unit === 'auto' ? `${unit} ` : `${amount}${unit} `;
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
