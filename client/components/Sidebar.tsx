import React, { useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import uuid from 'uuid/v4';
// import { ThemeContext } from './ContextProvider';
import GridGapControl from './GridGapControls';
import { useStoreActions, useStoreState } from '../store';
import Control from './Control';
// import useTheme from '../hooks/useTheme';
import { Text, Button } from 'rebass/styled-components';

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
      <Button variant="secondary" onClick={toggleTheme}>
        toggleTheme
      </Button>

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
        <Text>Columns</Text>
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

const Wrapper = styled.aside`
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
