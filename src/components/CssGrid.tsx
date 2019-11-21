import React from 'react';
import styled from 'styled-components/macro';
import useGrid from '../hooks/useGrid';
import Controls from './Controls';

export default () => {
  const { GridItems, gridTemplateRows, gridTemplateColumns, gap } = useGrid();

  return (
    <CssGrid className="CssGrid" gap={gap} rows={gridTemplateRows} columns={gridTemplateColumns}>
      <Controls />
      {/* <div /> */}
      <div className="boxes">
        <GridItems className="grid-item" />
      </div>
    </CssGrid>
  );
};

const CssGrid = styled.div<{ columns: string; rows: string; gap: string }>`
  display: grid;
  grid-template-areas: '. row' 'col boxes';
  grid-template-rows: '1fr 1fr';
  grid-template-columns: '1fr 1fr';
  width: 100%;
  height: 100%;

  .row,
  .col,
  .boxes {
    display: grid;
    grid-template-rows: ${({ rows }) => rows};
    grid-template-columns: ${({ columns }) => columns};
    gap: ${(props) => props.gap};
  }

  .row {
    grid-area: row;
    grid-template-rows: 1fr;
    grid-template-columns: ${({ columns }) => columns};
  }

  .col {
    grid-area: col;
    grid-template-rows: ${({ rows }) => rows};
    grid-template-columns: 1fr;
  }

  .boxes {
    grid-area: boxes;
  }
`;
