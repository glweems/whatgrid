import { Action, action } from 'easy-peasy'
import { MeQuery } from '../components/Graphql'
import { whoAmI } from '../utils/helpers'

type Me = MeQuery['me']

export type MeModel = Me & {
  setMe: Action<MeModel, Me>
}

const meModel: MeModel = {
  ...whoAmI,
  setMe: action((state, payload) => ({
    ...state,
    ...payload
  }))
}

export default meModel
