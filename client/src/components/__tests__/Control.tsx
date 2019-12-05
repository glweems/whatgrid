import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Control from '../Control';
import { initialRows } from '../../pages/store/grid';

describe('Control', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Control type="row" item={initialRows[0]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
