import React from 'react';
import styled from 'styled-components/macro';
import { GridItems } from './GridItems';
import { useStoreState } from '../pages/store';

export default () => {
  const { gridTemplateRows, gridTemplateColumns, gridGapCss } = useStoreState(({ grid }) => grid);
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
