import React from 'react'
import styled, { css } from 'styled-components/macro'
import useTheme from '../hooks/useTheme'
import Navbar from './Navbar'
import { GlobalStyle } from '../utils/theme'
import Sidebar from './Sidebar'

interface Props {
  Main?: any
  sidebar?: React.ReactNode
  session?: {
    user?: {
      id: string
    }
  }
}

const Layout: React.FC<Props> = ({
  children,
  Main = styled.main``,
  sidebar = undefined
}) => {
  const { componentMounted } = useTheme()
  const showSidebarToggle = sidebar !== undefined

  if (!componentMounted) return <div />

  return (
    <Wrapper showToggle={showSidebarToggle}>
      <Navbar showSidebarToggle={showSidebarToggle} />
      <Sidebar>{sidebar}</Sidebar>
      <Main>{children}</Main>
    </Wrapper>
  )
}
interface StyledProps {
  showToggle: boolean
}

const Wrapper = styled.div<StyledProps>`
  position: relative;
  display: grid;
  grid-template-areas:
    'navbar navbar navbar'
    'sidebar css-grid .';
  grid-template-rows: auto 1fr;
  grid-template-columns: ${({ showToggle }) =>
    `${showToggle ? 'auto' : '0'} 1fr 0.25em`};
  gap: 1em;
  height: 100%;
  height: 100vh;
  overflow-y: auto;

  header {
    grid-area: navbar;
  }

  .title {
    grid-area: title;
  }

  .Sidebar {
    height: 100%;

    ${(props) =>
      props.showToggle &&
      css`
        grid-area: sidebar;
      `};
  }
`

export default Layout
