import React from 'react';
import uuid from 'uuid/v4';
import useGrid from '../hooks/useGrid';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
  updateValue: (item: GridItem) => void;
  deleteValue: (item: { id: string; [key: string]: any }) => void;
}

const Control: React.FC<ControlProps> = ({ type, item, updateValue, deleteValue }) => {
  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();

    updateValue({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete: (e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => void = (e) => {
    e.preventDefault();
    deleteValue(item);
  };

  return (
    <div>
      <input type="text" name="value" onChange={handleChange} value={item.value} />
      <button type="button" onClick={handleDelete}>
        {`delete ${type}`}
      </button>
    </div>
  );
};

export const Controls: React.FC = () => {
  const { columns, getRows, addRow, deleteRow, addColumn, deleteColumn, updateGridItem } = useGrid();
  const rows = getRows();
  return (
    <div>
      <h4>Grid Controls</h4>
      <button
        type="button"
        onClick={(e: React.SyntheticEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          addRow({ value: '1fr' });
        }}
      >
        add row
      </button>
      <button
        type="button"
        onClick={(e: React.SyntheticEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          addColumn({ value: '1fr' });
        }}
      >
        add column
      </button>
      <h4>Rows</h4>

      {rows.map((row) => (
        <Control key={uuid()} type="row" item={row} updateValue={updateGridItem} deleteValue={deleteRow} />
      ))}

      <h4>Columns</h4>
      {columns.map((column) => (
        <Control key={uuid()} type="column" item={column} updateValue={updateGridItem} deleteValue={deleteColumn} />
      ))}
    </div>
  );
};
export default Controls;
