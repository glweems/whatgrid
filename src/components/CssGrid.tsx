import React from 'react';
import styled from 'styled-components/macro';
import useGrid from '../hooks/useGrid';
import { GridItems } from './GridItems';

export default () => {
  const { gridTemplateRows, gridTemplateColumns, gridGapCss } = useGrid();

  return (
    <CssGrid className="CssGrid" gap={gridGapCss} rows={gridTemplateRows} columns={gridTemplateColumns}>
      <GridItems />
    </CssGrid>
  );
};

const CssGrid = styled.div<{ columns: string; rows: string; gap: string }>`
  display: grid;
  grid-template-rows: ${({ rows }) => rows};
  grid-template-columns: ${({ columns }) => columns};
  gap: ${({ gap }) => gap};
  width: 100%;
  height: 100%;
`;
