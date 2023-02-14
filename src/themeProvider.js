import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider(props) {
  const { defaultTheme, darkTheme, localStorageKey = 'theme' } = props
  const [theme, setTheme] = useState()

  const userPreferenceDarkTheme = window.matchMedia('(prefers-color-scheme:dark)').matches

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem(localStorageKey) || undefined

    if (localStorageTheme) {
      setTheme(localStorageTheme)
    } else if (userPreferenceDarkTheme) {
      setTheme(darkTheme)
    } else {
      setTheme(defaultTheme)
    }
  }, [userPreferenceDarkTheme, defaultTheme, darkTheme, localStorageKey])

  useEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme
      window.localStorage.setItem(localStorageKey, theme)
    }
  }, [localStorageKey, theme])

  const value = { theme, setTheme }
  return <ThemeContext.Provider value={value} {...props} />
}
