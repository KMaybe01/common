# 🎯 前端面试知识 Wiki

> **手写算法项目知识汇总** — 涵盖前端八股文、算法、框架、工程化、简历指导等全方位知识体系

---

## 📋 项目概览

本项目包含 **15 份** 详细 Markdown 文档，覆盖前端面试全部核心领域，总计数千道面试题与实战案例。

| 模块 | 文件 | 内容 |
|------|------|------|
| 🧠 Agent | `00-Agent.md` | Agent 架构、Function Calling、MCP、LangChain |
| 💻 算法 | `00-codeTop100_JS.md` | LeetCode Top 100 手写 JS 实现 |
| 🔤 HTML | `01-HTML-详解版.md` | HTML5、语义化、Web Components |
| 🎨 CSS | `02-CSS-详解版.md` | 选择器、布局、动画、编程题集 |
| 📜 JavaScript | `03-JavaScript-详解版.md` | 数据类型、闭包、原型链、异步 |
| 🟩 Vue | `04-Vue-详解版.md` | Vue 3、Composition API、响应式原理 |
| ⚛️ React | `05-React-详解版.md` | React 19、Hooks、Fiber、Next.js |
| 🔺 Angular | `06-Angular20-完整指南.md` | Angular 20、Signals、DI、RxJS |
| ⚡ 性能优化 | `07-性能优化-详解版.md` | CDN、懒加载、Web Vitals、渲染优化 |
| 🌐 浏览器原理 | `08-浏览器原理-详解版.md` | 安全、缓存、渲染原理、事件循环 |
| 🛠️ 工程化 | `09-前端工程化-详解版.md` | Webpack、Vite、Monorepo、CI/CD |
| ✍️ 代码输出 | `10-代码输出-详解版.md` | Promise、this、作用域、原型输出题 |
| 📝 面试题库 | `10-前端面试题库.md` | 综合面试题、扫码登录、设计模式 |
| 📄 简历 | `简历.md` | 简历模板与项目经验 |
| ❓ 简历问题 | `简历问题.md` | Fiber、SSE/WebSocket、RxJS、虚拟列表 |

---

## 🧠 Agent 智能体

**文件：** `00-Agent.md`

- **Agent 基础**：Agent vs LLM、核心架构、Workflow vs Agent vs Tools
- **设计范式**：ReAct、Plan-and-Execute、Reflection、Multi-Agent
- **工具调用**：Function Calling 原理、MCP 协议、A2A 协议
- **大模型基础**：Transformer、MoE、LoRA、量化、Prompt Engineering
- **LangChain**：核心组件、Chains、Agents、Memory

---

## 💻 Code Top 100 算法

**文件：** `00-codeTop100_JS.md`

- **哈希表**：两数之和、和为 K 的子数组、最长连续序列
- **双指针/滑动窗口**：无重复字符最长子串、三数之和、接雨水、最小覆盖子串
- **链表**：反转链表、K 个一组翻转、环形链表、排序链表
- **二叉树**：层序遍历、最近公共祖先、最大路径和、验证 BST
- **动态规划**：最大子数组和、最长上升子序列、编辑距离、打家劫舍
- **字符串**：大数运算、括号生成、字符串解码
- **二分查找**：旋转排序数组、寻找中位数、平方根
- **排序/TopK**：快速排序、第 K 大元素、合并 K 个链表
- **回溯**：全排列、组合总和、子集
- **设计题**：LRU 缓存、最小栈、Rand10

---

## 🔤 HTML

**文件：** `01-HTML-详解版.md`

| 知识点 | 说明 |
|--------|------|
| src vs href | src 阻塞解析、href 不阻塞 |
| 语义化标签 | header/nav/main/article/section/footer |
| DOCTYPE | 标准模式 vs 怪异模式 |
| defer vs async | 脚本加载策略对比 |
| meta 标签 | charset/viewport/SEO |
| HTML5 新特性 | 语义标签、多媒体、Web 存储、Canvas |
| Web Worker | 后台线程、postMessage 通信 |
| Canvas vs SVG | 位图 vs 矢量、事件支持、性能 |
| Web Components | Custom Elements、Shadow DOM、slot |
| Resource Hints | preload/prefetch/preconnect/dns-prefetch |

---

## 🎨 CSS

**文件：** `02-CSS-详解版.md`

- **选择器与优先级**：!important > 行内 > ID > 类 > 标签
- **盒模型**：content-box vs border-box
- **布局**：Flex、Grid、两栏/三栏布局、居中方案
- **BFC**：块级格式化上下文、触发条件、应用场景
- **定位**：static/relative/absolute/fixed/sticky
- **动画**：transition vs animation、transform 性能
- **场景应用**：三角形、八卦图、自适应正方形、吸顶效果
- **CSS 编程题**（15 道）：居中、九宫格、三角形、防抖节流等

---

## 📜 JavaScript

**文件：** `03-JavaScript-详解版.md`

- **数据类型**：8 种类型、typeof/instanceof、类型转换、0.1+0.2
- **ES6+**：let/const、箭头函数、解构、扩展运算符、Map/Set/WeakMap
- **原型链**：prototype、__proto__、原型链查找、继承
- **执行上下文**：作用域链、闭包、变量提升、TDZ
- **this 绑定**：默认/隐式/显式/new 绑定、箭头函数
- **异步编程**：Promise、async/await、事件循环、宏任务/微任务
- **面向对象**：new 实现、工厂模式、Class 继承
- **手写实现**：20+ 手写题（深拷贝、防抖节流、Promise、柯里化等）
- **垃圾回收**：V8 分代回收、标记清除、内存泄漏

---

## 🟩 Vue 3

**文件：** `04-Vue-详解版.md`

- **核心基础**：Composition API、ref/reactive、Proxy 响应式
- **模板语法**：指令、v-model 原理、v-if vs v-show
- **组件通信**：props/$emit、provide/inject、Pinia
- **生命周期**：组合式 API 生命周期、父子组件顺序
- **响应式原理**：Observer/Dep/Watcher、$nextTick、diff 算法
- **路由**：hash vs history、导航守卫、懒加载
- **状态管理**：Pinia vs Vuex、Setup Store
- **性能优化**：keep-alive、虚拟滚动、OnPush 策略

---

## ⚛️ React 19

**文件：** `05-React-详解版.md`

- **核心基础**：JSX、组件、Props、State、受控/非受控组件
- **Hooks 系统**：useState/useEffect/useContext/useReducer/useRef/useCallback/useMemo
- **React 19 新特性**：Compiler、Actions、use()、useOptimistic
- **Fiber 架构**：双缓冲、时间切片、优先级调度、Render/Commit
- **状态管理**：Context、Redux、Zustand、TanStack Query
- **路由**：React Router v6、loaders/actions、defer/Await
- **Next.js**：App Router、RSC、ISR、缓存策略
- **性能优化**：React.memo、代码分割、虚拟列表、并发模式

---

## 🔺 Angular 20

**文件：** `06-Angular20-完整指南.md`

- **核心基础**：组件、模板语法、数据绑定、装饰器
- **Signals 响应式**：signal/computed/effect、resource/httpResource
- **控制流语法**：@if/@for/@switch/@defer
- **依赖注入**：inject()、Provider、注入器层级
- **路由**：守卫、Resolver、懒加载、RouterLink
- **表单**：模板驱动表单、响应式表单、FormArray/FormGroup
- **RxJS**：Observable/Subject/BehaviorSubject、操作符、搜索实战
- **变更检测**：Default vs OnPush、Zone.js、Signal 模式
- **HTTP**：HttpClient、拦截器、httpResource()

---

## ⚡ 性能优化

**文件：** `07-性能优化-详解版.md`

| 维度 | 知识点 |
|------|--------|
| CDN | 分发系统、负载均衡、原理 |
| 懒加载 | 传统 scroll vs IntersectionObserver |
| 回流重绘 | 触发条件、渲染队列、优化策略 |
| 防抖节流 | 原理与实现 |
| 图片优化 | WebP、AVIF、雪碧图、Base64 |
| Webpack | 打包速度、体积优化、Tree Shaking |
| Core Web Vitals | LCP/INP/CLS 优化 |
| 渲染优化 | content-visibility、will-change、Critical CSS |
| 前沿技术 | Edge Computing、Islands、Streaming SSR、bfcache |

---

## 🌐 浏览器原理

**文件：** `08-浏览器原理-详解版.md`

- **安全**：XSS、CSRF、中间人攻击、网络劫持
- **进程线程**：Chrome 多进程架构、渲染进程 5 大线程
- **缓存**：强缓存(Expires/Cache-Control)、协商缓存(Last-Modified/ETag)
- **渲染原理**：DOM → CSSOM → Render Tree → Layout → Paint → Composite
- **本地存储**：Cookie/LocalStorage/SessionStorage/IndexedDB
- **同源策略**：CORS、JSONP、正向/反向代理
- **事件机制**：DOM2 级事件模型、事件委托、事件循环
- **垃圾回收**：V8 分代回收、新生代 Scavenge、老生代 Mark-Sweep
- **现代特性**：bfcache、Prerendering、Priority Hints、Permissions Policy
- **性能 API**：Navigation Timing、Resource Timing、Performance Observer

---

## 🛠️ 前端工程化

**文件：** `09-前端工程化-详解版.md`

- **模块化**：CommonJS vs ES Module、Tree Shaking 原理
- **Git**：分布式 vs 集中式、rebase vs merge、pull vs fetch
- **Webpack**：Loader/Plugin、构建流程、HMR、性能优化
- **Babel**：Parse → Transform → Generate 三阶段
- **现代工具**：Vite、esbuild、Turbopack、SWC、Rspack
- **包管理器**：pnpm（硬链接）、Bun、Deno
- **Monorepo**：Turborepo、Nx、pnpm workspace + Changesets
- **微前端**：Module Federation、qiankun、wujie
- **代码质量**：ESLint/Prettier、Husky/lint-staged、commitlint
- **测试**：Vitest、Playwright、测试金字塔
- **CI/CD**：GitHub Actions、Docker、K8s 部署

---

## ✍️ 代码输出题

**文件：** `10-代码输出-详解版.md`

涵盖 **60+** 经典代码输出题，含 Mermaid 图解：

| 类别 | 题量 | 核心考点 |
|------|------|----------|
| 异步 & 事件循环 | 19 题 | Promise 状态、宏任务/微任务顺序、async/await 本质 |
| this 指向 | 3 题 | 四种绑定规则、箭头函数、优先级 |
| 作用域 & 变量提升 | 3 题 | var 提升、闭包经典题 |
| 原型 & 继承 | 4 题 | 原型链查找、属性覆盖 |
| 空值合并 & 可选链 | 3 题 | ?? vs ||、?. 短路 |
| Promise 进阶 | 3 题 | allSettled/any/race |
| Generator | 3 题 | yield、yield*、async Generator |
| Proxy & Reflect | 3 题 | 拦截器、defineProperty 对比 |
| Class 继承 | 3 题 | extends/super、静态属性、私有字段 |
| Map/Set/WeakMap | 3 题 | 弱引用、唯一性、键类型 |

---

## 📝 前端面试题库

**文件：** `10-前端面试题库.md`

系统化的面试题深度解析：

1. **JavaScript 核心** — 类型系统、浮点数精度、原型链、闭包、this
2. **异步编程** — Promise 深度、事件循环、async/await
3. **浏览器原理** — 关键渲染路径、重排重绘、缓存策略
4. **框架** — 虚拟 DOM 与 Diff、Webpack Tree Shaking
5. **大厂高频** — `parseInt` 陷阱、扫码登录流程
6. **ES6+** — 防抖节流、Set/Map、ES5 vs ES6 继承
7. **Design Patterns** — 发布订阅、观察者、单例、工厂

---

## 📄 简历与面试问题

**文件：** `简历.md` / `简历问题.md`

- **简历模板**：4 年 ToB 经验、React/Angular 双栈、5G 核心网项目
- **深度八股文**：
  - React Fiber 架构（链表、时间切片、双缓冲、优先级）
  - SSE vs WebSocket 全面对比（协议、自动重连、优劣）
  - RxJS 操作符体系（switchMap/mergeMap/concatMap/exhaustMap）
  - 虚拟列表原理（定高/变高、工业级实现）
  - Angular OnPush 与变更检测（Zone.js、Signal 趋势）
  - JWT 安全体系（XSS 防御、Token Rotation）
  - WebSocket 性能优化（消息缓冲 + RAF、Web Worker）
  - Event Loop 完整机制（宏任务/微任务/RAF/RIC）
  - 浏览器渲染流水线（Layout/Paint/Composite、Layout Thrashing）
  - TypeScript 高级类型（infer、模板字面量、递归、Brand）

---

## 📚 学习路径建议

```
第一阶段：基础夯实
  ├─ HTML + CSS（01/02）
  ├─ JavaScript 核心（03）
  └─ 代码输出练习（10-代码输出）

第二阶段：框架深入
  ├─ React 19（05）
  ├─ Vue 3（04）
  ├─ Angular 20（06）
  └─ 选择主攻 1-2 个框架

第三阶段：进阶提升
  ├─ 算法刷题（00-codeTop100）
  ├─ 性能优化（07）
  ├─ 浏览器原理（08）
  └─ 工程化（09）

第四阶段：面试冲刺
  ├─ 面试题库（10-前端面试题库）
  ├─ 简历问题（简历问题）
  ├─ AI Agent（00-Agent）
  └─ 简历准备（简历）
```
