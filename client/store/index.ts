import { createStore, createTypedHooks } from 'easy-peasy';
import gridModel, { GridModel } from './grid';

export interface StoreModel {
  grid: GridModel;
}

const storeModel = {
  grid: gridModel,
};

const store = createStore(storeModel);

export default store;

const typedHooks = createTypedHooks<StoreModel>();

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
