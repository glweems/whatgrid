import React from 'react'
import styled from 'styled-components/macro'
import { Text, FlexProps } from 'rebass/styled-components'
import {
  space,
  color,
  layout,
  border,
  BorderProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  flex
} from 'styled-system'
import { Link } from './common/Link'
import { useStoreState } from '../store'
import { SessionModel } from '../store/session'
import { Theme } from '../utils/theme'

const Navbar: React.FC = () => {
  const { loading, user } = useStoreState((state) => state.session)

  return (
    <Header px={2} py={1} bg="text">
      <Link to="/">
        <Text fontSize={[3, 4, 5]} fontWeight="bold" color="primary">
          Home
        </Text>
      </Link>
      <nav>
        <NavLinks loading={loading} user={user} />
      </nav>
    </Header>
  )
}

const NavLinks: React.FC<{ loading: boolean; user: SessionModel['user'] }> = ({
  loading,
  user
}) => {
  if (loading) return null
  if (user) return <Link to={user.id} text="Profile" />
  return (
    <>
      <Link to="/signup" text="Sign Up" />
      <Link to="/login" text="Login" />
    </>
  )
}

interface Props
  extends SpaceProps,
    ColorProps,
    FlexProps,
    BorderProps,
    LayoutProps {}

interface ThemeProps {
  theme?: Theme
}

const Header: React.ComponentType<Props & ThemeProps> = styled.header<Props>`
  display: flex;
  justify-content: space-between;
  ${color};
  ${border};
  ${flex};
  ${layout};
  ${space};
`

Header.displayName = 'StyledHeader'

export default Navbar
