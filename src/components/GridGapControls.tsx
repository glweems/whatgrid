import React, { FC, SyntheticEvent, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';
import uuid from 'uuid/v4';
import useGrid, { availableGridGapUnits, GridGap } from '../hooks/useGrid';
import Select from './Select';

const GridGapControl: FC<GridGap> = ({ type, amount, unit }) => {
  const { updateGridGap } = useGrid();

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    updateGridGap({ type, [name]: value });
  };

  const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = ({ key, currentTarget: { name, value } }) => {
    if (key === 'Enter' || key === 'Tab') updateGridGap({ type, [name]: value });
  };

  const handleUnitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = ({
    currentTarget: { name, value },
  }) => updateGridGap({ type, amount, [name]: value });

  return (
    <Wrapper>
      <input
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
