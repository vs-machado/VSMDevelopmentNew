import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

const sections = ['home', 'expertise', 'portfolio', 'experience', 'contact']

export default function Navbar({ onTerminalToggle }) {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { settings } = useSettings()
  const pendingSectionRef = useRef(null)
  const pendingTimeoutRef = useRef(null)
  const syncActiveSectionRef = useRef(() => {})

  const navLabels = {
    home: t('nav.home'),
    expertise: t('expertise.label'),
    portfolio: t('nav.portfolio'),
    experience: t('nav.experience'),
    contact: t('nav.contact'),
  }

  useEffect(() => {
    syncActiveSectionRef.current = () => {
      const reachedPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      if (reachedPageEnd) {
        setActive('contact')
        return
      }

      const probeY = window.scrollY + window.innerHeight * 0.35
      let nextActive = sections[0]

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= probeY) {
          nextActive = id
        }
      })

      setActive(nextActive)
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      if (pendingSectionRef.current) {
        return
      }

      syncActiveSectionRef.current()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current)
      }
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      pendingSectionRef.current = settings.animations ? id : null
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current)
      }
      if (settings.animations) {
        pendingTimeoutRef.current = window.setTimeout(() => {
          pendingSectionRef.current = null
          pendingTimeoutRef.current = null
          syncActiveSectionRef.current()
        }, 2000)
      } else {
        pendingTimeoutRef.current = null
      }

      setActive(id)
      el.scrollIntoView({ behavior: settings.animations ? 'smooth' : 'auto' })
      setMobileOpen(false)
    }
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-500 ${
          scrolled
            ? 'bg-void/85 backdrop-blur-xl border-edge'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="relative mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-6 px-8 lg:px-10">
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center group cursor-pointer shrink-0"
          >
            <img src="/images/vsm-development-logo.png" alt="VSM Development" className="w-24 h-24 object-contain" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2">
            {sections.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative inline-flex min-h-10 items-center justify-center rounded-xl px-5 py-2 text-[0.82rem] font-body tracking-wide transition-colors duration-300 cursor-pointer ${
                  active === id
                    ? 'text-accent'
                    : 'text-dim hover:text-txt'
                }`}
              >
                {active === id && settings.animations && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-x-[-8px] top-0 bottom-0 rounded-xl border border-accent/20 bg-accent/[0.08]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {active === id && !settings.animations && (
                  <div className="absolute inset-x-[-8px] top-0 bottom-0 rounded-xl border border-accent/20 bg-accent/[0.08]" />
                )}
                <span className="relative z-10">{navLabels[id]}</span>
              </button>
            ))}
          </div>

          {/* Desktop language toggle */}
          <button
            onClick={toggleLang}
            className="hidden md:flex absolute right-8 lg:right-10 top-1/2 -translate-y-1/2 h-9 px-3 rounded-lg bg-raised/80 border border-edge hover:border-accent/30 items-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0"
          >
            <span className="font-mono text-xs text-dim">
              {i18n.language === 'en' ? 'PT' : 'EN'}
            </span>
          </button>

          {/* Right controls */}
          <div className="flex items-center gap-2 justify-self-end md:hidden">
            {/* Mobile language toggle */}
            <button
              onClick={toggleLang}
              className="md:hidden h-9 px-3 rounded-lg bg-raised/80 border border-edge hover:border-accent/30 flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <span className="font-mono text-xs text-dim">
                {i18n.language === 'en' ? 'PT' : 'EN'}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 rounded-xl bg-raised/80 border border-edge flex items-center justify-center cursor-pointer"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-5 h-[2px] bg-dim transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-[3.75px]' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] bg-dim transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-0 right-0 z-[99] bg-void/95 backdrop-blur-xl border-b border-edge md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {sections.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer ${
                    active === id
                      ? 'text-accent bg-accent/[0.06]'
                      : 'text-dim hover:text-txt'
                  }`}
                >
                  {navLabels[id]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onTerminalToggle}
        className="fixed bottom-6 right-6 z-[101] h-12 w-12 rounded-full bg-raised/90 border border-edge shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:border-accent/40 flex items-center justify-center transition-all duration-300 cursor-pointer group backdrop-blur-xl"
        title="Toggle Terminal"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dim group-hover:text-accent transition-colors"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </button>
    </>
  )
}
