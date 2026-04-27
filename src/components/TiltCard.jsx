import { useRef, useCallback } from 'react'
import { useSettings } from '../contexts/SettingsContext'

export default function TiltCard({ children, className = '', intensity = 4, interactive = true }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const { settings } = useSettings()

  const handleMove = useCallback(
    (e) => {
      if (!interactive || !settings.animations || !cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -intensity
      const rotateY = ((x - centerX) / centerX) * intensity

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.004, 1.004, 1.004)`

      if (glowRef.current) {
        glowRef.current.style.opacity = '1'
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(34,255,136,0.07) 0%, transparent 62%)`
      }
    },
    [settings.animations, intensity]
  )

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
        onMouseMove={interactive ? handleMove : undefined}
        onMouseLeave={interactive ? handleLeave : undefined}
        style={{
          transition: 'transform 0.22s ease-out',
          position: 'relative',
          transformStyle: interactive ? 'preserve-3d' : undefined,
        }}
      >
      {interactive && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1]"
          style={{
            opacity: 0,
            transition: 'opacity 0.22s ease-out',
          }}
        />
      )}
      <div className="relative z-[2]">{children}</div>
    </div>
  )
}
