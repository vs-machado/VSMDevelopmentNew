import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function PrivacyModal({ isOpen, onClose }) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[300]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 z-[301] flex flex-col overflow-hidden rounded-2xl border border-edge bg-[rgba(12,18,32,0.88)] shadow-[0_0_15px_rgba(34,255,136,0.08),inset_0_0_15px_rgba(34,255,136,0.02)] backdrop-blur-xl md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[80vh] md:w-[min(640px,calc(100vw-64px))] md:-translate-x-1/2 md:-translate-y-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-edge/30">
              <h2 className="font-display text-lg font-semibold text-txt">
                {t('policy.title')}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-raised/80 border border-edge flex items-center justify-center hover:border-accent/30 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dim">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {/* Introduction */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-accent mb-2">
                    {t('policy.intro_title')}
                  </h3>
                  <p className="text-dim text-sm leading-relaxed">
                    {t('policy.intro')}
                  </p>
                </div>

                {/* Data Collection */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-accent mb-2">
                    {t('policy.collection_title')}
                  </h3>
                  <p className="text-dim text-sm leading-relaxed mb-3">
                    {t('policy.collection')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Google AdMob', 'Google Analytics', 'Firebase Crashlytics', 'Google Firebase'].map(
                      (service) => (
                        <span key={service} className="inline-flex items-center rounded-md border border-accent/15 bg-accent/[0.07] px-3 py-1 text-[0.65rem] font-mono tracking-[0.03em] text-accent">
                          {service}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-accent mb-2">
                    {t('policy.storage_title')}
                  </h3>
                  <p className="text-dim text-sm leading-relaxed">
                    {t('policy.storage')}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-edge/30">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-accent/10 border border-accent/25 text-accent text-sm font-display font-medium hover:bg-accent/15 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
