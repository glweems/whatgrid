/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, SyntheticEvent, ChangeEvent, KeyboardEvent } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components/macro';
import useGrid, { availableUnits } from '../hooks/useGrid';
import Select from './Select';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
}

const Control: FC<ControlProps> = ({ type, item }) => {
  const { updateGridItem, deleteGridItem } = useGrid();

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
  };

  const handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      updateGridItem({
        ...item,
        amount: Number(e.currentTarget.value),
      });
    }
  };

  const handleDelete: (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void = (e) => {
    e.preventDefault();
    deleteGridItem(item);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    updateGridItem({
      ...item,
      unit: event.currentTarget.value,
    });
  };

  const ControlType = type === 'row' ? RowControl : ColumnControl;

  return (
    <ControlType className={`${type}-control`}>
      <input type="number" name="amount" defaultValue={item.amount} onChange={handleChange} onKeyDown={handleKeyDown} />
      <Select options={availableUnits} onChange={handleUnitChange} defaultValue={item.unit} />
      <button type="button" onClick={handleDelete}>
        X
      </button>
    </ControlType>
  );
};

const ControlStyles = styled.div`
  display: grid;
  grid-template-rows: 30px;
  grid-template-columns: repeat(3, 50px);
  align-content: center;
  align-items: center;
`;

const RowControl = styled(ControlStyles)``;

const ColumnControl = styled(ControlStyles)``;

const Controls: FC = () => {
  const { rows, columns } = useGrid();
  return (
    <Wrapper>
      <div className="col">
        {rows.map((row) => (
          <Control key={uuid()} type="row" item={row} />
        ))}
      </div>

      <div className="row">
        {columns.map((column) => (
          <Control key={uuid()} type="column" item={column} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Controls;
