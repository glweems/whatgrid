import React, { SyntheticEvent, useContext } from 'react';
import styled from 'styled-components/macro';
import uuid from 'uuid/v4';
import { ThemeContext } from './ContextProvider';
import useGrid from '../hooks/useGrid';
import { Control } from '.';

export const Sidebar: React.FC = () => {
  const { rows, columns, addGridItem } = useGrid();
  const { toggleTheme } = useContext(ThemeContext);

  const addRow = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addGridItem({ type: 'row' });
  };

  const addColumn = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addGridItem({ type: 'column' });
  };

  return (
    <Wrapper className="Sidebar">
      <button type="button" onClick={toggleTheme}>
        toggleTheme
      </button>

      <div className="col">
        <p>Rows</p>
        {rows.map((row) => (
          <Control key={uuid()} type="row" item={row} />
        ))}
        <button type="button" onClick={addRow}>
          add row
        </button>
      </div>

      <div className="row">
        <p>Columns</p>
        {columns.map((column) => (
          <Control key={uuid()} type="column" item={column} />
        ))}
        <button type="button" onClick={addColumn}>
          add column
        </button>
      </div>
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
