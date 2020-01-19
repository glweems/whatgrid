import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useRouter } from 'next/router';
import useTheme from '../hooks/useTheme';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FPC } from '../@types';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';

interface Props {
  Main?: any;
  sidebar?: React.ReactNode;
  session?: {
    user?: {
      id: string;
    };
  };
}

const Layout: FPC<Props> = ({
  children,
  Main = styled.main``,
  sidebar = undefined
}) => {
  const { componentMounted } = useTheme();
  const showSidebarToggle = sidebar !== undefined;
  const router = useRouter();
  const { signup, login } = router.query;

  if (!componentMounted) return <div />;
  if (signup === 'true') return <SignupForm />;
  if (login === 'true') return <LoginForm />;

  return (
    <Wrapper showToggle={showSidebarToggle}>
      <Navbar showSidebarToggle={showSidebarToggle} />
      <Sidebar>{sidebar}</Sidebar>
      <Main>{children}</Main>
    </Wrapper>
  );
};
interface StyledProps {
  showToggle: boolean;
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

    ${props =>
      props.showToggle &&
      css`
        grid-area: sidebar;
      `};
  }
`;

export default Layout;
