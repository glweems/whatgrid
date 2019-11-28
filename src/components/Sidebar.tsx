import React, { SyntheticEvent, useContext } from 'react';
import styled from 'styled-components/macro';
import { ThemeContext } from './ContextProvider';
import useGrid from '../hooks/useGrid';
import { Controls } from '.';

export const Sidebar: React.FC = () => {
  const { addGridItem } = useGrid();
  const { toggleTheme } = useContext(ThemeContext);

  const addRow = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addGridItem({ type: 'row', amount: 1, unit: 'fr' });
  };

  const addColumn = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addGridItem({ type: 'column', amount: 1, unit: 'fr' });
  };

  return (
    <Wrapper className="Sidebar">
      <button type="button" onClick={toggleTheme}>
        toggleTheme
      </button>

      <div className="add-row">
        <button type="button" onClick={addRow}>
          add row
        </button>
      </div>

      <div className="add-column">
        <button type="button" onClick={addColumn}>
          add column
        </button>
      </div>
      <Controls />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.primary};
`;
