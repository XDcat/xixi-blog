> 该文件地址：AGENT.md。如果路径失效，请直接告知我，不要隐藏。

这个项目是我的个人知识库，也是我用来做 AI 试验的场域。我会尽量借助 AI 来管理和维护这个项目。

## 核心原则
- 编辑文档时，优先 edit，而不是 write。每次你的输出是由限制的，如果都用 write 很容易让一些正确的内容丢失。可以多次 edit。如果明确需要覆盖内容再使用 write。

## 项目构成
项目使用 Docusaurus 框架，以下是最重要的文件和目录：
- `sidebars.ts`：控制哪些文章会在侧边栏展示
- `docs/guid/docusaurus-mdx-syntax.mdx`：MDX 语法相关说明
- 当前只需要维护 `docs/`，不需要维护 `blog/`，因为 `docs/` 的目录结构更清晰

## 文档规范
- 对外展示的文档必须包含元数据 `canShare: true`

## Skills
- `yuque-mdx-fix` — `.skill/yuque-mdx-fix/`：用于修复 Yuque 等导出的 Markdown/MDX 与 Docusaurus 的兼容问题。包含 `style` 语法修复脚本和外链图片下载重写脚本。遇到通用问题时，优先创建或更新脚本进行批量修复；遇到小问题时，可直接编辑文件。
