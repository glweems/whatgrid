import { Action, action } from 'easy-peasy'

export type ModalModel = {
  open: boolean
  toggle: Action<ModalModel>
  setModal: Action<ModalModel, boolean>
  Component: React.ReactNode | null
  setComponent: Action<ModalModel, React.ReactNode>
}

const modalModel: ModalModel = {
  open: false,
  toggle: action(({ open, ...state }) => ({
    ...state,
    open: !open
  })),
  setModal: action((state, payload) => ({
    ...state,
    open: payload
  })),
  Component: 'hello',
  setComponent: action((state, payload) => ({
    ...state,
    Component: payload
  }))
}

export default modalModel
