import React, { FC, SyntheticEvent, ChangeEvent, useState, KeyboardEvent } from 'react';
import uuid from 'uuid/v4';
import useGrid from '../hooks/useGrid';

interface ControlProps {
  type: 'row' | 'column';
  item: GridItem;
  updateValue: (item: GridItem) => void;
  deleteValue: (item: { id: string; [key: string]: any }) => void;
}

const Control: FC<ControlProps> = ({ type, item, updateValue, deleteValue }) => {
  const [text, setText] = useState(item.value);

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void = (e) => {
    if (e.key === 'Enter') {
      updateValue({
        ...item,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDelete: (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void = (e) => {
    e.preventDefault();
    deleteValue(item);
  };

  return (
    <div className={`${type}-control`.toLowerCase()}>
      <input type="text" name="value" defaultValue={item.value} onChange={handleChange} onKeyDown={handleKeyDown} />
      <button type="button" onClick={handleDelete}>
        {`delete ${type}`}
      </button>
    </div>
  );
};

const Controls: FC = () => {
  const { rows, columns, addRow, deleteRow, addColumn, deleteColumn, updateGridItem } = useGrid();
  return (
    // <div className="Controls">
    <>
      {/* <h4>Grid Controls</h4>
      <button
        type="button"
        onClick={(e: SyntheticEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          addRow();
        }}
      >
        add row
      </button>
      <button
        type="button"
        onClick={(e: SyntheticEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          addColumn();
        }}
      >
        add column
      </button>
      <h4>Rows</h4> */}

      <div className="col">
        {rows.map((row) => (
          <Control key={uuid()} type="row" item={row} updateValue={updateGridItem} deleteValue={deleteRow} />
        ))}
      </div>

      {/* <h4>Columns</h4> */}
      <div className="row">
        {columns.map((column) => (
          <Control key={uuid()} type="column" item={column} updateValue={updateGridItem} deleteValue={deleteColumn} />
        ))}
      </div>
    </>
    // </div>
  );
};

export default Controls;
