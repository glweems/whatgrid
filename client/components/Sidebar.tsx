/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { animated, useSpring, useTransition } from 'react-spring'
import { useStoreState } from '../store'
import { layout as settings } from '../utils/theme'

export const Sidebar: React.FC = ({ children }) => {
  const { open } = useStoreState(({ layout }) => layout.sidebar)

  const { toggleTheme } = useContext(ThemeContext)

  const animation = useSpring({
    width: open ? settings.sidebarWidth : 0
  })

  const transitions = useTransition(open, null, {
    from: { opacity: 0.5, transform: `translateX(-100px)` },
    enter: { opacity: 1, transform: `translateX(0)` },
    leave: { opacity: 0.5, transform: `translateX(-100px)` }
  })

  return (
    <aside className="Sidebar">
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={animation}>
              <animated.div key={key} style={props}>
                {children}
              </animated.div>
            </animated.div>
          )
      )}
    </aside>
  )
}

export default Sidebar

const Wrapper = animated(styled.aside<{ open: boolean }>``)
