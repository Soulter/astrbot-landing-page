import React from 'react';
import { Github, Heart } from 'lucide-react';
import { useLanguage } from '../i18n';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-[#2b3f67] py-20 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-20 relative z-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <img src="/assets/astrbot-logo-with-text.svg" alt="AstrBot" className="h-12 w-auto" />
            </div>
          </div>

          <div className="md:ml-auto">
            <h4 className="font-bold mb-6 text-slate-900">{t('footer.resources')}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="https://docs.astrbot.app" target="_blank" rel="noreferrer" className="hover:text-[#3c96ca] transition-colors">{t('footer.docs')}</a></li>
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="font-bold mb-6 text-slate-900">{t('footer.community')}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="https://github.com/AstrBotDevs/AstrBot" target="_blank" rel="noreferrer" className="hover:text-[#3c96ca] transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="font-bold mb-6 text-slate-900">{t('footer.support')}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="mailto:community@astrbot.app" className="hover:text-[#3c96ca] transition-colors">{t('footer.contact')}</a></li>
              <li><a href="https://github.com/AstrBotDevs/AstrBot/issues" target="_blank" rel="noreferrer" className="hover:text-[#3c96ca] transition-colors">{t('footer.feedback')}</a></li>
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="font-bold mb-6 text-slate-900">{t('footer.friends')}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="https://www.rainyun.com/NjY3OTQ1_" target="_blank" rel="noreferrer" className="hover:text-[#3c96ca] transition-colors">{t('footer.friendRainyun')}</a></li>
            </ul>
          </div>
        </div>

        <div className="w-full flex justify-center items-center my-10 md:my-24 select-none px-4">
          <img
            src="/assets/astrbot-logo-text.svg"
            alt="AstrBot"
            className="w-full max-w-[90vw] md:max-w-[80vw] object-contain opacity-90"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-slate-500 relative z-10 w-full">
          <div className="flex flex-col md:items-start items-center gap-1 mb-4 md:mb-0 text-center md:text-left">
            <p>&copy; Copyright 2022-{new Date().getFullYear()}, {t('footer.rights')}</p>
            <p className="flex items-center justify-center md:justify-start gap-1">
              {t('footer.license')}
              <Heart size={12} className="text-red-500 fill-red-500" />
            </p>
          </div>

          <a
            href="https://github.com/AstrBotDevs/AstrBot"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600 hover:text-[#2b3f67]"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
