import { Action, action } from 'easy-peasy'

type SessionUser = {
  id?: string
  username?: string
  email?: string
}

export type SessionModel = {
  setSession: Action<SessionModel, SessionUser & { isLoggedIn: boolean } & any>
  clearSession: Action<SessionModel>
} & SessionUser

const sessionModel: SessionModel = {
  setSession: action((state, payload) => ({
    ...state,
    ...payload
  })),
  clearSession: action((state) => ({
    ...state,
    user: null
  }))
}

export default sessionModel
