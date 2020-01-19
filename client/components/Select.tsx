import * as React from 'react';
import uuid from 'uuid/v4';
import { Select } from '@rebass/forms';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default ({ options, ...props }: Props) => {
  return (
    <Select {...props}>
      {options.map(o => (
        <option key={uuid()} value={o}>
          {o}
        </option>
      ))}
    </Select>
  );
};
