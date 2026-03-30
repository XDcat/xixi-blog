# xixi-blog

这是一个基于 [Docusaurus](https://docusaurus.io/) 构建的静态博客站点。

## Components

### 描述

- 这里的 component 主要用于把常见内容块组件化，方便复用。
- 写文章时，优先复用已有 component；只有现有 component 不够用时，再新增。
- 如果修改了某个 component 的实现，需要同步检查并更新所有使用它的内容，避免页面表现不一致。
- 这部分也可以当作一个轻量 skill 使用：先找现成 component，再决定是否新增。

### 已有的 component

- `Callout`
  - 路径：`src/components/Callout/index.tsx`
  - 用法：用于提示、强调、说明类内容块。
- `ReadingCardMeta`
  - 路径：`src/components/ReadingCardMeta/index.tsx`
  - 用法：用于文章卡片或阅读信息展示。

## Skills

- `yuque-mdx-fix` — `.skill/yuque-mdx-fix/` — 修复 Yuque 等导出的 Markdown/MDX 与 Docusaurus 的兼容问题；包含 `style` 语法修复脚本和外链图片下载重写脚本，遇到通用问题时优先创建或更新脚本批量修复，遇到小问题可直接编辑文件。
