/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components/macro';
import { Text, FlexProps } from 'rebass/styled-components';
import {
  space,
  color,
  layout,
  border,
  SpaceProps,
  ColorProps,
  LayoutProps,
  flex
} from 'styled-system';
import { Link } from './common/Link';
import { useStoreActions, useStoreState } from '../store';
import { Theme } from '../utils/theme';
import Button from './Button';

interface Props {
  showSidebarToggle: boolean;
}

const Navbar: React.FC<Props> = ({ showSidebarToggle }) => {
  const { sidebar } = useStoreActions(store => store.layout);

  const toggleSidebar = () => {
    sidebar.toggle();
  };

  return (
    <Header px={2} py={1} bg="text">
      {showSidebarToggle && <Button onClick={toggleSidebar}>=</Button>}
      <Link to="/">
        <Text fontSize={[3, 4, 5]} fontWeight="bold" color="primary">
          Home
        </Text>
      </Link>

      <NavLinks />

      {/* <Button onClick={toggleTheme}>Theme</Button> */}
    </Header>
  );
};

const NavLinks: any = () => {
  const { authenticated } = useStoreState(store => store.session);
  if (authenticated) return <Link to="/dashboard" text="Dashboard" />;
  return (
    <Nav>
      <Link to="/welcome?login=true">signup</Link>
      <Link to="/welcome?signup=true">signin</Link>
    </Nav>
  );
};

type HeaderProps = SpaceProps & ColorProps & FlexProps & LayoutProps & {};

interface ThemeProps {
  theme?: Theme;
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
`;

const Nav = styled.nav`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  justify-items: flex-end;
`;

Header.displayName = 'StyledHeader';

export default Navbar;
