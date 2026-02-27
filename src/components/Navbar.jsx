import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';
import { LANGUAGES, useLanguage } from '../i18n';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [starCount, setStarCount] = useState(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    fetch('https://api.github.com/repos/AstrBotDevs/AstrBot')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStarCount((data.stargazers_count / 1000).toFixed(1) + 'k');
        }
      })
      .catch(console.error);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.docs'), href: 'https://docs.astrbot.app/' },
    { name: t('navbar.plugins'), href: 'https://plugins.astrbot.app/' },
    { name: t('navbar.blog'), href: 'https://blog.astrbot.app/' },
    { name: t('navbar.roadmap'), href: 'https://astrbot.featurebase.app/roadmap' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <img src="/assets/astrbot-logo-with-text.svg" alt="AstrBot" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-[#3c96ca] font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

            <label className="sr-only" htmlFor="desktop-language-select">{t('navbar.languageLabel')}</label>
            <select
              id="desktop-language-select"
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              className="h-10 rounded-full border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#3c96ca]/30"
            >
              {LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>{language.label}</option>
              ))}
            </select>

            <a
              href="https://github.com/Soulter/AstrBot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#2b3f67] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#1a2845] transition-colors"
            >
              <Github size={18} />
              <span>{t('navbar.github')}{starCount && ` ${starCount}`}</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-slate-100"
        >
          <div className="px-4 pt-4 pb-8 space-y-4">
            <label className="block">
              <span className="text-xs text-slate-400">{t('navbar.languageLabel')}</span>
              <select
                value={lang}
                onChange={(event) => setLang(event.target.value)}
                className="mt-1 w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3c96ca]/30"
              >
                {LANGUAGES.map((language) => (
                  <option key={language.code} value={language.code}>{language.label}</option>
                ))}
              </select>
            </label>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-medium text-slate-600 hover:text-[#3c96ca]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://github.com/Soulter/AstrBot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-[#2b3f67] text-white px-5 py-3 rounded-xl font-medium"
            >
              <Github size={20} />
              <span>{t('navbar.starOnGithub')}{starCount && ` (${starCount})`}</span>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
