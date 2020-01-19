import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {};

export const Ripple: React.FC<Props> = () => {
  return (
    <Wrapper>
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </Wrapper>
  );
};

const rotate = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  .lds-ripple {
    /* position: relative; */
    display: inline-block;
    width: 3px;
    height: 3px;
  }
  .lds-ripple div {
    position: absolute;
    border: 1px solid #fff;
    border-radius: 50%;
    opacity: 1;
    animation: ${rotate} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;
