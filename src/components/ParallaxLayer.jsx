import { useEffect, useRef } from 'react'
import { useSettings } from '../contexts/SettingsContext'

export default function ParallaxLayer({ children, speed = 0.08, className = '' }) {
  const ref = useRef(null)
  const { settings } = useSettings()

  useEffect(() => {
    const node = ref.current
    if (!node || !settings.parallax) {
      if (node) node.style.transform = 'translate3d(0, 0, 0)'
      return
    }

    let frame = null

    const update = () => {
      const rect = node.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const distance = elementCenter - viewportCenter
      node.style.transform = `translate3d(0, ${distance * speed}px, 0)`
      frame = null
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [settings.parallax, speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
