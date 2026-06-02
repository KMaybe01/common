import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = process.cwd()
const data = JSON.parse(readFileSync(join(root, 'quiz-data.json'), 'utf-8'))

// ── 高频关键词（80%+ 面试必考） ──
const HIGH_KEYWORDS = {
  html: [
    '语义化', 'HTML5', 'DOCTYPE', 'meta', 'src.*href', 'script.*async.*defer',
    'Web Component', 'canvas', 'svg', 'video', 'audio', '语义标签',
    'SEO', '无障碍', 'ARIA', 'data-', '自定义属性',
    'localStorage', 'sessionStorage', 'cookie', 'storage', 'History', '路由',
    'DOM操作', '节点操作', 'innerHTML', 'createElement', 'querySelector',
    'DOCTYPE声明', '标准模式', '怪异模式',
  ],
  css: [
    '盒模型', 'box-sizing', 'BFC', 'flex', 'grid', 'position', '定位',
    '浮动', '清除浮动', '垂直居中', '水平居中', '响应式', '媒体查询',
    'rem', 'em', 'px', 'vw', 'vh', '%',
    '动画', 'transition', 'transform', 'animation', '@keyframes',
    '选择器', '优先级', '层叠', '伪类', '伪元素',
    'z-index', '层叠上下文', 'margin重叠', '布局',
    'flex布局', 'grid布局', 'flexbox', '圣杯布局', '双飞翼布局',
    '两栏布局', '三栏布局', '等高布局', '粘性定位', 'sticky',
    'CSS变量', 'custom property', 'var\\(', 'calc',
    '移动端适配', 'viewport', '物理像素', 'dpr', '1px',
    '隐藏元素', 'display none', 'visibility', 'opacity',
  ],
  'js-core': [
    '闭包', '原型', '原型链', '继承', 'Promise', 'async', 'await',
    '事件循环', 'Event Loop', 'this', '作用域', '变量提升', 'hoisting',
    '执行上下文', 'call', 'apply', 'bind',
    '防抖', '节流', 'debounce', 'throttle',
    '深拷贝', '浅拷贝', '类型转换', '==', '===',
    'new', 'instanceof', 'typeof', '垃圾回收', 'GC', '内存泄漏',
    '模块化', 'CommonJS', 'ES Module',
    '箭头函数', 'class', 'extends', 'super',
    '生成器', 'Generator', 'Iterator', '迭代器',
    'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet',
    'Proxy', 'Reflect', 'defineProperty',
    '柯里化', 'curry', 'compose',
    '设计模式', '单例', '观察者', '发布订阅',
    '类型判断', 'isArray', '数据类型',
    '异步编程', '回调', '回调地狱',
    '函数式编程', '纯函数', '高阶函数',
    '错误处理', 'try catch', '异常捕获',
    '数组方法', 'reduce', 'map', 'filter', 'forEach',
  ],
  'js-api': [
    'DOM', '事件', '事件委托', '事件冒泡', '事件捕获', 'addEventListener',
    '阻止冒泡', '阻止默认', 'Event', '自定义事件',
    'BOM', 'navigator', 'location', 'history',
    'Fetch', 'XMLHttpRequest', 'Ajax', 'axios',
    '跨域', 'CORS', 'JSONP',
    'WebSocket', 'SSE', 'EventSource',
    '渲染', '重排', '重绘', 'reflow', 'repaint',
    'DOMContentLoaded', 'load',
    'requestAnimationFrame', 'requestIdleCallback',
    'Web Worker', 'Service Worker', 'PWA',
    'File', 'Blob', 'FileReader', 'FormData',
    '拖拽', 'Drag', 'Drop',
    'IntersectionObserver', 'MutationObserver', 'ResizeObserver',
    '性能API', 'Performance', 'PerformanceObserver',
    '剪贴板', 'Clipboard', '通知', 'Notification',
  ],
  vue3: [
    '响应式', '响应式原理', 'ref', 'reactive', 'computed',
    'watch', 'watchEffect',
    '生命周期', 'created', 'mounted', 'onMounted',
    '组件通信', 'props', 'emit', 'provide', 'inject',
    'v-model', '双向绑定',
    'Composition API', 'Options API',
    'Pinia', 'Vuex', '状态管理',
    'Router', '路由', '导航守卫', '路由守卫',
    'keep-alive', '虚拟DOM', 'diff', 'VDOM', 'patch',
    'nextTick',
    'slot', '插槽', '作用域插槽',
    '指令', 'v-if', 'v-for', 'v-show', 'v-html',
    '自定义指令',
    'mixins', 'mixin',
    'Hooks', 'composable', '组合式函数',
    'Teleport', '传送门',
    'Suspense',
    'defineComponent', 'defineAsyncComponent', '异步组件',
    'script setup', 'setup',
    'SSR', '服务端渲染', 'Vapor',
    '模板编译', '编译优化', '静态提升', 'patchFlag',
    '性能优化', 'v-once', 'v-memo',
  ],
  react: [
    'Hooks', 'useState', 'useEffect', 'useContext', 'useReducer',
    'useMemo', 'useCallback', 'useRef', 'useImperativeHandle',
    '自定义Hook', '自定义hooks',
    '组件通信', 'props', 'state',
    '生命周期', 'componentDidMount',
    '虚拟DOM', 'VDOM', 'diff', 'Fiber', 'fiber',
    'JSX',
    '条件渲染', '列表渲染', 'key',
    '事件处理', '合成事件',
    '受控组件', '非受控组件', '表单',
    'Ref', 'ref',
    'Context',
    '高阶组件', 'HOC',
    'render props',
    'Redux', 'Zustand', '状态管理',
    'React Router', '路由',
    '性能优化', 'React.memo', 'memo',
    'PureComponent', 'shouldComponentUpdate',
    'Suspense', 'lazy', 'lazy加载',
    'Error Boundary', '错误边界',
    'Portal',
    'React Server Component', 'RSC',
    'Server Action', 'use server', '服务器组件',
    '缓存', 'Compiler', 'React Compiler',
    '并发', 'Concurrent', 'startTransition', 'useTransition',
    'useDeferredValue', 'useSyncExternalStore',
    'React 19', 'React 18',
  ],
  angular: [
    '组件', 'component', '模块', 'NgModule',
    '模板', 'template', '模板语法',
    '数据绑定', '双向绑定', 'ngModel',
    '指令', 'Directive', 'ngIf', 'ngFor', 'ngSwitch', 'ngClass', 'ngStyle',
    '管道', 'Pipe', '纯管道', 'impure',
    '服务', 'Service',
    '依赖注入', 'DI', 'inject', 'Injectable',
    '生命周期', 'ngOnInit', 'ngOnDestroy', 'ngOnChanges',
    '路由', 'Router', '守卫', 'Guard',
    '拦截器', 'Interceptor',
    'HttpClient',
    'RxJS', 'Observable', 'Subject', 'BehaviorSubject',
    'Subscription', 'operator', 'pipe', 'map', 'switchMap', 'debounceTime',
    '表单', 'ReactiveForms', 'TemplateForms', 'FormGroup', 'FormControl',
    '验证', 'Validator', '异步验证',
    '变更检测', 'ChangeDetection', 'OnPush',
    '信号', 'Signal', 'signal', 'computed', 'effect', 'input', 'output',
    'Zone.js', 'zoneless',
    'SSR', 'hydration', '水合',
    '延迟加载', 'lazy', 'loadChildren',
    '投影', 'ng-content', '内容投影',
    'ViewChild', 'ContentChild', 'ViewChildren',
    '@if', '@for', '@defer', 'deferrable',
    'standalone',
    '模块联邦', 'Module Federation', '微前端',
  ],
  browser: [
    '渲染', '重排', '重绘', 'reflow', 'repaint', '合成', 'composite',
    '关键渲染路径', 'CRP',
    'DOM树', 'CSSOM', '渲染树', '图层', '合成层',
    '浏览器缓存', '强缓存', '协商缓存', 'Cache-Control', 'ETag',
    'Last-Modified', 'Expires',
    '同源策略', '跨域', 'CORS',
    'XSS', 'CSRF', '点击劫持', 'CSP',
    'HTTPS', 'SSL', 'TLS',
    '浏览器架构', '多进程', 'GPU进程', '渲染进程',
    '预加载', 'preload', 'prefetch', 'preconnect', 'dns-prefetch',
    '渲染阻塞', 'defer', 'async',
    '安全', '沙箱', '隔离',
  ],
  perf: [
    '性能优化', '加载优化', '渲染优化',
    '懒加载', 'lazy load', 'lazy',
    '图片优化', 'webp', 'avif', '雪碧图', '精灵图',
    '代码分割', 'code splitting', '分包',
    'Tree Shaking',
    'gzip', 'brotli', '压缩',
    'CDN',
    '缓存策略',
    '预加载', 'preload', 'prefetch',
    '关键渲染路径', 'CRP',
    'Core Web Vitals', 'LCP', 'FID', 'INP', 'CLS',
    'FP', 'FCP', 'TTI', 'TBT', 'RAIL',
    '虚拟列表', '虚拟滚动', '无限滚动', '长列表',
    'Web Worker',
    'requestAnimationFrame', 'requestIdleCallback',
    '内存优化', '内存泄漏',
    '构建优化', '构建速度', '打包优化',
    '资源加载', '关键路径',
    '首屏', 'FMP', '白屏',
  ],
  eng: [
    'Webpack', 'Vite', 'esbuild', 'rolldown',
    'rollup', 'parcel', 'rspack', 'turbopack',
    '打包', 'bundler', '构建',
    '模块化', 'loader', 'plugin',
    '热更新', 'HMR', '热替换',
    '代码分割', 'code splitting', '分包',
    'Tree Shaking', '摇树',
    '缓存', '持久化缓存',
    'chunk', 'bundle',
    'Babel', 'AST', '抽象语法树',
    'TypeScript', 'tsconfig', '类型',
    'ESLint', 'Prettier', 'lint',
    'CI/CD', '流水线',
    'Git', '版本控制', 'git', '分支',
    'npm', 'yarn', 'pnpm',
    'monorepo', '多包管理',
    '微前端', 'Micro Frontend', 'Module Federation',
    'qiankun', 'wujie', 'single-spa',
    '单测', '单元测试', 'Jest', 'Vitest',
    'Cypress', 'E2E', '端到端测试',
    '构建流程', '编译',
  ],
  algo: [
    '时间复杂', '空间复杂', '复杂度',
    '排序', '冒泡', '快排', '快速排序', '归并', '堆排', '堆排序',
    '选择排序', '插入排序', '希尔排序', '计数排序', '桶排序', '基数排序',
    '二分', '查找', '搜索',
    '递归', '迭代',
    'DP', '动态规划',
    '贪心', '回溯',
    'BFS', 'DFS', '深度优先', '广度优先',
    '树', '二叉树', '二叉搜索', 'BST', 'AVL', '红黑',
    '链表', '单向链表', '双向链表', '循环链表',
    '数组',
    '栈', '队列', '双端队列', '优先队列',
    '哈希', '哈希表',
    '堆', '大顶堆', '小顶堆',
    '字符串', 'KMP', '回文',
    '滑动窗口',
    '双指针',
    '前缀和', '差分',
    'LRU', 'LFU',
    '并查集',
    '图', '拓扑', '最短路径', 'Dijkstra', 'Floyd',
    '排列', '组合', '子集',
    '贪心',
  ],
  network: [
    'TCP', 'UDP', '三次握手', '四次挥手',
    'HTTP', 'HTTPS', 'HTTP/2', 'HTTP/3',
    'QUIC',
    'WebSocket',
    'DNS', '域名解析',
    'CDN',
    '缓存', '强缓存', '协商缓存',
    'Cookie', 'Session', 'Token', 'JWT',
    '跨域', 'CORS',
    'RESTful', 'REST',
    'GraphQL',
    'gRPC',
    '负载均衡', '反向代理', 'Nginx',
    '网络安全',
    'XSS', 'CSRF', 'SQL注入', 'DDOS',
    'CSP', 'CORS',
    '请求方法', 'GET', 'POST', 'PUT', 'DELETE',
    '状态码', '200', '301', '302', '304', '400', '401', '403', '404', '500', '502', '503',
    'HTTP版本',
    'OSI', 'TCP/IP', '七层', '四层',
    'IP', 'MAC', 'ARP',
    '长连接', '短连接', 'keep-alive', 'Keep-Alive',
    '管线化', '队头阻塞',
  ],
  node: [
    '事件循环', 'Event Loop', 'libuv',
    '异步', '回调',
    'Stream', '流',
    'Buffer',
    '文件系统', 'fs',
    'Path', '路径',
    'process',
    'cluster', 'cluster模式',
    'child_process', '子进程',
    'worker_threads', 'worker',
    '中间件',
    'Express', 'Koa', 'Nest', 'NestJS', 'Egg',
    'npm', '模块机制', 'require', 'exports', 'module.exports',
    'EventEmitter',
    '错误处理', '异常捕获',
    '调试', '性能',
    'package.json', '包管理',
    'CommonJS', 'ESM',
  ],
  go: [
    'goroutine', '协程',
    'channel', 'chan',
    'select',
    'defer',
    'panic', 'recover',
    'slice', '切片',
    'map',
    'array', '数组',
    'struct', '结构体',
    'interface', '接口',
    '反射', 'reflect',
    '指针', '指针',
    'new', 'make',
    'GC', '垃圾回收',
    'GMP', '调度', '调度器',
    'context', '上下文',
    'sync', '同步',
    'Mutex', 'RWMutex', '读写锁',
    'WaitGroup',
    'Once',
    'atomic', '原子',
    '闭包',
    '逃逸分析',
    '内存管理', '内存分配',
    '测试', 'benchmark', 'testing',
    'pprof',
    'Go Module', 'module',
    '泛型', 'generic',
    'error', 'error group',
    'string', '字符串',
    'for range',
    '包', 'package', 'import',
    '并发', '并行',
  ],
  'ai-llm': [
    '大模型', 'LLM', '语言模型',
    'Transformer',
    'Attention', '注意力', '自注意力', 'Self-Attention',
    'GPT', 'ChatGPT',
    'RLHF',
    'SFT', '微调', 'Fine-tuning', 'fine.tune',
    'LoRA', 'QLoRA',
    'Prompt', '提示',
    'Token', '分词', 'tokenizer',
    '量化', '蒸馏',
    '部署', '推理',
    'RAG',
    'Agent',
    'Embedding', '嵌入',
    '位置编码', 'RoPE', 'ALiBi',
    'KV Cache',
    'MoE', '专家混合',
    '多模态',
    'Function Calling', 'Tool Use', '工具调用',
    'Temperature', 'Top.k', 'Top.p',
    'beam search', '采样',
    '上下文窗口', 'Context Window',
    'DPO',
    '奖励模型',
    'Prompt Engineering', 'Chain.of.Thought', 'COT',
    'few-shot', 'zero-shot', 'in-context',
    '训练', '预训练', '后训练',
    'Scaling Law',
    '推理模型', 'o1', 'o3', 'deepseek',
  ],
  compare: [
    '区别', '对比', '差异', '优缺点', '选型', 'vs',
    '比较', '异同', '不同', '优势', '劣势',
    '场景', '适用', '选择',
  ],
  'ai-agent': [
    'Agent', '智能体',
    'Tool', '工具',
    'Planning', '规划',
    'ReAct',
    'Memory', '记忆',
    '反思', 'Reflection',
    'Multi.Agent', '多智能体',
    'Orchestration', '编排',
    'Workflow', '工作流',
    '任务分解', 'Task Decomposition',
    '工具调用', 'Function Calling',
    '记忆机制',
    '推理模式',
    'MCP', '模型上下文协议',
    'A2A', 'Agent通信',
  ],
  'ai-rag': [
    'RAG', '检索增强',
    '检索', '召回',
    'Embedding', '向量化',
    'Chunk', '分块', '文档分割',
    '向量数据库',
    '重排序', 'Re-rank',
    'Hybrid', '混合检索',
    'Query Expansion', '查询扩展',
    '检索增强生成',
  ],
}

// ── 中频关键词（50-80% 面试常考） ──
const MID_KEYWORDS = {
  html: [
    'table', 'iframe', 'form', 'input', 'input类型',
    'canvas', 'drag', 'SVG', 'MathML', 'picture', 'source',
    '模板', 'template标签', 'details', 'dialog',
    'contenteditable', 'spellcheck',
    '微数据', 'microdata', 'RDFa',
    'manifest', '应用缓存', 'Web SQL',
  ],
  css: [
    'writing-mode', 'object-fit', 'object-position', 'aspect-ratio',
    'container', 'container query', 'contain',
    '样式隔离', 'scoped', 'CSS Module', 'CSS-in-JS',
    'will-change', 'contain', 'content-visibility',
    '渐变', 'gradient', 'linear-gradient', 'radial-gradient',
    '滤镜', 'filter', 'backdrop-filter',
    '遮罩', 'mask', 'clip-path',
    '自定义字体', '@font-face', 'font-display',
    '多列', 'column', 'column-count',
    '滚动', 'scroll-behavior', 'scroll-snap',
    '颜色', 'color', 'hsl', 'rgb', 'rgba', 'currentColor',
    'focus-within', 'has选择器', ':has',
  ],
  'js-core': [
    'BigInt', 'BigInt64Array',
    'parseInt', 'parseFloat', 'isNaN', 'isFinite',
    '编码', 'decodeURI', 'encodeURI', 'atob', 'btoa', 'base64',
    '尾调用', '尾递归', 'TCO',
    'with', 'eval',
    '严格模式', 'use strict',
    'Optional Chaining', '可选链', '?.', '??', '空值合并',
    '解构', '析构', '扩展运算符', 'rest',
    '可选链', '空值合并',
    '模板字符串', '模板字面量',
    'Set', '集合',
    'Intl', '国际化',
    'Atomics', 'SharedArrayBuffer',
    '队列', 'microtask', 'macrotask',
  ],
  'js-api': [
    'Geolocation', '地理位置',
    'Fullscreen', '全屏',
    'Screen Orientation', '屏幕方向',
    'Network Information', '网络信息',
    'Battery', '电池',
    'Vibration', '震动',
    'Payment', '支付',
    'WebRTC', '实时通信',
    'Web Audio', '音频',
    'WebGL', 'WebGPU', '3D',
    'IndexedDB', '数据库',
    'Cache API',
    'Navigation', '导航',
    'Storage', '存储配额',
    'Sensor', '传感器',
    'Speech', '语音', '语音识别',
  ],
  vue3: [
    '动态组件', 'component组件',
    '异步组件', 'defineAsyncComponent',
    'Transition', 'TransitionGroup', '过渡', '动画',
    '自定义指令',
    '插件', 'plugin',
    '渲染函数', 'h函数', 'h\\(', 'JSX.*Vue',
    'hydration', '水合',
    'TypeScript.*Vue',
    'Vue DevTools',
    '环境变量', 'VITE_',
    '全局', 'app.config', 'globalProperties',
    '错误处理', 'errorHandler', 'warnHandler',
    '自定义元素', 'Custom Element', 'CE',
  ],
  react: [
    'StrictMode',
    'flushSync',
    'forwardRef',
    'createPortal',
    'reconciliation', '协调',
    'LayoutEffect', 'useLayoutEffect',
    'DebugValue', 'useDebugValue',
    'Id', 'useId',
    'InsertionEffect', 'useInsertionEffect',
    'Profiler',
    'Children', 'React.Children',
    'cloneElement', 'createElement',
    'PropTypes',
    'React Router v6', 'createBrowserRouter',
    'React Query', 'TanStack Query', 'SWR',
    'React Hook Form', 'Formik',
    'Next.js', 'Remix',
    'SSR', '服务端渲染',
    'hydration', '水合',
  ],
  angular: [
    'Dynamic Component', '动态组件',
    '@Injectable', 'providedIn',
    'forRoot', 'forChild',
    'APP_INITIALIZER',
    'Renderer2',
    'ElementRef',
    'TemplateRef',
    'ViewContainerRef',
    'sanitize', 'DomSanitizer', '安全',
    '自定义管道',
    '自定义指令',
    '@HostBinding', '@HostListener',
    '@ViewChildren', '@ContentChildren',
    '@Output', '@Input',
    'ElementRef', '安全',
    'i18n', '国际化',
    'Service Worker',
    'Angular Universal',
    'Angular Material', 'CDK',
    'NgRx', '状态管理', 'Store',
    'Flex Layout',
  ],
  network: [
    'WebRTC',
    'SSE', 'EventSource',
    'QUIC',
    'SPDY',
    'HTTP/1.0', 'HTTP/1.1',
    'Keep-Alive',
    '长连接',
    '管线化',
    '分块传输', 'chunked',
    '内容协商', 'Accept',
    '缓存策略',
    '代理', '正向代理',
    'WebDAV',
    'RESTful规范',
    'gRPC', 'protobuf',
  ],
  'ai-llm': [
    'Embedding模型', 'bge', 'text2vec',
    '分词器', 'BPE', 'WordPiece', 'SentencePiece',
    '位置编码', '相对位置编码', 'ALiBi',
    'MoE', '混合专家',
    'Pipeline', '流水线',
    '模型评估', 'Benchmark', 'MMLU', 'HumanEval',
    '幻觉', 'Hallucination',
    '越狱', 'Jailbreak',
    '安全', 'Alignment', '对齐',
    '智能体', 'Agent',
  ],
  'ai-agent': [
    'Tool Use', '工具使用',
    'Planning', '规划算法',
    'ReAct模式',
    'Orchestration', '编排框架',
    'Memory', '记忆类型',
    'Agent通信', 'A2A',
    'CrewAI', 'AutoGPT', 'LangGraph',
    'Human-in-the-loop',
    'Agent安全',
  ],
  'ai-rag': [
    'Hybrid Search', '混合检索',
    '稀疏检索', '稠密检索',
    'BM25', 'TF-IDF',
    'Query Expansion', '查询扩展',
    'HyDE',
    'Self-RAG', 'Corrective RAG',
    'Graph RAG',
    'Multi-hop RAG',
    'Chunk策略', '分块策略',
  ],
  'ai-basic': [
    'Agent',
    '架构', '组件',
    'Workflow', '工作流',
    'Tool', 'Tools',
    'ReAct', 'Plan.*Execute',
    'Reflection', '反思',
    '推理模式',
    '任务拆分',
    '记忆', '记忆机制',
    'LLM', '大模型',
    '工具', '调用',
    '流程', '编排',
    'API', '接口',
    'SDK',
  ],
  'ai-compare': [
    '对比', '选型', '区别', 'vs',
    '代际', '比较',
    'Hybrid Search', '混合检索',
    'Embedding', '重排序',
    'Query Expansion',
    '图像理解', '语音交互',
    '框架',
    '模型', '模型选择',
  ],
  compare: [
    '优缺点', '差异', '选型',
    '生态', '学习曲线', '数据流',
    '状态管理',
    '微前端',
    'Monorepo',
    '构建工具',
    '测试',
    '权限',
    '国际化', 'i18n',
    'SSR', 'SSG', 'CSR',
    '性能', '体积', '运行效率',
  ],
  perf: [
    '构建优化', '分包', '资源加载', '关键路径',
    '关键CSS', '内联CSS',
    '字体优化', 'font-display',
    '图片懒加载', 'loading=lazy',
    '视频优化',
    '优化工具', 'Lighthouse',
    'TTFB', '首字节',
    'SI', 'Speed Index',
  ],
  monitor: [
    '埋点', '监控',
    'Sentry',
    '错误', '错误监控',
    '性能监控',
    '日志', '日志上报',
    '告警', '报警',
    'APM',
    '异常',
    '上报',
    'Source Map', 'sourcemap',
    '前端监控', '监控体系',
    'RUM', '真实用户监控',
    '链路追踪', 'tracing',
  ],
  node: [
    'Express', 'Koa', 'Nest', 'NestJS',
    '中间件', 'middleware',
    'Stream', '流',
    'Event Loop',
    'npm', '包管理',
    'Node.js版本',
    '加密', 'crypto',
    '网络', 'net', 'http',
    'OS', '操作系统',
    '压缩', 'zlib',
    'readline',
    'util', 'promisify',
    'path', 'url', 'querystring',
  ],
  reverse: [
    '提问', '团队', '技术栈', '代码', '流程',
    '项目管理', '自我介绍', '离职', '职业规划',
    '优点', '缺点', '薪资', '加班', '文化', '福利',
    '架构', '性能', '质量', '测试', '部署', '发布',
    '沟通', '协作', '远程',
    '晋升', '考核', '培训', '文档',
    '代码审查', 'Code Review',
    'OKR', 'KPI',
    '开源', '社区',
  ],
  lioam: [
    '网元', '运维', 'OAM', '网管', '管理',
    '配置', '配置管理',
    '告警', '告警管理',
    '性能管理',
    '拓扑', '拓扑管理',
    '网管系统',
    'NE', '网元管理',
    'EMS', 'NMS',
    'SNMP',
    '5G', '核心网',
  ],
  'ai-fw': [
    'LangChain', 'LangGraph',
    'LlamaIndex',
    'AutoGPT',
    'CrewAI',
    '框架', '编排',
    'pipeline', '流水线',
    '链式', 'chain',
    'Dify', 'FastGPT',
  ],
  'ai-edge': [
    '端侧', '端侧推理',
    'ONNX', 'ONNX Runtime',
    'TensorRT',
    '量化', 'INT8', 'INT4',
    '边缘', '边缘计算',
    '移动端',
    'TFLite',
    'WebGPU', 'WebNN',
    'Transformers.js',
    'KV Cache',
    '内存', '内存优化',
    '延迟', '推理延迟',
    '模型压缩',
    '端侧部署',
  ],
  'ai-prod': [
    '上线', '发布',
    '部署', '部署方案',
    '监控', '监控告警',
    'A/B', 'A/B测试',
    '评估', '评测',
    'MLOps',
    '测试',
    'CI/CD',
    '回滚',
    '灰度', '灰度发布',
    '压测', '压力测试',
    'AB测试',
    '成本', 'Token成本',
    '安全防护',
    '限流', '熔断',
    '高并发', '并发',
    '容错',
    '生产级', '生产环境',
    'K8s', '容器化',
  ],
  'ai-eco': [
    '生态', '趋势',
    '多模态', 'multimodal',
    'GenAI', 'AIGC',
    '视频生成', 'Sora',
    'AI搜索',
    'MCP', '模型上下文协议',
    'A2A', 'Agent-to-Agent',
    '协议', 'Agent通信',
    '开源模型', '闭源模型',
  ],
  'ai-tool': [
    'OpenAI', 'ChatGPT',
    'Claude', 'Anthropic',
    'Gemini', 'Google',
    'API', 'SDK',
    '工具链',
    '调用',
    '兼容',
    'SDK对比',
    'Function Calling',
    'Doce',
  ],
  'ai-proj': [
    '实战', '落地',
    '案例',
    '效果',
    '架构设计',
    '系统设计',
    '实现', '开发',
    '项目',
    '踩坑',
    '优化',
    '方案',
    '成本',
    'Token消耗',
    '安全防护',
    '监控告警',
    '并发',
    '高并发',
    '容错',
    '生产级', '生产环境',
    '技术选型',
  ],
  'ai-trend': [
    '前沿', '趋势',
    '2025', '2026',
    '未来',
    'AGI',
    '具身智能',
    'Scaling Law',
    '世界模型',
    '推理模型',
    'o1', 'o3',
    '深度思考',
    '多模态',
  ],
  'ai-arch': [
    '架构', '设计',
    '模块', '模块化',
    '扩展', '可扩展',
    '高可用',
    '调试',
    '测试',
    '评估',
    '部署',
    '性能', '优化',
    '缓存',
    '限流',
    '降级',
    '容错',
    '系统设计',
    '技术选型',
    '最佳实践',
  ],
  'ai-chat': [
    '聊天', '对话',
    '角色', '角色扮演',
    '记忆', '会话记忆',
    '上下文',
    'Session',
    'API调用',
    '流式', 'stream',
    '组件', 'UI',
    '消息', 'message',
    '对话管理',
  ],
}

// ── 辅助函数 ──

function hasMarker(text) {
  return /（必考）|（高频）|必考题|高频题/u.test(text)
}

function extractStarRating(text) {
  const m = text.match(/(?:面试星级|难度星级)[：:]\s*(★+)/u)
  if (!m) return 0
  return m[1].length
}

// 根据问答长度估算深度（短答案 = 简单概念，长答案 = 深度分析 → 更可能高频）
function estimateDepth(text, answer) {
  const combined = text + '\n' + answer
  // 答案长度
  const ansLen = (answer || '').length
  // 包含代码比例
  const codeRatio = (combined.match(/```/g) || []).length / Math.max(1, combined.length)
  return { ansLen, codeRatio }
}

function assignFrequency(question, catId) {
  const text = question.question
  const answer = question.answer || ''
  const fullText = text + '\n' + answer

  // 1. 显式标记 → high
  if (hasMarker(text)) {
    question.freq = 'high'
    return
  }

  // 2. 面试星级 → high/mid
  const stars = extractStarRating(fullText)
  if (stars >= 4) {
    question.freq = 'high'
    return
  }
  if (stars === 3) {
    question.freq = 'mid'
    return
  }

  // 3. 学习指南类 → low
  const guideCats = ['vue3-l', 'react-l', 'ng-l']
  if (guideCats.includes(catId)) {
    question.freq = 'low'
    return
  }

  const catHigh = HIGH_KEYWORDS[catId] || []
  const catMid = MID_KEYWORDS[catId] || []

  // 转义正则特殊字符
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // 4. 在题目+答案中匹配高频关键词
  let score = 0
  let highMatched = false
  let midMatched = false

  let titleHigh = false
  let titleMid = false
  let anyHigh = false
  let anyMid = false

  // 题目中的高频词：+2（强信号）
  for (const kw of catHigh) {
    if (new RegExp(esc(kw), 'iu').test(text)) { score += 2; titleHigh = true; anyHigh = true }
  }
  // 答案中的高频词：+1（弱信号）
  for (const kw of catHigh) {
    if (new RegExp(esc(kw), 'iu').test(answer)) { score += 1; anyHigh = true }
  }
  // 题目中的中频词：+1
  for (const kw of catMid) {
    if (new RegExp(esc(kw), 'iu').test(text)) { score += 1; titleMid = true; anyMid = true }
  }
  // 答案中的中频词：+0.5
  for (const kw of catMid) {
    if (new RegExp(esc(kw), 'iu').test(answer)) { score += 0.5; anyMid = true }
  }

  // 5. 题目命中高频词 + 总分 ≥ 2 → high
  if (titleHigh && score >= 2) {
    question.freq = 'high'
    return
  }

  // 6. 题目命中中频词 → mid
  if (titleMid) {
    question.freq = 'mid'
    return
  }

  // 7. 答案命中高频词 → mid（相关但非直接考点）
  if (anyHigh) {
    question.freq = 'mid'
    return
  }

  // 8. 答案命中中频词 + 总分 ≥ 1 → mid
  if (anyMid && score >= 1) {
    question.freq = 'mid'
    return
  }

  // 9. 算法题按难度
  if (catId === 'algo') {
    if (/简单|🟢/u.test(text)) { question.freq = 'low'; return }
    if (/中等|🟡/u.test(text)) { question.freq = 'mid'; return }
    if (/困难|🔴/u.test(text)) { question.freq = 'low'; return }
  }

  // 10. 保留已有的频率（如 source 中提取的）
  if (question.freq) return

  // 11. 默认分配
  const { ansLen } = estimateDepth(text, answer)

  // 短答案(<200字) → low；中长度(200-500) → mid；长答案(>500) → high
  if (ansLen > 500) {
    question.freq = 'high'
  } else if (ansLen > 200) {
    question.freq = 'mid'
  } else {
    question.freq = 'low'
  }
}

// ── 执行 ──
for (const q of data.questions) {
  assignFrequency(q, q.category)
}

writeFileSync(join(root, 'quiz-data.json'), JSON.stringify(data, null, 2), 'utf-8')

// ── 统计 ──
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
console.log(`\n高频占比: ${(data.questions.filter(q=>q.freq==='high').length / data.questions.length * 100).toFixed(1)}%`)
console.log(`常考占比: ${(data.questions.filter(q=>q.freq==='mid').length / data.questions.length * 100).toFixed(1)}%`)
console.log(`低频占比: ${(data.questions.filter(q=>q.freq==='low').length / data.questions.length * 100).toFixed(1)}%`)
