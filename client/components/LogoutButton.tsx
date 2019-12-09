import React from 'react';
import { Button } from 'rebass/styled-components';
import { useLogoutMutation } from './Graphql';

interface Props {}

const LogoutButton: React.FC<Props> = () => {
  const [logout] = useLogoutMutation();
  const handleClick = () => {
    logout();
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Log out
    </Button>
  );
};

export default LogoutButton;
