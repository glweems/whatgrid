import { createStore, createTypedHooks, EasyPeasyConfig } from 'easy-peasy'
import gridModel, { GridModel } from './grid'
import meModel, { MeModel } from './me'
import userModel, { UserModel } from './user'
import sessionModel, { SessionModel } from './session'

export interface StoreModel extends EasyPeasyConfig {
  grid: GridModel
  me: MeModel
  user: UserModel
  session: SessionModel
}

const storeModel: StoreModel = {
  grid: gridModel,
  user: userModel,
  me: meModel,
  session: sessionModel
}

const store = createStore(storeModel)

// Wrapping dev only code like this normally gets stripped out by bundlers
// such as Webpack when creating a production build.
if (process.env.NODE_ENV === 'development') {
  const mod: NodeModule & any = module
  if (mod.hot) {
    mod.hot.accept('./model', () => {
      store.reconfigure(storeModel) // 👈 Here is the magic
    })
  }
}

export default store

const typedHooks = createTypedHooks<StoreModel>()

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks
export const { useStoreDispatch } = typedHooks
export const { useStoreState } = typedHooks
