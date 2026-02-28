import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { useLanguage } from '../i18n';

const Hero = () => {
  const { lang, t } = useLanguage();
  const words = useMemo(() => t('hero.words'), [lang, t]);
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDisplayText('');
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    if (!Array.isArray(words) || words.length === 0) return;

    const currentWord = words[index] || '';
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 3000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return undefined;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }
        return currentWord.slice(0, prev.length + 1);
      });
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, words]);

  const heroImage = lang === 'zh-CN' ? '/assets/landingpage-zh-CN.png' : '/assets/landingpage-en-US.png';

  return (
    <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{ willChange: 'transform' }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#bae6fd] blur-[80px] opacity-30 mix-blend-multiply"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{ willChange: 'transform' }}
          className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#a5f3fc] blur-[80px] opacity-30 mix-blend-multiply"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [-10, 10, -10],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{ willChange: 'transform' }}
          className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#e0e7ff] blur-[80px] opacity-30 mix-blend-multiply"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-12 lg:gap-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#3c96ca]/10 text-[#3c96ca] font-semibold text-sm mb-8 border border-[#3c96ca]/20">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#2b3f67] mb-6 leading-[1.1]">
              <div className="h-[1.2em] relative mb-1">
                <span className="block w-full">{displayText}<span className="animate-pulse">|</span></span>
              </div>
              <span className="text-[#3c96ca]">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto font-normal tracking-wide">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://docs.astrbot.app"
                className="bg-[#3c96ca] text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-[#3485b5] transition-colors shadow-lg shadow-[#3c96ca]/20 flex items-center gap-2"
              >
                {t('hero.startNow')}
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/AstrBotDevs/AstrBot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-semibold text-base hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Github size={18} />
                {t('hero.viewGithub')}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl mx-auto mt-12"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white group hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300">
              <div className="h-9 bg-slate-100/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-10">
                <div className="flex gap-1.5 w-14">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]"></div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[60%] sm:max-w-md bg-white h-6 rounded-md border border-slate-200/80 text-[10px] sm:text-xs text-slate-400 flex items-center justify-center font-mono gap-1 shadow-sm">
                  <span className="opacity-50">🔒</span> astrbot.app
                </div>

                <div className="w-14"></div>
              </div>

              <div className="relative bg-slate-50">
                <img
                  src={heroImage}
                  alt={t('hero.imageAlt')}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3c96ca]/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
