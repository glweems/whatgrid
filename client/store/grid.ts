/* eslint-disable no-param-reassign */
import { Action, action, computed, Computed } from 'easy-peasy'
import uuid from 'uuid/v4'

export type GridUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem', 'auto']

export type GridUnit = GridUnits[number] | string

export type InputProps = {
  min: number
  max: number
  step: number
  disabled: boolean
  type: string
}

export type GridItem = {
  id: string
  type: string | 'row' | 'column'
  amount: number
  unit: GridUnit
  inputProps: InputProps
}

export const availableUnits = ['fr', '%', 'px', 'vw', 'vh', 'em', 'rem', 'auto']

export const availableGridGapUnits = ['px', 'em', 'vh', 'vw']

export type GridGap = {
  type: string
  amount: number
  unit: typeof availableGridGapUnits[number]
}

const defaultInputProps = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  type: 'number'
}

export const initialRows: GridItem[] = [
  {
    id: uuid(),
    type: 'row',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  },
  {
    id: uuid(),
    type: 'row',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  },
  {
    id: uuid(),
    type: 'row',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  }
]

export const initialColumns: GridItem[] = [
  {
    id: uuid(),
    type: 'column',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  },
  {
    id: uuid(),
    type: 'column',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  },
  {
    id: uuid(),
    type: 'column',
    amount: 1,
    unit: 'fr',
    inputProps: defaultInputProps
  }
]

export interface GridModel {
  items: GridItem[]
  rows: Computed<GridModel, GridItem[]>
  columns: Computed<GridModel, GridItem[]>
  rowCount: Computed<GridModel, number>
  columnCount: Computed<GridModel, number>
  addGridItem: Action<GridModel, 'row' | 'column'>
  deleteGridItem: Action<GridModel, GridItem>
  updateGridItem: Action<GridModel, GridItem>
  gridTemplateRows: Computed<GridModel, string>
  gridTemplateColumns: Computed<GridModel, string>
  verticalGap: GridGap
  horizontalGap: GridGap
  gridGap: Computed<GridModel, GridGap[]>
  gridGapCss: Computed<GridModel, string>
  updateGridGap: Action<
    GridModel,
    { type: string; amount?: number; unit?: string }
  >
}

const getGridTemplateCss = (values: GridItem[]): string =>
  values
    .map(({ amount, unit }) => (unit === 'auto' ? unit : `${amount}${unit}`))
    .join(' ')

const gridModel: GridModel = {
  items: [...initialRows, ...initialColumns],

  rows: computed(({ items }) => items.filter(({ type }) => type === 'row')),

  columns: computed(({ items }) =>
    items.filter(({ type }) => type === 'column')
  ),

  rowCount: computed(({ rows }) => rows.length),

  columnCount: computed(({ columns }) => columns.length),

  addGridItem: action(
    ({ items, rows, columns, rowCount, columnCount }, payload) => {
      let newItem
      if (payload === 'row') newItem = rows[rowCount - 1]
      if (payload === 'column') newItem = columns[columnCount - 1]
      if (newItem) items.push({ ...newItem, id: uuid() })
    }
  ),

  deleteGridItem: action(({ items }, payload) => {
    const index = items.findIndex((item) => item.id === payload.id)
    const item = items[index]

    const others = items.filter((other) => other.type === item.type)

    if (others.length > 1) items.splice(index, 1)
  }),

  updateGridItem: action(({ items }, payload) => {
    const index = items.findIndex((item) => item.id === payload.id)
    let newItem: GridItem = { ...items[index], ...payload }
    const isItem = items[index].id === payload.id
    const shouldUpdate = isItem && items[index].amount === payload.amount

    if (shouldUpdate && payload.unit === 'fr')
      newItem = {
        ...newItem,
        amount: 1,
        inputProps: {
          ...newItem.inputProps,
          step: 1,
          type: 'number'
        }
      }

    if (shouldUpdate && payload.unit === '%')
      newItem = {
        ...newItem,
        amount: 25,
        inputProps: {
          ...newItem.inputProps,
          min: 0,
          max: 100,
          step: 5
        }
      }

    if (shouldUpdate && payload.unit === 'px')
      newItem = {
        ...newItem,
        amount: 500,
        inputProps: {
          ...newItem.inputProps,
          min: 0,
          max: 10000,
          step: 5
        }
      }

    if (shouldUpdate && payload.unit === 'auto')
      newItem = {
        ...newItem,
        amount: 0,
        inputProps: { ...newItem.inputProps, disabled: true }
      }
    items[index] = newItem
  }),

  gridTemplateRows: computed(({ rows }) => getGridTemplateCss(rows)),
  gridTemplateColumns: computed(({ columns }) => getGridTemplateCss(columns)),

  verticalGap: { type: 'vertical', amount: 1, unit: 'em' },

  horizontalGap: { type: 'horizontal', amount: 1, unit: 'em' },

  gridGap: computed(({ verticalGap, horizontalGap }) => [
    verticalGap,
    horizontalGap
  ]),

  gridGapCss: computed(({ gridGap }) =>
    gridGap.map((gap) => `${gap.amount}${gap.unit}`).join(' ')
  ),

  updateGridGap: action((state, payload) => {
    const { verticalGap, horizontalGap } = state

    if (payload.type === 'vertical')
      state.verticalGap = { ...verticalGap, ...payload }
    if (payload.type === 'horizontal')
      state.horizontalGap = { ...horizontalGap, ...payload }
  })
}

export default gridModel
