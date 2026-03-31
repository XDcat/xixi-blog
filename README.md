# xixi-blog

这是一个基于 [Docusaurus](https://docusaurus.io/) 构建的静态博客站点。

## Components
### 描述
- 用于定制化、客制化使用，把常见内容块组件化，方便复用。
- 优先复用已有 component；只有现有 component 不够用时，再新增。
- 如果修改了某个 component 的实现，需要同步检查并更新所有使用它的内容，避免页面表现不一致。
- 这部分也可以当作一个轻量 skill 使用：先找现成 component，再决定是否新增。

### 已有的 component

- `Callout` [已经废弃，使用 :::tip 等语法替代，具体见 docs/guid/docusaurus-mdx-syntax.mdx]
  - 路径：`src/components/Callout/index.tsx`
  - 用法：用于提示、强调、说明类内容块。
- `ReadingCardMeta`
  - 路径：`src/components/ReadingCardMeta/index.tsx`
  - 用法：仅用于读书卡片/阅读摘要类内容，不作为所有文章通用组件。

## Build 校验插件
### 描述
- 在构建阶段校验：`sidebars.ts` 索引到的文档必须包含 `canShare: true`。
- 这样可以保证只有允许对外展示的文章才会进入站点发布流程。
- 如果某篇文档被 sidebar 引用但缺少该元数据，`npm run build` 会直接失败并阻塞发布。

### 位置
- 插件文件：`plugins/check-sidebar-can-share.js`
- 挂载位置：`docusaurus.config.ts`
