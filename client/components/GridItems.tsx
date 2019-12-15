import React, { Fragment } from 'react';
import uuid from 'uuid/v4';
import GridItem from './GridItem';
import { useStoreState } from '../store';
import Box from './common/Box';

export const GridItems: React.FC = () => {
  const { rows, columns } = useStoreState(state => state.grid);
  return (
    <Fragment key={uuid()}>
      {rows.map(() => (
        <Fragment key={uuid()}>
          {columns.map(() => (
            <Box bg="primary" key={uuid()} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default GridItems;
