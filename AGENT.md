# AGENT — 前端知识体系

## 项目概述

React 19 静态站点项目（由 VitePress 迁移），构建前端面试知识体系，涵盖 HTML/CSS/JS、Vue3/React19/Angular21、性能优化、工程化、AI、Go 语言六大方向。

## 常用命令

```bash
bun dev        # 本地开发
bun run build  # 生产构建
bun run lint   # Biome 格式化 + lint
bun run typecheck # TypeScript 类型检查
bun preview    # 预览构建产物
```

- 构建后自动执行 `node scripts/gen-version.mjs` 生成版本信息
- 依赖管理使用 `bun`（锁文件 `bun.lock`）

## 目录结构

```
├── src/
│   ├── main.tsx                 # 入口
│   ├── App.tsx                  # 根组件（路由）
│   ├── index.css                # 全局样式
│   ├── components/
│   │   ├── Header.tsx           # 顶部导航栏
│   │   ├── HomePage.tsx         # 首页（Hero + Feature）
│   │   ├── DocPage.tsx           # 文档页面容器
│   │   ├── DocVirtualScroll.tsx  # 虚拟滚动（分片渲染大文档）
│   │   ├── MarkdownRenderer.tsx  # MD → React 渲染
│   │   ├── MermaidDiagram.tsx    # Mermaid 图表
│   │   ├── Outline.tsx           # 右侧目录
│   │   └── UpdateNotification.tsx # 版本更新通知
│   ├── data/
│   │   ├── navigation.ts         # 导航配置
│   │   └── content.ts            # MD 文件加载器（import.meta.glob）
│   ├── hooks/
│   │   └── useTheme.ts           # 暗色模式 hook
│   └── utils/
│       ├── slugify.ts            # 标题 → anchor ID 算法
│       └── split-markdown.ts     # MD 按标题分片 + 高度预估
├── public/                      # 静态资源
├── scripts/
│   └── gen-version.mjs          # 构建时版本生成脚本
├── S1-基础夯实/                 # HTML/CSS/JavaScript 基础
│   ├── index.md
│   ├── 01-HTML.md
│   ├── 02-CSS.md
│   ├── JavaScript核心/          # 数据类型、ES6、原型、异步、TS
│   └── JavaScript代码篇/        # WebAPI、手写实现、输出题
├── S2-框架深入/                 # Vue3、React19、Angular21、框架对比
│   ├── index.md
│   ├── 01-Vue3.md
│   ├── 03-Angular21.md
│   ├── 05-Vue3.0源码深度解析.md
│   ├── React19/                 # 8 篇
│   └── 框架对比/                # 4 篇
├── S3-进阶提升/                 # 浏览器原理、性能优化、工程化等
├── S4-面试冲刺/                 # 简历、项目复盘、面试策略
├── S5-AI/                       # AI 前沿（三级子目录）
├── S6-Go/                       # Go 语言全阶段学习
├── index.html                   # HTML 入口
├── package.json
├── vite.config.ts
├── tsconfig.json
├── biome.json
└── AGENT.md
```

## 路径约定

- **React Router 路由** = MD 文件路径去 `.md` 后缀，如 `/S1-基础夯实/01-HTML`
- `index.md` → 目录路由，如 `/S1-基础夯实/JavaScript核心/`
- **导航配置** 在 `src/data/navigation.ts` 中管理
- 新增文档后需同步更新导航配置

## 技术栈

- React 19（UI 框架）
- Vite 6（构建工具）
- TypeScript 5.6（类型安全）
- React Router v6（路由）
- react-markdown + remark-gfm（Markdown 渲染）
- highlight.js（代码高亮）
- Mermaid 11（图表/流程图）
- Biome（格式化 + lint）

## 编码规范

- Markdown 文档采用中文编写，UTF-8 编码
- 文档命名：`NN-中文标题.md`（数字前缀控制排序）
- 导航 icon 使用 emoji 前缀（如 📖 🎯 💬）
- 所有路径在配置中使用 `/` 开头（绝对路径）
- 新增加章节需同步更新：
  1. `src/data/navigation.ts` 导航
  2. 各阶段 `index.md` 概览页（如适用）

## 内容加载

- 使用 Vite `import.meta.glob` 在构建时自动发现所有 MD 文件
- 内容通过 `src/data/content.ts` 中的 `getContent(url)` 查找
- 无需手动注册路由——所有内容文件自动映射为路由
