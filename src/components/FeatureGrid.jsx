import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Cloud, Grid, Wrench, Code2 } from 'lucide-react';
import { useLanguage } from '../i18n';

const FeatureGrid = () => {
  const { t } = useLanguage();
  const featureTexts = t('featureGrid.items');
  const featureIcons = [
    <Cpu size={32} className="text-[#3c96ca]" />,
    <Terminal size={32} className="text-[#2b3f67]" />,
    <Cloud size={32} className="text-[#3c96ca]" />,
    <Grid size={32} className="text-[#2b3f67]" />,
    <Wrench size={32} className="text-[#3c96ca]" />,
    <Code2 size={32} className="text-[#2b3f67]" />,
  ];

  const features = featureTexts.map((item, index) => ({
    ...item,
    icon: featureIcons[index] || featureIcons[0],
  }));

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#2b3f67] mb-4"
          >
            {t('featureGrid.title')}
          </motion.h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t('featureGrid.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-[#3c96ca]/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 p-4 rounded-xl bg-white border border-slate-100 shadow-sm w-fit group-hover:bg-[#3c96ca]/5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#2b3f67] mb-3 group-hover:text-[#3c96ca] transition-colors">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
