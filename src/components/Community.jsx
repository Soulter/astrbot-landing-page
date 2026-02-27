import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const Community = () => {
  const { t } = useLanguage();
  const [starsCount, setStarsCount] = useState(null);
  const [contributorsCount, setContributorsCount] = useState(null);
  const [contributors, setContributors] = useState([]);

  const marqueeContributors = contributors.length > 0 ? [...contributors, ...contributors] : [];

  useEffect(() => {
    fetch('https://api.github.com/repos/AstrBotDevs/AstrBot')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStarsCount(data.stargazers_count);
        }
      })
      .catch(console.error);

    fetch('https://api.github.com/repos/AstrBotDevs/AstrBot/contributors?per_page=100')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const visibleContributors = data
            .filter((item) => item?.avatar_url && item?.html_url && item?.login)
            .slice(0, 24)
            .map((item) => ({
              id: item.id,
              login: item.login,
              avatarUrl: item.avatar_url,
              profileUrl: item.html_url,
              contributions: item.contributions,
            }));

          setContributors(visibleContributors);
          setContributorsCount(data.length);
        }
      })
      .catch(console.error);
  }, []);

  const stats = useMemo(
    () => [
      {
        key: 'stars',
        value: starsCount ? `${(starsCount / 1000).toFixed(1)}k+` : '1.2k+',
        label: t('community.stats.stars'),
      },
      {
        key: 'wau',
        value: '200k+',
        label: t('community.stats.wau'),
      },
      {
        key: 'plugins',
        value: '1000+',
        label: t('community.stats.plugins'),
      },
      {
        key: 'contributors',
        value: contributorsCount ? `${contributorsCount >= 150 ? '150+' : `${contributorsCount}+`}` : '100+',
        label: t('community.stats.contributors'),
      },
    ],
    [contributorsCount, starsCount, t]
  );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b3f67] mb-6">
            {t('community.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('community.description')}
          </p>
        </motion.div>

        {marqueeContributors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="contributors-marquee-mask">
              <div className="contributors-marquee-track">
                {marqueeContributors.map((contributor, index) => (
                  <a
                    key={`${contributor.id ?? contributor.login}-${index}`}
                    href={contributor.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={`${contributor.login} · ${contributor.contributions} ${t('community.contributionsSuffix')}`}
                    className="block h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full p-[2px] bg-gradient-to-br from-sky-300 to-blue-500 transition-transform hover:scale-105"
                  >
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.login}
                      loading="lazy"
                      className="h-full w-full rounded-full object-cover bg-white"
                    />
                  </a>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#3c96ca] mb-2">{stat.value}</div>
              <div className="text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
