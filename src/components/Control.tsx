/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, SyntheticEvent, ChangeEvent, KeyboardEvent } from 'react';
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
      <button type="button" onClick={handleDelete}>
        X
      </button>
    </Wrapper>
  );
};

export default Control;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, auto);
  gap: 1em;
  align-content: center;
  align-items: center;
  justify-content: stretch;
`;
