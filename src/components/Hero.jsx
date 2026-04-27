import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'
import { useSettings } from '../contexts/SettingsContext'
import ParallaxLayer from './ParallaxLayer'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const roles = [
    t('hero.title'),
    'React + Node.js',
    'Kotlin + Compose',
    'Kotlin + XML',
    'React + Python',
  ]
  const typed = useTypewriter(roles, 65, 30, 2400)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: settings.animations ? 'smooth' : 'auto' })
  }

  const Wrap = settings.animations ? motion.div : 'div'
  const wrapProps = settings.animations
    ? {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
      }
    : {}

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
    >
      <ParallaxLayer className="absolute inset-0 pointer-events-none" speed={-0.06}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,255,136,0.04) 0%, transparent 70%)',
          }}
        />
      </ParallaxLayer>
      <ParallaxLayer className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none" speed={0.1}>
        <div className="h-[40rem] w-[40rem] rounded-full border border-cyan/10 bg-cyan/[0.02] blur-3xl" />
      </ParallaxLayer>
      <Wrap {...wrapProps} className="relative z-10 mx-auto w-full text-center space-y-4">
        {/* Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-accent/20 p-1">
            <img src="/images/profile.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        {/* Status badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-edge bg-[rgba(12,18,32,0.72)] px-8 py-2.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inset-[-3px] rounded-full border-[1.5px] border-accent animate-[pulse-ring_2s_ease-out_infinite]" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-mono text-dim tracking-wide">
              {t('hero.status')}
            </span>
          </div>
        </div>

        {/* Name */}
        <h2 className="font-body text-dim text-sm md:text-base tracking-[0.2em] uppercase !mb-6">
          {t('hero.name')}
        </h2>

        {/* Typewriter title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold !mb-10 leading-tight">
          <span className="bg-gradient-to-br from-accent to-cyan bg-clip-text text-transparent [text-shadow:0_0_20px_rgba(34,255,136,0.4),0_0_60px_rgba(34,255,136,0.1)]">
            {typed}
          </span>
          <span className="ml-0.5 animate-[blink_1s_step-end_infinite] text-accent">_</span>
        </h1>

        {/* Subtitle */}
        <p className="text-dim text-base md:text-lg mx-auto leading-relaxed !mb-14 font-body font-light">
          {t('hero.subtitle')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => scrollTo('portfolio')}
            className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-xl border border-accent/30 bg-accent/10 px-10 py-3.5 text-sm font-display font-semibold tracking-wide text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/15 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-edge px-10 py-3.5 text-sm font-display font-medium tracking-wide text-dim transition-all duration-300 hover:border-muted hover:text-txt cursor-pointer"
          >
            {t('nav.contact')}
          </button>
        </div>

        {/* Tech marquee */}
        <ScrollReveal delay={0.4} className="mt-16">
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'Kotlin', 'PostgreSQL', 'TypeScript', 'FastAPI', 'Compose'].map(
              (tech, i) => (
                <span key={tech} className="inline-flex items-center rounded-md border border-accent/15 bg-accent/[0.07] px-3 py-1 text-[0.72rem] font-mono tracking-[0.03em] text-accent transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.12]">
                  {tech}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      </Wrap>

      {/* Scroll indicator */}
      {settings.animations && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[0.65rem] font-mono text-muted tracking-widest uppercase">scroll</span>
          <div className="w-5 h-8 rounded-full border border-muted/40 flex items-start justify-center p-1.5">
            <div
              className="w-1 h-2 rounded-full bg-accent/50"
              style={{ animation: 'scroll-hint 2s ease-in-out infinite' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
