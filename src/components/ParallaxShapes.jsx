import { useRef, useEffect, useMemo } from 'react'
import { useSettings } from '../contexts/SettingsContext'

function Particle({ x, y, size, coreColor, glowColor, opacity, parallaxFactor, driftX, driftY, driftRotation, driftDuration, driftDelay, pulseDuration, animated }) {
  return (
    <div
      className="parallax-shape"
      data-factor={parallaxFactor}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div
        className="parallax-shape-inner"
        style={{
          '--shape-drift-x': `${driftX}px`,
          '--shape-drift-y': `${driftY}px`,
          '--shape-drift-rotate': `${driftRotation}deg`,
          '--particle-base-opacity': opacity,
          animationDuration: `${driftDuration}s`,
          animationDelay: `${driftDelay}s`,
          animationPlayState: animated ? 'running' : 'paused',
        }}
      >
        <div
          className="particle-core"
          style={{
            width: size,
            height: size,
            borderRadius: '999px',
            background: `radial-gradient(circle, ${coreColor} 0%, ${glowColor} 45%, transparent 100%)`,
            boxShadow: `0 0 ${Math.max(size * 1.8, 12)}px ${glowColor}`,
            filter: 'blur(0.2px)',
            animationDuration: `${pulseDuration}s`,
            animationDelay: `${driftDelay}s`,
            animationPlayState: animated ? 'running' : 'paused',
          }}
        />
      </div>
    </div>
  )
}

export default function ParallaxShapes() {
  const containerRef = useRef(null)
  const { settings } = useSettings()
  const rafRef = useRef(null)

  const shapes = useMemo(() => {
    const colors = [
      {
        coreColor: 'rgba(226,232,240,0.22)',
        glowColor: 'rgba(226,232,240,0.08)',
      },
      {
        coreColor: 'rgba(123,139,165,0.2)',
        glowColor: 'rgba(123,139,165,0.06)',
      },
    ]
    const items = []
    for (let i = 0; i < 30; i++) {
      const palette = colors[Math.floor(Math.random() * colors.length)]
      items.push({
        id: i,
        x: Math.random() * 95 + 2,
        y: Math.random() * 95 + 2,
        size: 5 + Math.random() * 14,
        coreColor: palette.coreColor,
        glowColor: palette.glowColor,
        opacity: 0.24 + Math.random() * 0.24,
        parallaxFactor: 0.02 + Math.random() * 0.04,
        driftX: (Math.random() - 0.5) * 32,
        driftY: -24 - Math.random() * 32,
        driftRotation: (Math.random() - 0.5) * 14,
        driftDuration: 10 + Math.random() * 8,
        driftDelay: Math.random() * -10,
        pulseDuration: 4 + Math.random() * 4,
      })
    }
    return items
  }, [])

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.parallax-shape')
    if (!els?.length) return

    if (!settings.parallax) {
      els.forEach((el) => {
        el.style.transform = 'translateY(0px)'
      })
      return
    }

      const onScroll = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY
        els.forEach((el) => {
          const factor = parseFloat(el.dataset.factor) || 0.03
          el.style.transform = `translateY(${scrollY * factor * -80}px)`
        })
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [settings.parallax])

  if (!settings.particles) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {shapes.map((s) => (
        <Particle key={s.id} {...s} animated={settings.animations} />
      ))}
    </div>
  )
}
