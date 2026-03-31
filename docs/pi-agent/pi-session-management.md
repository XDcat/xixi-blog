---
title: 深入理解 pi 的会话管理机制：/tree、/fork、/resume 全解析
sidebar_position: 1
canShare: true
pi_session_share_url: https://pi.dev/session/#cb8ed97bc2a3bc419b8d2043ec3d4159
---

# 深入理解 pi 的会话管理机制：/tree、/fork、/resume 全解析

> 本文基于 pi 官方 README 与源码结构整理，用来总结 pi 的会话管理机制与设计哲学。

## 一、先给结论：pi 没有“回滚”，只有“分叉”

在很多 AI 工具里，如果你回到历史消息继续对话，后面的内容会被删除。

但 **pi 不会删除历史**。

原因很简单：pi 的 session 不是线性数组，而是一棵树（tree structure）。

每条消息都有：

- `id`
- `parentId`

所有消息共同组成一棵不可变的历史树。

所以，所谓“回滚”，本质上只是：

> 把当前指针移动到历史中的某个节点，然后从那里继续分叉。

## 二、Session 的底层结构

### 2.1 文件层：session 以 `.jsonl` 文件保存

所有 session 存储在：

```bash
~/.pi/agent/sessions/
```

目录通常会按工作目录划分。

每个 session 对应一个 `.jsonl` 文件，也就是“每行一个 JSON 记录”。

### 2.2 树结构层：一个文件里也能分叉

一个 session 文件内部的消息链，大致可以理解为：

```text
a → b → c → d → e → f → g
```

如果在 `e` 上使用 `/tree` 继续，就会变成：

```text
a → b → c → d → e
                  ├─ f → g
                  └─ new_f → new_g
```

历史不会被删除，只会新增分支。

### 2.3 当前指针：Active Node

pi 会记录当前所在节点。

- `/tree` 会改变当前节点
- 新消息会以当前节点作为 `parent`

这也是为什么同一个 session 里可以不断“改路”，但历史仍然保留。

## 三、核心命令怎么理解

### 3.1 `/tree`：在当前 session 内切换节点

作用范围：单个 session 内部。

它可以：

- 跳转到历史中的任意节点
- 在该节点继续对话
- 生成新的分支

你可以把它理解成：

```text
currentNode = selectedNode
```

它不会：

- 创建新文件
- 删除历史

### 3.2 `/fork`：复制出一个新的 session

作用范围：文件层。

它可以：

- 复制当前 session，或复制某个节点之前的历史
- 生成一个新的 session 文件
- 在新文件中继续对话

你可以把它理解成：

```text
newSessionFile = copy(oldSession up to node X)
```

它会：

- 创建新文件
- 保持原文件不变

### 3.3 `/resume`：切换到另一个 session 文件

作用范围：文件层。

它的功能很直接：在已有的 session 文件之间切换。

你可以把它理解成：

```text
currentSessionFile = selectedFile
```

它不会：

- 改变树结构
- 创建分支

> 注意：`/resume` 不依赖 `/fork`。它只是打开一个已有的 session 文件。

### 3.4 `/new`：创建一个全新的空 session

作用范围：文件层。

它的作用就是创建一个新的空 session，没有历史包袱。

## 四、pi 的会话系统是三层结构

可以把它概括成：

```text
Session Files
    └── Tree Structure
            └── Active Node
```

也就是说：

- 文件层决定“你在用哪个 session 文件”
- 树层决定“你在这个 session 里的哪个分支上”
- 当前指针决定“下一条消息接到哪里”

### 4.1 文件层操作

- `/new`
- `/fork`
- `/resume`
- `pi -c`
- `pi -r`
- `--session`
- `--fork`

### 4.2 树层操作

- `/tree`
- `/compact`

### 4.3 元数据操作

- `/name`
- `/session`

### 4.4 导出类操作

- `/export`
- `/share`

## 五、一个更直观的理解模型

```text
/new      = 创建宇宙
/fork     = 复制宇宙
/resume   = 切换宇宙
/tree     = 在宇宙里时间旅行
/compact  = 压缩宇宙记忆
```

这个比喻虽然夸张，但很好用：

- `new` 是从零开始
- `fork` 是复制一份平行版本
- `resume` 是切换到另一个已存在的版本
- `tree` 是在同一个版本里回到某个节点继续写
- `compact` 是把长历史压缩成更可控的上下文

## 六、pi 的设计哲学

pi 的会话系统有几个很明显的特点：

- 不可变历史（immutable history）
- 树结构分支（persistent tree）
- 文件级与树级分离
- 永不删除历史

这让 pi 更像：

> Git for conversations

它的价值不只是“能继续聊”，而是“能保留所有演化路径”。

## 七、一句话总结

- `/tree`：在当前会话里切换节点
- `/fork`：复制出一个新的会话文件
- `/resume`：切换不同的会话文件
- `/new`：创建全新的会话

理解这三层结构，就真正理解了 pi 的会话系统。
