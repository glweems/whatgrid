import React, { FC, SyntheticEvent, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';
import uuid from 'uuid/v4';
import useGrid, { availableUnits, availableGridGapUnits } from '../hooks/useGrid';
import Select from './Select';
import { Button } from './common';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
}

const Control: FC<ControlProps> = ({ type, item }) => {
  const { updateGridItem, deleteGridItem } = useGrid();

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    event.preventDefault();
  };

  const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      updateGridItem({
        ...item,
        amount: Number(event.currentTarget.value),
      });
    }
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    updateGridItem({
      ...item,
      unit: event.currentTarget.value,
    });
  };

  const handleDelete: (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void = (event) => {
    event.preventDefault();
    deleteGridItem(item);
  };

  return (
    <Wrapper className={`${type}-control`}>
      <input
        name="amount"
        defaultValue={item.amount}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...item.inputProps}
      />
      <Select options={availableUnits} onChange={handleUnitChange} defaultValue={item.unit} />
      <Button onClick={handleDelete}>X</Button>
    </Wrapper>
  );
};

export default Control;

const Wrapper = styled.div`
  input {
    max-width: 50%;
  }
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: stretch;
`;
