import { gridReducer, initialState } from './useGrid';

test('basic', () => {
  expect(gridReducer(initialState)).toBe(0);
});
