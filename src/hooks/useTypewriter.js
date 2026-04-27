import { useState, useEffect, useRef } from 'react'
import { useSettings } from '../contexts/SettingsContext'

export function useTypewriter(strings, typingSpeed = 70, deletingSpeed = 35, pauseTime = 2200) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')
  const indexRef = useRef(0)
  const { settings } = useSettings()
  const stringsRef = useRef(strings)
  stringsRef.current = strings

  useEffect(() => {
    if (!settings.animations) {
      setText(stringsRef.current[0] || '')
      return
    }

    let timeout

    const current = stringsRef.current[indexRef.current] || ''

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1))
        }, typingSpeed + Math.random() * 40)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 0)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), pauseTime)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1))
        }, deletingSpeed)
      } else {
        indexRef.current = (indexRef.current + 1) % stringsRef.current.length
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, settings.animations, typingSpeed, deletingSpeed, pauseTime])

  return text
}
