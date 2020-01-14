import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { Text, FlexProps } from 'rebass/styled-components'
import {
  space,
  color,
  layout,
  border,
  SpaceProps,
  ColorProps,
  LayoutProps,
  flex
} from 'styled-system'
import { Link } from './common/Link'
import { useStoreState, useStoreActions } from '../store'
import { Theme } from '../utils/theme'
import Button from './Button'

interface Props {
  showSidebarToggle: boolean
}

const Navbar: React.FC<Props> = ({ showSidebarToggle }) => {
  const { sidebar } = useStoreActions((store) => store.layout)

  const { toggleTheme } = useContext(ThemeContext)
  const toggleSidebar = () => {
    sidebar.toggle()
  }
  return (
    <Header px={2} py={1} bg="text">
      {showSidebarToggle && <Button onClick={toggleSidebar}>=</Button>}
      <Link to="/">
        <Text fontSize={[3, 4, 5]} fontWeight="bold" color="primary">
          Home
        </Text>
      </Link>
      <Nav>
        <NavLinks />
      </Nav>
      <Button onClick={toggleTheme}>Theme</Button>
    </Header>
  )
}

const NavLinks: React.FC = () => {
  // const { loading } = useStoreState((state) => state.session)
  const loading = true

  if (!loading) return <Link to="/dashboard" text="Dashboard" />

  return (
    <>
      <Link to="/signup" text="Sign Up" />
      <Link to="/login" text="Login" />
    </>
  )
}

type HeaderProps = SpaceProps & ColorProps & FlexProps & LayoutProps & {}

interface ThemeProps {
  theme?: Theme
}

const Header: React.ComponentType<HeaderProps & ThemeProps> = styled.header`
  ${color};
  ${border};
  ${flex};
  ${layout};
  ${space};
  display: flex;
  align-content: center;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  justify-items: flex-end;
`

Header.displayName = 'StyledHeader'

export default Navbar
