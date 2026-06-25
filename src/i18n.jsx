import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './data/content.js'

const LangContext = createContext(null)

function detectInitial() {
  const stored = typeof localStorage !== 'undefined' && localStorage.getItem('gp-lang')
  if (stored === 'pt' || stored === 'en') return stored
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'pt'
  return nav && nav.toLowerCase().startsWith('en') ? 'en' : 'pt'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial)

  useEffect(() => {
    localStorage.setItem('gp-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === 'pt' ? 'en' : 'pt')),
    t: content[lang],
  }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
