/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { getTheme, Mode, Theme } from '../utils/theme';

type ToggleTheme = () => void;
type UseThemeValues = { theme: Theme; toggleTheme: ToggleTheme; componentMounted: boolean };
type UseTheme = () => UseThemeValues;

const useTheme: UseTheme = () => {
  const [theme, setTheme] = useState<Mode>('light');
  const [componentMounted, setComponentMounted] = useState<boolean>(false);

  const setMode = (mode: Mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme: Mode | undefined = (window as any & { theme: Mode }).localStorage.getItem('theme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light');
    setComponentMounted(true);
  }, []);

  return { theme: getTheme(theme), toggleTheme, componentMounted };
};

export default useTheme;
