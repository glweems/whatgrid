import React, { FC, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';
import { useStoreActions } from '../store';
import { availableGridGapUnits, GridGap } from '../store/grid';
import Select from './Select';
import { Input } from '@rebass/forms';

const GridGapControl: FC<GridGap> = ({ type, amount, unit }) => {
  const { updateGridGap } = useStoreActions((actions) => actions.grid);

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    // event.preventDefault();
    const { name, value } = event.currentTarget;
    updateGridGap({ type, [name]: value });
    event.persist();
  };

  const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = (event) => {
    const { name, value } = event.currentTarget;
    if (event.key === 'Enter' || event.key === 'Tab') updateGridGap({ type, [name]: value });
    event.persist();
  };

  const handleUnitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = ({
    currentTarget: { name, value },
  }) => updateGridGap({ type, amount, [name]: value });

  return (
    <Wrapper>
      <Input
        name="amount"
        defaultValue={amount}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        type="number"
        min={0}
      />
      <Select name="unit" options={availableGridGapUnits} defaultValue={unit} onChange={handleUnitChange} />
    </Wrapper>
  );
};

export default GridGapControl;

const Wrapper = styled.div`
  input {
    max-width: 50%;
  }
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: stretch;
`;
