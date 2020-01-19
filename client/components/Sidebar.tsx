/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { animated, useSpring } from 'react-spring';
import uuid from 'uuid/v4';
import { useStoreState } from '../store';
import { layout as settings } from '../utils/theme';

export const Sidebar: React.FC = ({ children }) => {
  const { open } = useStoreState(({ layout }) => layout.sidebar);

  const animation = useSpring({
    width: open ? settings.sidebarWidth : 0,
    opacity: open ? 1 : 0
  });

  return (
    <animated.aside key={uuid()} style={animation} className="Sidebar">
      <div>{children}</div>
    </animated.aside>
  );
};

export default Sidebar;
