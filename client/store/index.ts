import { createStore, createTypedHooks, EasyPeasyConfig } from 'easy-peasy'
import user, { UserModel } from './user'
import grid, { GridModel } from './grid'
import session, { SessionModel } from './session'
import layout, { LayoutModel } from './layout'

export interface StoreModel extends EasyPeasyConfig {
  grid: GridModel
  user: UserModel
  session: SessionModel
  layout: LayoutModel
}

const storeModel: StoreModel = {
  grid,
  user,
  session,
  layout
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
