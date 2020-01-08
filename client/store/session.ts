import { Action, action } from 'easy-peasy'
import { UserFieldsFragment } from '../components/Graphql'

export type SessionModel = {
  loading: boolean
  user?: UserFieldsFragment
  setUser: Action<SessionModel, UserFieldsFragment>
  setLoading: Action<SessionModel, boolean>
  clearSession: Action<SessionModel>
}

const sessionModel: SessionModel = {
  loading: true,

  setUser: action((state, payload) => ({
    ...state,
    loading: false,
    user: payload
  })),

  setLoading: action((state, payload) => ({ ...state, loading: payload })),

  clearSession: action((state) => ({
    ...state,
    user: null
  }))
}

export default sessionModel
