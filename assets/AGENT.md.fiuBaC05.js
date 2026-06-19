import{_ as a,o as n,c as e,a4 as i}from"./chunks/framework.CRLRfKFc.js";const m=JSON.parse('{"title":"AGENT — 前端知识体系","description":"","frontmatter":{},"headers":[],"relativePath":"AGENT.md","filePath":"AGENT.md","lastUpdated":1781871821000}'),p={name:"AGENT.md"};function l(t,s,c,d,o,r){return n(),e("div",null,[...s[0]||(s[0]=[i(`<h1 id="agent-—-前端知识体系" tabindex="-1">AGENT — 前端知识体系 <a class="header-anchor" href="#agent-—-前端知识体系" aria-label="Permalink to &quot;AGENT — 前端知识体系&quot;">​</a></h1><h2 id="项目概述" tabindex="-1">项目概述 <a class="header-anchor" href="#项目概述" aria-label="Permalink to &quot;项目概述&quot;">​</a></h2><p>VitePress 静态站点项目，构建前端面试知识体系，涵盖 HTML/CSS/JS、Vue3/React19/Angular21、性能优化、工程化、AI、Go 语言六大方向。</p><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 本地开发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     # 生产构建</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> preview</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # 预览构建产物</span></span></code></pre></div><ul><li>构建前会自动执行 <code>node scripts/gen-version.mjs</code> 生成版本信息</li><li>依赖管理使用 <code>pnpm</code>（锁文件 <code>pnpm-lock.yaml</code>）</li></ul><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── .vitepress/</span></span>
<span class="line"><span>│   ├── config.ts              # 站点配置（导航/侧边栏/搜索）</span></span>
<span class="line"><span>│   └── theme/                 # 自定义主题</span></span>
<span class="line"><span>├── public/                    # 静态资源</span></span>
<span class="line"><span>├── scripts/</span></span>
<span class="line"><span>│   └── gen-version.mjs        # 构建时版本生成脚本</span></span>
<span class="line"><span>├── S1-基础夯实/               # HTML/CSS/JavaScript 基础</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── 01-HTML.md</span></span>
<span class="line"><span>│   ├── 02-CSS.md</span></span>
<span class="line"><span>│   ├── JavaScript核心/        # 数据类型、ES6、原型、异步、TS</span></span>
<span class="line"><span>│   └── JavaScript代码篇/      # WebAPI、手写实现、输出题</span></span>
<span class="line"><span>├── S2-框架深入/               # Vue3、React19、Angular21、框架对比</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── 01-Vue3.md</span></span>
<span class="line"><span>│   ├── 03-Angular21.md</span></span>
<span class="line"><span>│   ├── 05-Vue3.0源码深度解析.md</span></span>
<span class="line"><span>│   ├── React19/               # 8 篇</span></span>
<span class="line"><span>│   └── 框架对比/              # 4 篇</span></span>
<span class="line"><span>├── S3-进阶提升/               # 浏览器原理、性能优化、工程化等</span></span>
<span class="line"><span>│   └── index.md + 7 篇文档</span></span>
<span class="line"><span>├── S4-面试冲刺/               # 简历、项目复盘、面试策略</span></span>
<span class="line"><span>│   └── index.md + 14 篇文档</span></span>
<span class="line"><span>├── S5-AI/                     # AI 前沿（三级子目录）</span></span>
<span class="line"><span>│   ├── index.md</span></span>
<span class="line"><span>│   ├── 实战篇/                # 00-08（学习路径、RAG、Agent等）</span></span>
<span class="line"><span>│   ├── 面试篇/                # 10-15（基础、协议、大模型等）</span></span>
<span class="line"><span>│   └── 课程实战/              # 01-07 + index（RAG、MCP/A2A、训练等）</span></span>
<span class="line"><span>├── S6-Go/                     # Go 语言全阶段学习</span></span>
<span class="line"><span>│   └── 阶段01-阶段32          # 32 个阶段文档</span></span>
<span class="line"><span>├── index.md                   # 首页（Home Layout）</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>└── tsconfig.json</span></span></code></pre></div><h2 id="路径约定" tabindex="-1">路径约定 <a class="header-anchor" href="#路径约定" aria-label="Permalink to &quot;路径约定&quot;">​</a></h2><ul><li><strong>VitePress 路由</strong> = 去掉 <code>.md</code> 后缀，如 <code>/S1-基础夯实/01-HTML</code></li><li><strong>导航配置</strong> 在 <code>.vitepress/config.ts</code> 的 <code>themeConfig.nav</code> 中管理</li><li>新增文档后需同步更新导航配置和对应 <code>index.md</code> 的链接</li></ul><h2 id="技术栈" tabindex="-1">技术栈 <a class="header-anchor" href="#技术栈" aria-label="Permalink to &quot;技术栈&quot;">​</a></h2><ul><li>VitePress 1.6+（静态站点生成器）</li><li>TypeScript（配置与脚本）</li><li>Mermaid（图表/流程图）</li><li>highlight.js + markdown-it（代码高亮）</li><li>medium-zoom（图片缩放）</li></ul><h2 id="编码规范" tabindex="-1">编码规范 <a class="header-anchor" href="#编码规范" aria-label="Permalink to &quot;编码规范&quot;">​</a></h2><ul><li>Markdown 文档采用中文编写，UTF-8 编码</li><li>文档命名：<code>NN-中文标题.md</code>（数字前缀控制排序）</li><li>导航 icon 使用 emoji 前缀（如 📖 🎯 💬）</li><li>所有路径在配置文件中使用 <code>/</code> 开头（绝对路径）</li><li>新增加章节需同步更新： <ol><li><code>.vitepress/config.ts</code> 导航</li><li>各阶段 <code>index.md</code> 概览页</li><li>首页 <code>index.md</code> features（如适用）</li></ol></li></ul>`,14)])])}const u=a(p,[["render",l]]);export{m as __pageData,u as default};
