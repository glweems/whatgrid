import {
  createStore,
  createTypedHooks,
  StoreProvider as EasyStoreProvider,
  EasyPeasyConfig,
} from 'easy-peasy';
import gridModel, { GridModel } from './grid';
import userModel, { UserModel } from './user';

export const initialStore: EasyPeasyConfig = {
  name: 'what grid',
  initialState: {
    grid: gridModel,
  },
};

export interface StoreModel extends EasyPeasyConfig {
  grid: GridModel;
  user?: UserModel;
}

const storeModel = {
  grid: gridModel,
  user: userModel,
};

const store = createStore(storeModel);

/* Wrapping dev only code like this normally gets stripped out by bundlers
such as Webpack when creating a production build. */
if (process.env.NODE_ENV === 'development') {
  if ((module as any).hot) {
    (module as any).hot.accept(storeModel, () => {
      store.reconfigure(storeModel); // 👈 Here is the magic
    });
  }
}

export default store;

const typedHooks = createTypedHooks<StoreModel>();

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
