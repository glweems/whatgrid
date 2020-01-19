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
    [key: string]: string;
  };
} & ListProps;

type ListProps = SpaceProps & ColorProps & TypographyProps;

const ErrorList: React.FC<Props> = ({ errors, ...props }) => {
  const msgs = Object.keys(errors).map(key => `${key}: ${errors[key]}`);

  return (
    <List>
      {msgs.map(err => (
        <li key={uuid()}>{err}</li>
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
