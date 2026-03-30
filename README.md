# xixi-blog

这是一个基于 [Docusaurus](https://docusaurus.io/) 构建的静态博客站点。

## 安装

```bash
yarn
```

## 本地开发

```bash
yarn start
```

这个命令会启动本地开发服务，并打开浏览器窗口。大多数修改都会热更新，无需重启。

## 构建

```bash
yarn build
```

这个命令会生成静态站点到 `build` 目录，可直接部署到任意静态托管服务。

## 部署

使用 SSH：

```bash
USE_SSH=true yarn deploy
```

不使用 SSH：

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

如果你使用 GitHub Pages，这个命令会构建站点并推送到 `gh-pages` 分支。

## Skills

- `yuque-mdx-fix` — `.skill/yuque-mdx-fix/` — 修复 Yuque 等导出的 Markdown/MDX 与 Docusaurus 的兼容问题；遇到通用问题时优先创建或更新脚本批量修复，遇到小问题可直接编辑文件。
