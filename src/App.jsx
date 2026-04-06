import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Globe, Smartphone, ArrowRight, ExternalLink, Shield, X, Code2, Cpu, Search, MessageSquare, Newspaper, Binary, Briefcase, GraduationCap, Award, Play } from 'lucide-react';

import CoalesceBackground from './components/CoalesceBackground';

/* --- Components --- */


const Nav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLng = i18n.language.startsWith('en') ? 'pt' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 font-sans">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-12 h-24 flex items-center justify-between">

        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/images/vsm-development-logo.png" alt="VSM Development" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex gap-10 items-center font-semibold text-[13px] tracking-tight">
          <Link to="/" className={`link-hover ${location.pathname === '/' ? 'text-cyan after:w-full' : 'text-slate-400 hover:text-white'}`}>
            {t('nav.home')}
          </Link>
          <Link to="/portfolio" className={`link-hover ${location.pathname === '/portfolio' ? 'text-cyan after:w-full' : 'text-slate-400 hover:text-white'}`}>
            {t('nav.portfolio')}
          </Link>
          <Link to="/experience" className={`link-hover ${location.pathname === '/experience' ? 'text-cyan after:w-full' : 'text-slate-400 hover:text-white'}`}>
            {t('nav.experience')}
          </Link>
          <button onClick={toggleLanguage} className="px-3 py-1 glass-panel text-[10px] uppercase font-bold hover:bg-cyan hover:text-slate transition-all cursor-pointer">
            {i18n.language.toUpperCase().substring(0, 2)}
          </button>
          <a href="mailto:vinicius.s.machado@protonmail.com" className="px-6 py-2.5 bg-cyan text-slate font-bold rounded-full hover:bg-white transition-all shadow-lg shadow-cyan/10">
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </nav>
  );
};

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate/90 backdrop-blur-md font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold text-white mb-8 pr-12">{t('policy.title')}</h2>
        <div className="space-y-8 text-slate-400 leading-relaxed text-[15px]">
          <section>
            <h3 className="text-white font-bold mb-3">{t('policy.intro_title')}</h3>
            <p>{t('policy.intro')}</p>
          </section>
          <section>
            <h3 className="text-white font-bold mb-3">{t('policy.collection_title')}</h3>
            <p>{t('policy.collection')}</p>
            <ul className="mt-4 space-y-2 list-disc list-inside text-sm opacity-80 font-sans">
              <li>Google AdMob</li>
              <li>Google Analytics</li>
              <li>Firebase Crashlytics</li>
              <li>Google Firebase</li>
            </ul>
          </section>
          <section>
            <h3 className="text-white font-bold mb-3">{t('policy.storage_title')}</h3>
            <p>{t('policy.storage')}</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, image, title }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
      onClick={onClose}
    >
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="relative max-w-full max-h-full"
         onClick={e => e.stopPropagation()}
       >
          <img 
            src={image} 
            alt={title} 
            className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10" 
          />
          <button 
            onClick={onClose} 
            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            Fechar <X size={18} />
          </button>
       </motion.div>
    </div>
  );
};

const ProjectCard = ({ title, desc, label, specs, github, playstore, onPrivacyClick, onImageClick, image, isMobile }) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-48 font-sans">
      <div 
        onClick={() => onImageClick(image, title)}
        className={`lg:col-span-7 rounded-[3rem] overflow-hidden group relative aspect-[16/10] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 cursor-zoom-in ${isMobile ? 'bg-[#050505]' : ''}`}
      >
         <img 
           src={image} 
           alt={title} 
           className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover object-top'} opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out`} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
         <div className="absolute bottom-12 left-12 text-left pointer-events-none">
            <h3 className="text-5xl font-black text-white mb-4 italic tracking-tight">{title}</h3>
            <span className="px-6 py-2 bg-cyan text-slate-950 text-[11px] font-bold uppercase rounded-full tracking-[0.2em] shadow-2xl shadow-cyan/20">{label}</span>
         </div>
      </div>
      <div className="lg:col-span-5 space-y-10">
         <p className="text-xl text-slate-400 leading-relaxed font-medium opacity-90 text-balance font-sans">
           {desc}
         </p>
         <div className="space-y-8 font-sans">
            <div className="flex items-center gap-4">
               <div className="h-px flex-grow bg-white/10"></div>
               <h4 className="text-[11px] uppercase font-bold tracking-[0.4em] text-cyan shrink-0">{t('portfolio.specs')}</h4>
            </div>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-5 text-[14px] font-semibold opacity-60">
               {specs.map((spec, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)] shrink-0"></div> 
                   {spec}
                 </li>
               ))}
            </ul>
         </div>
         
         <div className="flex flex-col gap-5 font-sans pt-6">
            <div className="flex gap-5">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white/5 hover:bg-white hover:text-slate-950 border border-white/10 rounded-full transition-all flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest">
                  {t('portfolio.github')} <Binary size={18} />
                </a>
              )}
              {playstore && (
                <a href={playstore} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-cyan text-slate-950 hover:bg-white rounded-full transition-all flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest">
                  {t('portfolio.playstore')} <ExternalLink size={18} />
                </a>
              )}
            </div>
            {onPrivacyClick && (
              <button 
                onClick={onPrivacyClick}
                className="w-full py-4 bg-[#050505]/40 backdrop-blur-md text-slate-400 hover:text-white border border-white/5 hover:border-cyan/30 rounded-full transition-all flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest cursor-pointer"
              >
                {t('portfolio.privacy')} <Shield size={18} />
              </button>
            )}
         </div>
      </div>
    </div>
  );
};


/* --- Pages --- */

const Home = () => {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 font-sans relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        <section className="mb-48 max-w-6xl">

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
             <div className="inline-flex items-center gap-3 mb-12 px-5 py-2.5 glass-panel rounded-full border-cyan/10 bg-cyan/[0.03] backdrop-blur-md">
                <div className="relative">
                   <span className="block w-2.5 h-2.5 bg-cyan rounded-full"></span>
                   <span className="absolute inset-0 w-2.5 h-2.5 bg-cyan rounded-full animate-ping opacity-75"></span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan leading-none">{t('hero.status')}</span>
             </div>
             
             <h1 className="text-5xl md:text-[5.5rem] mb-14 leading-[1] text-white font-extrabold tracking-tight text-balance relative">
               <span className="relative z-10">{t('hero.title')}</span>
             </h1>

             <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-medium opacity-80 font-sans tracking-tight">
               {t('hero.subtitle')}
             </p>

             <div className="flex flex-wrap gap-6 items-center">
               <Link to="/portfolio" className="group relative inline-flex items-center gap-4 px-12 py-6 bg-cyan text-slate-950 font-black rounded-full hover:bg-white transition-all duration-500 shadow-2xl shadow-cyan/20">
                 {t('hero.cta')} <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
               </Link>
             </div>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative p-[1px] rounded-[3rem] bg-white/5 hover:bg-cyan/30 transition-all duration-700 overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="bg-[#050505]/60 backdrop-blur-3xl p-12 md:p-16 rounded-[3rem] h-full relative overflow-hidden flex flex-col border border-white/5 group-hover:border-cyan/20 transition-colors duration-700">
               <div className="w-20 h-20 bg-cyan/10 flex items-center justify-center text-cyan mb-14 rounded-2xl group-hover:bg-cyan/20 transition-all duration-500 shadow-inner">
                  <Code2 size={40} />
               </div>
               <h3 className="text-5xl mb-8 font-bold text-white tracking-tighter font-sans italic">{t('expertise.web.title')}</h3>
               <p className="text-slate-400 leading-relaxed text-xl mb-16 opacity-90 font-sans font-medium tracking-tight text-balance">{t('expertise.web.desc')}</p>
               <div className="mt-auto flex flex-wrap gap-4 font-mono text-[12px] uppercase font-bold text-cyan/60">
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">React</span>
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">Node.js / Python</span>
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">PostgreSQL</span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative p-[1px] rounded-[3rem] bg-white/5 hover:bg-cyan/30 transition-all duration-700 overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="bg-[#050505]/60 backdrop-blur-3xl p-12 md:p-16 rounded-[3rem] h-full relative overflow-hidden flex flex-col border border-white/5 group-hover:border-cyan/20 transition-colors duration-700">
               <div className="w-20 h-20 bg-cyan/10 flex items-center justify-center text-cyan mb-14 rounded-2xl group-hover:bg-cyan/20 transition-all duration-500 shadow-inner">
                  <Smartphone size={40} />
               </div>
               <h3 className="text-5xl mb-8 font-bold text-white tracking-tighter font-sans italic">{t('expertise.mobile.title')}</h3>
               <p className="text-slate-400 leading-relaxed text-xl mb-16 opacity-90 font-sans font-medium tracking-tight text-balance">{t('expertise.mobile.desc')}</p>
               <div className="mt-auto flex flex-wrap gap-4 font-mono text-[12px] uppercase font-bold text-cyan/60">
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">Kotlin / Java</span>
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">Jetpack Compose</span>
                  <span className="px-5 py-2 bg-white/5 rounded-full border border-white/5 tracking-widest group-hover:border-cyan/20 transition-colors">Android SDK</span>
               </div>
            </div>
          </motion.div>
        </section>

      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 font-sans relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        <div className="max-w-6xl relative">
          <h2 className="text-6xl md:text-8xl mb-32 font-extrabold text-white tracking-tighter relative">
            {t('experience.title')}
            <span className="absolute -left-12 top-0 text-cyan/10 text-lg font-mono tracking-[0.5em] [writing-mode:vertical-lr] hidden xl:block uppercase">Timeline</span>
          </h2>
        
          <div className="space-y-32">
            <div className="relative pl-12 border-l border-white/10 font-sans">
              <div className="absolute top-0 left-[-8px] w-4 h-4 bg-cyan rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">{t('experience.nativa.role')}</h3>
                  <div className="flex items-center gap-4 text-cyan font-bold text-sm uppercase tracking-[0.2em]">
                    <span>{t('experience.nativa.company')}</span>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    <span className="opacity-60">{t('experience.nativa.location')}</span>
                  </div>
                </div>
                <div className="px-6 py-2.5 glass-panel text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white/[0.02]">
                  {t('experience.nativa.period')}
                </div>
              </div>
              
              <p className="text-xl text-slate-400 leading-relaxed mb-16 opacity-90 max-w-4xl font-sans">
                {t('experience.nativa.description')}
              </p>
              
              <div className="grid grid-cols-1 gap-10">
                {/* LIA Project */}
                <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#050505]/40 backdrop-blur-xl border border-white/5 hover:border-cyan/20 transition-all duration-500">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">LIA (Licitações com IA) @ TRE-AC</h4>
                    <p className="text-lg text-slate-400 leading-relaxed opacity-80 font-sans">{t('experience.nativa.lia')}</p>
                  </div>
                </div>

                {/* Nativa Auditoria Project - AWARD */}
                <div className="group relative p-[1px] rounded-[2.5rem] bg-gradient-to-r from-cyan/20 via-violet/20 to-cyan/20 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-[#050505]/60 backdrop-blur-3xl p-10 md:p-12 rounded-[2.5rem] border border-white/5">
                    <div className="flex flex-col md:flex-row gap-10">
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 text-cyan mb-6">
                          <div className="p-3 bg-cyan/10 rounded-xl">
                            <Award size={28} className="animate-pulse" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{t('experience.award_badge')}</span>
                        </div>
                        <h4 className="text-3xl font-bold text-white mb-6 tracking-tight">Nativa Auditoria</h4>
                        <p className="text-lg text-slate-400 leading-relaxed opacity-90 mb-10 font-sans max-w-3xl">{t('experience.nativa.auditoria')}</p>
                        
                        <a 
                          href="https://www.cnj.jus.br/geracao-de-valor-premiacao-reconhece-boas-praticas-em-auditoria-interna/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 px-8 py-4 bg-white text-slate font-black rounded-full hover:bg-cyan transition-all text-[11px] uppercase tracking-[0.2em] shadow-xl"
                        >
                          <Play size={14} fill="currentColor" /> {t('experience.view_details')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BI Dashboards Project */}
                <div className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#050505]/40 backdrop-blur-xl border border-white/5 hover:border-cyan/20 transition-all duration-500">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">BI Dashboards @ TRE-RO</h4>
                    <p className="text-lg text-slate-400 leading-relaxed opacity-80 font-sans">{t('experience.nativa.bi')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Background */}
            <div className="pt-16">
              <h3 className="text-4xl font-bold text-white mb-20 tracking-tight font-sans pl-12">{t('experience.education.title')}</h3>
              <div className="relative pl-12 border-l border-white/10 font-sans">
                <div className="absolute top-0 left-[-8px] w-4 h-4 glass-panel border-cyan/40 bg-[#050505] rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#050505]/30 p-10 rounded-[2.5rem] border border-white/5">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{t('experience.education.uninter.degree')}</h4>
                    <div className="text-cyan font-bold text-[13px] uppercase tracking-[0.25em]">
                      {t('experience.education.uninter.school')}
                    </div>
                  </div>
                  <div className="px-6 py-2.5 glass-panel text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white/[0.02]">
                    {t('experience.education.uninter.period')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivacyModal isOpen={false} onClose={() => {}} />
    </motion.div>
  );
};



const Portfolio = () => {
  const { t } = useTranslation();
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (image, title) => {
    setActiveImage({ image, title });
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-32 font-sans relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">

        <h2 className="text-6xl md:text-8xl mb-24 font-extrabold text-white tracking-tighter relative">
          {t('portfolio.title')}
          <span className="absolute -right-12 top-0 text-cyan/10 text-lg font-mono tracking-[0.5em] [writing-mode:vertical-lr] hidden xl:block uppercase">Works</span>
        </h2>

        
        {/* Web Section */}
        <div className="mb-64">
           <div className="flex items-center gap-8 mb-24 opacity-40 text-white font-sans">
              <span className="text-[12px] font-black uppercase tracking-[0.6em] shrink-0 text-cyan">{t('portfolio.web_section')}</span>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan/50 to-transparent"></div>
           </div>

           
           <ProjectCard 
              title={t('portfolio.debrid.title')}
              desc={t('portfolio.debrid.desc')}
              label={t('portfolio.project_label.web')}
              image="/images/debrid-searcher.jpg"
              github="https://github.com/vs-machado/debrid-searcher"
              specs={t('portfolio.debrid.specs_list', { returnObjects: true })}
              onImageClick={handleImageClick}
           />
           
           <ProjectCard 
              title={t('portfolio.chatbot.title')}
              desc={t('portfolio.chatbot.desc')}
              label={t('portfolio.project_label.web')}
              image="/images/chatbot-rag.png"
              github="https://github.com/vs-machado/chatbot-rag"
              specs={t('portfolio.chatbot.specs_list', { returnObjects: true })}
              onImageClick={handleImageClick}
           />
        </div>

        {/* Mobile Section */}
        <div>
           <div className="flex items-center gap-8 mb-24 opacity-40 text-white font-sans">
              <span className="text-[12px] font-black uppercase tracking-[0.6em] shrink-0 text-cyan">{t('portfolio.mobile_section')}</span>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan/50 to-transparent"></div>
           </div>

           
           <ProjectCard 
              title={t('portfolio.remedi.title')}
              desc={t('portfolio.remedi.desc')}
              label={t('portfolio.project_label.mobile')}
              image="/images/remedi-screenshots.png"
              github="https://github.com/vs-machado/PillReminder/releases/tag/1.5.3"
              playstore="https://play.google.com/store/apps/details?id=com.phoenix.remedi"
              onPrivacyClick={() => setIsPolicyOpen(true)}
              specs={t('portfolio.remedi.specs_list', { returnObjects: true })}
              onImageClick={handleImageClick}
           />
           
           <ProjectCard 
              title={t('portfolio.ainformation.title')}
              desc={t('portfolio.ainformation.desc')}
              label={t('portfolio.project_label.mobile')}
              image="/images/ainformation.png"
              github="https://github.com/vs-machado/AInformation"
              specs={t('portfolio.ainformation.specs_list', { returnObjects: true })}
              isMobile={true}
              onImageClick={handleImageClick}
           />
        </div>
      </div>
      <PrivacyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
      <ImageModal 
        isOpen={!!activeImage} 
        onClose={() => setActiveImage(null)} 
        image={activeImage?.image} 
        title={activeImage?.title} 
      />
    </motion.div>
  );
};


const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-24 border-t border-white/5 px-8 mt-auto font-sans bg-[#050505]/60 backdrop-blur-xl relative overflow-hidden">

       {/* Accent Glow */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan/5 blur-[120px] -z-10 rounded-full"></div>
       
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6 text-center md:text-left">
             <img src="/images/vsm-development-logo.png" alt="VSM Development" className="h-10 w-auto mx-auto md:mx-0 opacity-90" />
             <p className="text-slate-500 text-[13px] max-w-sm leading-relaxed mx-auto md:mx-0 font-medium opacity-80">
                © 2025 VSM Development. {t('footer.rights')}
             </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
             <nav className="flex flex-col gap-4 text-[13px] font-bold text-slate-400">
                <Link to="/" className="hover:text-cyan transition-colors">{t('nav.home')}</Link>
                <Link to="/portfolio" className="hover:text-cyan transition-colors">{t('nav.portfolio')}</Link>
                <Link to="/experience" className="hover:text-cyan transition-colors">{t('nav.experience')}</Link>
             </nav>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-4 flex flex-col gap-6 items-center md:items-end text-center md:text-right">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan">{t('footer.connect')}</h4>
             <div className="space-y-4">
                <a href="mailto:vinicius.s.machado@protonmail.com" className="text-sm md:text-base font-bold text-white hover:text-cyan transition-colors tracking-tight block">
                  vinicius.s.machado@protonmail.com
                </a>
             </div>
          </div>
       </div>
    </footer>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <CoalesceBackground />
        <Nav />
        <main className="flex-grow">

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/experience" element={<Experience />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
