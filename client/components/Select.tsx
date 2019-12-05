import * as React from 'react';
import uuid from 'uuid/v4';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = ({ options, ...props }: Props): React.ReactElement<HTMLSelectElement> => {
  return (
    <select {...props}>
      {options.map((o) => (
        <option key={uuid()} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default Select;
