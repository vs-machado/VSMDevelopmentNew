import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ParallaxLayer from './ParallaxLayer'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'

const experienceDetails = [
  {
    key: 'lia',
    tag: 'TRE-AC',
    techs: ['FastAPI', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
  },
  {
    key: 'auditoria',
    tag: null,
    techs: ['FastAPI', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    link: 'https://www.cnj.jus.br/geracao-de-valor-premiacao-reconhece-boas-praticas-em-auditoria-interna/',
    isAward: true,
  },
  {
    key: 'bi',
    tag: 'TRE-RO',
    techs: ['JavaScript', 'HTML', 'CSS'],
  },
]

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* Section label */}
        <ScrollReveal className="w-full">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent/20 to-accent/20" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              // {t('experience.title')}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-accent/20 via-accent/20 to-transparent" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-14 lg:gap-16">
          {/* Left: Role summary */}
          <ScrollReveal delay={0.1}>
            <TiltCard className="relative rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] p-8 shadow-[0_0_15px_rgba(34,255,136,0.08),inset_0_0_15px_rgba(34,255,136,0.02)] backdrop-blur-xl md:p-10" intensity={1.75} interactive={false}>
              {/* Company */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="font-mono text-accent text-sm font-bold">N</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-txt">
                      {t('experience.nativa.company')}
                    </h3>
                    <p className="text-accent text-xs font-mono">
                      {t('experience.nativa.role')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Period + Location */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-dim text-xs font-mono">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {t('experience.nativa.period')}
                </div>
                <div className="flex items-center gap-2 text-dim text-xs font-mono">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {t('experience.nativa.location')}
                </div>
              </div>

              <p className="text-dim text-sm leading-7 mb-6 max-w-[58ch]">
                {t('experience.nativa.description')}
              </p>

              {/* Decoration line */}
              <div className="w-full h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />
            </TiltCard>
          </ScrollReveal>

          {/* Right: Experience details */}
          <div className="flex flex-col gap-5">
            <ScrollReveal delay={0.15}>
              <div className="flex items-center gap-3 mb-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span className="text-sm font-display font-medium text-txt">
                  {t('experience.developed_apps')}
                </span>
              </div>
            </ScrollReveal>
            {experienceDetails.map((detail, index) => (
              <ScrollReveal key={detail.key} delay={0.15 + index * 0.1}>
                <TiltCard className="rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-accent/25 hover:shadow-[0_10px_32px_rgba(34,255,136,0.08),inset_0_0_18px_rgba(34,255,136,0.04)]" intensity={1.5} interactive={false}>
                  {/* Header row */}
                  <div className="group flex min-h-[72px] w-full items-center justify-between p-6 text-left">
                    <div className="flex items-center gap-3">
                      {detail.tag && (
                        <span className="inline-flex min-h-8 items-center rounded-md border border-accent/15 bg-accent/[0.07] px-3 py-1.5 text-[0.65rem] font-mono tracking-[0.03em] text-accent">{detail.tag}</span>
                      )}
                      {detail.isAward && (
                          <span className="inline-flex min-h-8 items-center gap-1.5 rounded border border-highlight/20 bg-highlight/10 px-2.5 py-1.5 text-[0.65rem] font-mono text-highlight">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {t('experience.award_badge')}
                        </span>
                      )}
                      <span className="text-sm text-txt font-display font-medium">
                        {detail.key === 'lia'
                          ? 'LIA'
                          : detail.key === 'auditoria'
                          ? 'Nativa Auditoria'
                          : 'BI Dashboards'}
                      </span>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="space-y-3 border-t border-edge/30 pt-5">
                      <p className="text-dim text-sm leading-7">
                        {t(`experience.nativa.${detail.key}`)}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {detail.techs.map((tech) => (
                        <span
                          key={tech}
                            className="inline-flex min-h-7 items-center rounded border border-edge/50 bg-surface/80 px-2.5 py-1 text-[0.68rem] font-mono text-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {detail.link && (
                      <a
                        href={detail.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-xs font-mono text-highlight transition-colors hover:border-highlight hover:text-highlight/80"
                        >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        CNJ Award
                      </a>
                    )}
                  </div>
                </div>
                </TiltCard>
              </ScrollReveal>
            ))}

            {/* Education */}
            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-3 mb-1 pt-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/>
                </svg>
                <span className="text-sm font-display font-medium text-txt">
                  {t('experience.education.heading')}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.45}>
              <TiltCard className="mt-2 rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] p-6 backdrop-blur-xl" intensity={1.5} interactive={false}>
                <div className="flex items-center gap-3 mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/>
                  </svg>
                  <span className="text-sm font-display font-medium text-txt">
                    {t('experience.education.title')}
                  </span>
                </div>
                <div className="pl-[30px]">
                  <p className="text-dim text-sm font-body">
                    {t('experience.education.uninter.degree')}
                  </p>
                  <p className="text-muted text-xs font-mono mt-1">
                    {t('experience.education.uninter.school')} · {t('experience.education.uninter.period')}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
