# 深入理解 pi 的会话管理机制：/tree、/fork、/resume 全解析

:::note
pi session
Share URL: https://pi.dev/session/#cb8ed97bc2a3bc419b8d2043ec3d4159
Gist: https://gist.github.com/XDcat/cb8ed97bc2a3bc419b8d2043ec3d4159

:::

> 本文基于 pi 官方 README 与源码结构整理，总结 pi 的会话管理机制与设计哲学。

---

# 一、pi 为什么没有“回滚”？

在很多 AI 工具中，如果你回到历史消息继续对话，后面的内容会被删除。

但 **pi 不会删除历史**。

原因是：

> pi 的 session 不是线性数组，而是一棵树（tree structure）。

每条消息都有：

- `id`
- `parentId`

所有消息形成一棵不可变历史树。

所谓“回滚”，本质上只是：

> 把当前指针移动到历史某个节点，然后从那里继续分叉。

---

# 二、Session 的底层结构

## 1️⃣ 文件层

所有 session 存储在：

```
~/.pi/agent/sessions/
```

按工作目录分文件夹。

每个 session 是一个：

```
.jsonl 文件
```

JSONL = 每行一个 JSON 记录。

---

## 2️⃣ 树结构层

一个 session 文件内部结构类似：

```
a → b → c → d → e → f → g
```

如果在 e 使用 `/tree` 继续：

```
a → b → c → d → e
                  ├─ f → g
                  └─ new_f → new_g
```

历史永远不会删除。

---

## 3️⃣ 当前指针（Active Node）

pi 会记录当前所在节点。

- `/tree` 改变当前节点
- 新消息会以当前节点为 parent

---

# 三、核心命令解析

## ✅ /tree —— 树内切换

作用层级：单个 session 内部。

功能：

- 跳转到历史任意节点
- 在该节点继续对话
- 产生新的分支

本质：

```
currentNode = selectedNode
```

✅ 不创建新文件
✅ 不删除历史

---

## ✅ /fork —— 复制为新 session

作用层级：文件层。

功能：

- 复制当前 session（或某节点之前的历史）
- 创建一个新的 session 文件
- 在新文件中继续

本质：

```
newSessionFile = copy(oldSession up to node X)
```

✅ 创建新文件
✅ 原文件不受影响

---

## ✅ /resume —— 切换 session 文件

作用层级：文件层。

功能：

- 在所有已有 session 文件之间切换

本质：

```
currentSessionFile = selectedFile
```

✅ 不改变树结构
✅ 不创建分支

⚠️ `/resume` 不依赖 `/fork`。
它只是打开一个已有的 session 文件。

---

## ✅ /new —— 创建全新空 session

作用层级：文件层。

功能：

- 创建一个新的空 session

---

# 四、完整会话管理体系

pi 的会话系统是三层结构：

```
Session Files
    └── Tree Structure
            └── Active Node
```

---

## 文件层操作

- `/new`
- `/fork`
- `/resume`
- `pi -c`
- `pi -r`
- `--session`
- `--fork`

---

## 树层操作

- `/tree`
- `/compact`

---

## 元数据操作

- `/name`
- `/session`

---

## 导出类

- `/export`
- `/share`

---

# 五、核心理解模型

```
/new      = 创建宇宙
/fork     = 复制宇宙
/resume   = 切换宇宙
/tree     = 在宇宙里时间旅行
/compact  = 压缩宇宙记忆
```

---

# 六、设计哲学总结

pi 的会话系统具有以下特点：

✅ 不可变历史（immutable history）  
✅ 树结构分支（persistent tree）  
✅ 文件级与树级分离  
✅ 永不删除历史  

这使得 pi 更像：

> Git for conversations

---

# 七、一句话总结

- `/tree`：在当前会话里切换节点
- `/fork`：复制出一个新的会话文件
- `/resume`：切换不同的会话文件
- `/new`：创建全新的会话

理解这三层结构，就真正理解了 pi 的会话系统。

---

（完）
