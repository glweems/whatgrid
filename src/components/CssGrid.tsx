import React from 'react';
import styled from 'styled-components/macro';
import useGrid from '../hooks/useGrid';
import Controls from './Controls';

export default () => {
  const { GridItems, gridTemplateRows, gridTemplateColumns, gap, addRow, addColumn } = useGrid();

  const handleAddRow = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addRow();
  };
  const handleAddColumn = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addColumn();
  };

  return (
    <CssGrid className="CssGrid" gap={gap} rows={gridTemplateRows} columns={gridTemplateColumns}>
      <Controls />
      <div className="boxes">
        <GridItems className="grid-item" />
      </div>
      <div className="add-row">
        <button type="button" onClick={handleAddRow}>
          add row
        </button>
      </div>
      <div className="add-column">
        <button type="button" onClick={handleAddColumn}>
          add column
        </button>
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
