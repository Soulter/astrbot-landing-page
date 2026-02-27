import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, FileText, Search, Database } from 'lucide-react';
import { useLanguage } from '../i18n';

const parseInlineMarkdown = (text) => {
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1 py-0.5 rounded bg-slate-100 text-slate-700 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

const renderMarkdownMessage = (content) => {
  const lines = String(content || '').split('\n');
  const listItems = lines.filter((line) => /^-\s+/.test(line));

  if (lines.length > 0 && listItems.length === lines.length) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {listItems.map((item, idx) => (
          <li key={idx}>{parseInlineMarkdown(item.replace(/^-\s+/, ''))}</li>
        ))}
      </ul>
    );
  }

  return (
    <span>
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {parseInlineMarkdown(line)}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
};

const ChatDemo = ({ messages = [] }) => {
  const { t } = useLanguage();
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const runDemo = async () => {
      while (!isCancelled) {
        setVisibleMessages([]);

        for (const msg of messages) {
          if (isCancelled) break;

          if (msg.type === 'bot' || msg.type === 'process') {
            setIsTyping(true);
            await new Promise((r) => setTimeout(r, 1000));
            setIsTyping(false);
          } else {
            await new Promise((r) => setTimeout(r, 500));
          }

          if (isCancelled) break;
          setVisibleMessages((prev) => [...prev, msg]);

          const readTime = msg.type === 'bot' ? 3500 : 1500;
          await new Promise((r) => setTimeout(r, readTime));
        }

        if (isCancelled) break;
        await new Promise((r) => setTimeout(r, 2000));
      }
    };

    runDemo();

    return () => {
      isCancelled = true;
    };
  }, [messages]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden font-sans">
      <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Bot size={18} />
        </div>
        <div>
          <div className="font-semibold text-slate-700 text-sm">{t('chatDemo.title')}</div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            {t('chatDemo.online')}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50/30 h-[400px] overflow-y-auto flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                  msg.type === 'user'
                    ? 'bg-slate-200 text-slate-600'
                    : msg.type === 'process'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-blue-600 text-white'
                }`}>
                  {msg.type === 'user' && <User size={16} />}
                  {msg.type === 'bot' && <Bot size={16} />}
                  {msg.type === 'process' && <Database size={16} />}
                </div>

                <div className="flex flex-col gap-1">
                  {msg.type === 'process' ? (
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-sm text-purple-800 shadow-sm w-full">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-100/50">
                        <Search size={14} className="animate-pulse" />
                        <span className="font-medium text-xs">{t('chatDemo.retrieving')}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {msg.sources && msg.sources.map((source, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white/60 p-2 rounded text-xs text-purple-900/80">
                            <FileText size={12} className="mt-0.5 shrink-0" />
                            <span className="line-clamp-2">{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-slate-800 text-white rounded-tr-none'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                    }`}>
                      {renderMarkdownMessage(msg.content)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start w-full"
          >
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center mt-1">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div className="h-4" />
      </div>

      <div className="p-3 bg-white border-t border-slate-100">
        <div className="relative">
          <div className="w-full h-10 bg-slate-100 rounded-full border border-slate-200" />
          <div className="absolute right-2 top-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white opacity-50">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
