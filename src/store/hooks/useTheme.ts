// Using Dark Mode in your react app!
//https://dev.to/franklin030601/using-dark-mode-in-your-react-app-5364

import { useEffect, useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type Theme = 'dark' | 'light'

type useThemeReturn = [string, (e: ChangeEvent) => void];

export const useTheme = (initialTheme: Theme): useThemeReturn => {

  const [theme, setTheme] = useState<Theme>(initialTheme)

  const handleChange = (e: ChangeEvent) => setTheme(e.target.checked ? 'dark' : 'light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme])

  return [theme, handleChange]
}
