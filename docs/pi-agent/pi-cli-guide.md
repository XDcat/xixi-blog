---
canShare: true
---

# pi agent 命令行使用指南

本文档介绍如何在**不使用 TUI 交互界面**的情况下，通过命令行使用 pi agent。

## 1. 最常用方式：打印结果并退出

如果你只是想让 pi 一次性完成任务并输出结果，使用 `-p` 或 `--print`：

```bash
pi -p "帮我总结一下这个项目"
```

也可以直接在命令行里传入问题：

```bash
pi "帮我总结一下这个项目"
```

## 2. 传入文件

使用 `@` 前缀把文件作为输入内容带给模型：

```bash
pi -p @README.md "总结这份文档"
pi -p @src/index.ts @src/test.ts "帮我 review 这两个文件"
```

## 3. 读取标准输入

你可以把其他命令的输出通过管道传给 pi：

```bash
cat README.md | pi -p "总结这段内容"
```

## 4. 指定模型

如果要切换模型，可以加上 `--provider` 或 `--model`：

```bash
pi --provider openai --model gpt-4o "帮我重构这段代码"
pi --model openai/gpt-4o "帮我重构这段代码"
pi --model sonnet:high "解决这个复杂问题"
```

## 5. 控制工具权限

默认会提供常用工具，如 `read`、`bash`、`edit`、`write`。如果想限制能力，可以显式指定：

```bash
pi --tools read,grep,find,ls -p "审查代码"
pi --no-tools -p "只回答文本，不要读写文件"
```

## 6. 脚本/自动化集成

如果你要把 pi 接到脚本或其他程序里，推荐使用机器可读模式：

```bash
pi --mode json
pi --mode rpc
```

- `--mode json`：输出事件流，适合自己解析
- `--mode rpc`：通过 stdin/stdout 提供 RPC 协议，适合进程集成

## 7. 常用会话参数

```bash
pi -c                  # 继续最近一次会话
pi -r                  # 浏览并选择历史会话
pi --no-session        # 不保存会话
pi --session <path>    # 指定会话文件或 ID
pi --fork <path>       # 从已有会话分叉
```

## 8. 一个最简参考

如果你只记住一条命令，那就是：

```bash
pi -p "你的问题"
```

如果要做文件分析：

```bash
pi -p @README.md "总结一下"
```

## 9. 备注

- 如果你需要长期交互、查看工具调用过程，还是用默认交互模式更合适。
- 如果你只想在终端里执行一次任务，`-p` 最方便。
- 如果你要接程序，请优先考虑 `--mode json` 或 `--mode rpc`。
