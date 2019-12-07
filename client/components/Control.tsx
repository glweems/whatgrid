import * as React from 'react';
import styled from 'styled-components/macro';
import { availableUnits, GridItem } from '../store/grid';
import Select from './Select';
import { Button } from 'rebass/styled-components';
import { Input } from '@rebass/forms';
import { useStoreActions } from '../store';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
}

const Control: React.FC<ControlProps> = ({ type, item }) => {
  const { deleteGridItem, updateGridItem } = useStoreActions((actions) => actions.grid);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    event.preventDefault();
    updateGridItem({
      ...item,
      [event.currentTarget.name]: Number(event.currentTarget.value),
    });
  };

  const handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void = (event) => {
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

  const handleDelete = React.useCallback(() => {
    deleteGridItem(item);
  }, [deleteGridItem, item]);

  return (
    <Wrapper className={`${type}-control`}>
      <Input
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
