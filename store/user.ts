import { Action, action } from 'easy-peasy';
import { User } from '../components/Graphql';

export type UserModel = {
  setUser: Action<UserModel, User>;
  setGuest: Action<UserModel>;
  clearUser?: Action<UserModel>;
};

const userModel: undefined | UserModel = {
  setUser: action((state, payload) => ({
    ...state,
    id: payload.id,
    email: payload.email,
    guest: false,
  })),

  setGuest: action(() => ({ guest: true })),

  clearUser: action(() => ({ guest: true })),
};

export default userModel;
