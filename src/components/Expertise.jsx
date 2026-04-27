import { useTranslation } from 'react-i18next'
import ParallaxLayer from './ParallaxLayer'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'

const webTechs = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Node.js / Python',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <ellipse cx="12" cy="5" rx="6.5" ry="2.5" />
        <path d="M5.5 5v10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V5" />
        <path d="M5.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
      </svg>
    ),
  },
]

const mobileTechs = [
  {
    name: 'Kotlin / Java',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
        <line x1="10" y1="5.5" x2="14" y2="5.5" />
        <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Jetpack Compose',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 3Z" />
      </svg>
    ),
  },
  {
    name: 'Android SDK',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M8 9a4 4 0 0 1 8 0" />
        <rect x="7" y="9" width="10" height="7" rx="2" />
        <line x1="9" y1="5" x2="7.5" y2="3" />
        <line x1="15" y1="5" x2="16.5" y2="3" />
        <circle cx="10" cy="12" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="14" cy="12" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Expertise() {
  const { t } = useTranslation()

  return (
    <section id="expertise" className="relative py-28 md:py-36 px-6">
      <ParallaxLayer className="pointer-events-none absolute right-[6%] top-12 opacity-70" speed={-0.08}>
      </ParallaxLayer>
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* Section label */}
        <ScrollReveal className="w-full">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent/20 to-accent/20" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              // {t('expertise.label')}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-accent/20 via-accent/20 to-transparent" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Web card */}
          <ScrollReveal delay={0.1}>
            <TiltCard className="group h-full rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] p-8 shadow-[0_0_15px_rgba(34,255,136,0.08),inset_0_0_15px_rgba(34,255,136,0.02)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-accent/25 hover:shadow-[0_10px_32px_rgba(34,255,136,0.08),inset_0_0_18px_rgba(34,255,136,0.04)] md:p-10" intensity={2}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                    <line x1="14" y1="4" x2="10" y2="20" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-txt mb-1">
                    {t('expertise.web.title')}
                  </h3>
                  <div className="w-12 h-0.5 bg-accent/30 rounded-full group-hover:w-20 transition-all duration-500" />
                </div>
              </div>

              <p className="text-dim text-sm leading-7 mb-8 max-w-[58ch]">
                {t('expertise.web.desc')}
              </p>

              <div className="flex flex-wrap gap-2">
                {webTechs.map((tech) => (
                  <span key={tech.name} className="inline-flex min-h-8 items-center rounded-md border border-accent/15 bg-accent/[0.07] px-3 py-1.5 text-[0.72rem] font-mono tracking-[0.03em] text-accent transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.12]">
                    <span className="mr-1.5 inline-flex items-center justify-center">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Mobile card */}
          <ScrollReveal delay={0.2}>
            <TiltCard className="group h-full rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] p-8 shadow-[0_0_15px_rgba(34,255,136,0.08),inset_0_0_15px_rgba(34,255,136,0.02)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-cyan/25 hover:shadow-[0_10px_32px_rgba(0,212,255,0.08),inset_0_0_18px_rgba(0,212,255,0.04)] md:p-10" intensity={2}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-txt mb-1">
                    {t('expertise.mobile.title')}
                  </h3>
                  <div className="w-12 h-0.5 bg-cyan/30 rounded-full group-hover:w-20 transition-all duration-500" />
                </div>
              </div>

              <p className="text-dim text-sm leading-7 mb-8 max-w-[58ch]">
                {t('expertise.mobile.desc')}
              </p>

              <div className="flex flex-wrap gap-2">
                {mobileTechs.map((tech) => (
                  <span key={tech.name} className="inline-flex min-h-8 items-center rounded-md border border-cyan/15 bg-cyan/[0.07] px-3 py-1.5 text-[0.72rem] font-mono tracking-[0.03em] text-cyan transition-colors duration-300 hover:border-cyan/30 hover:bg-cyan/[0.12]">
                    <span className="mr-1.5 inline-flex items-center justify-center">{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
