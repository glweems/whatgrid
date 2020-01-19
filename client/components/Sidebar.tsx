/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from 'react'
import styled, { ThemeContext, css } from 'styled-components/macro'
import { animated, useSpring, useTransition } from 'react-spring'
import uuid from 'uuid/v4'
import { useStoreState } from '../store'
import { layout as settings } from '../utils/theme'

export const Sidebar: React.FC = ({ children }) => {
  const { open } = useStoreState(({ layout }) => layout.sidebar)

  const { toggleTheme } = useContext(ThemeContext)

  const animation = useSpring({
    width: open ? settings.sidebarWidth : 0,
    opacity: open ? 1 : 0
    // transform: open ? 'none' : `translateX(-100px)`
  })

  const transitions = useTransition(open, null, {
    from: { opacity: 0.5, transform: `translateX(-100px)` },
    enter: { opacity: 1, transform: `translateX(0)` },
    leave: { opacity: 0.5, transform: `translateX(-100px)` }
  })

  return (
    <animated.aside key={uuid()} style={animation} className="Sidebar">
      <div>{children}</div>
    </animated.aside>
  )
}

export default Sidebar

const Aside = animated(styled.aside<{ open: boolean }>`
  ${(props) =>
    props.open &&
    css`
      display: none;
      * {
      }
    `}
`)
