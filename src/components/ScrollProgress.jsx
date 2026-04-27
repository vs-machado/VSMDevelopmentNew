import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const { settings } = useSettings()

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min(window.scrollY / docHeight, 1))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[101] h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, var(--color-accent), var(--color-cyan))',
          boxShadow: '0 0 12px rgba(34,255,136,0.4)',
        }}
        transition={settings.animations ? { duration: 0.1, ease: 'linear' } : { duration: 0 }}
      />
    </div>
  )
}
