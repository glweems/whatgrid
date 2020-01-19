import { Action, action } from 'easy-peasy';

type SessionUser = {
  id?: string;
  username?: string;
  email?: string;
};

export type SessionModel = {
  setSession: Action<SessionModel, SessionUser & { isLoggedIn: boolean } & any>;
  clearSession: Action<SessionModel>;
  authenticated?: boolean;
} & SessionUser;

const sessionModel: SessionModel = {
  authenticated: false,
  setSession: action((state, { authenticated, id, username, email }) => ({
    ...state,
    authenticated,
    id,
    email,
    username
  })),
  clearSession: action(state => ({
    ...state,
    authenticated: false
  }))
};

export default sessionModel;
