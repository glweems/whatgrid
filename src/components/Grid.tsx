import React from 'react';
import styled from 'styled-components/macro';
import useGrid from '../hooks/useGrid';

export default () => {
  const { GridItems, gridTemplateRows, gridTemplateColumns, gap } = useGrid();

  return (
    <CssGrid
      style={{
        gridTemplateColumns,
        gridTemplateRows,
        gap,
      }}
    >
      <GridItems />
    </CssGrid>
  );
};

const CssGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`;
