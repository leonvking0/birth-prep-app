/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { LANGUAGE_ORDER, translations } from '../lib/i18n.js'
import { loadPreferences, updatePreferences } from '../lib/storage.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => loadPreferences().language)

  useEffect(() => {
    updatePreferences({ language })
  }, [language])

  const value = useMemo(() => {
    return {
      language,
      setLanguage(nextLanguage) {
        if (!LANGUAGE_ORDER.includes(nextLanguage)) {
          return
        }

        setLanguageState(nextLanguage)
      },
      toggleLanguage() {
        const currentIndex = LANGUAGE_ORDER.indexOf(language)
        const nextIndex = currentIndex === LANGUAGE_ORDER.length - 1 ? 0 : currentIndex + 1
        setLanguageState(LANGUAGE_ORDER[nextIndex])
      },
      t(key, params = {}) {
        const dictionary = translations[language] ?? translations.zh
        const fallbackDictionary = translations.en
        const value = dictionary[key] ?? fallbackDictionary[key]

        if (typeof value === 'function') {
          return value(params)
        }

        return value ?? key
      },
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
