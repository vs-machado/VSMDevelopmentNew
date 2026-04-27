import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import ParallaxLayer from './ParallaxLayer'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'

const projects = [
  {
    key: 'debrid',
    category: 'web',
    image: '/images/debrid-searcher.jpg',
    github: 'https://github.com/vs-machado/debrid-searcher',
  },
  {
    key: 'chatbot',
    category: 'web',
    image: '/images/chatbot-rag.png',
    github: 'https://github.com/vs-machado/chatbot-rag',
  },
  {
    key: 'remedi',
    category: 'mobile',
    image: '/images/remedi-screenshots.png',
    github: 'https://github.com/vs-machado/PillReminder/',
    playstore: 'https://play.google.com/store/apps/details?id=com.phoenix.remedi',
    hasPrivacy: true,
  },
  {
    key: 'ainformation',
    category: 'mobile',
    image: '/images/ainformation.png',
    github: 'https://github.com/vs-machado/AInformation',
  },
]

export default function Portfolio({ onPrivacyOpen }) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [expandedProject, setExpandedProject] = useState(null)
  const { settings } = useSettings()

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const filters = [
    { key: 'all', label: t('portfolio.all_section') },
    { key: 'web', label: t('portfolio.web_section') },
    { key: 'mobile', label: t('portfolio.mobile_section') },
  ]

  useEffect(() => {
    if (!expandedProject) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpandedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedProject])

  return (
    <section id="portfolio" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* Section label */}
        <ScrollReveal className="w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent/20 to-accent/20" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              // {t('portfolio.title')}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-accent/20 via-accent/20 to-transparent" />
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex min-h-10 items-center justify-center rounded-lg border px-5 py-2.5 text-xs font-mono tracking-wide transition-all duration-300 cursor-pointer ${
                  filter === f.key
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-transparent border-edge text-dim hover:text-txt hover:border-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8 xl:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.key}
                layout={settings.animations}
                initial={settings.animations ? { opacity: 0, scale: 0.95 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={settings.animations ? { opacity: 0, scale: 0.95 } : undefined}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard
                  className="group overflow-hidden rounded-2xl border border-edge bg-[rgba(12,18,32,0.8)] shadow-[0_0_15px_rgba(34,255,136,0.08),inset_0_0_15px_rgba(34,255,136,0.02)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-accent/25 hover:shadow-[0_10px_32px_rgba(34,255,136,0.08),inset_0_0_18px_rgba(34,255,136,0.04)]"
                  intensity={2}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-surface">
                    <button
                      type="button"
                      onClick={() => setExpandedProject(project)}
                      className="absolute inset-0 z-10 cursor-zoom-in"
                      aria-label={t(`portfolio.${project.key}.title`)}
                    >
                      <img
                        src={project.image}
                        alt={t(`portfolio.${project.key}.title`)}
                        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-void/70 via-void/10 to-transparent" />
                    </button>
                    {/* Category badge */}
                    <div className="pointer-events-none absolute top-4 left-4 z-20">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-[0.65rem] font-mono tracking-wide backdrop-blur-md ${
                        project.category === 'web'
                          ? 'bg-accent/15 text-accent border border-accent/20'
                          : 'bg-cyan/15 text-cyan border border-cyan/20'
                      }`}>
                        {t(`portfolio.project_label.${project.category}`)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-6 md:p-7">
                    <h3 className="font-display text-xl font-semibold text-txt">
                      {t(`portfolio.${project.key}.title`)}
                    </h3>
                    <p className="text-dim text-sm leading-7 max-w-[62ch]">
                      {t(`portfolio.${project.key}.desc`)}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2">
                      {(t(`portfolio.${project.key}.specs_list`, { returnObjects: true }) || []).map(
                        (spec, i) => (
                          <span
                            key={i}
                            className="inline-flex min-h-7 items-center rounded border border-edge/50 bg-surface/80 px-2.5 py-1 text-[0.68rem] font-mono text-dim"
                          >
                            {spec}
                          </span>
                        )
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-edge/30">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-xs font-mono text-dim transition-colors hover:border-accent hover:text-accent"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {t('portfolio.github')}
                        </a>
                      )}
                      {project.playstore && (
                        <a
                          href={project.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-xs font-mono text-dim transition-colors hover:border-cyan hover:text-cyan"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.176 12l2.522-2.492zM5.864 3.658L16.8 9.99l-2.302 2.302L5.864 3.658z"/>
                          </svg>
                          {t('portfolio.playstore')}
                        </a>
                      )}
                      {project.hasPrivacy && (
                        <button
                          onClick={onPrivacyOpen}
                          className="inline-flex cursor-pointer items-center gap-1.5 border-b border-transparent pb-0.5 text-xs font-mono text-dim transition-colors hover:border-highlight hover:text-highlight"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                          {t('portfolio.privacy')}
                        </button>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {expandedProject && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedProject(null)}
              className="fixed inset-0 z-[310] cursor-zoom-out bg-void/88 backdrop-blur-md"
              aria-label="Close expanded image"
            />

            <motion.div
              initial={settings.animations ? { opacity: 0, y: 24, scale: 0.96 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={settings.animations ? { opacity: 0, y: 24, scale: 0.96 } : undefined}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 z-[311] flex items-center justify-center md:inset-8"
            >
              <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-edge bg-[rgba(12,18,32,0.72)] shadow-[0_0_24px_rgba(34,255,136,0.08)] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setExpandedProject(null)}
                  className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge/80 bg-void/80 text-txt transition-colors hover:border-accent/30 hover:text-accent cursor-pointer"
                  aria-label="Close expanded image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                <img
                  src={expandedProject.image}
                  alt={t(`portfolio.${expandedProject.key}.title`)}
                  className="max-h-[85vh] w-full object-contain bg-surface"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
