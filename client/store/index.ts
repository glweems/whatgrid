import { createStore, createTypedHooks } from 'easy-peasy';
import gridModel, { GridModel } from './grid';
import userModel, { UserModel } from './user';

export interface StoreModel {
  grid: GridModel;
  user?: UserModel;
}

const storeModel = {
  grid: gridModel,
  user: userModel,
};

const store = createStore(storeModel);

export default store;

const typedHooks = createTypedHooks<StoreModel>();

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
