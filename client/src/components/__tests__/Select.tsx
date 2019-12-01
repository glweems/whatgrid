import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Select from '../Select';

describe('Select', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Select options={['one', 'two', 'three']} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
