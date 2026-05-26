# 🎯 前端面试知识体系

---

## 💼 职场心法

> **最佳跳槽时机 = 你不需要跳槽的时候**

- 永远保持"可被雇佣"状态（每季度更新一次简历）
- 用"离职者心态"打工（我现在做的哪件事，能写进下一份简历？）
- 入职第一天，就思考 3-5 年后（积累"年谈资"，还是积累"资本"？）
- 最可怕的不是跳槽，大家都在怕：打工人的精神状态，"我好像该走了，但不知道能去哪"。

---

## 🗺️ 五阶段学习路径图

```mermaid
graph LR
    S1["🟢 S1 基础夯实"] --> S2["🔵 S2 框架深入"]
    S2 --> S3["🟡 S3 进阶提升"]
    S3 --> S4["🔴 S4 面试冲刺"]
    S4 --> S5["🟣 S5 AI 前沿"]
    S1 --> A["HTML5 · CSS3 · JS核心 · WebAPI · 20+手写实现"]
    S2 --> B["Vue3 · React19 · Angular20"]
    S3 --> C["浏览器原理 · 性能优化 · 工程化 · Code Top 100"]
    S4 --> D["面试题库 · 简历八股 · 深度追问"]
    S5 --> E["AI Agent · RAG · 体系化学习"]
    style S1 fill:#4caf50,color:#fff
    style S2 fill:#2196f3,color:#fff
    style S3 fill:#ff9800,color:#fff
    style S4 fill:#f44336,color:#fff
    style S5 fill:#9c27b0,color:#fff
```

---

## 📁 目录结构

```

项目根目录/
|
|-- 📁 S1-基础夯实/          🟢 基础阶段（01-04）
|   |-- 01-HTML.md
|   |-- 02-CSS.md
|   |-- 03-JavaScript-核心.md    🆕 拆分
|   +-- 04-JavaScript-WebAPI.md  🆕 拆分
|
|-- 📁 S2-框架深入/          🔵 框架阶段（01-04）
|   |-- 01-Vue3.md
|   |-- 02-React19.md
|   |-- 03-Angular20.md
|   +-- 04-框架对比.md         🆕 新增
|
|-- 📁 S3-进阶提升/          🟡 进阶阶段（01-05）
|   |-- 01-浏览器原理.md
|   |-- 02-性能优化.md
|   |-- 03-前端工程化.md
|   |-- 04-算法题解.md
|   +-- 05-计算机网络.md       🆕 新增
|
|-- 📁 S4-面试冲刺/          🔴 冲刺阶段（01-03）
|   |-- 01-前端面试题库.md
|   |-- 02-简历.md
|   +-- 03-简历问题.md
|
|-- 📁 S5-AI/                🟣 AI 阶段（00-10）
|   |-- 01-AI前端开发体系化学习指南.md
|   |-- 02-入门期-AI聊天室.md
|   |-- 03-进阶期-RAG应用.md
|   |-- 04-深耕期-端侧推理.md
|   |-- 05-专家期-Agent设计.md
|   |-- 06-生产化与工程化.md
|   |-- 07-前沿技术与生态.md
|   |-- 08-技术选型对比合集.md
|   |-- 09-开发实战与架构指南.md
|   |-- 10-附录与参考资料.md
|   |-- 11-Agent面试题.md
|
+-- 📄 README.md             ← 导航文件
```

---

---

## 📈 前端技术发展脉络（2010—2026）

> 了解技术从哪里来、到哪里去，是面试中展现"技术视野"的关键。

### 阶段一：刀耕火种（2010—2014）
```
HTML4 + CSS2 + jQuery         ← 原生 DOM 操作，贫血架构
├─ 2010: AngularJS（MVC 理念引入前端）
├─ 2011: React 诞生（虚拟 DOM 新范式）
├─ 2013: React 开源 + Node.js 生态萌芽
└─ 2014: HTML5 定稿，ES6 草案推进
```

### 阶段二：框架三国（2014—2019）
```
├─ 2014: Vue 1.0 发布（轻量级选手入场）
├─ 2015: React Native（跨平台）、ES6 正式发布
├─ 2016: Angular 2.0 重写（TypeScript 原生）、Vue 2.0
├─ 2017: React Fiber 架构重写开始
├─ 2018: Vue 3.0 提案（Proxy 响应式）
├─ 2019: React Hooks 发布（函数式革命）、Deno 1.0
```

### 阶段三：深度进化（2019—2024）
```
├─ 2020: Vue 3.0 正式版、Vite 诞生（ESM 开发服务器）
├─ 2021: React 18 Concurrent Mode、Angular Ivy 全面
├─ 2022: Next.js 13 App Router、Turbopack
├─ 2023: React 19 预览（Actions/use()）、Angular Signals
├─ 2024: React Compiler（自动记忆化）、Vue 3.5、Angular 18 Zoneless
```

### 阶段四：AI 融合（2024—2026）
```
├─ 2024: AI 编程助手（Cursor/Copilot）、LLM 前端集成
├─ 2025: Agent 互操作（MCP/A2A）、端侧推理（WebGPU）
├─ 2026: React 19 稳定、Vue 3.6 Alien Signals、Angular 21
│         AI Agent 标准化、Server Components 普及化
```

---

## 🔄 核心框架版本迭代速览

| 框架 | 第一代 | 重大重写 | 现代起点 | 最新版本 | 关键转折 |
|------|--------|---------|---------|---------|---------|
| **Vue** | Vue 1.0 (2014) | Vue 2.0 (2016) | Vue 3.0 (2020) | 3.6 (2026) | Options → Composition API |
| **React** | React 0.3 (2013) | React 16 Fiber (2017) | React 18 (2022) | 19 (2025) | Class → Hooks → Compiler |
| **Angular** | AngularJS (2010) | Angular 2 (2016) | Angular 15 (2022) | 21 (2026) | MVC → Component + Ivy |
| **构建工具** | Grunt → Gulp | Webpack 1-4 | Vite (2021) | Vite 6 (2025) | Bundle → ESM native |
| **Node.js** | 0.10 (2013) | 4.x LTS (2015) | 18 LTS (2022) | 22 LTS (2025) | CommonJS → ESM dual |

> 💡 **面试价值**：了解版本迭代的关键节点（如 AngularJS→Angular 2 的断裂式升级、React 16 Fiber 架构重写），能让面试官感受到你的"技术纵深"。

---

## 📖 学习路径（按阶段）

---

### 🟢 S1 基础夯实（01-04）

> **目标：** 打好 HTML/CSS/JS 基础。 **建议用时：** 1-2 周

| 路径（点击跳转） | 核心知识点 |
|------------------|-----------|
| [01-HTML.md](S1-基础夯实/01-HTML.md) | src vs href、语义化标签、DOCTYPE、defer vs async、meta、HTML5 新特性、img srcset、行内/块级/空元素、Web Worker、离线存储、Canvas vs SVG、iframe、label、Web Components、Resource Hints、View Transitions、Import Map、WebSocket、WebRTC、Popover API、Dialog、ARIA、表单高级特性、Service Worker/PWA、HTML 解析机制 |
| [02-CSS.md](S1-基础夯实/02-CSS.md) | 选择器优先级、盒模型、Flex/Grid、BFC、定位、动画、场景应用(三角形/扇形/0.5px)、CSS 编程题 15 道、Container Queries、:has()、@layer、CSS Nesting、@property、Scroll-Driven Animations、Anchor Positioning、@scope、Subgrid、Tailwind、现代视口单位、light-dark()、:user-valid/:user-invalid |
| [3-JavaScript-核心.md](S1-基础夯实/03-JavaScript-核心.md) 🆕 | 8 种数据类型、原型链、闭包、this 绑定、执行上下文、Promise、async/await、ES6+(Map/Set/Symbol/BigInt)、面向对象继承、GC/内存泄漏、ES2024-2027 新特性 |
| [4-JavaScript-WebAPI.md](S1-基础夯实/04-JavaScript-WebAPI.md) 🆕 | 浏览器 Web API(IntersectionObserver/Clipboard/FileSystem/Navigation/Worker等)、20+ 手写实现(防抖节流/深拷贝/Promise/发布订阅)、经典代码输出题 |

---

### 🔵 S2 框架深入（01-04）

> **目标：** 选择一个主攻框架 + 通过框架对比文件横向理解差异。 **建议用时：** 2 周

| 路径（点击跳转） | 核心知识点 |
|------------------|-----------|
| [01-Vue3.md](S2-框架深入/01-Vue3.md) | Composition API、ref/reactive、Proxy 响应式、模板指令、组件通信、Vue Router、Pinia、高级组件、自定义指令、TypeScript 集成、Vite 工程实践、性能优化、Vue 3.6 Alien Signals、面试题 |
| [02-React19.md](S2-框架深入/02-React19.md) | JSX 语法、Hooks 系统、Context API、Refs/Portals、Error Boundaries、HOC/Render Props、Fiber 架构、React 19 Actions/use()、React Compiler、Next.js、状态管理、并发模式、Server Components、性能优化、面试题 |
| [03-Angular20.md](S2-框架深入/03-Angular20.md) | Angular 20 新特性、Angular 21 进展、组件/模板/指令、数据绑定、生命周期、DI 系统、Signals、RxJS、路由系统、表单处理、HTTP 客户端、状态管理、动画、OnPush、Zoneless、httpResource、工程实践、面试题 |
| [04-框架对比.md](S2-框架深入/04-框架对比.md) 🆕 | 三大框架核心哲学、响应式原理、组件化、状态管理、路由、构建工具、TypeScript 集成、性能优化策略、学习曲线、面试问答、技术选型决策树 |

---

### 🟡 S3 进阶提升（01-05）

> **目标：** 深入浏览器原理、计算机网络、性能优化、工程化与算法。 **建议用时：** 2 周

| 路径（点击跳转） | 核心知识点 |
|------------------|-----------|
| [01-浏览器原理.md](S3-进阶提升/01-浏览器原理.md) | XSS/CSRF/MITM、多进程架构、缓存策略、渲染流水线、事件机制、事件循环、V8 垃圾回收、bfcache、预渲染(Speculation Rules API) |
| [02-性能优化.md](S3-进阶提升/02-性能优化.md) | CDN、懒加载、回流重绘、防抖节流、图片优化(WebP/雪碧图/Base64)、Webpack 优化、Core Web Vitals (LCP/INP/CLS)、资源加载优化(Resource Hints)、GPU 加速、Critical CSS、Edge Computing、Islands Architecture、Streaming SSR |
| [03-前端工程化.md](S3-进阶提升/03-前端工程化.md) | 模块化、Git、Webpack、Babel、现代构建(Vite/esbuild/Turbopack/SWC/Rspack)、包管理(pnpm/Bun/Deno)、Monorepo(Turborepo)、微前端(Module Federation/qiankun/wujie)、代码质量(ESLint/Vitest/Playwright)、CI/CD(Docker/GitHub Actions)、新趋势(Biome/Rolldown/Vite 6/MF 2.0) |
| [04-算法题解.md](S3-进阶提升/04-算法题解.md) | Code Top 100 · 哈希表、双指针/滑动窗口、链表、二叉树、动态规划、字符串、二分查找、栈/队列、排序/TopK、回溯、DFS/BFS/图、设计题(LRU/Rand10) |
| [05-计算机网络.md](S3-进阶提升/05-计算机网络.md) 🆕 | HTTP 发展史(1.1→3)、HTTPS/TLS、TCP/UDP、DNS、缓存、CDN、CORS、安全、状态码、WebSocket/SSE、WebTransport |

---

### 🔴 S4 面试冲刺（01-03）

> **目标：** 刷面试题库、深挖简历八股文。 **建议用时：** 1-2 周

| 路径（点击跳转） | 核心知识点 |
|------------------|-----------|
| [01-前端面试题库.md](S4-面试冲刺/01-前端面试题库.md) | JS 核心(类型/原型/闭包/继承)、异步/Promise/Event Loop、ES6+(Proxy/Reflect/ES2024-2025)、浏览器API、网络协议(HTTP/3/WebTransport/CORS/CDN)、CSS 布局、工程化(Vite/Rspack/Turbopack)、框架机制(React 19/Zustand/Pinia/RTK)、设计模式、编程题 |
| [02-简历.md](S4-面试冲刺/02-简历.md) | 简历模板、项目经验、技术栈描述 |
| [03-简历问题.md](S4-面试冲刺/03-简历问题.md) | React Fiber、SSE vs WebSocket、RxJS 操作符、虚拟列表、OnPush 变更检测、JWT 安全、Event Loop、渲染流水线、TypeScript 工具类型、Web Vitals、Webpack vs Vite、状态管理、微前端、XSS 攻击 |

---

### 🟣 S5 AI 前沿（00-10）

> **目标：** 掌握 AI Agent 架构与 AI 辅助前端开发体系，从入门到专家期。 **建议用时：** 1-2 周

| 路径（点击跳转） | 核心知识点 |
|------------------|-----------|
| [01-AI前端开发体系化学习指南.md](S5-AI/01-AI前端开发体系化学习指南.md) | 6 阶段学习路径、Prompt Engineering、LangGraph 工作流、Ollama 本地部署、高级 RAG 模式、AI 测试与 CI/CD、成本估算、架构模式对比、Next.js AI 架构 |
| [02-入门期-AI聊天室.md](S5-AI/02-入门期-AI聊天室.md) | 基于 Vite + React 搭建 AI Chat、Stream 流式渲染、Markdown 渲染、Prompt 技巧 |
| [03-进阶期-RAG应用.md](S5-AI/03-进阶期-RAG应用.md) | 检索增强生成、向量库集成、Embedding 策略、Rerank 排序、知识库构建 |
| [04-深耕期-端侧推理.md](S5-AI/04-深耕期-端侧推理.md) | WebGPU/WebNN、ONNX Runtime、Transformers.js、模型量化、本地 LLM 部署 |
| [05-专家期-Agent设计.md](S5-AI/05-专家期-Agent设计.md) | Agent 范式（ReAct/Plan-and-Execute/Reflection）、记忆机制、Multi-Agent、Function Calling、MCP/A2A、AI Gateway、Transformer 原理、LoRA/DPO/PPO、KV Cache |
| [06-生产化与工程化.md](S5-AI/06-生产化与工程化.md) | AI 应用 CI/CD、监控与可观测性、成本控制、A/B 测试、安全与合规 |
| [07-前沿技术与生态.md](S5-AI/07-前沿技术与生态.md) | 多模态模型、AI 编程助手演进、Agent 互操作协议、AI 芯片趋势 |
| [08-技术选型对比合集.md](S5-AI/08-技术选型对比合集.md) | 模型/框架/工具链选型对比、开源 vs 商业方案、成本效益分析 |
| [09-开发实战与架构指南.md](S5-AI/09-开发实战与架构指南.md) | 完整项目架构、代码组织、调试技巧、性能调优、最佳实践 |
| [10-附录与参考资料.md](S5-AI/10-附录与参考资料.md) | 推荐阅读、学习资源、工具清单、术语表 |
| [11-Agent面试题.md](S5-AI/11-Agent面试题.md) | AI Agent 面试高频题、MCP/A2A/Function Calling、RAG/端侧推理、Agent 范式与安全 |

---


## 🚀 推荐学习节奏

| 时段 | 学习内容 | 每日附加 |
|------|---------|---------|
| 第 1-2 周 | 🌱 S1-基础夯实/ → 01+02+03 通读 | JS 手写练习 10 题/日 |
| 第 3-4 周 | 🌳 S2-框架深入/ → 选主攻框架精读 | 复习 S1 错题 |
| 第 5-6 周 | 🌿 S3-进阶提升/ → 01+02+03 系统学习 | Code Top 100 2-3 题/日 |
| 第 7-8 周 | 🏆 S4-面试冲刺/ → 01+03 反复刷 | Code Top 100 1 题/日 |
| 第 9-10 周 | 🤖 S5-AI/ → 01+02+05+11 核心必读，其余选读 | 关注 AI 工具更新 |

---

**🚀 祝面试顺利！** 按阶段逐步推进，每天坚持代码输出 + 算法，9 周拿下 offer 💪
