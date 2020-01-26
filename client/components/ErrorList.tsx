import React from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components/macro';
import {
  space,
  color,
  SpaceProps,
  ColorProps,
  TypographyProps,
  typography
} from 'styled-system';

type Props = {
  errors: {
    message: string;
  }[];
} & ListProps;

type ListProps = SpaceProps & ColorProps & TypographyProps;

const ErrorList: React.FC<Props> = ({ errors }) => {
  // const msgs = Object.keys(errors).map(key => `${key}: ${errors[key]}`);

  return (
    <List>
      {errors.map(err => (
        <li key={uuid()}>{err.message}</li>
      ))}
    </List>
  );
};

const List = styled.ul<ListProps>`
  ${color};
  ${space};
  ${typography};
  list-style-type: none;
  li {
    margin: 0;
    padding: 0;
  }
`;

List.defaultProps = {
  m: 0,
  fontSize: 1,
  color: 'error',
  p: 0
};

export default ErrorList;
