import { Action, action } from 'easy-peasy'

const sidebarModel: SidebarModel = {
  open: true,
  toggle: action(({ open, ...state }) => ({
    ...state,
    open: !open
  }))
}

type SidebarModel = {
  open: boolean
  toggle: Action<SidebarModel>
}

export type LayoutModel = {
  sidebar: SidebarModel
}

const layoutModel: LayoutModel = {
  sidebar: sidebarModel
}

export default layoutModel
