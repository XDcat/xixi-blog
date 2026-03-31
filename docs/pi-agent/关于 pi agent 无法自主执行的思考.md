# 关于 pi agent 无法自主执行的思考

## 一、问题现象

在使用 pi agent 进行复杂任务（例如源码分析、批量修改、结构重构）时，会出现一个明显的问题：

> 必须不断输入“继续”，agent 才会推进任务。

这会带来明显的割裂感：

- 任务本质上是连续的
- agent 本应自主完成
- 但执行却被强制切成一轮一轮对话

这并不是使用方式的问题，而是执行模型本身的限制。

---

## 二、根本原因：对话模型 ≠ 自主 Agent

当前运行模式本质是 **turn-based 执行模型**：

```
用户输入 → 模型执行一次 → 输出结果 → 停止
```

模型在一次响应后立即结束运行，不具备：

- 持续运行循环
- 自主决策下一步
- 自动再次调用自身
- 持久化“任务未完成”状态机

因此你才需要不断输入：

```
继续
继续
继续
```

这并不是 prompt 设计问题，而是执行架构问题。

---

## 三、真正的 Autonomous Agent 应该是什么样

一个真正的自主 agent 应该具备如下循环结构：

```
while (task_not_done) {
    agent.plan()
    agent.act()
    agent.observe()
    agent.decide_next()
}
```

核心特征：

- ✅ 自主循环
- ✅ 有任务状态
- ✅ 自动判断是否完成
- ✅ 无需用户手动推进

这属于 **Machine-driven control loop**，而不是 Human-driven chat loop。

---

## 四、为什么当前模式无法自动持续运行

当前交互环境通常是：

- 单轮 API 调用
- 无后台线程
- 无调度器
- 无心跳机制

模型输出后执行立即结束。

这意味着：

> 模型无法“自己再次调用自己”。

因此它不能天然形成持续执行循环。

---

## 五、实现“自主执行”的几种方案

### 方案一：单次回复内模拟完整循环（Prompt 级）

在提示中要求：

> 在本次回复中持续执行任务直到完成，不要等待用户输入。

优点：
- 实现简单

缺点：
- 受 token 限制
- 无跨轮状态
- 不适合复杂工程任务

适用于小规模操作。

---

### 方案二：在 AgentSession 内增加自动循环

在 agent 内部增加类似逻辑：

```ts
async runAutonomousLoop(goal: string) {
  let done = false

  while (!done) {
    const result = await this.prompt(goal)
    done = this.evaluateIfDone(result)
  }
}
```

特点：

- 用户只输入一次目标
- agent 自动运行直到完成
- 内部控制任务结束条件

适合改造现有 pi agent 架构。

---

### 方案三：外层 Orchestrator 控制循环（推荐）

在 CLI 或服务端增加控制层：

```ts
while (true) {
    const result = await agentSession.prompt(currentObjective)

    const decision = await agentSession.prompt(
        "根据当前状态判断是否需要继续执行任务。仅回答 YES 或 NO。"
    )

    if (decision === "NO") break
}
```

优势：

- 控制权在程序
- 可加最大步数限制
- 可加超时控制
- 可做错误恢复
- 更适合生产环境

这是工程级 Autonomous Agent 的常见设计。

---

### 方案四：结构化自反输出

让模型在每轮输出结构字段：

```
NEXT_ACTION:
...

IS_TASK_COMPLETE:
YES / NO
```

然后由外部程序解析字段决定是否继续。

这种方式比简单“继续”更稳定，也更可控。

---

## 六、推荐的架构升级方向

如果希望 pi agent 真正具备自主执行能力，建议引入：

- ✅ 外部 Orchestrator 控制循环
- ✅ 结构化“是否完成”判断信号
- ✅ 最大步数与 token 上限
- ✅ 错误恢复机制
- ✅ 状态持久化

从“对话驱动”升级为“循环驱动”。

---

## 七、核心结论

当前需要不断输入“继续”，并不是模型能力问题，而是执行范式问题。

**Chat 模式本质是：**

```
Human-driven turn loop
```

**真正的 Agent 模式应该是：**

```
Machine-driven control loop
```

如果不改变执行架构，任何 prompt 技巧都只能缓解问题，而无法彻底解决。

---

## 八、总结

pi agent 当前的执行方式更接近“增强型聊天工具”，而不是完全自主的执行代理。

要实现真正的 Autonomous Agent，必须在架构层引入持续控制循环，而不是依赖用户不断输入“继续”。

这不是 prompt 设计问题，而是系统设计问题。