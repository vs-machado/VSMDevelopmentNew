import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

const defaultVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 30,
  once = true,
}) {
  const { settings } = useSettings()

  if (!settings.animations) {
    return <div className={className}>{children}</div>
  }

  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  const offset = dirMap[direction] || dirMap.up

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
