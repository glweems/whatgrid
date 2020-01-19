import {
  createStore as createEasyStore,
  createTypedHooks,
  EasyPeasyConfig,
  Store as EasyStore
} from 'easy-peasy'
import grid, { GridModel } from './grid'
import { SessionModel } from './session'
import layout, { LayoutModel } from './layout'
import { Client } from '../apollo/types'

export interface StoreModel {
  grid: GridModel
  session?: SessionModel
  layout: LayoutModel
  apolloClient?: Client
}

export const storeOptions: EasyPeasyConfig = {
  name: 'what grid'
}

export const storeModel: StoreModel = {
  grid,
  layout
  // session
}

export type Store = EasyStore<StoreModel, typeof storeOptions>

const store: Store = createEasyStore(storeModel, storeOptions)

export const createStore = (init): Store => {
  return createEasyStore(storeModel, {
    ...storeOptions,
    initialState: { ...init }
  })
}

export default store
// Wrapping dev only code like this normally gets stripped out by bundlers
// such as Webpack when creating a production build.
// if (process.env.NODE_ENV === 'development') {
//   const mod: NodeModule & any = module
//   if (mod.hot) {
//     mod.hot.accept('./model', () => {
//       store.reconfigure(storeModel) // 👈 Here is the magic
//     })
//   }
// }

const typedHooks = createTypedHooks<StoreModel>()

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks
export const { useStoreDispatch } = typedHooks
export const { useStoreState } = typedHooks
