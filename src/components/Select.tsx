import React from 'react';
import uuid from 'uuid/v4';

interface Props {
  options: string[];
  // onChange:
}

const Select = ({ options, ...rest }: Props): React.ReactElement<HTMLSelectElement> => {
  return (
    <select {...rest}>
      {options.map((o) => (
        <option key={uuid()} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default Select;
