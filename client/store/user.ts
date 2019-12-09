import { Action, action } from 'easy-peasy';
import { User } from '../components/Graphql';

export interface UserModel {
  id?: number;
  email?: string;
  guest?: boolean;
  setUser: Action<UserModel, User>;
  setGuest: Action<UserModel>;
  clearUser: Action<UserModel>;
}

const userModel: UserModel = {
  setUser: action((state, payload) => ({ ...state, id: payload.id, email: payload.email, guest: false })),

  setGuest: action(() => ({ guest: true })),

  clearUser: action(() => ({ guest: true })),
};

export default userModel;
