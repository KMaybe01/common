# AGENT — 前端知识体系

## 项目概述

VitePress 静态站点项目，构建前端面试知识体系，涵盖 HTML/CSS/JS、Vue3/React19/Angular21、性能优化、工程化、AI、Go 语言六大方向。

## 常用命令

```bash
bun dev        # 本地开发
bun run build  # 生产构建
bun preview    # 预览构建产物
```

- 构建前会自动执行 `node scripts/gen-version.mjs` 生成版本信息
- 依赖管理使用 `bun`（锁文件 `bun.lock`）

## 目录结构

```
├── .vitepress/
│   ├── config.ts              # 站点配置（导航/侧边栏/搜索）
│   └── theme/                 # 自定义主题
├── public/                    # 静态资源
├── scripts/
│   └── gen-version.mjs        # 构建时版本生成脚本
├── S1-基础夯实/               # HTML/CSS/JavaScript 基础
│   ├── index.md
│   ├── 01-HTML.md
│   ├── 02-CSS.md
│   ├── JavaScript核心/        # 数据类型、ES6、原型、异步、TS
│   └── JavaScript代码篇/      # WebAPI、手写实现、输出题
├── S2-框架深入/               # Vue3、React19、Angular21、框架对比
│   ├── index.md
│   ├── 01-Vue3.md
│   ├── 03-Angular21.md
│   ├── 05-Vue3.0源码深度解析.md
│   ├── React19/               # 8 篇
│   └── 框架对比/              # 4 篇
├── S3-进阶提升/               # 浏览器原理、性能优化、工程化等
│   └── index.md + 7 篇文档
├── S4-面试冲刺/               # 简历、项目复盘、面试策略
│   └── index.md + 14 篇文档
├── S5-AI/                     # AI 前沿（三级子目录）
│   ├── index.md
│   ├── 实战篇/                # 00-08（学习路径、RAG、Agent等）
│   ├── 面试篇/                # 10-15（基础、协议、大模型等）
│   └── 课程实战/              # 01-07 + index（RAG、MCP/A2A、训练等）
├── S6-Go/                     # Go 语言全阶段学习
│   └── 阶段01-阶段32          # 32 个阶段文档
├── index.md                   # 首页（Home Layout）
├── package.json
└── tsconfig.json
```

## 路径约定

- **VitePress 路由** = 去掉 `.md` 后缀，如 `/S1-基础夯实/01-HTML`
- **导航配置** 在 `.vitepress/config.ts` 的 `themeConfig.nav` 中管理
- 新增文档后需同步更新导航配置和对应 `index.md` 的链接

## 技术栈

- VitePress 1.6+（静态站点生成器）
- TypeScript（配置与脚本）
- Mermaid（图表/流程图）
- highlight.js + markdown-it（代码高亮）
- medium-zoom（图片缩放）

## 编码规范

- Markdown 文档采用中文编写，UTF-8 编码
- 文档命名：`NN-中文标题.md`（数字前缀控制排序）
- 导航 icon 使用 emoji 前缀（如 📖 🎯 💬）
- 所有路径在配置文件中使用 `/` 开头（绝对路径）
- 新增加章节需同步更新：
  1. `.vitepress/config.ts` 导航
  2. 各阶段 `index.md` 概览页
  3. 首页 `index.md` features（如适用）
