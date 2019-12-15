import React from 'react';
import Link from 'next/link';
import styled from 'styled-components/macro';
import { Box, Text } from 'rebass/styled-components';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  return (
    <Header>
      <Box color="primary">
        <Link href="/">
          <a>
            <Text fontSize={[3, 4, 5]} fontWeight="bold" color="primary">
              Home
            </Text>
          </a>
        </Link>
        <nav>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <LogoutButton />
        </nav>
      </Box>
    </Header>
  );
};

const Header = styled.header``;

export default Navbar;
