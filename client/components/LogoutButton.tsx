import React from 'react';
import { Button } from 'rebass/styled-components';
import { useLogoutMutation } from './Graphql';
import { useStoreActions } from '../store';

const LogoutButton: React.FC = () => {
  const [logout] = useLogoutMutation();
  const { clearUser } = useStoreActions(actions => actions.user);

  const handleClick = () => {
    logout();
    clearUser();
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Log out
    </Button>
  );
};

export default LogoutButton;
