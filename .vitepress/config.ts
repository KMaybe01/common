import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  mermaid: {
    theme: 'neutral',
    themeVariables: {
      primaryColor: '#3eaf7c',
      primaryTextColor: '#fff',
      primaryBorderColor: '#2d8f5e',
      lineColor: '#666',
      secondaryColor: '#2196f3',
      tertiaryColor: '#f5f5f5'
    }
  },
  title: '前端知识体系',
  description: '前端知识体系 - HTML/CSS/JavaScript/Vue/React/Angular/性能优化/工程化/AI',
  base: '/common/',
  lang: 'zh-CN',
  lastUpdated: true,
  scrollOffset: 70,

  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/common/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['script', {}, `
      (function() {
        const saved = localStorage.getItem('vitepress-theme-appearance');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'dark' || (!saved && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    `],
  ],

  markdown: {
    html: false,
    image: {
      lazyLoading: true
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '基础夯实',
        activeMatch: '/S1-基础夯实/',
        items: [
          { text: '📖 阶段概览', link: '/S1-基础夯实/' },
          { text: '🌐 HTML', link: '/S1-基础夯实/01-HTML' },
          { text: '🎨 CSS', link: '/S1-基础夯实/02-CSS' },
          {
            text: '⚡ JavaScript 核心',
            items: [
              { text: '📖 总览', link: '/S1-基础夯实/JavaScript核心/' },
              { text: '数据类型与 ES6', link: '/S1-基础夯实/JavaScript核心/01-数据类型与ES6' },
              { text: 'JavaScript 基础', link: '/S1-基础夯实/JavaScript核心/02-JavaScript基础' },
              { text: '原型、作用域与 this', link: '/S1-基础夯实/JavaScript核心/03-原型作用域与this' },
              { text: '异步编程', link: '/S1-基础夯实/JavaScript核心/04-异步编程' },
              { text: '垃圾回收/事件循环/新特性', link: '/S1-基础夯实/JavaScript核心/05-垃圾回收事件循环与新特性' },
              { text: 'TypeScript 高频题', link: '/S1-基础夯实/JavaScript核心/06-TypeScript高频题' },
            ]
          },
          {
            text: '🧩 JavaScript 代码篇',
            items: [
              { text: '📖 总览', link: '/S1-基础夯实/JavaScript代码篇/' },
              { text: '浏览器 Web API', link: '/S1-基础夯实/JavaScript代码篇/01-浏览器WebAPI' },
              { text: '手写代码实现', link: '/S1-基础夯实/JavaScript代码篇/02-手写实现' },
              { text: '代码输出题', link: '/S1-基础夯实/JavaScript代码篇/03-代码输出题' },
            ]
          },
        ]
      },
      {
        text: '框架深入',
        activeMatch: '/S2-框架深入/',
        items: [
          { text: '📖 阶段概览', link: '/S2-框架深入/' },
          { text: '🟢 Vue3', link: '/S2-框架深入/01-Vue3' },
          { text: '🔴 Angular21', link: '/S2-框架深入/03-Angular21' },
          {
            text: '🔵 React19',
            items: [
              { text: '📖 总览', link: '/S2-框架深入/React19/' },
              { text: '核心基础', link: '/S2-框架深入/React19/01-核心基础' },
              { text: '高级特性', link: '/S2-框架深入/React19/02-高级特性' },
              { text: '工程实践', link: '/S2-框架深入/React19/03-工程实践' },
              { text: '性能优化', link: '/S2-框架深入/React19/04-性能优化' },
              { text: '深入原理', link: '/S2-框架深入/React19/05-深入原理' },
              { text: 'React 19 新特性', link: '/S2-框架深入/React19/06-React19新特性' },
              { text: '调试与场景', link: '/S2-框架深入/React19/07-调试与场景' },
              { text: 'React深入浅出解析', link: '/S2-框架深入/React19/08-React深入浅出解析' },
            ]
          },
          {
            text: '⚖️ 框架对比',
            items: [
              { text: '📖 总览', link: '/S2-框架深入/框架对比/' },
              { text: '核心哲学与响应式', link: '/S2-框架深入/框架对比/01-核心哲学与响应式' },
              { text: '组件化状态管理路由', link: '/S2-框架深入/框架对比/02-组件化状态管理路由' },
              { text: '构建SSR与生态', link: '/S2-框架深入/框架对比/03-构建SSR生态' },
              { text: '性能优化与选型', link: '/S2-框架深入/框架对比/04-性能与选型' },
            ]
          },
          { text: '🔴 Vue3源码解析', link: '/S2-框架深入/05-Vue3.0源码深度解析' },
        ]
      },
      {
        text: '进阶提升',
        activeMatch: '/S3-进阶提升/',
        items: [
          { text: '📖 阶段概览', link: '/S3-进阶提升/' },
          { text: '💡 算法题解', link: '/S3-进阶提升/04-算法题解' },
          { text: '🌐 计算机网络', link: '/S3-进阶提升/05-计算机网络' },
          { text: '🏗️ 前端工程化', link: '/S3-进阶提升/03-前端工程化' },
          { text: '🚀 性能优化', link: '/S3-进阶提升/02-性能优化' },
          { text: '🌍 浏览器原理', link: '/S3-进阶提升/01-浏览器原理' },
          { text: '📊 前端监控与埋点', link: '/S3-进阶提升/06-前端监控与埋点' },
          { text: '📦 Node.js与服务端', link: '/S3-进阶提升/07-Node.js与服务端' },
        ]
      },
      {
        text: '面试冲刺',
        activeMatch: '/S4-面试冲刺/',
        items: [
          { text: '📖 阶段概览', link: '/S4-面试冲刺/' },
          { text: '📈 面试技术亮点汇总', link: '/S4-面试冲刺/00-面试技术亮点汇总' },
          { text: '📝 简历', link: '/S4-面试冲刺/01-简历' },
          { text: '❓ 简历问题', link: '/S4-面试冲刺/02-简历问题' },
          { text: '🔄 反向面试', link: '/S4-面试冲刺/03-反向面试' },
          { text: '📶 5G核心网测试用例管理系统', link: '/S4-面试冲刺/04-5G核心网测试用例管理系统' },
          { text: '🏢 AeMS企业级综合网络管理系统', link: '/S4-面试冲刺/05-AeMS企业级综合网络管理系统' },
          { text: '⚙️ LI-OAM 网元运维与数据管理系统', link: '/S4-面试冲刺/06-LI-OAM 网元运维与数据管理系统' },
          { text: '🔒 Axyom ACL & HTTP Decorator Library', link: '/S4-面试冲刺/07-Axyom ACL & HTTP Decorator Library' },
          { text: '📋 Axyom-Form 项目技术分析', link: '/S4-面试冲刺/08-Axyom-Form 项目技术分析' },
          { text: '📊 Axyom-Table 项目技术分析', link: '/S4-面试冲刺/09-Axyom-Table 项目技术分析' },
          { text: '🏗️ FMS-UI企业级融合管理系统', link: '/S4-面试冲刺/11-FMS-UI企业级融合管理系统' },
          { text: '📈 Prometheus+Grafana', link: '/S4-面试冲刺/10-Prometheus+Grafana' },
          { text: '📈 ToB前端可视化面试通关指南', link: '/S4-面试冲刺/12-ToB前端可视化面试通关指南' },
          { text: '📈 ToC转型面试策略', link: '/S4-面试冲刺/13-ToC转型面试策略' },
        ]
      },
      {
        text: 'AI 前沿',
        activeMatch: '/S5-AI/',
        items: [
          { text: '📖 阶段概览', link: '/S5-AI/' },
          { text: '🎯 AI推荐学习', link: '/S5-AI/00-AI推荐学习' },
          { text: '💬 入门期-AI聊天室', link: '/S5-AI/01-入门期-AI聊天室' },
          { text: '🔗 进阶期-RAG应用', link: '/S5-AI/02-进阶期-RAG应用' },
          { text: '📱 深耕期-端侧推理', link: '/S5-AI/03-深耕期-端侧推理' },
          { text: '🤖 专家期-Agent设计', link: '/S5-AI/04-专家期-Agent设计' },
          { text: '🏭 生产化与工程化', link: '/S5-AI/05-生产化与工程化' },
          { text: '🔬 前沿技术与生态', link: '/S5-AI/06-前沿技术与生态' },
          { text: '⚖️ 技术选型对比合集', link: '/S5-AI/07-技术选型对比合集' },
          { text: '🛠️ 开发实战与架构指南', link: '/S5-AI/08-开发实战与架构指南' },
          { text: '📐 基础篇', link: '/S5-AI/10-基础篇' },
          { text: '🧰 工具协议篇', link: '/S5-AI/11-工具协议篇' },
          { text: '🧠 大模型基础篇', link: '/S5-AI/12-大模型基础篇' },
          { text: '🔧 框架工具链篇', link: '/S5-AI/13-框架工具链篇' },
          { text: '🚀 实战项目篇', link: '/S5-AI/14-实战项目篇' },
          { text: '🔮 前沿趋势篇', link: '/S5-AI/15-前沿趋势篇' },
        ]
      },
      {
        text: 'Go 语言',
        activeMatch: '/S6-Go/',
        items: [
          { text: '📖 阶段概览', link: '/S6-Go/' },
          { text: '🗺️ Go学习路径', link: '/S6-Go/00-Go学习路径' },
          { text: '🟢 基础篇 (1-4)', link: '/S6-Go/阶段01-基础筑基' },
          { text: '🔵 进阶篇 (5-12)', link: '/S6-Go/阶段05-云原生架构进阶' },
          { text: '🟠 高级篇 (13-18)', link: '/S6-Go/阶段13-Go生态与开源' },
          { text: '🔴 面试与规划 (19-23)', link: '/S6-Go/阶段19-面试技巧与职业规划' },
          { text: '🟣 微服务与容器 (24-25)', link: '/S6-Go/阶段24-微服务架构深度' },
          { text: '🟡 中间件深度 (26-32)', link: '/S6-Go/阶段26-Redis' },
        ]
      },
      { text: '题库', link: '/quiz/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KMaybe01/common' }
    ],

    editLink: {
      pattern: 'https://github.com/KMaybe01/common/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    search: {
      provider: 'local',
      options: {
      }
    }
  },

  vite: {
    optimizeDeps: {
      include: ['dayjs']
    },
    ssr: {
      noExternal: ['dayjs']
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1200,
    },
  }
}))
