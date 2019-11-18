import React from 'react';
import styled from 'styled-components';

interface Props {
  columns: GridValue;
}

export const Grid: React.FC<Props> = ({ columns, children }) => {
  return <Wrapper columns={columns}>{children}</Wrapper>;
};

const Wrapper = styled.div<Props>`
  display: grid;
`;
