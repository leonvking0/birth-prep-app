/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { loadPreferences, updatePreferences } from '../lib/storage.js'

const ThemeContext = createContext(null)

const THEME_ORDER = ['system', 'light', 'dark']

function getSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme, systemTheme) {
  if (typeof document === 'undefined') {
    return
  }

  const resolvedTheme = theme === 'system' ? systemTheme : theme
  document.documentElement.dataset.theme = resolvedTheme
  document.documentElement.style.colorScheme = resolvedTheme
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => loadPreferences().theme)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    applyTheme(theme, systemTheme)
    updatePreferences({ theme })
  }, [theme, systemTheme])

  const value = useMemo(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme

    return {
      theme,
      resolvedTheme,
      setTheme(nextTheme) {
        if (!THEME_ORDER.includes(nextTheme)) {
          return
        }

        setThemeState(nextTheme)
      },
      cycleTheme() {
        const currentIndex = THEME_ORDER.indexOf(theme)
        const nextIndex = currentIndex === THEME_ORDER.length - 1 ? 0 : currentIndex + 1
        setThemeState(THEME_ORDER[nextIndex])
      },
    }
  }, [theme, systemTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
