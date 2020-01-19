import { Action, action } from 'easy-peasy'

type SidebarModel = {
  open: boolean
  toggle: Action<SidebarModel>
}

const sidebarModel: SidebarModel = {
  open: true,
  toggle: action(({ open, ...state }) => ({
    ...state,
    open: !open
  }))
}

export type LayoutModel = {
  sidebar: SidebarModel
}

const layoutModel: LayoutModel = {
  sidebar: sidebarModel
}

export default layoutModel
