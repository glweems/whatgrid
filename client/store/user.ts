import { Action, action, Computed, computed } from 'easy-peasy'
import { UserFieldsFragment } from '../components/Graphql'
import { SessionModel } from './session'
// import { StoreModel } from './index'

export type UserModel = {
  selected?: UserFieldsFragment
  setSelectedUser: Action<UserModel, UserFieldsFragment>
  killUser: Action<UserModel>
  owner?: Computed<UserModel, string, { session: SessionModel }>
  // setOwner: Action<UserModel, SessionModel['user']>
}

const userModel: UserModel = {
  selected: null,
  setSelectedUser: action((state, payload) => ({
    owner: state.owner,
    selected: payload
  })),

  killUser: action((state) => ({ ...state, selected: null })),

  owner: computed(
    [
      (state) => state?.selected?.id,
      //          👇 the store state is the 2nd argument to a state resolver
      (state, storeState) => storeState.session?.user?.id
    ],
    (selectedId, myId) => `${selectedId} ${myId}`
  )
}

export default userModel

/*

id: payload.id,
createdAt: payload.createdAt,
updatedAt: payload.updatedAt,
email: payload.email,
name: payload.name,
firstName: payload.firstName,
lastName: payload.lastName,
username: payload.username,
phoneNumber: payload.phoneNumber,
grids: payload.grids,
owner: false
*/
