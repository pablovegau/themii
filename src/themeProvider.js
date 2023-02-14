import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()
const defaultTheme = 'tlight'

export function ThemeProvider(props) {
  const [theme, setTheme] = useState()

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem('theme') || undefined
    const defaultUserThemeIsDark = window.matchMedia('(prefers-color-scheme:dark)').matches

    if (localStorageTheme) {
      setTheme(localStorageTheme)
    } else if (defaultUserThemeIsDark) {
      setTheme('tdark')
    } else {
      setTheme(defaultTheme)
    }
  }, [])

  useEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])

  const value = { theme, setTheme }
  return <ThemeContext.Provider value={value} {...props} />
}
