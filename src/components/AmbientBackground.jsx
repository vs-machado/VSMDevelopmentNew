import { useSettings } from '../contexts/SettingsContext'

const ORBS = [
  {
    className: 'ambient-orb ambient-orb-a',
    style: {
      top: '8%',
      left: '-10%',
      width: '36rem',
      height: '36rem',
      background:
        'radial-gradient(circle at 35% 35%, rgba(34,255,136,0.2) 0%, rgba(34,255,136,0.08) 30%, rgba(0,212,255,0.03) 58%, transparent 76%)',
    },
  },
  {
    className: 'ambient-orb ambient-orb-b',
    style: {
      top: '30%',
      right: '-14%',
      width: '42rem',
      height: '42rem',
      background:
        'radial-gradient(circle at 60% 40%, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.08) 32%, rgba(34,255,136,0.04) 58%, transparent 78%)',
    },
  },
  {
    className: 'ambient-orb ambient-orb-c',
    style: {
      bottom: '-16%',
      left: '18%',
      width: '30rem',
      height: '30rem',
      background:
        'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.04) 28%, rgba(34,255,136,0.03) 56%, transparent 76%)',
    },
  },
]

export default function AmbientBackground() {
  const { settings } = useSettings()

  if (!settings.particles) return null

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-vignette" />
      <div className="ambient-beam ambient-beam-a" />
      <div className="ambient-beam ambient-beam-b" />
      {ORBS.map((orb) => (
        <div key={orb.className} className={orb.className} style={orb.style} />
      ))}
    </div>
  )
}
