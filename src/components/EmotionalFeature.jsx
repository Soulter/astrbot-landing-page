import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Edit3, UserPlus } from 'lucide-react';
import { useLanguage } from '../i18n';

const EmotionalFeature = () => {
  const { t } = useLanguage();
  const items = t('emotional.items');
  const itemIcons = [MessageCircle, Edit3, UserPlus];
  const itemStyles = [
    'bg-pink-50 text-pink-500',
    'bg-purple-50 text-purple-500',
    'bg-blue-50 text-blue-500',
  ];

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
              <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm mb-6">
                {t('emotional.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2b3f67] mb-6 leading-tight">
                {t('emotional.titleLine')} <br />
                <span className="text-pink-500">{t('emotional.titleAccent')}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('emotional.description')}
              </p>

              <div className="space-y-6">
                {items.map((item, index) => {
                  const Icon = itemIcons[index] || MessageCircle;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${itemStyles[index] || itemStyles[0]}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
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
              className="relative rounded-2xl bg-slate-50 border border-slate-100 aspect-[4/3] overflow-hidden shadow-xl"
            >
              <img
                src="/assets/companion-demo-qq-zh-CN.png"
                alt={t('emotional.imageAlt')}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalFeature;
