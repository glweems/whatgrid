import { Action, action } from 'easy-peasy';

export type ModalModel = {
  open: boolean;
  toggle: Action<ModalModel>;
  openModal: Action<ModalModel>;
  closeModal: Action<ModalModel>;
  Component: React.ReactNode | null;
  setComponent: Action<ModalModel, React.ReactNode>;
};

const modalModel: ModalModel = {
  open: false,
  toggle: action(({ open, ...state }) => ({
    ...state,
    open: !open
  })),

  openModal: action(state => ({
    ...state,
    open: true
  })),

  closeModal: action(state => {
    return {
      ...state,
      open: false
    };
  }),

  Component: 'hello',
  setComponent: action((state, payload) => ({
    ...state,
    Component: payload
  }))
};

export default modalModel;
