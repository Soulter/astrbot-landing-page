import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

const CTA = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-white">
        <motion.div
          animate={shouldAnimate ? {
            scale: [1, 1.4, 1],
            x: [0, 80, 0],
            y: [0, -30, 0],
            rotate: [0, 20, 0],
          } : undefined}
          transition={shouldAnimate ? { duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined}
          style={{ willChange: shouldAnimate ? 'transform' : 'auto' }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#bae6fd] blur-[100px] opacity-60 mix-blend-multiply"
        />

        <motion.div
          animate={shouldAnimate ? {
            scale: [1.2, 1, 1.2],
            x: [0, -60, 0],
            y: [0, 60, 0],
            rotate: [0, -15, 0],
          } : undefined}
          transition={shouldAnimate ? { duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined}
          style={{ willChange: shouldAnimate ? 'transform' : 'auto' }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#a5f3fc] blur-[120px] opacity-50 mix-blend-multiply"
        />

        <motion.div
          animate={shouldAnimate ? {
            scale: [1, 1.3, 1],
            x: [-40, 40, -40],
            y: [-30, 30, -30],
          } : undefined}
          transition={shouldAnimate ? { duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined}
          style={{ willChange: shouldAnimate ? 'transform' : 'auto' }}
          className="absolute top-[30%] left-[30%] hidden md:block w-[50vw] h-[50vw] rounded-full bg-[#e0e7ff] blur-[90px] opacity-60 mix-blend-multiply"
        />

        <motion.div
          animate={shouldAnimate ? {
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.5, 0.3],
          } : undefined}
          transition={shouldAnimate ? { duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } : undefined}
          style={{ willChange: shouldAnimate ? 'transform, opacity' : 'auto' }}
          className="absolute top-[10%] right-[10%] hidden lg:block w-[40vw] h-[40vw] rounded-full bg-[#7dd3fc] blur-[110px] opacity-40 mix-blend-multiply"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full min-h-[50vh] flex flex-col justify-center items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-8xl font-bold text-[#2b3f67] mb-16 tracking-tight leading-tight"
        >
          {t('cta.titleLine')}<br /><span className="text-[#3c96ca]">{t('cta.titleAccent')}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <a
            href="https://docs.astrbot.app"
            className="group relative inline-flex items-center gap-3 bg-[#3c96ca] text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-[#3485b5] hover:scale-105 transition-all shadow-xl shadow-[#3c96ca]/20 overflow-hidden"
          >
            <span className="relative z-10">{t('cta.button')}</span>
            <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />

            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
