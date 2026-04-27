import { createContext, useContext, useState, useCallback } from 'react'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    animations: true,
    parallax: true,
    particles: true,
  })

  const toggle = useCallback((key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const set = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, toggle, set }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
