import React, { FC, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import styled from 'styled-components/macro';
import { availableUnits } from '../hooks/useGrid';
import Select from './Select';
import { Button } from './common';
import { useStoreActions } from '../store';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
}

const Control: FC<ControlProps> = ({ type, item }) => {
  const { deleteGridItem, updateGridItem } = useStoreActions((actions) => actions.grid);

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    event.preventDefault();
    updateGridItem({
      ...item,
      [event.currentTarget.name]: Number(event.currentTarget.value),
    });
  };

  const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      updateGridItem({
        ...item,
        [event.currentTarget.name]: Number(event.currentTarget.value),
      });
    }
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateGridItem({
      ...item,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleDelete = useCallback(() => {
    deleteGridItem(item);
  }, [deleteGridItem, item]);

  return (
    <Wrapper className={`${type}-control`}>
      <input
        name="amount"
        defaultValue={item.amount}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...item.inputProps}
      />
      <Select name="unit" options={availableUnits} onChange={handleUnitChange} defaultValue={item.unit} />
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
