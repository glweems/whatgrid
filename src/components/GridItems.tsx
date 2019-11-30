import React, { Fragment } from 'react';
import uuid from 'uuid/v4';
import GridItem from './GridItem';
import useGrid from '../hooks/useGrid';

interface Props {
  rows: GridItem[];
  columns: GridItem[];
}

export const GridItems: React.FC = () => {
  const { rows, columns } = useGrid();

  return (
    <Fragment key={uuid()}>
      {rows.map(() => (
        <Fragment key={uuid()}>
          {columns.map(() => (
            <GridItem key={uuid()} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default GridItems;
