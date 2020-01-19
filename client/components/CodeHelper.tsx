import React, { useState, SyntheticEvent } from 'react';
import styled from 'styled-components/macro';
import { Button } from './common/Button';

type Props = { code: any; show?: boolean };

const CodeHelper: React.FC<Props> = ({ code, show: propsShow = false }) => {
  const [show, setShow] = useState<boolean>(propsShow);

  const toggleCode: (
    event: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => void = () => setShow(state => !state);

  return (
    <div>
      <Button onClick={toggleCode}>Show Code</Button>
      {show && (
        <CodeWrapper>
          <pre>{JSON.stringify(code, null, 2)}</pre>
        </CodeWrapper>
      )}
    </div>
  );
};

export default CodeHelper;

const CodeWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50vh;
`;
