import { Action, action } from 'easy-peasy'
import { Theme } from '../utils/theme'
import useTheme from '../hooks/useTheme'

export type ThemeModel = {
  setTheme: Action<ThemeModel, Theme>
  toggle: Action<ThemeModel, () => void>
}

const themeModel: ThemeModel = {
  setTheme: action((state, payload) => ({
    ...state,
    ...payload
  })),
  toggle: action((state) => ({ ...state, toggle: useTheme().toggleTheme }))
}

export default themeModel
