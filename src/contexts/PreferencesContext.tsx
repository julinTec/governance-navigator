import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type Density = 'comfortable' | 'compact'
export type DateLocale = 'pt-BR' | 'en-US'
export type HomeRoute = '/' | '/backlog' | '/delegacoes' | '/riscos' | '/reunioes' | '/follow-ups'

export interface Profile {
  name: string
  email: string
  role: string
}

export interface Preferences {
  theme: Theme
  density: Density
  dateLocale: DateLocale
  notifications: boolean
  homeRoute: HomeRoute
  profile: Profile
}

const DEFAULT: Preferences = {
  theme: 'light',
  density: 'comfortable',
  dateLocale: 'pt-BR',
  notifications: true,
  homeRoute: '/',
  profile: {
    name: 'Julio Cezar',
    email: 'julio.cezar@tjce.jus.br',
    role: 'Coordenador de Governança',
  },
}

const STORAGE_KEY = 'cockpit:prefs'

interface Ctx {
  prefs: Preferences
  setPrefs: (p: Partial<Preferences>) => void
  setProfile: (p: Partial<Profile>) => void
  reset: () => void
}

const PreferencesContext = createContext<Ctx | null>(null)

function load(): Preferences {
  if (typeof window === 'undefined') return DEFAULT
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw)
    return { ...DEFAULT, ...parsed, profile: { ...DEFAULT.profile, ...(parsed.profile ?? {}) } }
  } catch {
    return DEFAULT
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  root.classList.toggle('dark', isDark)
}

function applyDensity(d: Density) {
  document.documentElement.dataset.density = d
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<Preferences>(() => load())

  useEffect(() => {
    applyTheme(prefs.theme)
    applyDensity(prefs.density)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  }, [prefs])

  useEffect(() => {
    if (prefs.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [prefs.theme])

  const setPrefs = (p: Partial<Preferences>) => setPrefsState((cur) => ({ ...cur, ...p }))
  const setProfile = (p: Partial<Profile>) =>
    setPrefsState((cur) => ({ ...cur, profile: { ...cur.profile, ...p } }))
  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setPrefsState(DEFAULT)
  }

  return (
    <PreferencesContext.Provider value={{ prefs, setPrefs, setProfile, reset }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used inside PreferencesProvider')
  return ctx
}

export function formatDate(value?: string | null, locale: DateLocale = 'pt-BR') {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString(locale)
  } catch {
    return String(value)
  }
}
