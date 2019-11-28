/* eslint-disable prefer-const */
import { reducer, initialState } from './useGrid';

test('reducer', () => {
  const state = reducer(initialState);
  expect(state).toEqual({});
});
