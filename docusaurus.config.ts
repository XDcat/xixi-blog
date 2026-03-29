import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '臭喜喜的笔记本',
  tagline: '写给自己，也写给未来的你。',
  favicon: 'img/favicon.svg',
  future: {
    v4: true,
  },
  url: 'https://xxxdcat.github.io',
  baseUrl: '/xixi-blog/',
  organizationName: 'xxxdcat',
  projectName: 'xixi-blog',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '博客',
          blogDescription: '关于 AI、工程和长期主义的一些碎碎念。',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '臭喜喜',
      logo: {
        alt: '臭喜喜',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Docs', position: 'left'},
        {href: 'https://github.com/xxxdcat/xixi-blog', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '内容',
          items: [
            {label: 'Docs', to: '/'},
          ],
        },
        {
          title: '外部',
          items: [
            {label: 'GitHub', href: 'https://github.com/xxxdcat/xixi-blog'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 臭喜喜`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
