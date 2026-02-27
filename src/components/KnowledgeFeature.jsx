import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Share2, Search } from 'lucide-react';
import ChatDemo from './ChatDemo';
import { useLanguage } from '../i18n';

const KnowledgeFeature = () => {
  const { lang, t } = useLanguage();

  const demoMessages = useMemo(
    () => [
      { type: 'user', content: t('knowledge.demo.user') },
      {
        type: 'process',
        content: t('knowledge.demo.process'),
        sources: t('knowledge.demo.sources'),
      },
      {
        type: 'bot',
        content: t('knowledge.demo.bot'),
      },
    ],
    [lang, t]
  );

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-purple-100/50 text-purple-600 font-semibold text-sm mb-6">
                {t('knowledge.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2b3f67] mb-6 leading-tight">
                {t('knowledge.titleLine')} <br />
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">{t('knowledge.titleAccent')}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('knowledge.description')}
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                    <Search size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('knowledge.cardA.title')}</h3>
                    <p className="text-sm text-slate-500">
                      {t('knowledge.cardA.desc')}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Share2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{t('knowledge.cardB.title')}</h3>
                    <p className="text-sm text-slate-500">
                      {t('knowledge.cardB.desc')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              <ChatDemo messages={demoMessages} />

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeFeature;
