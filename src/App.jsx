import { useState, useCallback, useEffect } from 'react'
import { SettingsProvider } from './contexts/SettingsContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import PrivacyModal from './components/PrivacyModal'
import AmbientBackground from './components/AmbientBackground'
import ParallaxShapes from './components/ParallaxShapes'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const toggleTerminal = useCallback(() => {
    setTerminalOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleTerminalShortcut = (e) => {
      if (e.ctrlKey && e.code === 'Backquote') {
        e.preventDefault()
        toggleTerminal()
      }
    }

    window.addEventListener('keydown', handleTerminalShortcut)
    return () => window.removeEventListener('keydown', handleTerminalShortcut)
  }, [toggleTerminal])

  return (
    <SettingsProvider>
      {/* Background layers */}
      <div className="dot-grid" />
      <div className="noise-overlay" />
      <AmbientBackground />
      <ParallaxShapes />
      <CursorGlow />

      {/* Navigation */}
      <ScrollProgress />
      <Navbar onTerminalToggle={toggleTerminal} />

      {/* Main content */}
      <main className="relative z-10 w-full flex flex-col gap-0 md:gap-8">
        <Hero />
        <Expertise />
        <Portfolio onPrivacyOpen={() => setPrivacyOpen(true)} />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Overlays */}
      <Terminal isOpen={terminalOpen} onClose={toggleTerminal} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </SettingsProvider>
  )
}
