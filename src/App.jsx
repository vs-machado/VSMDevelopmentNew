import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Globe, Smartphone, ArrowRight, ExternalLink, Shield, X, Code2, Cpu, Search, MessageSquare, Newspaper, Binary, Briefcase, GraduationCap, Award, Play, Menu, MapPin, Calendar, Layers } from 'lucide-react';


import CoalesceBackground from './components/CoalesceBackground';

/* --- Components --- */


const Nav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLng = i18n.language.startsWith('en') ? 'pt' : 'en';
    i18n.changeLanguage(nextLng);
  };

  const navLinks = [
    { to: "/", label: t('nav.home') },
    { to: "/portfolio", label: t('nav.portfolio') },
    { to: "/experience", label: t('nav.experience') },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 font-sans">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button - Left Aligned */}
            <button 
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/vsm-development-logo.png" alt="VSM Development" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center font-semibold text-[13px] tracking-tight">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`link-hover ${location.pathname === link.to ? 'text-cyan after:w-full' : 'text-slate-400 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLanguage} className="px-3 py-1 glass-panel text-[10px] uppercase font-bold hover:bg-cyan hover:text-slate-950 transition-all duration-200 cursor-pointer">
              {i18n.language.toUpperCase().substring(0, 2)}
            </button>
            <a href="mailto:vinicius.s.machado@protonmail.com" className="px-6 py-2.5 bg-cyan text-slate-950 font-bold rounded-full hover:bg-white transition-all duration-200 shadow-lg shadow-cyan/10">
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col font-sans md:hidden"
          >
            <div className="h-24 px-8 flex items-center justify-between border-b border-white/5">
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-slate-400 hover:text-white p-2 cursor-pointer"
              >
                <X size={28} />
              </button>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src="/images/vsm-development-logo.png" alt="VSM Development" className="h-8 w-auto" />
              </Link>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center gap-12 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-4xl font-bold tracking-tighter transition-colors ${location.pathname === link.to ? 'text-cyan' : 'text-white/60 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-xs">
                <button 
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full py-4 glass-panel text-[12px] uppercase font-bold text-white border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {i18n.language === 'en' ? 'Português' : 'English'}
                </button>
                <a 
                  href="mailto:vinicius.s.machado@protonmail.com" 
                  className="w-full py-4 bg-cyan text-slate-950 font-bold rounded-full text-[12px] uppercase tracking-wider text-center hover:bg-white transition-all shadow-lg shadow-cyan/20"
                >
                  {t('nav.contact')}
                </a>
              </div>
            </div>
            
            <div className="p-12 text-center opacity-40">
               <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em]">VSM Development © 2025</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050505]/90 backdrop-blur-md font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
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
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
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
            className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] object-contain border border-white/10" 
          />
          <button 
            onClick={onClose} 
            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer"
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
        className={`lg:col-span-7 rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative aspect-[16/10] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 cursor-zoom-in ${isMobile ? 'bg-[#050505]' : ''}`}
      >
         <img 
           src={image} 
           alt={title} 
           className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover object-top'} opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out`} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
         <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-left pointer-events-none">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 italic tracking-tight">{title}</h3>
            <span className="px-4 md:px-6 py-1.5 md:py-2 bg-cyan text-slate-950 text-[10px] md:text-[11px] font-bold uppercase rounded-full tracking-[0.2em] shadow-2xl shadow-cyan/20">{label}</span>
         </div>
      </div>
      <div className="lg:col-span-5 space-y-6 md:space-y-10">
         <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium opacity-90 text-balance font-sans">
           {desc}
         </p>
         <div className="space-y-8 font-sans">
            <div className="flex items-center gap-4">
               <h4 className="text-[11px] uppercase font-bold tracking-[0.4em] text-cyan shrink-0">{t('portfolio.specs')}</h4>
               <div className="h-px flex-grow bg-white/10"></div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-[13px] md:text-[14px] font-semibold opacity-60">
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
                <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white/5 hover:bg-white hover:text-slate-950 border border-white/10 rounded-full transition-all duration-200 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest text-white">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  {t('portfolio.github')}
                </a>
              )}
              {playstore && (
                <a href={playstore} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-cyan text-slate-950 hover:bg-white rounded-full transition-all duration-200 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.609 22.186c-.18.172-.412.214-.609.114V1.7c.197-.1.429-.058.609.114zm11.39 9.141l2.459 1.411c.713.402.713 1.054 0 1.456l-2.459 1.411-2.404-2.404 2.404-2.474zM3.882 1.341l9.117 9.117 2.404-2.474-10.422-5.992c-.391-.225-.795-.214-1.099.349zm0 21.318c.304.563.708.574 1.099.349l10.422-5.992-2.404-2.404-9.117 8.047z" /></svg>
                  {t('portfolio.playstore')}
                </a>
              )}
            </div>
            {onPrivacyClick && (
              <button 
                onClick={onPrivacyClick}
                className="w-full py-4 bg-[#050505]/40 backdrop-blur-md text-slate-400 hover:text-white border border-white/5 hover:border-cyan/30 rounded-full transition-all duration-200 flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-widest cursor-pointer"
              >
                <Shield size={18} /> {t('portfolio.privacy')}
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 md:pt-48 pb-32 font-sans relative">
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
             
             <h1 className="text-3xl sm:text-4xl md:text-[5.5rem] mb-14 leading-[1] text-white font-extrabold tracking-tight text-balance relative">
               <span className="relative z-10">{t('hero.title')}</span>
             </h1>

             <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mb-16 font-medium opacity-80 font-sans tracking-tight">
               {t('hero.subtitle')}
             </p>

             <div className="flex flex-wrap gap-6 items-center">
               <Link to="/portfolio" className="group relative inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-6 bg-cyan text-slate-950 font-black rounded-full hover:bg-white transition-all duration-500 shadow-2xl shadow-cyan/20">
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
            <div className="bg-[#050505]/60 backdrop-blur-3xl p-8 sm:p-12 md:p-16 rounded-[3rem] h-full relative overflow-hidden flex flex-col border border-white/5 group-hover:border-cyan/20 transition-colors duration-700">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan/10 flex items-center justify-center text-cyan mb-10 md:mb-14 rounded-2xl group-hover:bg-cyan/20 transition-all duration-500 shadow-inner">
                  <Code2 size={32} className="md:w-10 md:h-10" />
               </div>
               <h3 className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 font-bold text-white tracking-tighter font-sans italic">{t('expertise.web.title')}</h3>
               <p className="text-slate-400 leading-relaxed text-lg md:text-xl mb-12 md:mb-16 opacity-90 font-sans font-medium tracking-tight text-balance">{t('expertise.web.desc')}</p>
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
            <div className="bg-[#050505]/60 backdrop-blur-3xl p-8 sm:p-12 md:p-16 rounded-[3rem] h-full relative overflow-hidden flex flex-col border border-white/5 group-hover:border-cyan/20 transition-colors duration-700">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan/10 flex items-center justify-center text-cyan mb-10 md:mb-14 rounded-2xl group-hover:bg-cyan/20 transition-all duration-500 shadow-inner">
                  <Smartphone size={32} className="md:w-10 md:h-10" />
               </div>
               <h3 className="text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 font-bold text-white tracking-tighter font-sans italic">{t('expertise.mobile.title')}</h3>
               <p className="text-slate-400 leading-relaxed text-lg md:text-xl mb-12 md:mb-16 opacity-90 font-sans font-medium tracking-tight text-balance">{t('expertise.mobile.desc')}</p>
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
  
  const techStackLia = ["FastAPI", "PostgreSQL", "Tailwind CSS", "JavaScript"];
  const techStackAuditoria = ["FastAPI", "PostgreSQL", "Tailwind CSS", "JavaScript"];
  const techStackBi = ["Vanilla JS", "HTML", "CSS"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 md:pt-48 pb-32 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan/10 to-transparent -z-10"></div>
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
        <div className="max-w-6xl relative">
          
          <header className="mb-24 md:mb-40">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl sm:text-4xl md:text-8xl font-black text-white tracking-tighter relative inline-block"
            >
              {t('experience.title')}
              <div className="absolute -bottom-4 left-0 w-1/2 h-2 bg-cyan shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
            </motion.h2>
          </header>
        
          <div className="relative">
            {/* Main Timeline Line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-white/10 to-transparent"></div>

            <div className="space-y-40">
              
              {/* Nativa IA Main Entry */}
              <section className="relative pl-12 md:pl-32">
                {/* Node */}
                <div className="absolute left-[-4px] md:left-[28px] top-0 w-2 h-2 bg-cyan rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] ring-4 ring-cyan/20"></div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-none italic">{t('experience.nativa.role')}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-cyan font-black text-[12px] uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2 bg-cyan/10 px-3 py-1 rounded-md">{t('experience.nativa.company')}</span>
                        <div className="flex items-center gap-2 opacity-60">
                           <MapPin size={14} /> {t('experience.nativa.location')}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                       <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                          <Calendar size={14} /> {t('experience.nativa.period')}
                       </div>
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl text-slate-400 leading-relaxed opacity-80 max-w-4xl font-medium">
                    {t('experience.nativa.description')}
                  </p>
                </motion.div>
                
                {/* Sub-projects Grid */}
                <div className="grid grid-cols-1 gap-8">
                  
                  {/* LIA Project */}
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="group relative p-8 md:p-10 rounded-[2rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/5 hover:border-cyan/30 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                       <div className="flex-grow">
                          <h4 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                             LIA <span className="text-xs font-mono text-cyan/40 bg-cyan/5 px-2 py-1 rounded">TRE-AC</span>
                          </h4>
                          <p className="text-lg text-slate-400 leading-relaxed mb-6 opacity-80">{t('experience.nativa.lia')}</p>
                          <div className="flex flex-wrap gap-2">
                             {techStackLia.map(tech => (
                               <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md border border-white/5 text-slate-500 group-hover:text-cyan/60 group-hover:border-cyan/10 transition-colors">
                                 {tech}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                  </motion.div>

                  {/* Nativa Auditoria Project - AWARD */}
                  <motion.div 
                    initial={{ scale: 0.98 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-cyan/40 via-white/5 to-violet/40 overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-[#050505]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                      <div className="flex flex-col lg:flex-row gap-10 items-start">
                        <div className="flex-grow">
                          <div className="flex items-center gap-4 text-cyan mb-8">
                            <div className="p-4 bg-cyan/10 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)] border border-cyan/30">
                              <Award size={32} className="animate-pulse" />
                            </div>
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] leading-none">{t('experience.award_badge')}</span>
                          </div>
                          <h4 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight italic">Nativa Auditoria</h4>
                          <p className="text-lg md:text-xl text-slate-300 leading-relaxed opacity-90 mb-10 max-w-3xl">{t('experience.nativa.auditoria')}</p>
                          
                          <div className="flex flex-wrap gap-3 mb-10">
                             {techStackAuditoria.map(tech => (
                               <span key={tech} className="text-[10px] font-bold uppercase tracking-tighter px-4 py-1.5 bg-cyan/10 text-cyan rounded-full border border-cyan/20">
                                 {tech}
                               </span>
                             ))}
                          </div>

                          <a 
                            href="https://www.cnj.jus.br/geracao-de-valor-premiacao-reconhece-boas-praticas-em-auditoria-interna/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-cyan transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-white/5"
                          >
                            <Play size={14} fill="currentColor" /> {t('experience.view_details')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* BI Dashboards Project */}
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="group relative p-8 md:p-10 rounded-[2rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/5 hover:border-cyan/30 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                       <div className="flex-grow">
                          <h4 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                             BI Dashboards <span className="text-xs font-mono text-cyan/40 bg-cyan/5 px-2 py-1 rounded">TRE-RO</span>
                          </h4>
                          <p className="text-lg text-slate-400 leading-relaxed mb-6 opacity-80">{t('experience.nativa.bi')}</p>
                          <div className="flex flex-wrap gap-2">
                             {techStackBi.map(tech => (
                               <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md border border-white/5 text-slate-500 group-hover:text-cyan/60 group-hover:border-cyan/10 transition-colors">
                                 {tech}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                  </motion.div>

                </div>
              </section>

              {/* Academic Background */}
              <section className="relative pl-12 md:pl-32 pt-20">
                {/* Node */}
                <div className="absolute left-[-4px] md:left-[28px] top-20 w-2 h-2 border-2 border-cyan bg-[#050505] rounded-full ring-4 ring-cyan/10"></div>
                
                <header className="mb-16">
                   <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight italic">
                     {t('experience.education.title')}
                   </h3>
                </header>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#050505]/80 backdrop-blur-3xl p-8 md:p-10 rounded-[2rem] border border-white/5 hover:border-cyan/20 transition-all duration-500 shadow-xl"
                >
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-cyan group-hover:scale-110 transition-all border border-white/5">
                        <GraduationCap size={32} />
                     </div>
                     <div>
                       <h4 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{t('experience.education.uninter.degree')}</h4>
                       <div className="text-cyan font-black text-[11px] uppercase tracking-[0.3em] opacity-60">
                         {t('experience.education.uninter.school')}
                       </div>
                     </div>
                  </div>
                  <div className="px-6 py-2 glass-panel text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/[0.01] border-white/5">
                    {t('experience.education.uninter.period')}
                  </div>
                </motion.div>
              </section>

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 md:pt-48 pb-32 font-sans relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-8">

        <header className="mb-16 md:mb-24">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-8xl font-black text-white tracking-tighter relative inline-block"
          >
            {t('portfolio.title')}
            <div className="absolute -bottom-4 left-0 w-1/2 h-2 bg-cyan shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
            <span className="absolute -right-12 top-0 text-cyan/10 text-lg font-mono tracking-[0.5em] [writing-mode:vertical-lr] hidden xl:block uppercase">Works</span>
          </motion.h2>
        </header>

        
        {/* Web Section */}
        <div className="mb-64">
           <div className="flex items-center gap-8 mb-24 text-white font-sans">
              <span className="text-[13px] font-black uppercase tracking-[0.6em] shrink-0 text-cyan opacity-80">{t('portfolio.web_section')}</span>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan/40 to-transparent"></div>
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
           <div className="flex items-center gap-8 mb-24 text-white font-sans">
              <span className="text-[13px] font-black uppercase tracking-[0.6em] shrink-0 text-cyan opacity-80">{t('portfolio.mobile_section')}</span>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan/40 to-transparent"></div>
           </div>

           
           <ProjectCard 
              title={t('portfolio.remedi.title')}
              desc={t('portfolio.remedi.desc')}
              label={t('portfolio.project_label.mobile')}
              image="/images/remedi-screenshots.png"
              github="https://github.com/vs-machado/PillReminder/"
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
