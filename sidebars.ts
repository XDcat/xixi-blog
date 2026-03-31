import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'AI-技术分享',
      items: ['AI-技术分享/openclaw-principles', 'AI-技术分享/openclaw-System-Prompt'],
    },
    {
      type: 'category',
      label: 'AI-阅读卡片',
      items: ['AI-阅读卡片/ai-adoption-journey', 'AI-阅读卡片/harness-design-long-running-apps'],
    },
    {
      type: 'category',
      label: '参考文档',
      items: ['guid/docusaurus-mdx-syntax'],
    },
    {
      type: 'category',
      label: 'Pi Agent 源码专题',
      items: [
        'pi-agent/pi-session-management',
        'pi-agent/system-message-deep-dive',
      ],
    },
  ],
};

export default sidebars;
