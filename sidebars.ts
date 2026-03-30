import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'AI-阅读卡片',
      items: ['AI-阅读卡片/ai-adoption-journey', 'AI-阅读卡片/harness-design-long-running-apps'],
    },
    {
      type: 'category',
      label: 'AI-技术分享',
      items: ['AI-技术分享/openclaw-principles', 'AI-技术分享/system-prompt-analysis',
        'AI-技术分享/1', 'AI-技术分享/「分析」System Prompt'
      ],
    },
  ],
};

export default sidebars;
