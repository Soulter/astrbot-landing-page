import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Puzzle, Code } from 'lucide-react';
import { useLanguage } from '../i18n';

const Capabilities = () => {
  const { t } = useLanguage();
  const capabilityTexts = t('capabilities.items');
  const capabilityIcons = [
    <MessageCircle size={28} className="text-white" />,
    <Brain size={28} className="text-white" />,
    <Puzzle size={28} className="text-white" />,
    <Code size={28} className="text-white" />,
  ];
  const capabilityColors = ['bg-[#3c96ca]', 'bg-[#2b3f67]', 'bg-[#3c96ca]', 'bg-[#2b3f67]'];

  const capabilities = capabilityTexts.map((item, index) => ({
    ...item,
    icon: capabilityIcons[index] || capabilityIcons[0],
    color: capabilityColors[index] || capabilityColors[0],
  }));

  return (
    <section id="plugins" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="mb-12 md:mb-0 space-y-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#2b3f67] mb-6">
                {t('capabilities.titleLine')}<br />
                <span className="text-[#3c96ca]">{t('capabilities.titleAccent')}</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                {t('capabilities.description')}
              </p>
              <a href="https://docs.astrbot.app" className="inline-flex items-center text-[#3c96ca] font-semibold hover:text-[#2b3f67] transition-colors">
                {t('capabilities.readDocs')} <span className="ml-2">→</span>
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#3c96ca]/20`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#2b3f67] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
