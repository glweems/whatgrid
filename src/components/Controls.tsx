import React, { FC, SyntheticEvent, ChangeEvent, useState, KeyboardEvent } from 'react';
import uuid from 'uuid/v4';
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
    <div className={`${type}-control`.toLowerCase()}>
      <input type="number" name="amount" defaultValue={item.amount} onChange={handleChange} onKeyDown={handleKeyDown} />
      <Select options={availableUnits} onChange={handleUnitChange} defaultValue={item.unit} />
      <button type="button" onClick={handleDelete}>
        {`delete ${type}`}
      </button>
    </div>
  );
};

const Controls: FC = () => {
  const { rows, columns } = useGrid();
  return (
    <>
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
    </>
  );
};

export default Controls;
