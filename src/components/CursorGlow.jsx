import { useEffect, useRef } from 'react'
import { useSettings } from '../contexts/SettingsContext'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const posRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  const { settings } = useSettings()

  useEffect(() => {
    if (!settings.particles) return

    const glow = glowRef.current
    if (!glow) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          glow.style.transform = `translate(${posRef.current.x - 260}px, ${posRef.current.y - 260}px)`
          rafRef.current = null
        })
      }
    }

    const onLeave = () => {
      glow.style.opacity = '0'
    }

    const onEnter = () => {
      glow.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [settings.particles])

  if (!settings.particles) return null

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[2] transition-opacity duration-500"
      style={{
        width: 520,
        height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,255,136,0.045) 0%, rgba(0,212,255,0.02) 35%, transparent 70%)',
        willChange: 'transform',
        transform: 'translate(-200px, -200px)',
      }}
      aria-hidden="true"
    />
  )
}
