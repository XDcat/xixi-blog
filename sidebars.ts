import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'AI-阅读卡片',
      items: ['AI-阅读卡片/ai-adoption-journey', 'AI-阅读卡片/harness-design-long-running-apps'],
    },
  ],
};

export default sidebars;
