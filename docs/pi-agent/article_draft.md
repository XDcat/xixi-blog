# 深入解析 Pi Agent 的 System Message 文件来源链路（含关键源码路径）

> 基于源码路径：`/home/xdcat/code/pi-mono/`
> 本文专注：**system message 实际读取了哪些本地文件，以及哪些内容是内置文本**。

---

# 一、总链路入口

## 1️⃣ 构造入口

文件：

```
packages/coding-agent/src/core/agent-session.ts
```

关键代码：

```ts
// packages/coding-agent/src/core/agent-session.ts
private _rebuildSystemPrompt(toolNames: string[]): string {
  ...
  return buildSystemPrompt({
    cwd: this._cwd,
    skills: loadedSkills,
    contextFiles: loadedContextFiles,
    customPrompt: loaderSystemPrompt,
    appendSystemPrompt,
    selectedTools: validToolNames,
    toolSnippets,
    promptGuidelines,
  });
}
```

可以看到：

- `customPrompt`
- `appendSystemPrompt`
- `contextFiles`
- `skills`

全部来自 `ResourceLoader`。

---

# 二、ResourceLoader：真正决定读取哪些文件

文件：

```
packages/coding-agent/src/core/resource-loader.ts
```

关键方法：

```ts
async reload(): Promise<void>
```

---

# 三、SYSTEM.md —— customPrompt 来源

文件：

```
packages/coding-agent/src/core/resource-loader.ts
```

关键代码：

```ts
private discoverSystemPromptFile(): string | undefined {
  const projectPath = join(this.cwd, CONFIG_DIR_NAME, "SYSTEM.md");
  if (existsSync(projectPath)) {
    return projectPath;
  }

  const globalPath = join(this.agentDir, "SYSTEM.md");
  if (existsSync(globalPath)) {
    return globalPath;
  }

  return undefined;
}
```

### 实际读取路径

1️⃣ 项目级

```
<project>/.pi/SYSTEM.md
```

2️⃣ 全局级

```
~/.pi/agent/SYSTEM.md
```

随后在 reload 中被解析：

```ts
const baseSystemPrompt = resolvePromptInput(
  this.systemPromptSource ?? this.discoverSystemPromptFile(),
  "system prompt",
);

this.systemPrompt = baseSystemPrompt;
```

---

# 四、APPEND_SYSTEM.md —— 追加内容来源

文件：

```
packages/coding-agent/src/core/resource-loader.ts
```

关键代码：

```ts
private discoverAppendSystemPromptFile(): string | undefined {
  const projectPath = join(this.cwd, CONFIG_DIR_NAME, "APPEND_SYSTEM.md");
  if (existsSync(projectPath)) {
    return projectPath;
  }

  const globalPath = join(this.agentDir, "APPEND_SYSTEM.md");
  if (existsSync(globalPath)) {
    return globalPath;
  }

  return undefined;
}
```

解析逻辑：

```ts
const appendSource = this.appendSystemPromptSource ?? this.discoverAppendSystemPromptFile();
const resolvedAppend = resolvePromptInput(appendSource, "append system prompt");
this.appendSystemPrompt = resolvedAppend ? [resolvedAppend] : [];
```

读取路径：

```
<project>/.pi/APPEND_SYSTEM.md
~/.pi/agent/APPEND_SYSTEM.md
```

---

# 五、AGENTS.md / CLAUDE.md —— Project Context

文件：

```
packages/coding-agent/src/core/resource-loader.ts
```

关键代码：

```ts
function loadContextFileFromDir(dir: string) {
  const candidates = ["AGENTS.md", "CLAUDE.md"];
  ...
}
```

递归加载逻辑：

```ts
function loadProjectContextFiles(...) {
  const globalContext = loadContextFileFromDir(resolvedAgentDir);
  ...
  while (true) {
    const contextFile = loadContextFileFromDir(currentDir);
    ...
    currentDir = resolve(currentDir, "..");
  }
}
```

### 实际读取文件

- `~/.pi/agent/AGENTS.md`
- `~/.pi/agent/CLAUDE.md`
- `./AGENTS.md`
- `./CLAUDE.md`
- 父目录中的同名文件

---

# 六、SKILL.md —— Skills 来源

文件：

```
packages/coding-agent/src/core/resource-loader.ts
```

调用：

```ts
updateSkillsFromPaths(skillPaths)
```

内部：

```ts
loadSkills({
  cwd: this.cwd,
  agentDir: this.agentDir,
  skillPaths,
  includeDefaults: false,
});
```

真实读取文件：

```
SKILL.md
```

来源目录可能包括：

- `~/.pi/agent/skills/`
- `<project>/.pi/skills/`
- 已安装 package 的 skills 目录

---

# 七、默认 system 文本 —— 硬编码位置

文件：

```
packages/coding-agent/src/core/system-prompt.ts
```

关键代码：

```ts
let prompt = `You are an expert coding assistant operating inside pi...`;
```

如果不存在 SYSTEM.md，则使用此默认文本。

---

# 八、最终文件来源清单

## ✅ 明确会被读取的文件

- `<project>/.pi/SYSTEM.md`
- `~/.pi/agent/SYSTEM.md`
- `<project>/.pi/APPEND_SYSTEM.md`
- `~/.pi/agent/APPEND_SYSTEM.md`
- `AGENTS.md`（当前目录及父目录）
- `CLAUDE.md`（当前目录及父目录）
- `~/.pi/agent/AGENTS.md`
- `~/.pi/agent/CLAUDE.md`
- `SKILL.md`（多来源路径）

## ✅ 内置默认文本

```
packages/coding-agent/src/core/system-prompt.ts
```

---

# 九、一句话总结

> Pi Agent 的 system message 由 SYSTEM.md / APPEND_SYSTEM.md / AGENTS.md / CLAUDE.md / SKILL.md 等文件组合生成；若不存在 SYSTEM.md，则使用 system-prompt.ts 中的硬编码默认模板。

---

（完）
