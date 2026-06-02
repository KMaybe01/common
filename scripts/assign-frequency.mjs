import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = process.cwd()
const data = JSON.parse(readFileSync(join(root, 'quiz-data.json'), 'utf-8'))

// High-frequency keywords (must-know topics, 80%+ interviews)
const HIGH_KEYWORDS = {
  'html': [
    '语义化', 'HTML5', 'DOCTYPE', 'meta', 'src.*href', 'script.*async.*defer',
    'Web Component', 'canvas', 'svg', 'video', 'audio', '语义标签',
    'SEO', '无障碍', 'ARIA', 'data-', '自定义属性', 'localStorage',
    'sessionStorage', 'cookie', 'storage', 'History', '路由',
  ],
  'css': [
    '盒模型', 'box-sizing', 'BFC', 'flex', 'grid', 'position', '定位',
    '浮动', '清除浮动', '垂直居中', '水平居中', '响应式', '媒体查询',
    'rem', 'em', 'px', 'vw', 'vh', '动画', 'transition', 'transform',
    'animation', '选择器', '优先级', '层叠', '伪类', '伪元素',
    'z-index', '层叠上下文', 'margin重叠', '布局',
  ],
  'js-core': [
    '闭包', '原型', '原型链', '继承', 'Promise', 'async', 'await',
    '事件循环', 'Event Loop', 'this', '作用域', '变量提升', 'hoisting',
    '执行上下文', 'call', 'apply', 'bind', '防抖', '节流', 'debounce',
    'throttle', '深拷贝', '浅拷贝', '类型转换', '==', '===', 'new',
    'instanceof', 'typeof', '垃圾回收', 'GC', '内存泄漏', '模块化',
    'CommonJS', 'ES Module', '箭头函数', '生成器', 'Iterator',
    'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy',
    'Reflect', 'class', '柯里化', 'compose',
  ],
  'js-api': [
    'DOM', '事件', '事件委托', '事件冒泡', '事件捕获', 'addEventListener',
    '阻止冒泡', '阻止默认', 'Event', '自定义事件', 'BOM', 'navigator',
    'location', 'history', 'Fetch', 'XMLHttpRequest', 'Ajax', '跨域',
    'CORS', 'JSONP', 'WebSocket', '渲染', '重排', '重绘', 'reflow',
    'repaint', 'DOMContentLoaded', 'load', 'requestAnimationFrame',
    'Web Worker', 'Service Worker', 'PWA', 'File', 'Blob',
    'FileReader', 'FormData', '拖拽',
  ],
  'vue3': [
    '响应式', 'ref', 'reactive', 'computed', 'watch', 'watchEffect',
    '生命周期', 'created', 'mounted', '组件通信', 'props', 'emit',
    'v-model', 'Composition API', 'Options API', 'Pinia', 'Vuex',
    'Router', '路由', '导航守卫', 'keep-alive', '虚拟DOM', 'diff',
    'VDOM', 'patch', 'nextTick', 'slot', '插槽', '指令', 'v-if',
    'v-for', 'v-show', '自定义指令', 'mixins', 'Hooks', 'composable',
    'provide', 'inject', 'Teleport', 'Suspense', 'defineComponent',
    'script setup', 'SSR', 'Vapor',
  ],
  'react': [
    'Hooks', 'useState', 'useEffect', 'useContext', 'useReducer',
    'useMemo', 'useCallback', 'useRef', '自定义Hook', '组件通信',
    'props', 'state', '生命周期', '虚拟DOM', 'VDOM', 'diff', 'Fiber',
    'JSX', '条件渲染', '列表渲染', 'key', '事件处理', '受控组件',
    '非受控组件', '表单', 'Ref', 'Context', '高阶组件', 'HOC',
    'render props', 'Redux', 'Zustand', 'React Router', '路由',
    '性能优化', 'React.memo', 'PureComponent', 'shouldComponentUpdate',
    'Suspense', 'lazy', 'Error Boundary', 'Portal', 'React Server Component',
    'RSC', 'Server Action', 'use server', '缓存', 'Compiler',
  ],
  'angular': [
    '组件', 'component', '模块', 'NgModule', '模板', 'template',
    '数据绑定', '双向绑定', 'ngModel', '指令', 'Directive',
    'ngIf', 'ngFor', 'ngSwitch', '管道', 'Pipe', '服务', 'Service',
    '依赖注入', 'DI', 'inject', '生命周期', 'ngOnInit', 'ngOnDestroy',
    '路由', 'Router', '守卫', 'Guard', '拦截器', 'Interceptor',
    'HttpClient', 'RxJS', 'Observable', 'Subject', 'BehaviorSubject',
    'Subscription', 'operator', 'pipe', 'map', 'switchMap',
    '表单', 'ReactiveForms', 'TemplateForms', 'FormGroup', 'FormControl',
    '验证', 'Validator', '变更检测', 'ChangeDetection', 'OnPush',
    '信号', 'Signal', 'computed', 'effect', 'input', 'output',
    'Zone.js', 'zoneless', 'SSR', 'hydration', '延迟加载', 'lazy',
    'ng-content', '投影', 'ViewChild', 'ContentChild',
    '@if', '@for', '@defer', 'standalone',
  ],
  'browser': [
    '渲染', '重排', '重绘', 'reflow', 'repaint', '合成', 'composite',
    '关键渲染路径', 'CRP', 'DOM树', 'CSSOM', '渲染树', '图层',
    '浏览器缓存', '强缓存', '协商缓存', 'Cache-Control', 'ETag',
    'Last-Modified', '同源策略', '跨域', 'CORS', 'XSS', 'CSRF',
    '点击劫持', 'HTTPS', 'SSL', 'TLS', '安全',
  ],
  'perf': [
    '性能优化', '加载优化', '渲染优化', '懒加载', 'lazy load',
    '图片优化', 'webp', '雪碧图', '代码分割', 'code splitting',
    'Tree Shaking', 'gzip', 'CDN', '缓存策略', '预加载', 'preload',
    'prefetch', '关键渲染路径', 'CRP', 'Core Web Vitals', 'LCP',
    'FID', 'INP', 'CLS', 'FP', 'FCP', 'TTI', 'TBT', 'RAIL',
    '虚拟列表', '虚拟滚动', '无限滚动', '长列表', 'Web Worker',
    'requestAnimationFrame', 'requestIdleCallback', '内存优化',
  ],
  'eng': [
    'Webpack', 'Vite', 'esbuild', 'rollup', 'parcel', '打包',
    '模块化', 'loader', 'plugin', '热更新', 'HMR', '代码分割',
    'Tree Shaking', '缓存', 'chunk', 'bundle', 'Babel', 'AST',
    'TypeScript', 'tsconfig', 'ESLint', 'Prettier', 'CI/CD',
    'Git', '版本控制', 'npm', 'yarn', 'pnpm', 'monorepo',
    '微前端', 'Micro Frontend', 'Module Federation', 'qiankun',
    '单测', '单元测试', 'Jest', 'Vitest', 'Cypress', 'E2E',
  ],
  'algo': [
    '时间复杂', '空间复杂', '排序', '冒泡', '快排', '归并', '堆排',
    '二分', '查找', '递归', '迭代', 'DP', '动态规划', '贪心',
    '回溯', 'BFS', 'DFS', '树', '二叉树', '链表', '数组', '栈',
    '队列', '哈希', '堆', '优先队列', '字符串', '滑动窗口',
    '双指针', '前缀和', 'LRU', 'LFU', '并查集', '图',
  ],
  'network': [
    'TCP', 'UDP', '三次握手', '四次挥手', 'HTTP', 'HTTPS', 'HTTP/2',
    'HTTP/3', 'QUIC', 'WebSocket', 'DNS', 'CDN', '缓存', 'Cookie',
    'Session', 'Token', 'JWT', '跨域', 'CORS', 'RESTful', 'GraphQL',
    'gRPC', '负载均衡', '反向代理', 'Nginx', '网络安全', 'XSS',
    'CSRF', 'SQL注入', 'DDOS', 'CSP',
  ],
  'node': [
    '事件循环', 'Event Loop', 'libuv', '异步', '回调', 'Promise',
    'Stream', 'Buffer', '文件系统', 'fs', 'Path', 'process',
    'cluster', 'child_process', 'worker_threads', '中间件',
    'Express', 'Koa', 'Nest', 'npm', '模块机制', 'require',
    'exports', 'EventEmitter', '错误处理', '调试', '性能',
  ],
  'go': [
    'goroutine', 'channel', 'select', 'defer', 'panic', 'recover',
    'slice', 'map', 'array', 'struct', 'interface', '反射', 'reflect',
    '指针', 'new', 'make', 'GC', '垃圾回收', 'GMP', '调度',
    'context', 'sync', 'Mutex', 'RWMutex', 'WaitGroup', 'Once',
    'atomic', '闭包', '逃逸分析', '内存管理', '测试', 'benchmark',
    'pprof', 'Go Module', '泛型', 'error', 'error group',
  ],
  'ai-llm': [
    '大模型', 'LLM', 'Transformer', 'Attention', 'GPT', 'ChatGPT',
    'RLHF', 'SFT', 'LoRA', 'Prompt', 'Token', '微调', 'Fine.tune',
    '量化', '蒸馏', '部署', 'RAG', 'Agent',
  ],
  'compare': [
    '区别', '对比', '差异', '优缺点', '选型', 'vs',
  ],
}

// Medium-frequency keywords (commonly tested, 50-80%)
const MID_KEYWORDS = {
  'html': ['table', 'iframe', 'form', 'input', 'canvas', 'drag', 'SVG', 'MathML', 'picture', 'source'],
  'css': ['calc', 'var', 'custom property', 'writing-mode', 'object-fit', 'object-position', 'aspect-ratio', 'container', '样式隔离', 'scoped', 'CSS Module', 'CSS-in-JS'],
  'js-core': ['BigInt', 'Global', 'parseInt', 'parseFloat', 'isNaN', '编码', 'decodeURI', 'encodeURI', 'atob', 'btoa', '尾调用', '尾递归', 'with', 'eval'],
  'js-api': ['IntersectionObserver', 'MutationObserver', 'ResizeObserver', 'Performance', 'PerformanceObserver', 'Geolocation', 'Notification', 'Fullscreen', 'Screen Orientation', 'Network Information'],
  'vue3': ['动态组件', '异步组件', 'defineAsyncComponent', 'Transition', 'TransitionGroup', '自定义指令', '插件', '插件开发', '渲染函数', 'h函数', 'JSX.*Vue', 'hydration'],
  'react': ['StrictMode', 'flushSync', 'useSyncExternalStore', 'useInsertionEffect', 'useDeferredValue', 'useTransition', 'startTransition', 'forwardRef', 'useImperativeHandle', 'createPortal', 'flushSync', 'reconciliation'],
  'angular': ['Dynamic Component', '@Injectable', 'providedIn', 'forRoot', 'forChild', 'APP_INITIALIZER', 'Renderer2', 'ElementRef', 'TemplateRef', 'ViewContainerRef', 'sanitize', 'DomSanitizer'],
  'network': ['WebRTC', 'SSE', 'EventSource', 'QUIC', 'SPDY', 'HTTP/1.0', 'HTTP/1.1', 'Keep-Alive', '长连接', '管线化', '分块传输'],
  'ai-llm': [
    'Embedding', '位置编码', 'RoPE', 'ALiBi', '分词', 'tokenizer',
    'KV Cache', 'MoE', '多模态', 'Function Calling', 'Tool Use',
    'Temperature', 'Top.k', 'Top.p', 'beam search', '采样',
    '上下文窗口', 'Context Window', 'DPO', '奖励模型',
    'Prompt Engineering', 'Chain.of.Thought', 'COT',
  ],
  'ai-agent': [
    'Agent', 'Tool', 'Planning', 'ReAct', 'Memory', '反思',
    'Multi.Agent', 'Orchestration', 'Workflow', '任务分解',
    '工具调用', '记忆机制', '推理模式',
  ],
  'ai-rag': [
    'RAG', '检索', 'Embedding', 'Chunk', '向量数据库', '召回',
    '重排序', 'Hybrid', '混合检索', 'Query Expansion',
    '检索增强', '文档分割',
  ],
  'ai-basic': [
    'Agent', '架构', '组件', 'Workflow', 'Tool', 'Tools',
    'ReAct', 'Plan.*Execute', 'Reflection', '推理模式',
    '任务拆分', '记忆', '记忆机制', '记忆模块', '规划',
    'LLM', '大模型', '工具', '调用',
  ],
  'ai-compare': [
    '对比', '选型', '区别', 'vs', '代际', '比较',
    'Hybrid Search', '混合检索', 'Embedding', '重排序',
    'Query Expansion', '图像理解', '语音交互', '框架',
  ],
  'compare': [
    '优缺点', '差异', '选型', '生态', '学习曲线', '数据流',
    '状态管理', '微前端', 'Monorepo', '构建工具', '测试',
    '权限', '国际化', 'SSR', 'SSG', 'CSR',
  ],
  'perf': ['LCP', 'FID', 'CLS', 'INP', 'Core Web Vitals', '构建优化', '分包', '资源加载', '关键路径'],
  'monitor': ['埋点', '监控', 'Sentry', '错误', '性能监控', '日志', '告警', 'APM', '异常', '上报', 'Source Map'],
  'node': ['Express', 'Koa', 'Nest', '中间件', 'Stream', 'Event Loop', 'npm', '包管理'],
  'reverse': ['提问', '团队', '技术栈', '代码', '流程', '项目管理', '自我介绍', '离职', '职业规划', '优点', '缺点', '薪资', '加班', '文化', '福利', '架构', '性能', '质量', '测试', '部署', '发布', '沟通', '协作', '远程', '晋升', '考核', '培训', '文档', '代码审查', 'Code Review'],
  'lioam': ['网元', '运维', 'OAM', '网管', '管理', '配置', '告警', '性能管理', '拓扑'],
  'ai-fw': ['LangChain', 'LangGraph', 'LlamaIndex', 'AutoGPT', 'CrewAI', '框架', '编排', 'pipeline', '链式'],
  'ai-edge': ['端侧', 'ONNX', 'TensorRT', '量化', '边缘', '移动端', 'TFLite', 'WebGPU', 'WebNN', 'Transformers.js', 'KV Cache', '内存', '延迟'],
  'ai-prod': ['上线', '部署', '监控', 'A/B', '评估', 'MLOps', '测试', 'CI/CD', '发布', '回滚', '灰度', '压测', 'AB测试'],
  'ai-eco': ['生态', '趋势', '多模态', 'GenAI', 'AIGC', '视频生成', 'AI搜索', 'MCP', 'A2A', '协议', 'Agent通信'],
  'ai-tool': ['OpenAI', 'Claude', 'Gemini', 'API', 'SDK', '工具链', '调用', '兼容', 'SDK对比', 'Function Calling', 'Function Call', 'MCP', '模型上下文协议', 'Tool', '工具使用', '工具定义'],
  'ai-proj': ['实战', '落地', '案例', '效果', '架构设计', '系统设计', '实现', '开发', '项目', '踩坑', '优化', '方案', '成本', 'Token成本', '安全防护', '监控告警', '并发', '高并发', '容错', '生产级', '生产环境'],
  'ai-trend': ['前沿', '趋势', '2026', '未来', 'AGI', '具身智能', 'Scaling Law', '世界模型', '推理模型', 'o1', 'o3'],
  'ai-arch': ['架构', '设计', '模块', '扩展', '高可用', '调试', '测试', '评估', '监控', '部署', '性能', '优化', '安全', '缓存', '限流', '降级'],
  'ai-chat': ['聊天', '对话', '角色', '记忆', '上下文', 'Session', 'API调用', '流式', '组件', 'UI', '消息'],
}

function hasMarker(text) {
  return /（必考）|（高频）|必考题|高频题/u.test(text)
}

function extractStarRating(text) {
  const m = text.match(/(?:面试星级|难度星级)[：:]\s*(★+)/u)
  if (!m) return 0
  return m[1].length
}

function assignFrequency(question, catId) {
  const text = question.question
  const fullText = text + '\n' + (question.answer || '')

  // Check for explicit markers in question title
  if (hasMarker(text)) {
    question.freq = 'high'
    return
  }

  // Check for 面试星级 5-star → high, 4-star → high, 3-star → mid
  const stars = extractStarRating(fullText)
  if (stars >= 4) {
    question.freq = 'high'
    return
  }
  if (stars === 3) {
    question.freq = 'mid'
    return
  }

  // Learning guide categories → always low (they're course outlines, not interview questions)
  const guideCats = ['vue3-l', 'react-l', 'ng-l']
  if (guideCats.includes(catId)) {
    question.freq = 'low'
    return
  }

  const catHigh = HIGH_KEYWORDS[catId] || []
  const catMid = MID_KEYWORDS[catId] || []

  for (const kw of catHigh) {
    if (new RegExp(kw, 'iu').test(text)) {
      question.freq = 'high'
      return
    }
  }

  for (const kw of catMid) {
    if (new RegExp(kw, 'iu').test(text)) {
      question.freq = 'mid'
      return
    }
  }

  // For algorithm questions, difficulty-based assignment
  if (catId === 'algo') {
    if (/简单|🟢/u.test(text)) {
      question.freq = 'low'
    } else if (/中等|🟡/u.test(text)) {
      question.freq = 'mid'
    } else if (/困难|🔴/u.test(text)) {
      question.freq = 'low'
    }
    return
  }

  // Preserve existing frequency from source extraction (e.g. Go markdown)
  if (question.freq) return

  // Default: assign based on category-specific heuristics
  const coreCats = ['html', 'css', 'js-core', 'js-api', 'vue3', 'react', 'angular', 'go', 'network', 'browser', 'perf', 'eng', 'algo', 'node', 'compare']
  if (coreCats.includes(catId)) {
    question.freq = 'mid'
  } else {
    question.freq = 'low'
  }
}

for (const q of data.questions) {
  assignFrequency(q, q.category)
}

writeFileSync(join(root, 'quiz-data.json'), JSON.stringify(data, null, 2), 'utf-8')

const stats = {}
for (const q of data.questions) {
  if (!stats[q.category]) stats[q.category] = { total: 0, high: 0, mid: 0, low: 0 }
  stats[q.category].total++
  stats[q.category][q.freq]++
}
console.log('Frequency assignment complete!')
for (const [cat, s] of Object.entries(stats)) {
  const pct = s.high > 0 ? ` (${(s.high/s.total*100).toFixed(0)}% 高频)` : ''
  console.log(`  ${cat}: 总${s.total}  🔥${s.high}  📌${s.mid}  📖${s.low}${pct}`)
}
console.log(`\nTotal: ${data.questions.length} questions`)
console.log(`  🔥 高频(high): ${data.questions.filter(q=>q.freq==='high').length}`)
console.log(`  📌 常考(mid): ${data.questions.filter(q=>q.freq==='mid').length}`)
console.log(`  📖 了解(low): ${data.questions.filter(q=>q.freq==='low').length}`)
