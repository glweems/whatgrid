import React, { createContext, useEffect } from 'react';
import { StoreProvider } from 'easy-peasy';
import { User, useMeQuery } from '../components/Graphql';
import store, { useStoreActions } from '../store';

type UserContextShape = null | User;

const UserContext = createContext<UserContextShape>(null);

const UserProvider: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery();
  const { setUser, setGuest } = useStoreActions(actions => actions.user);

  useEffect(() => {
    if (!loading) {
      console.log('TCL: UserProvider:React.FC -> errors', data);
    }
  });

  if (loading) return null;

  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default UserProvider;
