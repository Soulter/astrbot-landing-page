import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en-US', label: 'English' },
  { code: 'ja-JP', label: '日本語' },
];

const DEFAULT_LANG = 'zh-CN';
const STORAGE_KEY = 'astrbot-language';

const translations = {
  'zh-CN': {
    navbar: {
      docs: '文档',
      plugins: '插件',
      blog: '博客',
      roadmap: '路线图',
      github: 'GitHub',
      starOnGithub: 'Star on GitHub',
      languageLabel: '语言',
    },
    hero: {
      badge: 'Open Source Agentic AI Infrastructure',
      words: ['适合私聊与群聊的', '生产可用的', '可扩展的', '生态丰富的', '开源的'],
      titleAccent: 'AI 助手',
      description:
        'AstrBot 是一个跨平台 AI 助手，让 AI 直接工作在你的聊天软件中，实现自动化任务与智能协作，同时提供灵活的 Agent 编排能力。',
      startNow: '立即开始',
      viewGithub: '查看 GitHub',
      imageAlt: 'AstrBot 界面预览',
    },
    agentic: {
      badge: 'Agentic Infrastructure',
      titleLine: '全功能的 Agent',
      titleAccent: '聊天机器人',
      description:
        'AstrBot 不仅仅是聊天机器人，更是强大的 Agent 运行平台。支持子代理 (Sub-Agent) 协同工作、复杂任务编排、工具调用与上下文管理，让 AI 具备真正的行动力。',
      cards: [
        { title: 'Skills & MCP', desc: '原生支持 MCP 协议，无限扩展 AI 能力边界' },
        { title: 'Agent 沙箱环境', desc: '安全隔离的执行环境，保障系统稳定运行' },
        { title: 'Cron Job 未来任务', desc: '支持定时任务与计划执行，自动化未来工作' },
        { title: '运行时控制', desc: '支持运行时 Prompt 注入与随时打断机制' },
      ],
      demoTitle: 'AstrBot Agent Demo',
      scrollHint: '向下滚动查看更多',
      imageAltPrefix: 'Agent Demo',
    },
    knowledge: {
      badge: 'Knowledge Base',
      titleLine: '方便易用的',
      titleAccent: '知识库系统',
      description:
        'AstrBot 支持知识库功能，轻松让你的机器人了解更多领域知识。我们集成了 Microsoft Markitdown，支持 PDF、DOCX、Markdown 等多种格式。',
      cardA: {
        title: '多路混合检索',
        desc: '采用稠密检索和稀疏检索 (BM25)，针对中文优化，大幅提高检索精度。',
      },
      cardB: {
        title: '多知识库引用',
        desc: '灵活的会话管理，支持在一个消息平台会话中引用多个知识库，打破单一知识库的限制。',
      },
      demo: {
        user: 'AstrBot 的知识库支持哪些格式？',
        process: '正在检索相关文档...',
        sources: ['AstrBot 文档 / 知识库功能介绍.md', 'AstrBot 文档 / 常见问题.pdf'],
        bot: 'AstrBot 知识库支持以下文档格式：\n- **PDF**\n- **DOCX**\n- **Markdown**\n\n并集成 `Microsoft Markitdown` 作为文档解析器，提供高质量解析效果。',
      },
    },
    chatDemo: {
      title: 'AstrBot Knowledge Agent',
      online: '在线',
      retrieving: '检索于 Knowledge Base',
    },
    emotional: {
      badge: 'Emotional Companionship',
      titleLine: '懂你也由你的',
      titleAccent: '情感陪伴',
      description: 'AstrBot 能够提供富有温度的情感交互体验。不仅能听懂你的话，更能记住你的喜好，主动关心你的生活。',
      items: [
        {
          title: '分段回复与主动对话',
          desc: '模拟真实人类的聊天节奏，支持长文本分段发送。通过插件，可以在适当时机主动发起对话，不再只是冷冰冰的问答机器。',
        },
        {
          title: '易用的人格设定编辑',
          desc: '通过简单配置即可塑造独特的人物性格。',
        },
        {
          title: '丰富的社区插件',
          desc: '涵盖长期记忆、好感度系统、自学习能力及用户画像等功能，让 AI 越聊越懂你。',
        },
      ],
      imageAlt: 'Emotional Companion Demo',
    },
    featureGrid: {
      title: '强大的功能特性',
      description: 'AstrBot 提供全方位的技术支持，满足从个人娱乐到企业生产的多样化需求。',
      items: [
        {
          title: '多 AI 提供商兼容',
          desc: '支持 OpenAI、Google、Anthropic 及兼容 OpenAI API 的服务商，自由切换模型与推理能力。',
        },
        {
          title: '直观的 WebUI',
          desc: '配置、调试、日志与插件管理统一在 WebUI 完成，降低运维和迭代成本。',
        },
        {
          title: '多种部署方式，快速上线',
          desc: '支持启动器一键部署、桌面端应用、Docker、uv / pip 等方式，个人和团队都能快速开跑。',
        },
        {
          title: '1000+ 插件生态',
          desc: '覆盖效率工具、群聊管理、内容创作、外部系统集成等场景，按需安装、即插即用。',
        },
        {
          title: 'MCP + Skills 扩展体系',
          desc: '原生支持 MCP 与 Skills，把外部能力标准化接入，让 Bot 从“会聊”升级为“会做事”。',
        },
        {
          title: '通用 Agentic 能力',
          desc: '支持工具调用、流程编排与任务执行，面向真实业务构建可行动的 AI 助手。',
        },
      ],
    },
    capabilities: {
      titleLine: '全面覆盖，',
      titleAccent: '无限拓展',
      description:
        'AstrBot 不仅仅是一个聊天机器人，更是一个连接数字世界的桥梁。无论是社交媒体、企业通讯工具，还是复杂业务系统，AstrBot 都能轻松驾驭。',
      readDocs: '阅读完整文档',
      items: [
        {
          title: '多平台接入',
          desc: '可接入 QQ、微信生态、企业微信、飞书、钉钉、Telegram、Discord、Slack、KOOK 等平台，一套能力多端复用。',
        },
        {
          title: '多模态模型能力',
          desc: '支持文本生成、图像理解、STT、TTS、Embedding 等能力，满足聊天、语音、检索等复合需求。',
        },
        {
          title: '插件驱动架构',
          desc: '核心保持稳定，业务能力通过插件持续增长。你可以从社区安装，也可以按规范快速开发私有插件。',
        },
        {
          title: '开发者友好',
          desc: '开源协议清晰、文档完整、社区活跃，适合从个人项目到团队生产环境逐步演进。',
        },
      ],
    },
    community: {
      title: '加入全球开发者社区',
      description:
        'AstrBot 由全球开发者共同维护，拥有活跃的插件市场和完善的文档支持。无论是寻求帮助还是分享创意，这里都有你的一席之地。',
      stats: {
        stars: 'GitHub Stars',
        wau: '周活跃用户',
        plugins: '社区插件',
        contributors: '开源贡献者',
      },
      contributionsSuffix: '次贡献',
    },
    cta: {
      titleLine: '即刻快速部署你的',
      titleAccent: 'AI 助手',
      button: '立即开始',
    },
    footer: {
      resources: '资源',
      community: '社区',
      support: '支持',
      friends: '友情链接',
      docs: '文档',
      contact: '联系我们',
      feedback: '反馈问题',
      friendRainyun: '雨云',
      rights: 'All Rights Reserved by AstrBot Team.',
      license: 'Protected under the AGPL-v3 license. Made with love forever.',
    },
  },
  'en-US': {
    navbar: {
      docs: 'Docs',
      plugins: 'Plugins',
      blog: 'Blog',
      roadmap: 'Roadmap',
      github: 'GitHub',
      starOnGithub: 'Star on GitHub',
      languageLabel: 'Language',
    },
    hero: {
      badge: 'Open Source Agentic AI Infrastructure',
      words: ['Built for chats', 'Production-ready', 'Extensible', 'Ecosystem-rich', 'Open source'],
      titleAccent: 'AI Assistant',
      description:
        'AstrBot is a cross-platform AI assistant that runs directly in your chat apps, enabling automation and smart collaboration with flexible agent orchestration.',
      startNow: 'Get Started',
      viewGithub: 'View GitHub',
      imageAlt: 'AstrBot interface preview',
    },
    agentic: {
      badge: 'Agentic Infrastructure',
      titleLine: 'A Full Agent',
      titleAccent: 'Chatbot Platform',
      description:
        'AstrBot is not just a chatbot. It is a capable agent runtime with Sub-Agents, complex workflows, tool calls, and context management for real actions.',
      cards: [
        { title: 'Skills & MCP', desc: 'Native MCP support to expand AI capabilities without hard limits' },
        { title: 'Agent Sandbox', desc: 'Isolated runtime environments to keep the system safe and stable' },
        { title: 'Cron Jobs', desc: 'Schedule and execute future tasks for reliable automation' },
        { title: 'Runtime Controls', desc: 'Inject prompts at runtime and interrupt tasks when needed' },
      ],
      demoTitle: 'AstrBot Agent Demo',
      scrollHint: 'Scroll to see more',
      imageAltPrefix: 'Agent Demo',
    },
    knowledge: {
      badge: 'Knowledge Base',
      titleLine: 'An Easy-to-Use',
      titleAccent: 'Knowledge System',
      description:
        'AstrBot includes a knowledge base system so your bot can understand domain data quickly. We integrate Microsoft Markitdown for high-quality parsing of PDF, DOCX, and Markdown.',
      cardA: {
        title: 'Hybrid Retrieval',
        desc: 'Combines dense retrieval and sparse retrieval (BM25), optimized for Chinese and multilingual scenarios.',
      },
      cardB: {
        title: 'Multi-KB References',
        desc: 'Flexible session management allows a single conversation to reference multiple knowledge bases.',
      },
      demo: {
        user: 'What file formats are supported by AstrBot Knowledge Base?',
        process: 'Retrieving relevant documents...',
        sources: ['AstrBot Docs / Knowledge Base Overview.md', 'AstrBot Docs / FAQ.pdf'],
        bot: 'AstrBot supports the following formats:\n- **PDF**\n- **DOCX**\n- **Markdown**\n\nIt also integrates `Microsoft Markitdown` for high-quality document parsing.',
      },
    },
    chatDemo: {
      title: 'AstrBot Knowledge Agent',
      online: 'Online',
      retrieving: 'Searching Knowledge Base',
    },
    emotional: {
      badge: 'Emotional Companionship',
      titleLine: 'A Companion',
      titleAccent: 'That Understands You',
      description:
        'AstrBot provides warm, emotionally aware interactions. It listens, remembers your preferences, and proactively checks in on your daily life.',
      items: [
        {
          title: 'Segmented Replies & Proactive Dialog',
          desc: 'Mimics natural chat rhythm with segmented long replies and plugin-based proactive outreach at the right time.',
        },
        {
          title: 'Easy Persona Editing',
          desc: 'Shape unique personalities quickly through simple configuration.',
        },
        {
          title: 'Rich Community Plugins',
          desc: 'Includes long-term memory, affinity systems, self-learning, and user profiling so AI understands you better over time.',
        },
      ],
      imageAlt: 'Emotional Companion Demo',
    },
    featureGrid: {
      title: 'Powerful Feature Set',
      description: 'AstrBot provides comprehensive capabilities for needs ranging from personal fun to enterprise production.',
      items: [
        {
          title: 'Multi-Provider AI Support',
          desc: 'Works with OpenAI, Google, Anthropic, and OpenAI-compatible providers with flexible model switching.',
        },
        {
          title: 'Intuitive WebUI',
          desc: 'Configuration, debugging, logs, and plugin management in one place to reduce operation overhead.',
        },
        {
          title: 'Flexible Deployment',
          desc: 'Launch via one-click launcher, desktop app, Docker, uv, or pip for both individuals and teams.',
        },
        {
          title: '1000+ Plugin Ecosystem',
          desc: 'Covers productivity, group operations, content workflows, and external integrations.',
        },
        {
          title: 'MCP + Skills Extensions',
          desc: 'Native MCP and Skills support to standardize external capabilities and make bots action-oriented.',
        },
        {
          title: 'General Agentic Abilities',
          desc: 'Tool use, flow orchestration, and task execution for real business scenarios.',
        },
      ],
    },
    capabilities: {
      titleLine: 'Comprehensive Coverage,',
      titleAccent: 'Unlimited Extensibility',
      description:
        'AstrBot is more than a chatbot. It is a bridge to your digital world, from social apps and enterprise communication to complex business systems.',
      readDocs: 'Read Full Documentation',
      items: [
        {
          title: 'Multi-Platform Access',
          desc: 'Connect QQ, WeChat ecosystem, WeCom, Lark, DingTalk, Telegram, Discord, Slack, KOOK, and more.',
        },
        {
          title: 'Multimodal Models',
          desc: 'Supports text generation, vision understanding, STT, TTS, and embeddings for blended workloads.',
        },
        {
          title: 'Plugin-Driven Architecture',
          desc: 'A stable core with continuously growing capabilities through installable or custom private plugins.',
        },
        {
          title: 'Developer Friendly',
          desc: 'Clear licensing, complete docs, and an active community from side projects to production teams.',
        },
      ],
    },
    community: {
      title: 'Join a Global Developer Community',
      description:
        'AstrBot is maintained by developers worldwide with an active plugin marketplace and solid docs support. Whether you seek help or share ideas, you belong here.',
      stats: {
        stars: 'GitHub Stars',
        wau: 'Weekly Active Users',
        plugins: 'Community Plugins',
        contributors: 'Open Source Contributors',
      },
      contributionsSuffix: 'contributions',
    },
    cta: {
      titleLine: 'Deploy Your',
      titleAccent: 'AI Assistant Now',
      button: 'Get Started',
    },
    footer: {
      resources: 'Resources',
      community: 'Community',
      support: 'Support',
      friends: 'Partners',
      docs: 'Documentation',
      contact: 'Contact Us',
      feedback: 'Report Issues',
      friendRainyun: 'Rainyun',
      rights: 'All Rights Reserved by AstrBot Team.',
      license: 'Protected under the AGPL-v3 license. Made with love forever.',
    },
  },
  'ja-JP': {
    navbar: {
      docs: 'ドキュメント',
      plugins: 'プラグイン',
      blog: 'ブログ',
      roadmap: 'ロードマップ',
      github: 'GitHub',
      starOnGithub: 'GitHubでスター',
      languageLabel: '言語',
    },
    hero: {
      badge: 'Open Source Agentic AI Infrastructure',
      words: ['チャット向け', '本番運用対応', '拡張しやすい', '豊富なエコシステム', 'オープンソース'],
      titleAccent: 'AIアシスタント',
      description:
        'AstrBot はクロスプラットフォームの AI アシスタントです。チャットアプリ上で直接動作し、自動化やインテリジェントな協働、柔軟な Agent オーケストレーションを実現します。',
      startNow: '今すぐ始める',
      viewGithub: 'GitHubを見る',
      imageAlt: 'AstrBot インターフェースプレビュー',
    },
    agentic: {
      badge: 'Agentic Infrastructure',
      titleLine: 'フル機能の Agent',
      titleAccent: 'チャットボット',
      description:
        'AstrBot は単なるチャットボットではなく、強力な Agent 実行基盤です。Sub-Agent 協調、複雑なワークフロー、ツール呼び出し、コンテキスト管理に対応します。',
      cards: [
        { title: 'Skills & MCP', desc: 'MCP をネイティブ対応し、AI の拡張性を大幅に向上' },
        { title: 'Agent サンドボックス', desc: '安全に分離された実行環境で安定運用を実現' },
        { title: 'Cron ジョブ', desc: 'スケジュール実行で将来タスクを自動化' },
        { title: 'ランタイム制御', desc: '実行中のプロンプト注入と中断に対応' },
      ],
      demoTitle: 'AstrBot Agent Demo',
      scrollHint: 'スクロールして続きを表示',
      imageAltPrefix: 'Agent Demo',
    },
    knowledge: {
      badge: 'Knowledge Base',
      titleLine: '使いやすい',
      titleAccent: 'ナレッジベース',
      description:
        'AstrBot はナレッジベース機能を備え、ボットにドメイン知識を素早く追加できます。Microsoft Markitdown を統合し、PDF / DOCX / Markdown を高品質に解析します。',
      cardA: {
        title: 'ハイブリッド検索',
        desc: 'Dense 検索と Sparse 検索 (BM25) を組み合わせ、中国語や多言語シナリオに最適化。',
      },
      cardB: {
        title: '複数KB参照',
        desc: '1つの会話で複数のナレッジベースを参照できる柔軟なセッション管理。',
      },
      demo: {
        user: 'AstrBot のナレッジベースはどの形式に対応していますか？',
        process: '関連ドキュメントを検索中...',
        sources: ['AstrBot Docs / Knowledge Base Overview.md', 'AstrBot Docs / FAQ.pdf'],
        bot: 'AstrBot は以下の形式に対応しています。\n- **PDF**\n- **DOCX**\n- **Markdown**\n\nさらに `Microsoft Markitdown` を統合し、高品質な文書解析を提供します。',
      },
    },
    chatDemo: {
      title: 'AstrBot Knowledge Agent',
      online: 'オンライン',
      retrieving: 'Knowledge Base を検索中',
    },
    emotional: {
      badge: 'Emotional Companionship',
      titleLine: 'あなたを理解する',
      titleAccent: '感情コンパニオン',
      description:
        'AstrBot は温かみのある感情的な対話体験を提供します。あなたの言葉を理解し、好みを記憶し、日常に寄り添います。',
      items: [
        {
          title: '分割返信と能動的対話',
          desc: '自然な会話テンポを再現し、長文を分割送信。適切なタイミングで能動的に会話を開始できます。',
        },
        {
          title: '簡単な人格設定',
          desc: 'シンプルな設定で独自のキャラクター性を構築できます。',
        },
        {
          title: '豊富なコミュニティプラグイン',
          desc: '長期記憶、好感度システム、自己学習、ユーザープロファイルなどで対話体験を強化。',
        },
      ],
      imageAlt: 'Emotional Companion Demo',
    },
    featureGrid: {
      title: '強力な機能',
      description: 'AstrBot は個人利用からエンタープライズまで幅広いニーズをカバーします。',
      items: [
        {
          title: '複数AIプロバイダー対応',
          desc: 'OpenAI、Google、Anthropic、OpenAI 互換プロバイダーをサポート。',
        },
        {
          title: '直感的なWebUI',
          desc: '設定、デバッグ、ログ、プラグイン管理を一元化し運用コストを削減。',
        },
        {
          title: '多様なデプロイ方法',
          desc: 'ランチャー、デスクトップ、Docker、uv / pip に対応し素早く展開可能。',
        },
        {
          title: '1000+ プラグイン',
          desc: '生産性向上、グループ管理、コンテンツ制作、外部連携など幅広く対応。',
        },
        {
          title: 'MCP + Skills 拡張',
          desc: '外部機能を標準化して取り込み、会話だけでなく実行まで可能に。',
        },
        {
          title: '汎用 Agentic 機能',
          desc: 'ツール呼び出し、フロー編成、タスク実行をビジネス用途に提供。',
        },
      ],
    },
    capabilities: {
      titleLine: '包括的な対応、',
      titleAccent: '無限の拡張性',
      description:
        'AstrBot はチャットボットを超えた存在です。SNS、企業コミュニケーション、複雑な業務システムまで柔軟に連携できます。',
      readDocs: 'ドキュメントを読む',
      items: [
        {
          title: 'マルチプラットフォーム接続',
          desc: 'QQ、WeChat 系、WeCom、Lark、DingTalk、Telegram、Discord、Slack、KOOK などに対応。',
        },
        {
          title: 'マルチモーダルモデル',
          desc: 'テキスト生成、画像理解、STT、TTS、Embedding など複合ニーズをカバー。',
        },
        {
          title: 'プラグイン駆動アーキテクチャ',
          desc: '安定したコアに対してプラグインで機能を継続拡張。',
        },
        {
          title: '開発者フレンドリー',
          desc: '明確なライセンス、充実したドキュメント、活発なコミュニティ。',
        },
      ],
    },
    community: {
      title: 'グローバル開発者コミュニティに参加',
      description:
        'AstrBot は世界中の開発者によって保守されています。活発なプラグイン市場と整備されたドキュメントで、助け合いと共有ができます。',
      stats: {
        stars: 'GitHub Stars',
        wau: '週間アクティブユーザー',
        plugins: 'コミュニティプラグイン',
        contributors: 'OSS コントリビューター',
      },
      contributionsSuffix: 'contributions',
    },
    cta: {
      titleLine: '今すぐあなたの',
      titleAccent: 'AIアシスタントをデプロイ',
      button: '今すぐ始める',
    },
    footer: {
      resources: 'リソース',
      community: 'コミュニティ',
      support: 'サポート',
      friends: 'リンク',
      docs: 'ドキュメント',
      contact: 'お問い合わせ',
      feedback: '問題を報告',
      friendRainyun: 'Rainyun',
      rights: 'All Rights Reserved by AstrBot Team.',
      license: 'Protected under the AGPL-v3 license. Made with love forever.',
    },
  },
};

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

const getByPath = (obj, path) => {
  if (!obj) return undefined;
  return path.split('.').reduce((current, part) => (current && current[part] !== undefined ? current[part] : undefined), obj);
};

const detectInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.some((item) => item.code === stored)) {
    return stored;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('zh')) return 'zh-CN';
  if (browserLanguage.startsWith('ja')) return 'ja-JP';
  return 'en-US';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(detectInitialLanguage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    return (key) => {
      const localizedValue = getByPath(translations[lang], key);
      if (localizedValue !== undefined) return localizedValue;

      const fallbackValue = getByPath(translations[DEFAULT_LANG], key);
      if (fallbackValue !== undefined) return fallbackValue;

      return key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useLanguage = () => useContext(I18nContext);
