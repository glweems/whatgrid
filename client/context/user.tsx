import React, { createContext, useEffect } from 'react';
import { User, useMeQuery } from '../components/Graphql';
import { useStoreActions } from '../store';

type UserContextShape = null | User;

const UserContext = createContext<UserContextShape>(null);

const UserProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useMeQuery();
  const { setUser, setGuest } = useStoreActions((actions) => actions.user);

  useEffect(() => {
    if (!loading) {
      if (data?.me) setUser(data.me);
      else setGuest();
    }
  });

  if (loading) return null;

  return <UserContext.Provider value={data.me}>{children}</UserContext.Provider>;
};

export default UserProvider;
