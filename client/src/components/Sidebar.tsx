import React, { useCallback, useContext } from 'react';
import styled from 'styled-components/macro';
import uuid from 'uuid/v4';
import { ThemeContext } from './ContextProvider';
import GridGapControl from './GridGapControls';
import { useStoreActions, useStoreState } from '../store';
import { Button, Control } from '.';

export const Sidebar: React.FC = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { rows, columns, gridGap } = useStoreState(({ grid }) => grid);
  const { addGridItem } = useStoreActions(({ grid }) => grid);

  const addRow = useCallback(async () => {
    addGridItem('row');
  }, [addGridItem]);

  const addColumn = useCallback(async () => {
    addGridItem('column');
  }, [addGridItem]);

  return (
    <Wrapper className="Sidebar">
      <div>
        <Button onClick={toggleTheme}>toggleTheme</Button>
      </div>

      <SidebarSection>
        <h3>Rows</h3>
        {rows.map((row) => (
          <Control key={uuid()} type="row" item={row} />
        ))}
        <Button type="button" onClick={addRow}>
          add row
        </Button>
      </SidebarSection>

      <SidebarSection>
        <h3>Columns</h3>
        <div>
          {columns.map((column) => (
            <Control key={uuid()} type="column" item={column} />
          ))}
        </div>
        <Button onClick={addColumn}>add column</Button>
      </SidebarSection>

      <SidebarSection>
        {gridGap.map((gap) => (
          <GridGapControl key={uuid()} {...gap} />
        ))}
      </SidebarSection>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.colors.text}; */
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 1em;
  border-radius: 0.25em;
`;
