import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Terminal, Shield, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n';

const AgenticFeature = () => {
  const { t } = useLanguage();
  const images = [
    '/assets/agent-demo-chatui-zh-CN.png',
    '/assets/agent-demo-lark-zh-CN.png',
    '/assets/agent-demo-qq-zh-CN-1.png',
    '/assets/agent-demo-qq-zh-CN.png',
    '/assets/agent-demo-telegram-zh-CN.png',
  ];

  const featureIcons = [Zap, Shield, Clock, Terminal];
  const featureTexts = t('agentic.cards');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollHint(scrollHeight > clientHeight + 20);
    }
  }, [currentImageIndex]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setShowScrollHint(false);
      } else if (scrollHeight > clientHeight + 20) {
        setShowScrollHint(true);
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6">
                {t('agentic.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2b3f67] mb-6 leading-tight">
                {t('agentic.titleLine')} <br />
                <span className="text-[#3c96ca]">{t('agentic.titleAccent')}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('agentic.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureTexts.map((item, index) => {
                  const Icon = featureIcons[index] || Zap;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#3c96ca]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl bg-white border border-slate-200/60 h-[600px] flex flex-col overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group ring-1 ring-slate-900/5"
            >
              <div className="h-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-between px-4 shrink-0 z-30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/50"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]/50"></div>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium font-mono">{t('agentic.demoTitle')}</div>
                <div className="w-10"></div>
              </div>

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 p-1.5 bg-slate-900/10 backdrop-blur-md rounded-full">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-white w-3 shadow-sm' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent custom-scrollbar bg-slate-50"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full min-h-full"
                  >
                    <img
                      src={images[currentImageIndex]}
                      alt={`${t('agentic.imageAltPrefix')} ${currentImageIndex + 1}`}
                      className="w-full h-auto object-contain block"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showScrollHint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-100/90 via-slate-100/50 to-transparent pointer-events-none flex items-end justify-center pb-4 z-10"
                  >
                    <div className="flex flex-col items-center text-slate-500 text-xs font-medium animate-bounce bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/50">
                      <span>{t('agentic.scrollHint')}</span>
                      <ChevronDown size={14} className="mt-0.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-0"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticFeature;
