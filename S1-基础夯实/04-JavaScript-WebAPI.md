# 🌐 JavaScript 浏览器 Web API & 手写实现

> 🎯 **面试星级**：★★★★★ | **建议用时**：2 天
> 浏览器 Web API、20+ 手写代码实现、经典代码输出题
> 📌 本文件是 [`03-JavaScript-核心.md`](./03-JavaScript-核心.md) 的姊妹篇，请先掌握核心语言基础后再学习本篇

---

## 📈 浏览器 Web API 演进史

> 浏览器 API 的丰富程度，直接反映了 Web 从"文档平台"到"操作系统级平台"的跨越。

### Web API 发展代际

```
DOM 0-1 时代（1995-2000）
  ├─ document.getElementById / window.alert
  ├─ XMLHttpRequest（1999，改变世界）
  └─ 基础事件处理

HTML5 API 爆发（2008-2014）
  ├─ Web Storage / IndexedDB（本地存储）
  ├─ Web Worker / WebSocket（多线程 + 实时）
  ├─ Canvas / SVG / Audio/Video（多媒体）
  ├─ Geolocation / Drag & Drop（设备能力）
  └─ History API / requestAnimationFrame（SPA 基础）

现代 API 成熟（2015-2020）
  ├─ fetch / Service Worker / Cache API（PWA）
  ├─ IntersectionObserver / ResizeObserver（高效感知）
  ├─ WebRTC / Web Bluetooth / Web USB（设备通信）
  ├─ Clipboard / File System Access（生产力）
  └─ Performance API / Network Information（监控）

前沿 API 爆发（2021-2026）
  ├─ WebGPU / WebNN / WebAssembly（AI + 高性能）
  ├─ View Transitions / Navigation API（应用体验）
  ├─ Screen Wake Lock / Window Management（设备集成）
  ├─ AbortController / Compression Streams（控制流）
  └─ File System / Web Locks / BroadcastChannel（平台级）
```

---

## 📌 知识脑图

```mermaid
mindmap
  root((浏览器 API & 手写))
    浏览器 Web API
      IntersectionObserver
      MutationObserver
      ResizeObserver
      PerformanceObserver
      Geolocation
      Notification
      Clipboard API
      File System Access
      Web Storage
      Web Worker
      Service Worker
      Screen Wake Lock
      BroadcastChannel
      Navigation API
      AbortController
      fetch/XMLHttpRequest
    手写实现
      防抖/节流
      深拷贝
      柯里化
      Promise 系列
      发布订阅
      Lazy Man
      数组去重/扁平
    JS 基础
      继承
      new/bind/call/apply
      instanceof
      Array 方法
      类型判断
    代码输出题
      Promise 顺序
      async/await
      this 指向
      作用域
      类型转换
```

---


## 🌐 浏览器 Web API

### 1️⃣ IntersectionObserver

#### 概念和作用

`IntersectionObserver` 提供了一种异步观察目标元素与祖先元素或视口（viewport）交叉状态的方法。用于检测元素是否可见。

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('元素进入视口:', entry.target)
    }
  })
})

const target = document.querySelector('.lazy-image')
observer.observe(target)

// 停止观察
// observer.unobserve(target)
// observer.disconnect()
```

#### 配置项

```javascript
const observer = new IntersectionObserver(callback, {
  // 目标与视口交叉比例，0~1 或数组 [0, 0.5, 1]
  threshold: 0.5,

  // 视口偏移量，类似 CSS margin（可正可负，负值提前触发）
  rootMargin: '10px 20px 30px 40px',

  // 指定父级元素作为视口（默认使用浏览器视口）
  root: document.querySelector('.scroll-container'),
})

// ⚠️ 注意事项：
// 1. 不存在 'delay' 配置项——若需节流请自行用 setTimeout 包裹回调
// 2. 'trackVisibility' 仍为实验性 API，仅在部分浏览器（Chrome 86+ 需 flag）支持
// 3. 'threshold' 数组形式：[0, 0.5, 1] 表示元素可见比例穿过 0%/50%/100% 时各触发一次
```

#### 实战: 图片懒加载

```javascript
const lazyImages = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    const img = entry.target
    img.src = img.dataset.src
    img.onload = () => {
      img.classList.add('loaded')
    }
    img.removeAttribute('data-src')
    observer.unobserve(img)
  })
}, {
  rootMargin: '100px',  // 提前100px加载
  threshold: 0.01
})

lazyImages.forEach(img => imageObserver.observe(img))
```

#### 实战: 无限滚动

```javascript
const sentinel = document.querySelector('#scroll-sentinel')

const scrollObserver = new IntersectionObserver(async (entries) => {
  const entry = entries[0]
  if (entry.isIntersecting && !isLoading) {
    isLoading = true
    try {
      const newData = await fetchMoreData()
      appendData(newData)
    } finally {
      isLoading = false
    }
  }
}, {
  rootMargin: '200px'
})

scrollObserver.observe(sentinel)
```

#### 实战: 曝光埋点

```javascript
class ExposureTracker {
  constructor(options = {}) {
    this.reported = new WeakSet()
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.reported.has(entry.target)) {
          this.reported.add(entry.target)
          const eventData = entry.target.dataset.track
          this.report(eventData)
        }
      })
    }, {
      threshold: options.threshold ?? 0.5
    })
  }

  observe(element) {
    this.observer.observe(element)
  }

  report(data) {
    // 发送埋点请求
    navigator.sendBeacon('/api/track', JSON.stringify({
      element: data,
      timestamp: Date.now()
    }))
  }

  destroy() {
    this.observer.disconnect()
  }
}

// 使用
const tracker = new ExposureTracker({ threshold: 0.3 })
document.querySelectorAll('[data-track]').forEach(el => tracker.observe(el))
```

```mermaid
graph TD
    A["创建 IntersectionObserver"] --> B["调用 observe(target)"]
    B --> C{"目标与视口交叉?"}
    C -->|"是"| D["触发回调"]
    C -->|"否"| E["等待下一次滚动"]
    D --> F{"intersectionRatio >= threshold?"}
    F -->|"是"| G["执行操作<br/>加载图片/加载更多/上报曝光"]
    F -->|"否"| E
    G --> H["unobserve(target)"]
    H --> I["结束观察"]
```

### 2️⃣ ResizeObserver

#### 监听元素尺寸变化

`ResizeObserver` 用于监听元素的尺寸变化，提供元素内容盒（content-box）、边框盒（border-box）的精确尺寸。

```javascript
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentBoxSize[0]
    console.log(`${entry.target.id}: ${width} x ${height}`)
  })
})

const element = document.querySelector('.resizable')
observer.observe(element)

// 观察边框盒
observer.observe(element, { box: 'border-box' })
```

#### 与 window.resize 的区别

```javascript
// window.resize 只能监听窗口变化
window.addEventListener('resize', () => {
  console.log('窗口大小变化')
})

// ResizeObserver 可以监听任意元素
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    // 元素尺寸变化（包括由内部内容变化引起的）
    console.log(`元素 ${entry.target.id} 尺寸变化:`, entry.contentRect)
  })
})

// 适用场景
const sidebar = document.querySelector('#sidebar')
const chartContainer = document.querySelector('#chart')
const textarea = document.querySelector('#auto-resize')

resizeObserver.observe(sidebar)
resizeObserver.observe(chartContainer)
resizeObserver.observe(textarea)
```

| 对比项 | window.resize | ResizeObserver |
|--------|--------------|----------------|
| 监听对象 | 仅 window | 任意元素 |
| 触发时机 | 窗口大小改变 | 元素内容/边框盒改变 |
| 性能 | 高频触发，可能卡顿 | 批量处理，性能更好 |
| 精确度 | 仅获取窗口尺寸 | 获取 contentBox/borderBox/devicePixelContentBox |
| 触发原因 | 仅用户调整窗口 | 元素尺寸变化（含 JS 修改、子元素变化等） |

#### 实战: 自适应组件

```javascript
class ResponsiveComponent {
  constructor(element) {
    this.element = element
    this.observer = new ResizeObserver(this.handleResize.bind(this))
    this.observer.observe(element)
  }

  handleResize(entries) {
    const entry = entries[0]
    const { width, height } = entry.contentRect

    // 根据宽度切换布局
    if (width > 800) {
      this.element.classList.add('layout-wide')
      this.element.classList.remove('layout-narrow')
    } else if (width > 400) {
      this.element.classList.add('layout-medium')
      this.element.classList.remove('layout-wide', 'layout-narrow')
    } else {
      this.element.classList.add('layout-narrow')
      this.element.classList.remove('layout-wide', 'layout-medium')
    }

    // 更新图表或画布
    if (this.chart) {
      this.chart.resize({ width, height })
    }
  }

  destroy() {
    this.observer.disconnect()
  }
}

// 使用
const chartWidget = new ResponsiveComponent(document.querySelector('#chart-widget'))
```

### 3️⃣ MutationObserver

#### 监听 DOM 变化

`MutationObserver` 用于监听 DOM 树的变更事件，包括节点增删、属性变化、文本内容变化等。

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('变更类型:', mutation.type)
    console.log('目标节点:', mutation.target)

    if (mutation.type === 'childList') {
      console.log('新增节点:', mutation.addedNodes)
      console.log('移除节点:', mutation.removedNodes)
    }

    if (mutation.type === 'attributes') {
      console.log('属性名:', mutation.attributeName)
      console.log('旧值:', mutation.oldValue)
    }

    if (mutation.type === 'characterData') {
      console.log('文本变化:', mutation.oldValue, '→', mutation.target.textContent)
    }
  })
})
```

#### 配置项

```javascript
const targetNode = document.querySelector('#observable-area')

observer.observe(targetNode, {
  // 监听子节点增删
  childList: true,

  // 监听属性变化
  attributes: true,

  // 监听文本变化
  characterData: true,

  // 是否监听所有后代节点
  subtree: true,

  // 是否记录属性旧值
  attributeOldValue: true,

  // 是否记录文本旧值
  characterDataOldValue: true,

  // 监听的特定属性列表（默认监听所有，不支持通配符）
  attributeFilter: ['class', 'style']
})
```

#### 实战: 监听子元素变化

```javascript
// 动态列表监控
class DynamicListMonitor {
  constructor(listElement, options = {}) {
    this.list = listElement
    this.onItemAdd = options.onItemAdd || (() => {})
    this.onItemRemove = options.onItemRemove || (() => {})

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {  // 元素节点
            this.onItemAdd(node)
          }
        })
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === 1) {
            this.onItemRemove(node)
          }
        })
      })
    })

    this.observer.observe(listElement, {
      childList: true,
      subtree: false
    })
  }

  destroy() {
    this.observer.disconnect()
  }
}

// 使用: 监控聊天消息列表
const chatMonitor = new DynamicListMonitor(
  document.querySelector('#chat-messages'),
  {
    onItemAdd: (node) => {
      console.log('新消息:', node.textContent)
      node.classList.add('message-enter')
      // 自动滚动到底部
      node.parentElement.scrollTop = node.parentElement.scrollHeight
    },
    onItemRemove: (node) => {
      console.log('消息被移除:', node.id)
    }
  }
)
```

### 4️⃣ AbortController

#### 中止请求

`AbortController` 提供一个 `signal` 属性和 `abort()` 方法，用于中止正在进行 DOM 操作或网络请求。

```javascript
const controller = new AbortController()
const signal = controller.signal

// 监听中止事件
signal.addEventListener('abort', () => {
  console.log('请求已中止:', signal.aborted ? '是' : '否')
  console.log('中止原因:', signal.reason)
})

// 发起可中止的请求
fetch('/api/large-data', { signal })
  .then(response => response.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('请求被用户取消')
    } else {
      console.error('其他错误:', err)
    }
  })

// 在超时或其他条件下中止请求
setTimeout(() => controller.abort('用户取消了请求'), 5000)
```

#### 与 fetch 配合

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort('请求超时'), timeout)

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timeoutId))
}

// 使用
try {
  const response = await fetchWithTimeout('https://api.example.com/data', 3000)
  const data = await response.json()
  console.log(data)
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('请求超时或被取消')
  }
}
```

#### 实战: 取消重复请求

```javascript
class RequestManager {
  constructor() {
    this.pendingRequests = new Map()
  }

  async request(url, options = {}) {
    // 如果已有相同 url 的请求，取消旧的
    if (this.pendingRequests.has(url)) {
      const oldController = this.pendingRequests.get(url)
      oldController.abort('请求被新的请求替代')
      this.pendingRequests.delete(url)
    }

    const controller = new AbortController()
    this.pendingRequests.set(url, controller)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      return await response.json()
    } finally {
      this.pendingRequests.delete(url)
    }
  }

  cancelAll(reason = '页面离开') {
    this.pendingRequests.forEach(controller => {
      controller.abort(reason)
    })
    this.pendingRequests.clear()
  }
}

// 搜索防抖 + 取消旧请求
const requestManager = new RequestManager()
const searchInput = document.querySelector('#search')

let debounceTimer
searchInput.addEventListener('input', (event) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    requestManager.request(`/api/search?q=${event.target.value}`)
  }, 300)
})
```

### 5️⃣ PerformanceObserver

#### 性能指标监控

`PerformanceObserver` 用于监测性能度量事件，获取页面性能数据。

```javascript
// 基本用法
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.duration}ms`)
  })
})

// 观察特定类型的性能条目
observer.observe({ entryTypes: ['resource', 'navigation', 'paint', 'largest-contentful-paint'] })
```

#### LCP/FID/CLS 监控

```javascript
// LCP - Largest Contentful Paint (最大内容绘制)
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const lastEntry = entries[entries.length - 1]
  console.log('LCP:', lastEntry.startTime, 'ms')
  console.log('LCP元素:', lastEntry.element)
})
lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

// FID - First Input Delay (首次输入延迟)
const fidObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('FID:', entry.processingStart - entry.startTime, 'ms')
    console.log('交互类型:', entry.name)
  })
})
fidObserver.observe({ type: 'first-input', buffered: true })

// CLS - Cumulative Layout Shift (累计布局偏移)
let clsValue = 0
let clsEntries = []
const clsObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) {
      clsValue += entry.value
      clsEntries.push(entry)
      console.log('CLS值:', clsValue, '来源:', entry.sources)
    }
  })
})
clsObserver.observe({ type: 'layout-shift', buffered: true })
```

#### 实战: 性能埋点

```javascript
class PerformanceMonitor {
  constructor(reportUrl) {
    this.reportUrl = reportUrl
    this.metrics = {}
    this.initObservers()
  }

  initObservers() {
    // 页面导航性能
    const navObserver = new PerformanceObserver((list) => {
      const [entry] = list.getEntries()
      this.metrics.navigation = {
        dns: entry.domainLookupEnd - entry.domainLookupStart,
        tcp: entry.connectEnd - entry.connectStart,
        ttfb: entry.responseStart - entry.requestStart,
        domReady: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
        loadTime: entry.loadEventEnd - entry.loadEventStart
      }
    })
    navObserver.observe({ type: 'navigation', buffered: true })

    // 资源加载
    const resObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.initiatorType === 'script' || entry.initiatorType === 'link' ||
            entry.initiatorType === 'img') {
          this.metrics.resources ||= {}
          this.metrics.resources[entry.name] = entry.duration
        }
      })
    })
    resObserver.observe({ type: 'resource', buffered: true })

    // Web Vitals
    const vitalsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          this.metrics.LCP = entry.startTime
        }
        if (entry.entryType === 'first-input') {
          this.metrics.FID = entry.processingStart - entry.startTime
        }
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          this.metrics.CLS = (this.metrics.CLS || 0) + entry.value
        }
      })
    })
    vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'], buffered: true })
  }

  report() {
    // 页面关闭前上报
    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.reportUrl, JSON.stringify(this.metrics))
    }
  }
}

// 使用
const monitor = new PerformanceMonitor('/api/perf-report')
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    monitor.report()
  }
})
```

### 6️⃣ BroadcastChannel

#### 跨标签页通信

`BroadcastChannel` 允许同源的不同浏览上下文（标签页、iframe、Worker）之间进行消息通信。

```javascript
// 页面 A - 发送消息
const channelA = new BroadcastChannel('app_channel')
channelA.postMessage({ type: 'USER_LOGIN', data: { userId: 123, name: '张三' } })

// 页面 B - 接收消息
const channelB = new BroadcastChannel('app_channel')
channelB.onmessage = (event) => {
  console.log('收到消息:', event.data)
  // { type: 'USER_LOGIN', data: { userId: 123, name: '张三' } }
}

// 清理
// channelA.close()
// channelB.close()
```

#### 与 postMessage / localStorage 对比

```javascript
// 方案1: BroadcastChannel
const bc = new BroadcastChannel('channel')
bc.postMessage('hello')
bc.onmessage = (event) => console.log(event.data)
// 优点: 专门用于同源跨标签页通信，API 简洁
// 缺点: 仅支持同源

// 方案2: window.postMessage
// window.opener.postMessage('hello', '*')
// window.addEventListener('message', (event) => console.log(event.data))
// 优点: 支持跨域
// 缺点: 需要获取窗口引用，安全性需注意 origin

// 方案3: localStorage
window.addEventListener('storage', (event) => {
  if (event.key === 'shared-data') {
    console.log('数据变化:', event.newValue)
  }
})
localStorage.setItem('shared-data', JSON.stringify({ msg: 'hello' }))
// 优点: 简单易用，不需要建立连接
// 缺点: 存储大小限制，存储事件不会在触发页面触发，会序列化
```

| 对比项 | BroadcastChannel | postMessage | localStorage |
|--------|-----------------|-------------|--------------|
| 通信范围 | 同源标签页/iframe/Worker | 任意窗口（可跨域） | 同源标签页 |
| API 复杂度 | 简单 | 中等 | 简单 |
| 数据格式 | 结构化克隆 | 结构化克隆 | 仅字符串 |
| 是否需要引用 | 不需要 | 需要窗口对象 | 不需要 |
| 事件接收 | 所有同源页面 | 指定窗口 | 除自身外的同源页面 |
| 安全性 | 同源限制 | 需验证 origin | 同源限制 |

```mermaid
graph TD
    subgraph "BroadcastChannel"
        T1A["标签页A<br/>channel.postMessage(data)"] --> CH["BroadcastChannel<br/>'app_channel'"]
        CH --> T1B["标签页B<br/>channel.onmessage"]
        CH --> T1C["标签页C<br/>channel.onmessage"]
        CH --> W1["Web Worker<br/>channel.onmessage"]
    end

    subgraph "postMessage"
        W2["window A"] -->|"postMessage"| W3["window B<br/>需获取B的引用"]
        W3 -->|"message事件"| W2
    end

    subgraph "localStorage"
        T2A["标签页A<br/>setItem(key, value)"] -->|"storage事件"| T2B["标签页B<br/>onstorage"]
        T2A -.-|"❌ 不会触发自身"| T2A
    end

    style CH fill:#e1f5fe
```

```javascript
// 实战: 跨标签页状态同步
class CrossTabState {
  constructor(channelName = 'app_state') {
    this.channel = new BroadcastChannel(channelName)
    this.listeners = new Map()

    this.channel.onmessage = (event) => {
      const { type, payload } = event.data
      const callbacks = this.listeners.get(type) || []
      callbacks.forEach(cb => cb(payload, event.origin))
    }
  }

  // 发送消息到所有同源页面
  broadcast(type, payload) {
    this.channel.postMessage({ type, payload })
  }

  // 监听特定消息类型
  on(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, [])
    }
    this.listeners.get(type).push(callback)
  }

  // 取消监听
  off(type, callback) {
    const callbacks = this.listeners.get(type)
    if (callbacks) {
      this.listeners.set(type, callbacks.filter(cb => cb !== callback))
    }
  }

  close() {
    this.channel.close()
    this.listeners.clear()
  }
}

// 使用: 用户登录状态同步
const stateSync = new CrossTabState('user_state')

// 页面 A: 用户登录
stateSync.broadcast('LOGIN', { userId: 1, name: '张三', token: 'xxx' })

// 页面 B: 监听登录事件
stateSync.on('LOGIN', (userData) => {
  console.log(`用户 ${userData.name} 在其他标签页登录了`)
  updateUI(userData)
})

// 页面 C: 监听登出事件
stateSync.on('LOGOUT', () => {
  console.log('用户已从其他标签页登出')
  redirectToLogin()
})
```

```mermaid
graph LR
    subgraph "同源页面"
        P1["标签页 A<br/>用户登录"]
        P2["标签页 B<br/>接收同步"]
        P3["标签页 C<br/>接收同步"]
    end

    P1 -->|"postMessage<br/>{type:'LOGIN', payload}"| BC["BroadcastChannel<br/>user_state"]
    BC --> P2
    BC --> P3

    P2 -->|"on(LOGIN)"| U1["更新 UI<br/>显示登录状态"]
    P3 -->|"on(LOGIN)"| U2["更新 UI<br/>同步登录"]
```

---

### 7️⃣ Navigation API

> 💡 **要点：** 新一代前端路由 API，取代 history.pushState/popstate，提供拦截导航、跨页面跳转、事件管理等完整能力

Navigation API 是浏览器原生的**导航管理** API，用于替代传统的 `history.pushState` + `popstate` 事件。

```javascript
const navigation = window.navigation;

// 监听所有导航
navigation.addEventListener('navigate', (event) => {
  console.log('导航到:', event.destination.url);
  console.log('导航类型:', event.navigateType); // push/replace/reload/traverse

  // 拦截导航（SPA 路由）
  if (shouldIntercept(event.destination.url)) {
    event.intercept({
      handler: async () => {
        const content = await loadContent(event.destination.url);
        document.getElementById('app').innerHTML = content;
      }
    });
  }
});

// 编程式导航
navigation.navigate('/about');
navigation.navigate('/settings', { state: { from: 'home' } });
navigation.reload();

// 前进/后退
navigation.back();
navigation.forward();
navigation.traverseTo(entry.key); // 跳转到特定历史条目

// 当前导航条目
console.log('当前条目:', navigation.currentEntry);
console.log('当前 URL:', navigation.currentEntry.url);
console.log('当前状态:', navigation.currentEntry.getState());
```

| 能力 | 传统 history API | Navigation API |
|------|-----------------|----------------|
| 导航拦截 | 无法直接拦截 | `navigate` 事件 + `intercept()` |
| SPA 路由 | 手动监听 popstate | 原生支持 intercept |
| 导航类型判断 | 无 | `navigateType`: push/replace/reload/traverse |
| 历史条目管理 | 有限的栈操作 | `navigation.entries()` 遍历全部历史 |
| 导航完成通知 | 无 | `navigation.navigatesuccess` / `navigatenerror` |

```javascript
// 导航事件
navigation.addEventListener('navigatesuccess', () => {
  console.log('导航成功完成');
});

navigation.addEventListener('navigatenerror', (event) => {
  console.error('导航失败:', event.error);
});

// 导航中止
const abortController = new AbortController();
navigation.navigate('/slow-page', {
  signal: abortController.signal,
  history: 'replace',
  info: { transition: 'slide' }
});
```

### 8️⃣ File System Access API

> 💡 **要点：** 浏览器原生文件系统 API，允许网页读写本地文件和目录，实现真正的"浏览器 IDE"

```javascript
// 打开文件选择器（读取）
async function openFile() {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: 'Markdown 文件',
        accept: { 'text/markdown': ['.md'] }
      }
    ],
    multiple: false
  });

  const file = await fileHandle.getFile();
  const content = await file.text();
  return { content, fileHandle };
}

// 保存文件（写入）
async function saveFile(fileHandle, content) {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

// 新建文件保存
async function saveAs(content) {
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: 'untitled.txt',
    types: [
      {
        description: '文本文件',
        accept: { 'text/plain': ['.txt'] }
      }
    ]
  });

  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

// 选择目录（读取目录）
async function openDirectory() {
  const dirHandle = await window.showDirectoryPicker();

  async function listFiles(dirHandle, path = '') {
    const result = [];
    for await (const [name, handle] of dirHandle.entries()) {
      const fullPath = `${path}/${name}`;
      if (handle.kind === 'file') {
        const file = await handle.getFile();
        result.push({ name, path: fullPath, size: file.size });
      } else if (handle.kind === 'directory') {
        result.push(...await listFiles(handle, fullPath));
      }
    }
    return result;
  }

  return await listFiles(dirHandle);
}
```

| API | 说明 | 权限 |
|-----|------|------|
| `showOpenFilePicker()` | 打开文件选择器 | 用户手势触发 |
| `showSaveFilePicker()` | 保存文件对话框 | 用户手势触发 |
| `showDirectoryPicker()` | 选择目录 | 用户手势触发 |
| `FileSystemFileHandle` | 文件句柄 | 可持久化（IndexedDB） |
| `FileSystemDirectoryHandle` | 目录句柄 | 可持久化（IndexedDB） |

```javascript
// 保留文件句柄（IndexedDB 持久化）
const db = await openDB('file-store', 1);
await db.put('handles', fileHandle, 'last-opened');

// 恢复文件操作
const savedHandle = await db.get('handles', 'last-opened');
if (savedHandle) {
  const file = await savedHandle.getFile();
  console.log('恢复文件:', file.name);
  // 验证权限
  if (await savedHandle.queryPermission() !== 'granted') {
    await savedHandle.requestPermission();
  }
}
```

### 9️⃣ Screen Wake Lock API

> 💡 **要点：** 防止设备屏幕息屏/锁屏，适合阅读器、视频播放、演示等场景

```javascript
// 请求唤醒锁（保持屏幕亮起）
let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('屏幕唤醒锁已激活');

    // 监听释放事件（如用户切换标签页）
    wakeLock.addEventListener('release', () => {
      console.log('屏幕唤醒锁被释放');
    });
  } catch (err) {
    console.error('唤醒锁请求失败:', err.name, err.message);
  }
}

// 释放唤醒锁
function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

// 处理页面可见性变化（重新获取唤醒锁）
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    await requestWakeLock();
  }
});

// 使用场景：阅读器保持屏幕常亮
readerButton.addEventListener('click', async () => {
  if (wakeLock) {
    releaseWakeLock();
    readerButton.textContent = '自动息屏';
  } else {
    await requestWakeLock();
    readerButton.textContent = '保持亮屏';
  }
});
```

```mermaid
flowchart TD
    A["页面请求 Wake Lock"] --> B["navigator.wakeLock.request('screen')"]
    B --> C{"权限检查"}
    C -->|"granted"| D["屏幕保持亮起 ✅"]
    C -->|"denied"| E["抛出 NotAllowedError"]
    D --> F{"触发释放条件?"}
    F -->|"页面隐藏"| G["自动释放"]
    F -->|"用户主动释放"| G
    F -->|"系统省电"| G
    G --> H["wakeLock.release 事件触发"]
    H --> I["屏幕可自动息屏"]
```

### 🔟 Clipboard API（异步剪贴板）

> 💡 **要点：** 异步剪贴板 API 支持读取/写入文本、图片等格式，比 document.execCommand 更强大，需用户权限

```javascript
// 写入剪贴板
async function writeToClipboard() {
  try {
    await navigator.clipboard.writeText('要复制的文本');
    console.log('文本已复制到剪贴板');
  } catch (err) {
    console.error('复制失败:', err);
  }
}

// 读取剪贴板
async function readFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('剪贴板内容:', text);
    return text;
  } catch (err) {
    console.error('读取剪贴板失败:', err);
  }
}

// 写入图片（Blob）
async function copyImage(canvas) {
  try {
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    console.log('图片已复制到剪贴板');
  } catch (err) {
    console.error('图片复制失败:', err);
  }
}

// 读取图片
async function readImage() {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types.includes('image/png')) {
        const blob = await item.getType('image/png');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      }
    }
  } catch (err) {
    console.error('读取图片失败:', err);
  }
}
```

| API | 说明 | 权限要求 |
|-----|------|----------|
| `writeText()` | 写入文本 | 无需显式权限（用户手势） |
| `readText()` | 读取文本 | 需要用户授权 |
| `write()` | 写入多种格式（Blob） | 无需显式权限（用户手势） |
| `read()` | 读取多种格式 | 需要用户授权 |
| `ClipboardItem` | 表示剪贴板中的一项数据 | — |

```mermaid
flowchart LR
    subgraph 旧 execCommand
        A1["document.execCommand('copy')"]
        A2["仅文本"]
        A3["同步操作"]
        A4["可能被浏览器禁用"]
    end

    subgraph 新 Clipboard API
        B1["navigator.clipboard.writeText()"]
        B2["文本 + 图片 + 自定义"]
        B3["异步操作（Promise）"]
        B4["权限管理更完善"]
    end

    A1 --> C["对比"]
    B1 --> C
    C --> D["推荐使用新 API"]
```

---

## ✍️ 十一、手写代码实现

### 1️⃣ JavaScript基础

以传入对象为原型创建新对象，核心是利用空函数 `F` 进行原型链中转，避免直接操作 `__proto__`。

```mermaid
flowchart LR
    A["传入对象obj"] --> B["创建空函数F"]
    B --> C["F.prototype = obj"]
    C --> D["return new F"]
    D --> E["新对象__proto__指向obj"]
```

```javascript
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

const parent = { name: 'parent' };
const child = create(parent);
console.log(child.name);              // 'parent'
console.log(child.__proto__);         // { name: 'parent' }
console.log(child.__proto__ === parent); // true
```

#### 2️⃣ 手写 instanceof 方法

沿原型链逐层向上查找，判断构造函数的 `prototype` 是否出现在实例的原型链上。

```mermaid
flowchart TD
    A["myInstanceof left, right"] --> B["proto = left.__proto__"]
    B --> C{"proto 存在?"}
    C -->|否| D["return false"]
    C -->|是| E{"proto === right.prototype?"}
    E -->|是| F["return true"]
    E -->|否| G["proto = proto.__proto__"]
    G --> C
```

```javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left),
      prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function Person(name, age) { this.name = name; this.age = age; }
const p = new Person('Tom', 18);
console.log(myInstanceof(p, Person));   // true
console.log(myInstanceof(p, Object));   // true
console.log(myInstanceof(p, Array));    // false
```

#### 3️⃣ 手写 new 操作符

创建新对象 → 绑定原型 → 执行构造函数 → 根据返回值类型决定返回新对象还是引用类型。

```mermaid
flowchart TD
    A["new 构造函数"] --> B["创建新空对象"]
    B --> C["原型指向 constructor.prototype"]
    C --> D["执行构造函数 this指向新对象"]
    D --> E{"构造函数返回引用类型?"}
    E -->|是| F["返回引用类型"]
    E -->|否| G["返回新对象"]
```

```javascript
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  newObject = Object.create(constructor.prototype);
  result = constructor.apply(newObject, arguments);
  let flag = result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObject;
}

function Person(name) { this.name = name; }
const p = objectFactory(Person, 'Tom');
console.log(p.name);              // 'Tom'
console.log(p instanceof Person); // true
```

#### 4️⃣ 手写 Promise

Promise 的核心是状态机（PENDING → RESOLVED/REJECTED）和观察者模式。三种状态：`pending`、`resolved`、`rejected`，状态一旦改变就不可逆。`resolvedCallbacks` 和 `rejectedCallbacks` 数组用于收集异步回调。

```mermaid
graph LR
    A["PENDING"] -->|resolve| B["RESOLVED"]
    A -->|reject| C["REJECTED"]
    B --> D["执行resolvedCallbacks"]
    C --> E["执行rejectedCallbacks"]
```

```javascript
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  var self = this;
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  function reject(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.value = value;
        self.rejectedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : function(value) { return value; };
  onRejected = typeof onRejected === "function" ? onRejected : function(error) { throw error; };

  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};

new MyPromise((resolve) => resolve(1)).then(v => console.log(v)); // 1
new MyPromise((_, reject) => reject('err')).then(null, event => console.log(event)); // 'err'
```

#### 5️⃣ 手写 Promise.then

链式调用的核心——返回新 Promise，根据回调返回值类型决定直接 resolve 还是递归 then。

```mermaid
sequenceDiagram
    participant P1 as 前一个Promise
    participant P2 as 新Promise
    participant CB as callbacks数组
    P1->>CB: 注册onFulfilled/onReject
    P1->>P1: 异步完成调用resolve
    P1->>CB: 依次执行callbacks
    CB->>P2: 执行onFulfilled得到结果
    P2->>P2: 简单值直接resolve(result)
    P2->>P2: Promise值则.then(resolve, reject)
```

```javascript
MyPromise.prototype.then = function(onFulfilled, onReject){
    const self = this;
    return new MyPromise((resolve, reject) => {
      let fulfilled = () => {
        try{
          const result = onFulfilled(self.value);
          return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
        }catch(err){
          reject(err)
        }
      }
      let rejected = () => {
        try{
          const result = onReject(self.value);
          return result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
        }catch(err){
          reject(err)
        }
      }
      switch(self.state){
        case PENDING:
          self.resolvedCallbacks.push(fulfilled);
          self.rejectedCallbacks.push(rejected);
          break;
        case RESOLVED:
          fulfilled();
          break;
        case REJECTED:
          rejected();
          break;
      }
    })
}

new MyPromise((resolve) => resolve(1)).then(v => console.log(v)); // 1
```

#### 6️⃣ 手写 Promise.all

全部成功才 resolve，按输入顺序输出结果数组；任一失败则立即 reject。

```mermaid
flowchart TD
    A["Promise.all promises数组"] --> B["遍历promises"]
    B --> C["Promise.resolve包装每个元素"]
    C --> D{"全部成功?"}
    D -->|是| E["按顺序返回结果数组"]
    D -->|否| F["返回第一个错误"]
```

```javascript
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if(!Array.isArray(promises)){
        throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value=>{
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult)
          }
      },error=>{
        return reject(error)
      })
    }
  })
}

promiseAll([Promise.resolve(1), Promise.resolve(2)]).then(v => console.log(v)); // [1, 2]
```

#### 7️⃣ 手写 Promise.race

竞速模式，谁先改变状态就返回谁的结果，无论是 resolve 还是 reject。

```mermaid
flowchart TD
    A["Promise.race args数组"] --> B["遍历args"]
    B --> C["每个promise.then resolve, reject"]
    C --> D["谁先改变状态就返回谁"]
```

```javascript
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject)
    }
  })
}

const slow = new Promise(r => setTimeout(r, 100, 'slow'));
const fast = Promise.resolve('fast');
Promise.race([slow, fast]).then(v => console.log(v)); // 'fast'

Promise.race([Promise.reject('err'), Promise.resolve('ok')])
  .catch(event => console.log(event)); // 'err'
```

#### 8️⃣ 手写防抖函数

高频触发时以最后一次为准，每次触发重置定时器。核心思想是「延迟执行 + 取消重来」——每次事件触发都清除上一个定时器并重新计时，确保只有最后一次触发能真正执行回调。适用于输入搜索、窗口 resize。

```mermaid
sequenceDiagram
    participant User as 用户
    participant DB as 防抖函数
    participant Timer as 定时器
    User->>DB: 第一次触发
    DB->>Timer: 设置wait毫秒定时器
    User->>DB: 在wait内再次触发
    DB->>Timer: 清除旧定时器
    DB->>Timer: 重新设置定时器
    Timer-->>DB: wait毫秒到
    DB->>User: 执行回调
```

```javascript
function debounce(fn, wait) {
  let timer = null;
  return function() {
    let context = this, args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

let count = 0;
const increment = debounce(() => { count++; }, 50);
increment(); increment(); increment();
setTimeout(() => console.log(count), 100); // 1 (只执行最后一次)
```

#### 9️⃣ 手写节流函数

按固定时间间隔执行，每隔 delay 毫秒最多执行一次。节流保证在指定时间段内至少执行一次（稀释执行频率），防抖保证只执行最后一次（延迟到停止触发后）。适用于滚动加载、拖拽。

```mermaid
sequenceDiagram
    participant User as 用户
    participant TH as 节流函数
    participant Time as 时间记录
    User->>TH: 触发
    TH->>Time: 当前时间 - 上次时间 >= delay?
    Time-->>TH: 是,执行回调
    User->>TH: 在delay内再次触发
    TH->>Time: 间隔不足,忽略
    User->>TH: delay后触发
    TH->>Time: 间隔足够,执行
```

```javascript
function throttle(fn, delay) {
  let curTime = Date.now();
  return function() {
    let context = this, args = arguments, nowTime = Date.now();
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

let callCount = 0;
const log = throttle(() => { callCount++; }, 100);
log(); log(); log();
setTimeout(() => console.log(callCount), 150); // 2 (节流后实际执行次数)
```

#### 🔟 手写类型判断函数

利用 `Object.prototype.toString.call()` 获取 `[object Type]` 格式字符串，再提取具体类型。

```javascript
function getType(value) {
  if (value === null) {
    return value + "";
  }
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    return typeof value;
  }
}
```

#### 1️⃣1️⃣ 手写 call 函数

将函数设为对象的临时方法并调用，调用后删除，从而实现指定 this。

```javascript
Function.prototype.myCall = function(context) {
  if (typeof this !== "function") {
    console.error("type error");
  }
  let args = [...arguments].slice(1), result = null;
  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
};

const obj = { value: 42 };
function getValue() { return this.value; }
console.log(getValue.myCall(obj)); // 42

function sum(a, b) { return a + b; }
console.log(sum.myCall(null, 1, 2)); // 3
```

#### 1️⃣2️⃣ 手写 apply 函数

与 call 类似，但参数以数组形式传入。

```javascript
Function.prototype.myApply = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  context = context || window;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

const obj = { value: 100 };
function getVal(a, b) { return this.value + a + b; }
console.log(getVal.myApply(obj, [10, 20])); // 130
```

#### 1️⃣3️⃣ 手写 bind 函数

返回新函数而非立即执行，支持柯里化传参，需要处理 new 构造场景。

```javascript
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  var args = [...arguments].slice(1), fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};

const obj = { x: 10 };
function getBound(y) { return this.x + y; }
const bound = getBound.myBind(obj, 5);
console.log(bound());  // 15
console.log(bound(20)); // 15 (预设参数5已固定)
```

#### 1️⃣4️⃣ 函数柯里化的实现

将多参函数转化为单参函数链，通过递归收集参数，参数数量满足 `fn.length` 时执行原函数。

```mermaid
flowchart TD
    A["curry fn"] --> B["收集参数"]
    B --> C{"参数数量 >= fn.length?"}
    C -->|是| D["执行fn并返回结果"]
    C -->|否| E["返回继续收集参数的函数"]
    E --> B
```

```javascript
function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function() {
    let subArgs = args.slice(0);
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }
    if (subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  };
}

// es6 实现
// const curry = (fn, ...args) =>
//   fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```

#### 1️⃣5️⃣ 实现 AJAX 请求

创建 XMLHttpRequest → open → setRequestHeader → onreadystatechange 监听 → send。

```mermaid
sequenceDiagram
    participant JS as JavaScript
    participant XHR as XMLHttpRequest
    participant Server as 服务器
    JS->>XHR: new XMLHttpRequest()
    JS->>XHR: xhr.open(method, url, async)
    JS->>XHR: xhr.setRequestHeader()
    JS->>XHR: xhr.onreadystatechange
    JS->>XHR: xhr.send()
    XHR->>Server: 发送HTTP请求
    Server-->>XHR: 返回响应
    XHR->>XHR: readyState变为4
    XHR-->>JS: 触发onreadystatechange
```

```javascript
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
xhr.open("GET", SERVER_URL, true);
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
xhr.onerror = function() {
  console.error(this.statusText);
};
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
xhr.send(null);
```

#### 1️⃣6️⃣ 使用 Promise 封装 AJAX 请求

将 XMLHttpRequest 包装在 Promise 中，成功调用 resolve，失败调用 reject。

```javascript
function getJSON(url) {
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
  });
  return promise;
}
```

#### 1️⃣7️⃣ 实现浅拷贝

只复制对象的第一层属性，嵌套对象仍共享引用。

```javascript
function shallowCopy(object) {
  if (!object || typeof object !== "object") return;
  let newObject = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
}

const a = { x: 1, y: { z: 2 } };
const b = shallowCopy(a);
console.log(b.x);           // 1
console.log(b.y === a.y);   // true (浅拷贝，嵌套对象共享引用)
```

#### 1️⃣8️⃣ 实现深拷贝（基础版）

递归遍历对象属性，遇到对象类型则递归拷贝。注意：基础版不支持 `Date`、`Map`、`Set`、`RegExp` 等特殊对象，也无法检测循环引用（完整版见第六节）。

```mermaid
flowchart TD
    A["deepCopy object"] --> B{"是对象?"}
    B -->|否| C["返回"]
    B -->|是| D["创建空对象/数组"]
    D --> E["遍历key"]
    E --> F{"value是对象?"}
    F -->|否| G["直接赋值"]
    F -->|是| H["递归 deepCopy"]
    H --> I["赋值给新对象"]
    G --> I
```

```javascript
function deepCopy(object) {
  if (!object || typeof object !== "object") return;
  let newObject = Array.isArray(object) ? [] : {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        object[key] !== null && typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }
  return newObject;
}

const src = { a: 1, b: { c: 2 }, d: [3, 4] };
const copy = deepCopy(src);
console.log(copy);                // { a: 1, b: { c: 2 }, d: [3, 4] }
console.log(copy.b === src.b);    // false (深拷贝，嵌套对象不同引用)
```

#### 1️⃣9️⃣ 实现 sleep 函数

基于 Promise 封装 setTimeout，配合 async/await 实现同步风格的延迟执行。

```javascript
function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
};

async function test() {
  console.log('start');
  await timeout(1000);
  console.log('1秒后执行');
}
test();
```

### 2️⃣ 数据处理

#### 1️⃣ 实现日期格式化函数

通过字符串替换将 yyyy/MM/dd 等占位符替换为实际日期值。

```javascript
const dateFormat = (dateInput, format)=>{
    var day = dateInput.getDate().toString().padStart(2, '0')
    var month = (dateInput.getMonth() + 1).toString().padStart(2, '0')
    var year = dateInput.getFullYear()
    format = format.replace(/yyyy/, year)
    format = format.replace(/MM/, month)
    format = format.replace(/dd/, day)
    return format
}

const d = new Date('2024-03-15');
console.log(dateFormat(d, 'yyyy年MM月dd日')); // '2024年03月15日'
console.log(dateFormat(d, 'yyyy/MM/dd'));     // '2024/03/15'
```

#### 2️⃣ 交换 a,b 的值（不用临时变量）

利用加减法运算实现数值交换：`a = a + b; b = a - b; a = a - b`。

```javascript
a = a + b
b = a - b
a = a - b
```

#### 3️⃣ 数组乱序输出（Fisher-Yates 洗牌算法）

从后往前遍历，每次随机选取一个未处理元素与当前位置交换，确保每个排列等概率。

```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr); // 乱序后的数组（每次结果不同）
```

#### 4️⃣ 数组扁平化（6种方法）

将嵌套数组「拉平」为一维数组，以下是六种实现思路。

```mermaid
mindmap
  root((数组扁平化))
    递归
    扩展运算符+some
    reduce
    toString+split
    JSON+正则
    ES6 flat(Infinity)
```

```javascript
// 1. 递归
function flatten(arr) {
  let result = [];
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// 2. reduce
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

// 3. 扩展运算符
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

// 4. toString + split (仅适用于纯数字数组)
function flatten(arr) {
    return arr.toString().split(',').map(item => Number(item));
}

// 5. ES6 flat
function flatten(arr) {
  return arr.flat(Infinity);
}

// 6. JSON + 正则
function flatten(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str);
}

console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
```

#### 5️⃣ 数组去重

ES6 的 `Array.from(new Set(array))` 最简洁；ES5 利用对象属性哈希表去重。

```javascript
// ES6
Array.from(new Set(array));

// ES5
function uniqueArray(array) {
  let map = {};
  let res = [];
  for(var i = 0; i < array.length; i++) {
    if(!map.hasOwnProperty(array[i])) {
      map[array[i]] = 1;
      res.push(array[i]);
    }
  }
  return res;
}

const arr = [1, 2, 2, 3, 3, 4];
console.log(Array.from(new Set(arr))); // [1, 2, 3, 4]
console.log(uniqueArray(arr));         // [1, 2, 3, 4]
```

#### 6️⃣ 千分位分隔符

利用模 3 余数确定第一个逗号位置，剩余部分按每三位一组用 `.match(/\d{3}/g)` 分割。

```javascript
let format = n => {
    let num = n.toString()
    let decimals = ''
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if (remainder > 0) {
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else {
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp
        }
    }
}

console.log(format(1234567));      // '1,234,567'
console.log(format(1234567.89));   // '1,234,567.89'
console.log(format(123));          // '123'
```

#### 7️⃣ 对象转树形结构

先建立 id→item 的 Map 索引，再遍历数组通过 pid 查找父节点进行挂载。

```mermaid
flowchart TD
    A["扁平数组"] --> B["建立id→item的Map"]
    B --> C["遍历数组,根据pid找parent"]
    C --> D{"parent存在?"}
    D -->|是| E["将item加入parent.children"]
    D -->|否| F["item为根节点加入result"]
```

```javascript
function jsonToTree(data) {
  let result = []
  if(!Array.isArray(data)) {
    return result
  }
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.pid];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

const data = [
  { id: 1, pid: 0, name: '总部' },
  { id: 2, pid: 1, name: '研发部' },
  { id: 3, pid: 1, name: '市场部' },
];
console.log(jsonToTree(data));
```

#### 8️⃣ 解析 URL Params 为对象

正则提取参数字符串，split 解析键值对，处理重复 key（转为数组）和无值参数（设为 true）。

```javascript
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  const paramsArr = paramsStr.split('&');
  let paramsObj = {};
  paramsArr.forEach(param => {
    if (/=/.test(param)) {
      let [key, val] = param.split('=');
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        paramsObj[key] = val;
      }
    } else {
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}

const url = 'http://example.com?name=Tom&age=25&hobby=reading&hobby=sports';
console.log(parseParam(url));
// { name: 'Tom', age: 25, hobby: ['reading', 'sports'] }

const url2 = 'http://example.com?debug&type=admin';
console.log(parseParam(url2));
// { debug: true, type: 'admin' }
```

### 3️⃣ 场景应用

#### 1️⃣ 循环打印红黄绿

三种实现方式逐步演进：回调地狱 → Promise 链 → async/await，通过递归实现无限循环。

```mermaid
sequenceDiagram
    participant R as 红灯 3s
    participant G as 绿灯 1s
    participant Y as 黄灯 2s
    R->>R: 亮3s
    R->>G: 切换
    G->>G: 亮1s
    G->>Y: 切换
    Y->>Y: 亮2s
    Y->>R: 循环
```

```javascript
function red() { console.log('red'); }
function green() { console.log('green'); }
function yellow() { console.log('yellow'); }

// callback 实现
const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') red()
        else if (light === 'green') green()
        else if (light === 'yellow') yellow()
        callback()
    }, timer)
}
const step = () => {
    task(3000, 'red', () => {
        task(2000, 'green', () => {
            task(1000, 'yellow', step)
        })
    })
}
step()

// Promise 实现
const task2 = (timer, light) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') red()
            else if (light === 'green') green()
            else if (light === 'yellow') yellow()
            resolve()
        }, timer)
    })
const step2 = () => {
    task2(3000, 'red')
        .then(() => task2(2000, 'green'))
        .then(() => task2(2100, 'yellow'))
        .then(step2)
}
step2()

// async/await 实现
const taskRunner =  async () => {
    await task2(3000, 'red')
    await task2(2000, 'green')
    await task2(1000, 'yellow')
    taskRunner()
}
taskRunner()
```

#### 2️⃣ 实现发布-订阅模式

事件中心模式，通过 handlers 对象存储事件回调，支持 on/emit/off 解耦通信。

```javascript
class EventCenter {
  constructor() {
    this.handlers = {}
  }

  addEventListener(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(handler)
  }

  dispatchEvent(type, params) {
    if (!this.handlers[type]) {
      return new Error('该事件未注册')
    }
    this.handlers[type].forEach(handler => {
      handler(...params)
    })
  }

  removeEventListener(type, handler) {
    if (!this.handlers[type]) {
      return new Error('事件无效')
    }
    if (!handler) {
      delete this.handlers[type]
    } else {
      const index = this.handlers[type].findIndex(el => el === handler)
      if (index === -1) {
        return new Error('无该绑定事件')
      }
      this.handlers[type].splice(index, 1)
      if (this.handlers[type].length === 0) {
        delete this.handlers[type]
      }
    }
  }
}

const bus = new EventCenter();
const fn1 = (msg) => console.log('fn1:', msg);
const fn2 = (msg) => console.log('fn2:', msg);
bus.addEventListener('msg', fn1);
bus.addEventListener('msg', fn2);
bus.dispatchEvent('msg', ['hello']); // fn1: hello, fn2: hello
bus.removeEventListener('msg', fn1);
bus.dispatchEvent('msg', ['world']); // fn2: world
```

#### 3️⃣ 实现双向数据绑定

利用 `Object.defineProperty` 的 setter 拦截数据修改，同步更新视图（input 和 span）。

```javascript
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
  }
})
input.addEventListener('keyup', function(event) {
  obj.text = event.target.value
})
```

#### 4️⃣ 使用 setTimeout 实现 setInterval

递归调用 setTimeout 替代 setInterval，返回包含 flag 标志的对象便于手动停止。

```javascript
function mySetInterval(fn, timeout) {
  var timer = { flag: true };
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }
  setTimeout(interval, timeout);
  return timer;
}

let i = 0;
const timer = mySetInterval(() => { console.log(++i); if (i >= 3) timer.flag = false; }, 500);
// 每500ms输出递增数字，输出3次后停止
```

#### 5️⃣ 实现 JSONP

利用 script 标签不受同源策略限制的特性，通过动态创建 script 并传入回调函数名实现跨域。

```javascript
function addScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = "text/javascript";
  document.body.appendChild(script);
}
addScript("http://xxx.xxx.com/xxx.js?callback=handleRes");
function handleRes(res) {
  console.log(res);
}
```

#### 6️⃣ 判断对象是否存在循环引用

深度遍历时记录父级引用链，每访问一个子对象就与所有祖先对象比对，有相同则存在循环引用。

```javascript
const isCycleObject = (obj,parent) => {
    const parentArr = parent || [obj];
    for(let i in obj) {
        if(typeof obj[i] === 'object') {
            let flag = false;
            parentArr.forEach((pObj) => {
                if(pObj === obj[i]){ flag = true; }
            })
            if(flag) return true;
            flag = isCycleObject(obj[i],[...parentArr,obj[i]]);
            if(flag) return true;
        }
    }
    return false;
}

const a = { b: 1 };
a.self = a; // 循环引用
console.log(isCycleObject(a)); // true

const b = { c: { d: 1 } };
console.log(isCycleObject(b)); // false

---

### 4️⃣ 现代 Promise 方法

#### 1️⃣ 手写 Promise.allSettled

等待所有 Promise 完成，不论成功失败都收集结果，返回 `{status, value/reason}` 数组。

```mermaid
flowchart TD
    A["Promise.allSettled promises数组"] --> B["遍历所有promise"]
    B --> C["每个promise包装为 Promise.resolve"]
    C --> D{"不论成功或失败"}
    D --> E["收集结果: {status, value/reason}"]
    E --> F["所有promise完成"]
    F --> G["返回结果数组"]
```

`Promise.allSettled` 与 `Promise.all` 的区别：
- `all`：一个失败则整体失败，返回第一个错误
- `allSettled`：等待所有结束，无论成功失败都收集结果

```javascript
function promiseAllSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p).then(
        value => ({ status: 'fulfilled', value }),
        reason => ({ status: 'rejected', reason })
      )
    )
  )
}

promiseAllSettled([
  Promise.resolve(1),
  Promise.reject('err'),
  Promise.resolve(3)
]).then(v => console.log(v));
// [{status:'fulfilled', value:1}, {status:'rejected', reason:'err'}, {status:'fulfilled', value:3}]
```

#### 2️⃣ 手写 Promise.any

首个成功则 resolve，全部失败则 reject 一个包含所有错误信息的 AggregateError。

```mermaid
flowchart TD
    A["Promise.any promises数组"] --> B["遍历promises"]
    B --> C{"任意一个成功?"}
    C -->|是| D["返回该成功结果"]
    C -->|否 全部失败| E["reject AggregateError"]
    E --> F["AggregateError: errors数组"]
```

`Promise.any` 与 `Promise.race` 的区别：
- `race`：第一个定论的 Promise（可能是 reject）
- `any`：第一个 fulfilled 的 Promise；如果全部 reject，则 reject 一个 `AggregateError`

```javascript
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0
    const errors = []
    const len = promises.length
    if (len === 0) {
      return reject(new AggregateError([], 'All promises were rejected'))
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        value => resolve(value),
        reason => {
          errors[i] = reason
          rejectedCount++
          if (rejectedCount === len) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        }
      )
    })
  })
}

promiseAny([Promise.reject('err1'), Promise.resolve('ok'), Promise.reject('err2')])
  .then(v => console.log(v)); // 'ok'
promiseAny([Promise.reject('e1'), Promise.reject('e2')])
  .catch(e => console.log(e instanceof AggregateError)); // true
```

#### 3️⃣ 手写 Promise.withResolvers

将 Promise 的 resolve/reject 暴露到外部，便于在事件回调等场景下控制 Promise 状态。

```mermaid
flowchart LR
    A["Promise.withResolvers"] --> B["创建Promise"]
    B --> C["把resolve/reject暴露到外部"]
    C --> D["返回 {promise, resolve, reject}"]
```

```javascript
function promiseWithResolvers() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

// 使用场景：事件驱动的异步
// const { promise, resolve } = promiseWithResolvers()
// button.addEventListener('click', () => resolve('clicked'), { once: true })
// await promise  // 等待按钮点击
```

### 5️⃣ 现代 JavaScript 手写

#### 1️⃣ 手写 structuredClone（简化版）

支持 Date、Map、Set、RegExp 等特殊对象的深拷贝，使用 WeakMap 解决循环引用。

```javascript
function structuredClone(obj, weakMap = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj

  if (weakMap.has(obj)) return weakMap.get(obj)

  let clone
  if (obj instanceof Date) {
    clone = new Date(obj.getTime())
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj.source, obj.flags)
  } else if (obj instanceof Map) {
    clone = new Map()
    weakMap.set(obj, clone)
    obj.forEach((val, key) => clone.set(key, structuredClone(val, weakMap)))
    return clone
  } else if (obj instanceof Set) {
    clone = new Set()
    weakMap.set(obj, clone)
    obj.forEach(val => clone.add(structuredClone(val, weakMap)))
    return clone
  } else if (Array.isArray(obj)) {
    clone = []
    weakMap.set(obj, clone)
    obj.forEach((item, i) => clone[i] = structuredClone(item, weakMap))
    return clone
  } else {
    clone = Object.create(Object.getPrototypeOf(obj))
    weakMap.set(obj, clone)
    const allKeys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]
    allKeys.forEach(key => {
      clone[key] = structuredClone(obj[key], weakMap)
    })
    return clone
  }
}

const obj = { a: 1, b: { c: 2 } };
const c = structuredClone(obj);
console.log(c.b === obj.b); // false
```

#### 2️⃣ 手写 LRU Cache（最近最少使用缓存）

利用 Map 的插入顺序特性，每次 get/put 时先删除再添加以更新顺序，超出容量时删除 Map 头部元素（最久未使用）。

```mermaid
flowchart TD
    A["put key,value"] --> B{"key已存在?"}
    B -->|是| C["删除旧key"]
    B -->|否| D{"size >= capacity?"}
    D -->|是| E["删除Map最久未使用项<br>Map.keys.next()"]
    D -->|否| F["直接添加"]
    C --> F
    F --> G["set(key, value)"]
    G --> H["Map末尾 = 最新使用"]

    I["get key"] --> J{"存在?"}
    J -->|否| K["return -1"]
    J -->|是| L["先delete再set"]
    L --> M["更新为最新使用"]
    M --> N["return value"]
```

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }

  get(key) {
    if (!this.map.has(key)) return -1
    const value = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, value)
    return value
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    } else if (this.map.size >= this.capacity) {
      const oldest = this.map.keys().next().value
      this.map.delete(oldest)
    }
    this.map.set(key, value)
  }
}

const cache = new LRUCache(2);
cache.put(1, 'a'); cache.put(2, 'b');
console.log(cache.get(1)); // 'a'
cache.put(3, 'c');
console.log(cache.get(2)); // -1
```

#### 3️⃣ 手写 compose 和 pipe

compose 从右到左组合函数，pipe 从左到右，都利用 reduce 实现函数链式调用。

```mermaid
flowchart LR
    subgraph compose [compose 从右到左]
        A["x"] --> B["fn"]
        B --> C["g"]
        C --> D["h"]
        D --> E["结果"]
    end
    subgraph pipe [pipe 从左到右]
        F["x"] --> G["h"]
        G --> H["g"]
        H --> I["fn"]
        I --> J["结果"]
    end
```

```javascript
// compose: 从右到左组合函数
const compose = (...fns) =>
  fns.reduce((a, b) =>
    (...args) => a(b(...args))
  )

// pipe: 从左到右组合函数
const pipe = (...fns) =>
  fns.reduce((a, b) =>
    (...args) => b(a(...args))
  )

const add1 = x => x + 1
const double = x => x * 2
console.log(compose(double, add1)(3));  // double(add1(3)) = 8
console.log(pipe(add1, double)(3));     // double(add1(3)) = 8
```

#### 4️⃣ 手写 once 函数

确保函数只执行一次，后续调用直接返回第一次的缓存结果，常用于初始化场景。

```javascript
function once(fn) {
  let called = false
  let result
  return function(...args) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  }
}

const init = once(() => { console.log('init once'); return 42 })
console.log(init());  // 'init once' → 42
console.log(init());  // 42 (不再执行)
```

#### 5️⃣ 手写 memoize 函数

缓存函数计算结果，相同输入直接返回缓存值，可通过 resolver 自定义缓存 key。

```javascript
function memoize(fn, resolver) {
  const cache = new Map()
  return function(...args) {
    const key = resolver ? resolver(...args) : args[0]
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const fib = memoize(n => n <= 1 ? n : fib(n - 1) + fib(n - 2))
console.log(fib(10)); // 55
```

#### 6️⃣ 手写 Array.prototype.flatMap

`flatMap = map + flat(1)`，先用 map 映射再用 concat 拉平一层，比分别调用性能更好。

```mermaid
flowchart LR
    A["arr"] --> B["map(fn)"]
    B --> C["[[1,2],[3,4]]"]
    C --> D["flat一层"]
    D --> E["[1,2,3,4]"]
```

```javascript
function flatMap(arr, callback, thisArg) {
  return arr.reduce((acc, item, index) => {
    const mapped = callback.call(thisArg, item, index, arr)
    return acc.concat(mapped)
  }, [])
}

console.log([1, 2, 3].flatMap(x => [x, x * 2]));
// [1, 2, 2, 4, 3, 6]
```

#### 7️⃣ 手写 Object.groupBy

根据分组函数对数组元素分类，返回一个以分组 key 为键、元素数组为值的对象。

```javascript
function groupBy(items, keyFn) {
  return items.reduce((result, item) => {
    const key = keyFn(item)
    if (!result[key]) result[key] = []
    result[key].push(item)
    return result
  }, Object.create(null))
}

const inventory = [
  { name: 'apple', type: 'fruit' },
  { name: 'carrot', type: 'vegetable' },
  { name: 'banana', type: 'fruit' },
]
console.log(groupBy(inventory, item => item.type));
// { fruit: [{name:'apple'},{name:'banana'}], vegetable: [{name:'carrot'}] }
```

#### 8️⃣ 手写 Promise.retry（失败重试）

Promise 失败后自动重试，直到成功或达到最大重试次数，每次重试可配置延迟。

```javascript
function promiseRetry(fn, maxRetries = 3, delay = 300) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fn().then(resolve).catch(err => {
        if (n === 0) return reject(err)
        setTimeout(() => attempt(n - 1), delay)
      })
    }
    attempt(maxRetries)
  })
}

// promiseRetry(() => fetch('/api/data'), 3, 500)
//   .then(console.log)
//   .catch(console.error)
```

### 6️⃣ 算法与数据结构

#### 1️⃣ 排序算法

快速排序（分治）、归并排序（合并有序数组）、冒泡排序（两两交换），面试常考快排和归并。

```mermaid
flowchart TD
    subgraph 快速排序
        Q1["选基准pivot"] --> Q2["小于基准放左,大于放右"]
        Q2 --> Q3["递归左右分区"]
    end
    subgraph 归并排序
        M1["数组一分为二"] --> M2["递归排序左右"]
        M2 --> M3["合并两个有序数组"]
    end
    subgraph 冒泡排序
        B1["从头开始两两比较"] --> B2["大数逐步上浮到末尾"]
        B2 --> B3["每轮确定一个最大值"]
    end
```

| 算法 | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 | 稳定性 |
|------|:-:|:-:|:-:|:-:|
| **快速排序** | O(n log n) | O(n²) | O(log n) | 不稳定 |
| **归并排序** | O(n log n) | O(n log n) | O(n) | 稳定 |
| **冒泡排序** | O(n²) | O(n²) | O(1) | 稳定 |

```javascript
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const left = [], right = []
  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
function merge(left, right) {
  const result = []
  let i = 0, j = 0
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++])
  }
  return result.concat(left.slice(i)).concat(right.slice(j))
}

// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let swapped = false
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }
  return arr
}

console.log(quickSort([3,1,4,1,5,9]));
console.log(mergeSort([3,1,4,1,5,9]));
console.log(bubbleSort([3,1,4,1,5,9]));
```

#### 2️⃣ 二分查找

有序数组的折半搜索，每次缩小一半查找范围，时间复杂度 O(log n)。

```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}

console.log(binarySearch([1,2,3,4,5,6,7], 4)); // 3
console.log(binarySearch([1,2,3,4,5,6,7], 8)); // -1
```

#### 3️⃣ 防抖节流增强版（支持 leading / trailing）

支持 `leading`（立即执行）和 `trailing`（延迟执行）选项，覆盖更多实际场景。搜索输入框需要 leading 立即响应用户操作，同时也需要 trailing 防止遗漏；滚动加载只需要 trailing 兜底即可。

```javascript
// 防抖（支持 leading + trailing）
function debounce(fn, wait, options = {}) {
  const { leading = false, trailing = true } = options
  let timer, lastArgs, lastThis

  function invoke() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (lastArgs) {
      fn.apply(lastThis, lastArgs)
      lastArgs = lastThis = null
    }
  }

  return function(...args) {
    if (!timer && leading) {
      fn.apply(this, args)
    } else {
      lastArgs = args
      lastThis = this
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (trailing && lastArgs) invoke()
    }, wait)
  }
}

// 节流（支持 leading + trailing）
function throttle(fn, delay, options = {}) {
  const { leading = true, trailing = true } = options
  let lastTime = 0, timer, lastArgs, lastThis

  function invoke() {
    lastTime = Date.now()
    timer = null
    if (lastArgs) {
      fn.apply(lastThis, lastArgs)
      lastArgs = lastThis = null
    }
  }

  return function(...args) {
    const now = Date.now()
    if (!lastTime && !leading) lastTime = now
    const remaining = delay - (now - lastTime)

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null }
      lastTime = now
      fn.apply(this, args)
      if (!timer && lastArgs) invoke()
    } else if (!timer && trailing) {
      lastArgs = args
      lastThis = this
      timer = setTimeout(invoke, remaining)
    }
  }
}

let count = 0;
const fn = debounce(() => count++, 50);
fn(); fn(); fn();
setTimeout(() => console.log(count), 100); // 1
```

#### 4️⃣ 手写 EventEmitter（发布订阅）

完整的发布订阅实现，支持 on/off/emit/once，once 利用包装函数自动解绑。

```mermaid
flowchart LR
    A["eventEmitter.on event, handler"] --> B["存入handlersMap"]
    C["eventEmitter.emit event, data"] --> D["取出 handlersMap 中的 event 列表"]
    D --> E["依次执行所有handler"]
    F["eventEmitter.off event, handler"] --> G["从handlersMap移除handler"]
    H["eventEmitter.once event, handler"] --> I["包装为临时函数<br>执行后自动off"]
```

```javascript
class EventEmitter {
  constructor() {
    this._handlers = new Map()
  }

  on(event, handler) {
    if (!this._handlers.has(event)) {
      this._handlers.set(event, [])
    }
    this._handlers.get(event).push(handler)
    return this
  }

  off(event, handler) {
    if (!this._handlers.has(event)) return this
    if (!handler) {
      this._handlers.delete(event)
      return this
    }
    const handlers = this._handlers.get(event)
    const idx = handlers.indexOf(handler)
    if (idx !== -1) handlers.splice(idx, 1)
    if (handlers.length === 0) this._handlers.delete(event)
    return this
  }

  emit(event, ...args) {
    if (!this._handlers.has(event)) return false
    this._handlers.get(event).forEach(handler => {
      handler(...args)
    })
    return true
  }

  once(event, handler) {
    const wrapper = (...args) => {
      handler(...args)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
    return this
  }
}

const ee = new EventEmitter();
ee.on('e', v => console.log(v));
ee.emit('e', 1);
```

#### 5️⃣ 手写 Promise 控制并发（PromisePool）

PromisePool 控制同时执行的任务数量，每个任务完成后自动从队列取出下一个执行。

```javascript
class PromisePool {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency
    this.queue = []
    this.activeCount = 0
  }

  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject })
      this.run()
    })
  }

  run() {
    while (this.activeCount < this.maxConcurrency && this.queue.length > 0) {
      const { fn, resolve, reject } = this.queue.shift()
      this.activeCount++
      Promise.resolve(fn())
        .then(resolve, reject)
        .finally(() => {
          this.activeCount--
          this.run()
        })
    }
  }
}

// const pool = new PromisePool(3)
// const urls = [url1, url2, url3, url4, url5, url6]
// urls.forEach(url => pool.add(() => fetch(url)))
```

#### 6️⃣ 手写深拷贝（完整版）

支持 Date、Map、Set、RegExp、Symbol 键、循环引用的工业级深拷贝，使用 WeakMap 记录已拷贝对象。

```javascript
function deepClone(obj, weakMap = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (weakMap.has(obj)) return weakMap.get(obj)

  let clone
  if (obj instanceof Date) clone = new Date(obj.getTime())
  else if (obj instanceof RegExp) clone = new RegExp(obj.source, obj.flags)
  else if (obj instanceof Map) {
    clone = new Map()
    weakMap.set(obj, clone)
    obj.forEach((val, key) => clone.set(deepClone(key, weakMap), deepClone(val, weakMap)))
    return clone
  } else if (obj instanceof Set) {
    clone = new Set()
    weakMap.set(obj, clone)
    obj.forEach(val => clone.add(deepClone(val, weakMap)))
    return clone
  } else {
    clone = Object.create(Object.getPrototypeOf(obj))
    weakMap.set(obj, clone)
    const allKeys = [
      ...Object.getOwnPropertyNames(obj),
      ...Object.getOwnPropertySymbols(obj)
    ]
    allKeys.forEach(key => {
      clone[key] = deepClone(obj[key], weakMap)
    })
    return clone
  }
}

const src = { a:1, b:{c:2}, d:new Date() };
const c = deepClone(src);
console.log(c.b === src.b); // false
```

#### 7️⃣ 手写 Virtual DOM

h 函数创建 VNode 对象，render 函数递归渲染为真实 DOM，处理事件绑定和文本节点。

```javascript
// h 函数：创建 VNode
function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat()
  }
}

// 渲染 VNode 到真实 DOM
function render(vnode, container) {
  const el = document.createElement(vnode.tag)

  for (const [key, val] of Object.entries(vnode.props)) {
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), val)
    } else {
      el.setAttribute(key, val)
    }
  }

  for (const child of vnode.children) {
    if (typeof child === 'string' || typeof child === 'number') {
      el.appendChild(document.createTextNode(child))
    } else {
      render(child, el)
    }
  }

  container.appendChild(el)
  return el
}

// const vdom = h('div', { id: 'app', onClick: () => alert('click') },
//   h('h1', {}, 'Hello Virtual DOM'),
//   h('p', {}, 'This is a VDOM demo')
// )
// render(vdom, document.getElementById('root'))
```

#### 8️⃣ 手写 JSON.stringify（简化版）

递归序列化，处理基本类型、Date、数组、普通对象，过滤 undefined/symbol/function，支持 toJSON。

```javascript
function myStringify(data) {
  const type = typeof data

  // 基本类型
  if (type === 'string') return `"${data}"`
  if (type === 'number') return isNaN(data) ? 'null' : String(data)
  if (type === 'boolean') return String(data)
  if (type === 'bigint') throw new TypeError('Do not know how to serialize a BigInt')
  if (type === 'symbol' || type === 'undefined' || type === 'function') {
    return undefined  // JSON.stringify 会忽略或返回 undefined
  }
  if (data === null) return 'null'
  if (data instanceof Date) return `"${data.toISOString()}"`

  // 有 toJSON 方法
  if (typeof data.toJSON === 'function') return myStringify(data.toJSON())

  // 数组
  if (Array.isArray(data)) {
    const arr = data.map(item =>
      typeof item === 'undefined' || typeof item === 'symbol' || typeof item === 'function'
        ? 'null' : myStringify(item)
    )
    return `[${arr.join(',')}]`
  }

  // 普通对象
  const keys = Object.keys(data).filter(
    key => typeof data[key] !== 'function' && typeof data[key] !== 'symbol' && data[key] !== undefined
  )
  const pairs = keys.map(key => `"${key}":${myStringify(data[key])}`)
  return `{${pairs.join(',')&#125;&#125;`
}

### 7️⃣ Array 方法实现

#### 1️⃣ 手写 Array.prototype.map

遍历数组每个元素，执行回调后将返回值收集到新数组，不改变原数组。

```mermaid
flowchart TD
    A[开始] --> B[参数校验]
    B --> C{arr是数组且<br/>callback是函数?}
    C -->|否| D[返回 []]
    C -->|是| E[初始化 result=[]]
    E --> F[遍历数组]
    F --> G[调用 callback(arr[i], i, arr)]
    G --> H[将返回值 push 到 result]
    H --> I{遍历完?}
    I -->|否| F
    I -->|是| J[返回 result]
```

```javascript
function map(arr, mapCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  }
  let result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    result.push(mapCallback(arr[i], i, arr));
  }
  return result;
}

console.log(map([1, 2, 3], x => x * 2)); // [2, 4, 6]
```

#### 2️⃣ 手写 Array.prototype.filter

遍历数组，回调返回真值的元素收集到新数组。

```javascript
function filter(arr, filterCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
    return [];
  }
  let result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (filterCallback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(filter([1, 2, 3, 4, 5], x => x > 2)); // [3, 4, 5]
```

#### 3️⃣ 手写 Array.prototype.reduce

根据 initialValue 决定初始值和起始索引，每次迭代用回调返回值作为下次的累积值。

```mermaid
graph TD
    A[arr, callback, initialValue] --> B{参数正确?}
    B -->|否| C["返回[]"]
    B -->|是| D{有 initialValue?}
    D -->|无| E["value = arr[0], i=1"]
    D -->|有| F[value = initialValue, i=0]
    E --> G["循环 callback(value, arr[i], i, arr)"]
    F --> G
    G --> H[返回 value]
```

```javascript
function reduce(arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
    return [];
  }
  let hasInitialValue = initialValue !== undefined;
  let value = hasInitialValue ? initialValue : arr[0];
  for (let i = hasInitialValue ? 1 : 0, len = arr.length; i < len; i++) {
    value = reduceCallback(value, arr[i], i, arr);
  }
  return value;
}

console.log(reduce([1, 2, 3, 4], (a,x) => a+x, 0)); // 10
```

#### 4️⃣ 手写 Array.prototype.push

在数组末尾追加元素，返回新长度，利用 this.length 动态添加。

```javascript
Array.prototype.myPush = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
};

const arr = [1,2,3];
console.log(arr.myPush(4,5)); // 5
console.log(arr); // [1,2,3,4,5]
```

#### 5️⃣ 手写 indexOf（字符串）

查找指定子串首次出现的位置，未找到返回 -1，基于正则匹配实现。

```javascript
function myIndexOf(string, target) {
  if (typeof string !== 'string') {
    throw new Error('string only');
  }
  let mt = string.match(new RegExp(target));
  return mt ? mt.index : -1;
}

console.log(myIndexOf('hello world', 'world')); // 6
console.log(myIndexOf('hello world', 'xyz')); // -1
```

#### 6️⃣ 数组元素求和

支持一维数组 reduce 求和、递归求和、嵌套数组 flat 后求和。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = arr.reduce((total, i) => total += i, 0);

function add(arr) {
  if (arr.length === 1) return arr[0];
  return arr[0] + add(arr.slice(1));
}

let arr2 = [1, 2, 3, [[4, [10], 5], 6], 7, 8, 9];
let sum2 = arr2.flat(2).reduce((total, i) => total += i, 0);

console.log(sum); // 55
console.log(add([1,2,3,4,5])); // 15
console.log(sum2); // 55
```

#### 7️⃣ 两个数组合并

将 `['A1','A2',...]` 和 `['A','B',...]` 按字母和数字顺序合并。

```javascript
let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
let a2 = ['A', 'B', 'C', 'D'].map(item => item + '3');
let a3 = [...a1, ...a2].sort().map(item => {
  if (item.includes('3')) return item.split('')[0];
  return item;
});
console.log(a3);
// 结果: ['A1','A2','A','B1','B2','B','C1','C2','C','D1','D2','D']
```

### 8️⃣ 实用工具函数

#### 1️⃣ ES5 实现 isInteger

先判断 typeof 为 number 且 isFinite，再通过 Math.floor 或取余判断整数。

```javascript
Number.isInteger = function (value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

function isInteger(x) {
  return typeof x === "number" && isFinite(x) && (x % 1 === 0);
}

console.log(isInteger(42));    // true
console.log(isInteger(42.5));  // false
console.log(isInteger(NaN));   // false
```

#### 2️⃣ 判断参数为空

处理空字符串、'null'/'undefined' 字符串、null/undefined、空数组、空对象。

```javascript
function isEmpty(a) {
  if (a === "") return true;
  if (a === "null") return true;
  if (a === "undefined") return true;
  if (!a && a !== 0 && a !== "") return true;
  if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true;
  if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true;
  return false;
}

console.log(isEmpty(''));      // true
console.log(isEmpty(null));    // true
console.log(isEmpty([]));      // true
console.log(isEmpty(0));       // false
```

#### 3️⃣ 字符串翻转

split → reverse → join 链式调用。

```javascript
String.prototype._reverse = function () {
  return this.split("").reverse().join("");
};

console.log('hello'._reverse()); // 'olleh'
```

#### 4️⃣ s2 中出现的字符在 s1 中删掉

遍历 s2 每个字符，从 s1 中 replace 移除首次出现。

```javascript
function remove(s1, s2) {
  for (let i = 0, len = s2.length; i < len; i++) {
    s1 = s1.replaceAll(s2[i], "");
  }
  return s1;
}

console.log(remove('hello world', 'ol')); // 'he wrd' (使用 replaceAll 移除所有匹配)
```

#### 5️⃣ 判断子序列

双指针法，依次匹配子序列元素在主数组中的相对顺序。

```javascript
const isSubsequence = (b, a) => {
  let bi = 0, ai = 0;
  while (bi < b.length) {
    if (ai >= a.length) return false;
    if (a[ai] === b[bi]) bi++;
    ai++;
  }
  return true;
};

console.log(isSubsequence('abc', 'a1b2c3')); // true
console.log(isSubsequence('abc', 'a1b2'));   // false
```

#### 6️⃣ 深度比较两个对象是否相等

递归比较每个属性值，先比较 keys 数量再逐层深入。

```javascript
const deepEqual = function (x, y) {
  if (x === y) return true;
  if ((typeof x === 'object' && x != null) && (typeof y === 'object' && y != null)) {
    if (Object.keys(x).length !== Object.keys(y).length) return false;
    for (let prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else { return false; }
    }
    return true;
  }
  return false;
};

console.log(deepEqual({a:1,b:{c:2}}, {a:1,b:{c:2}})); // true
console.log(deepEqual({a:1}, {a:2})); // false
```

#### 7️⃣ 函数参数求和（ES5 / ES6）

ES5 用 arguments + Array.prototype.forEach.call；ES6 用剩余参数 ...nums。

```javascript
// ES5
function totalSum() {
  let sum = 0;
  Array.prototype.forEach.call(arguments, function (item) { sum += item * 1; });
  return sum;
}

// ES6
function totalSum(...nums) {
  let sum = 0;
  nums.forEach(function (item) { sum += item * 1; });
  return sum;
}
```

#### 8️⃣ 实现方法的重载

利用闭包链保存旧函数，根据 fn.length 与 arguments.length 匹配执行。

```javascript
function addMethod(object, name, fnt) {
  var old = object[name];
  object[name] = function () {
    if (fnt.length === arguments.length) {
      return fnt.apply(this, arguments);
    } else if (typeof old === 'function') {
      return old.apply(this, arguments);
    }
  };
}

var methods = {};
addMethod(methods, 'add', function () { return 0; });
addMethod(methods, 'add', function (a, b) { return a + b; });
addMethod(methods, 'add', function (a, b, c) { return a + b + c; });
// methods.add() → 0, methods.add(10,20) → 30, methods.add(10,20,30) → 60
```

#### 9️⃣ 只执行三次的函数（闭包控制）

闭包中计数，超过次数后不再执行。

```javascript
function setFn(fn) {
  let times = 0;
  return () => { if (times++ < 3) fn(times); };
}

const fn = setFn((n) => console.log('第' + n + '次'));
fn(); fn(); fn(); fn(); // 输出第1次到第3次
```

#### 🔟 add(one(two())) / add(two(one())) 都输出 3

无参返回数值，有参返回数组，add 对数组求和。

```javascript
function add() { return arguments[0].reduce((a, b) => a + b); }

function one() {
  return arguments.length === 0 ? 1 : [arguments[0], 1];
}

function two() {
  return arguments.length === 0 ? 2 : [arguments[0], 2];
}
```

#### 1️⃣1️⃣ a == 1 && a == 2 && a == 3

利用 == 类型转换触发 toString 或 getter，每次比较返回自增值。

```javascript
// 方案一：重写 toString
var a = { i: 0, toString: function () { return ++a.i; } };

// 方案二：Object.defineProperty getter
var i = 0;
Object.defineProperty(window, 'a', {
  get: function () { return ++i; }
});

// 方案三：数组 + shift
var a = [1, 2, 3];
a.toString = a.shift;
```

#### 1️⃣2️⃣ 寄生组合式继承

Parent.call 继承属性，Object.create 继承原型，修正 constructor 指向。

```javascript
function Parent(name) { this.name = name; }
Parent.prototype.sayName = function () { console.log('parent name:', this.name); };

function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.sayName = function () { console.log('child name:', this.name); };
Child.prototype.constructor = Child;
```

#### 1️⃣3️⃣ 图片加载（Promise 版）

Promise 封装图片加载，支持链式调用顺序加载多张图片。

```javascript
function createImg(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      let ImgEle = document.createElement("img");
      ImgEle.onload = () => resolve(ImgEle);
      ImgEle.onerror = () => reject(new Error('图片加载失败: ' + url));
      ImgEle.src = url;
    } else {
      reject("url is not right");
    }
  });
}
```

#### 1️⃣4️⃣ 不更改原函数功能调用函数（拦截器 / AOP）

扩展 Function.prototype 添加 before/after，实现 AOP 面向切面编程。

```javascript
Function.prototype.before = function (callback) {
  if (typeof callback !== "function") throw new TypeError("callback must be function");
  let _self = this;
  return function proxy(...params) {
    callback.call(this, ...params);
    return _self.call(this, ...params);
  };
};

Function.prototype.after = function (callback) {
  if (typeof callback !== "function") throw new TypeError("callback must be function");
  let _self = this;
  return function proxy(...params) {
    let result = _self.call(this, ...params);
    callback.call(this, ...params);
    return result;
  };
};

let func = () => { console.log("func"); };
func.before(() => { console.log("===before==="); })
    .after(() => { console.log("===after==="); })();
// ===before===
// func
// ===after===
```

### 9️⃣ 场景实战

#### 1️⃣ 实现 cacheRequest 请求缓存

相同 URL 的多次请求合并为一次，后续请求从缓存获取；支持 pending 状态共享 Promise。

```mermaid
flowchart TD
    A[cacheRequest url] --> B{cache 有 key?}
    B -->|无| C[发起真实请求]
    C --> D[cache: status=pending]
    D --> E[完成 → status=success]
    B -->|有| F{status === pending?}
    F -->|是| G[返回缓存的 Promise]
    F -->|否| H[Promise.resolve 缓存数据]
```

```javascript
const cache = new Map();

function cacheRequest(url, option) {
  let key = `${url}:${option?.method}`;
  if (cache.has(key)) {
    if (cache.get(key).status === 'pending') {
      return cache.get(key).myWait;
    }
    return Promise.resolve(cache.get(key).data);
  }
  let requestApi = request(url, option);
  cache.set(key, { status: 'pending', myWait: requestApi });
  return requestApi.then(res => {
    cache.set(key, { status: 'success', data: res });
    return Promise.resolve(res);
  }).catch(err => {
    cache.set(key, { status: 'fail', data: err });
    return Promise.reject(err);
  });
}

const request = (url) => Promise.resolve(url + ' data');
cacheRequest('/api', {method:'GET'}).then(console.log);
cacheRequest('/api', {method:'GET'}).then(console.log); // 命中缓存
```

#### 2️⃣ 异步并发调度器 Scheduler

控制同时执行的任务数量不超过 2 个，超出部分进入队列等待。

```mermaid
flowchart TD
    A[add promiseCreator] --> B{usingTask.length < 2?}
    B -->|是| C[立即执行]
    B -->|否| D[加入 tasks 队列]
    C --> E[执行完毕]
    E --> F[移除出 usingTask]
    F --> G{tasks 有任务?}
    G -->|是| H[取出第一个任务执行]
```

```javascript
class Scheduler {
  constructor() {
    this.tasks = [];
    this.usingTask = [];
  }

  add(promiseCreator) {
    return new Promise((resolve) => {
      promiseCreator.resolve = resolve;
      if (this.usingTask.length < 2) {
        this.usingRun(promiseCreator);
      } else {
        this.tasks.push(promiseCreator);
      }
    });
  }

  usingRun(promiseCreator) {
    this.usingTask.push(promiseCreator);
    promiseCreator().then(() => {
      promiseCreator.resolve();
      this.usingMove(promiseCreator);
      if (this.tasks.length > 0) {
        this.usingRun(this.tasks.shift());
      }
    });
  }

  usingMove(promiseCreator) {
    let index = this.usingTask.indexOf(promiseCreator);
    this.usingTask.splice(index, 1);
  }
}

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => new Promise(resolve => setTimeout(resolve, time)))
    .then(() => console.log(order));
};
addTask(400, 4); addTask(200, 2);
addTask(300, 3); addTask(100, 1);
// 输出顺序: 2, 4, 3, 1
```

#### 3️⃣ 实现 Request 并发控制器

控制最大并发请求数量，完成一个后再启动下一个。

```javascript
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;

  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      const len = results.push(res);
      if (len < urlCount && i + 1 < urlCount) {
        requestsQueue.shift();
        handleRequest(urls[++i]);
      } else if (len === urlCount) {
        typeof callback === 'function' && callback(results);
      }
    }).catch(e => {
      results.push(e);
      requestsQueue.shift();
      if (i + 1 < urlCount) {
        handleRequest(urls[++i]);
      } else if (results.length === urlCount) {
        typeof callback === 'function' && callback(results);
      }
    });

    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i]);
    }
  };
  handleRequest(urls[i]);
}

// handleFetchQueue(['url1','url2','url3'], 2, r => console.log('done', r.length));
```

#### 4️⃣ 实现 Queue 任务队列

链式调用 .task 注册任务，.start 后按顺序依次执行。

```javascript
function sleep(delay, callback) {
  return new Promise(resolve => {
    setTimeout(() => { callback(); resolve(); }, delay);
  });
}

class Queue {
  constructor() { this.listenser = []; }

  task(delay, callback) {
    this.listenser.push(() => sleep(delay, callback));
    return this;
  }

  async start() {
    for (let l of this.listenser) { await l(); }
  }
}

new Queue()
  .task(1000, () => console.log(1))
  .task(2000, () => console.log(2))
  .task(3000, () => console.log(3))
  .start();
```

#### 5️⃣ 频繁切换 Tab 精准显示（防抖应用）

防抖 + 请求取消，连续触发时只执行最后一次请求。

```javascript
let flag = false;
let xhr = null;

let request = (i) => {
  if (flag) { clearTimeout(xhr); }
  flag = true;
  xhr = setTimeout(() => {
    console.log('请求' + i + '响应成功');
    flag = false;
  }, Math.random() * 200);
};

let fetchData = debounce(request, 50);
```

#### 6️⃣ 抽奖系统（白名单优先）

白名单用户必定中奖，剩余名额从普通用户随机抽取。

```javascript
function lottery(whiteList, participant) {
  const targetNum = 20000;
  if (participant.length === 0) return [];
  if (participant.length < targetNum) return participant;

  let res = [], i = 0;
  const map = new Map();

  while (i < whiteList.length && res.length <= targetNum) {
    const pIndex = participant.indexOf(whiteList[i]);
    if (pIndex !== -1) {
      map.set(pIndex, true);
      res.push(whiteList[i]);
    }
    i++;
  }

  while (res.length < targetNum) {
    const index = Math.floor(Math.random() * participant.length);
    if (map.has(index)) continue;
    res.push(participant[index]);
    map.set(index, true);
  }
  return res;
}

const participants = Array.from({length: 50000}, (_, i) => 'user_' + i);
const whiteList = ['user_1', 'user_100', 'user_999'];
const winners = lottery(whiteList, participants);
console.log(winners.length); // 20000
console.log(winners.includes('user_1')); // true
```

#### 7️⃣ 基于快排分区找出最小的 k 个数

利用 partition 分区，pivot 索引等于 k 时返回前 k 个元素，平均 O(n)。

```javascript
function partition(arr, start, end) {
  const pivot = arr[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    if (arr[j] <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  }
  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  return i + 1;
}

function getLeastNumbers(arr, k) {
  const len = arr.length;
  let start = 0, end = len - 1;
  let index = partition(arr, start, end);
  while (index !== k) {
    if (index > k) { end = index - 1; }
    else { start = index + 1; }
    index = partition(arr, start, end);
  }
  return arr.slice(0, index);
}

console.log(getLeastNumbers([3,1,4,1,5,9,2,6], 3));
```

#### 8️⃣ 求两个日期中间的有效日期

逐月/逐天递增，直到超过结束日期。

```javascript
const getMonths = (startDateStr, endDateStr) => {
  let startTime = getDate(startDateStr).getTime();
  const endTime = getDate(endDateStr).getTime();
  const result = [];
  while (startTime < endTime) {
    let curDate = new Date(startTime);
    result.push(formatDate(curDate));
    curDate.setMonth(curDate.getMonth() + 1);
    startTime = curDate.getTime();
  }
  return result.slice(1);
};

const getDate = (dateStr) => {
  const [year, month] = dateStr.split('-');
  return new Date(year, month - 1);
};

const formatDate = (date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0');
};

function rangeDay(day1, day2) {
  const result = [];
  const dayTimes = 24 * 60 * 60 * 1000;
  const startTime = day1.getTime();
  const range = day2.getTime() - startTime;
  let total = 0;
  while (total <= range && range > 0) {
    result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'));
    total += dayTimes;
  }
  return result;
}

console.log(getMonths('2024-01', '2024-04')); // ['2024-02', '2024-03']
```

#### 9️⃣ 统计数组的最大差值

一次遍历找出最大值和最小值，相减即得极差。

```javascript
const maxDiff = arr => {
  let max = -Infinity, min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  return max - min;
};

console.log(maxDiff([1, 5, 3, 9, 2])); // 8
```

#### 🔟 Cookie 的设置、读取、删除

封装 document.cookie 操作，正则提取 cookie 值。

```javascript
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return decodeURI(arr[2]);
  }
  return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
```

### 🔟 面向对象与设计模式

#### 1️⃣ 停车场管理系统

ParkingLot、ParkingSpace、Car、DisplayBoard 四个类协作实现车辆进出管理。

```mermaid
flowchart TD
    A["ParkingLot 停车场"] --> B["ParkingSpace 停车位"]
    A --> C["DisplayBoard 展示牌"]
    D["Car 车辆"] --> A
```

```javascript
class ParkingLot {
  constructor(n) {
    this.parkSites = [];
    this.leftSites = n;
    this.board = new DisplayBoard();
    for (let i = 1; i <= n; i++) {
      this.parkSites.push(new ParkingSpace(i));
    }
  }

  inPark(car) {
    if (this.leftSites === 0) { console.log('停车位已满'); return; }
    if (car.site) { console.log(car.carId + '已在停车场'); return; }
    for (let i = 0; i < this.parkSites.length; i++) {
      const site = this.parkSites[i];
      if (site.car === null) {
        site.car = car; car.site = site;
        this.leftSites--; this.showLeftSites(); return;
      }
    }
  }

  outPark(car) {
    if (car.site === null) { console.log(car.carId + '不在停车场'); return; }
    for (let i = 0; i < this.parkSites.length; i++) {
      const site = this.parkSites[i];
      if (site.car.carId === car.carId) {
        site.car = null; car.site = null;
        this.leftSites++; this.showLeftSites(); return;
      }
    }
  }

  showLeftSites() { this.board.showLeftSapce(this.leftSites); }
}

class ParkingSpace {
  constructor(id) { this.id = id; this.car = null; }
}

class Car {
  constructor(carId) { this.carId = carId; this.site = null; }
  inPark(park) { park.inPark(this); }
  outPark(park) { park.outPark(this); }
}

class DisplayBoard {
  showLeftSapce(n) { console.log('当前剩余' + n + '个停车位'); }
}

const park = new ParkingLot(3);
const car1 = new Car('京A·88888');
car1.inPark(park);
// car2.inPark(park);
// car1.outPark(park);
```

#### 2️⃣ 深度优先和广度优先实现深拷贝

BFS 用队列按层遍历，DFS 用栈深度遍历，Map 处理循环引用。

```javascript
function getEmpty(o) {
  if (Object.prototype.toString.call(o) === '[object Object]') return {};
  if (Object.prototype.toString.call(o) === '[object Array]') return [];
  return o;
}

function deepCopyBFS(origin) {
  let queue = [], map = new Map();
  let target = getEmpty(origin);
  if (target !== origin) { queue.push([origin, target]); map.set(origin, target); }
  while (queue.length) {
    let [ori, tar] = queue.shift();
    for (let key in ori) {
      if (map.get(ori[key])) { tar[key] = map.get(ori[key]); continue; }
      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) { queue.push([ori[key], tar[key]]); map.set(ori[key], tar[key]); }
    }
  }
  return target;
}

function deepCopyDFS(origin) {
  let stack = [], map = new Map();
  let target = getEmpty(origin);
  if (target !== origin) { stack.push([origin, target]); map.set(origin, target); }
  while (stack.length) {
    let [ori, tar] = stack.pop();
    for (let key in ori) {
      if (map.get(ori[key])) { tar[key] = map.get(ori[key]); continue; }
      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) { stack.push([ori[key], tar[key]]); map.set(ori[key], tar[key]); }
    }
  }
  return target;
}

const origin = { a: { b: [1, 2], c: { d: 3 } } };
const bfs = deepCopyBFS(origin);
const dfs = deepCopyDFS(origin);
console.log(bfs.a.b === origin.a.b); // false
console.log(dfs.a.c === origin.a.c); // false
```

#### 3️⃣ 安全深度取值和 setter

路径不存在时返回默认值，避免 TypeError。

```javascript
function deepGet(obj, path, defaultValue = null) {
  const keys = path.split('.');
  if (keys.length === 0) return obj;
  const key = keys.shift();
  if (obj && obj.hasOwnProperty(key)) {
    return deepGet(obj[key], keys.join('.'), defaultValue);
  }
  return defaultValue;
}

function deepGet2(obj, path, defaultValue = null) {
  const keys = path.split('.');
  while (keys.length) {
    const key = keys.shift();
    if (obj && obj.hasOwnProperty(key)) { obj = obj[key]; }
    else { return defaultValue; }
  }
  return obj;
}

function deepSet(obj, path, value) {
  const keys = path.split('.');
  const key = keys.shift();
  if (keys.length === 0) { obj[key] = value; }
  else { obj[key] = deepSet(obj[key] || {}, keys.join('.'), value); }
  return obj;
}

const o = { a: { b: 1 } };
console.log(deepGet(o, 'a.b')); // 1
console.log(deepGet(o, 'x', 'default')); // 'default'
```

#### 4️⃣ JS 中三类循环对比

for 性能最优，for...in 遍历原型链最慢，for...of 基于迭代器。性能排序: for ≈ while > for...of > forEach > for...in。

```javascript
// for...in 遍历到原型链属性且不支持 Symbol
Object.prototype.fn = function fn() {};
let obj = { name: 'zhufeng', age: 12, [Symbol('AA')]: 100 };

// 正确遍历自身所有属性
let keys = Object.keys(obj);
if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
keys.forEach(key => { console.log(key, obj[key]); });
```

#### 5️⃣ 手动实现 Object.assign（浅拷贝）

遍历源对象可枚举自身属性，支持过滤 null/undefined 源。

```javascript
Object.myAssign = function (target, ...src) {
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== null && src[i] !== undefined) {
      for (let key in src[i]) {
        if (src[i].hasOwnProperty(key)) {
          target[key] = src[i][key];
        }
      }
    }
  }
  return target;
};

// 不覆盖已有属性的 merge 版本
function merge(target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      if (!(key in target)) { target[key] = source[key]; }
    }
  }
  return target;
}
```



## 💻 十四、代码输出题

```mermaid
mindmap
  root((代码输出))
    异步&事件循环
      Promise微任务
      async/await
      宏任务与微任务顺序
      Promise链式调用
      Promise静态方法
    this指向
      默认绑定
      隐式绑定
      显式绑定call/apply/bind
      new绑定
      箭头函数
      优先级
    作用域&变量提升
      var变量提升
      函数提升
      闭包
      作用域链
    原型&继承
      原型链查找
      constructor
      instanceof
      new操作
      属性覆盖
```

### 1️⃣ 异步 & 事件循环

```mermaid
flowchart TD
    subgraph 事件循环
        A["执行同步代码 宏任务"] --> B["清空微任务队列"]
        B --> C["更新渲染"]
        C --> D["执行下一个宏任务"]
        D --> B
    end
    subgraph 微任务
        E["Promise.then/catch/finally"]
        F["process.nextTick"]
        G["MutationObserver"]
    end
    subgraph 宏任务
        H["script整体代码"]
        I["setTimeout/setInterval"]
        J["I/O操作"]
        K["UI渲染"]
    end
```

#### 1️⃣ 代码输出结果

> 💡 **要点**：Promise 构造函数是**同步执行**的，`.then()` 注册的回调是**微任务**。若 Promise 状态一直为 `pending`，则 `.then()` 永远不会执行。

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```

输出结果如下：`1 2 4`

promise.then 是微任务，它会在所有的宏任务执行完之后才会执行，同时需要promise内部的状态发生变化，因为这里内部没有发生变化，一直处于pending状态，所以不输出3。

#### 2️⃣ 代码输出结果

> 💡 **要点**：Promise 构造函数**同步执行**并立即改变状态，`.then()` 是微任务延迟执行。注意 `promise1` 此时已是 `resolved`，而 `promise2` 还是 `pending`（因为 then 还没执行）。

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
```

输出结果如下：

```javascript
promise1
1 Promise{<resolved>: resolve1}
2 Promise{<pending>}
resolve1
```

#### 3️⃣ 代码输出结果

> 💡 **要点**：`setTimeout` 是**宏任务**，其中的 `resolve` 要在宏任务执行时才会调用，而 `.then()` 微任务需要等 `resolve` 之后才注册到微任务队列。

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```

输出结果如下：`1 2 4 timerStart timerEnd success`

#### 4️⃣ 代码输出结果

> 💡 **要点**：理解 **宏任务（MacroTask）与微任务（MicroTask）的交替执行规则**：每一轮宏任务执行完毕后，会清空当前所有的微任务，然后进行下一轮宏任务。

```mermaid
sequenceDiagram
    participant M as 宏任务
    participant μ as 微任务
    
    Note over M: 第一轮宏任务: script
    M->>μ: Promise.resolve().then
    M->>M: timer1加入宏任务队列
    M->>M: 打印 start
    M->>μ: 执行微任务
    μ->>μ: 打印 promise1
    μ->>M: timer2加入宏任务队列
    M->>M: 执行timer1, 打印 timer1
    M->>μ: Promise.resolve().then 加入微任务
    μ->>μ: 打印 promise2
    M->>M: 执行timer2, 打印 timer2
```

#### 5️⃣ 代码输出结果

> 💡 **要点**：Promise 的**状态一旦变更就不可逆转**（从 pending 变为 resolved/rejected 后即锁定），后续的 resolve/reject 调用均被忽略。

```javascript
const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});
promise.then((res) => {
    console.log('then:', res);
}).catch((err) => {
    console.log('catch:', err);
})
```

输出：`then：success1`

**Promise的状态在发生变化之后，就不会再发生变化。**

#### 6️⃣ 代码输出结果

> 💡 **要点**：`.then()` 接受的参数必须是**函数**，传入非函数（如数字、对象等）会导致**值透传**——前一个 Promise 的值直接传递到下一个 `.then()`。

```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

输出：`1`

then方法接受的参数必须是函数，如果传递的并非是一个函数，实际上会将其解释为then(null)，这就会导致前一个Promise的结果会透传到后面。

#### 7️⃣ 代码输出结果

> 💡 **要点**：`.then()` 会返回一个新的 Promise。初始状态为 `pending`，等到 then 中的回调执行完毕后，新 Promise 才会改变状态。`throw` 会使新 Promise 变为 `rejected`。

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => { resolve('success') }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```

输出：

```javascript
promise1 Promise {<pending>}
promise2 Promise {<pending>}
Uncaught (in promise) Error: error!!!
promise1 Promise {<fulfilled>: "success"}
promise2 Promise {<rejected>: Error: error!!}
```

#### 8️⃣ 代码输出结果

> 💡 **要点**：Promise 链中，`.catch()` 只在前面的 Promise 为 `rejected` 时才会执行。未出错时 `.catch()` 会被跳过，值直接传给下一个 `.then()`。

```javascript
Promise.resolve(1)
  .then(res => { console.log(res); return 2; })
  .catch(err => { return 3; })
  .then(res => { console.log(res); });
```

输出：`1 2`

#### 9️⃣ 代码输出结果

> 💡 **要点**：在 `.then()` 中 `return new Error(...)` 不会触发 `.catch()`，因为返回的 Error 对象会被当作**普通值**包裹成 resolved Promise。要让 catch 捕获，需要使用 `throw new Error(...)` 或 `return Promise.reject(...)`。

```javascript
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
```

输出：`"then: " "Error: error!!!"`

返回任意一个非 promise 的值都会被包裹成 promise 对象。

#### 🔟 代码输出结果

> 💡 **要点**：`.then()` 或 `.catch()` 的返回值**不能是 Promise 自身**，否则会形成**死循环**（Chaining cycle），抛出 `TypeError`。

```javascript
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
```

输出：`Uncaught (in promise) TypeError: Chaining cycle detected for promise`

`.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。

#### 1️⃣1️⃣ 代码输出结果

> ⚠️ **易错点**：与第 6 题类似，`.then()` 传非函数导致**值透传**。`Promise.resolve(3)` 虽然传给了 `.then()`，但 `.then()` 期望的是函数而非 Promise 对象，所以不会执行。

```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

输出：`1`

传入非函数则会发生**值透传**。

#### 1️⃣2️⃣ 代码输出结果

> 💡 **要点**：`.then()` 的**第二个参数**（错误处理回调）和 `.catch()` 都能捕获错误，但被第二个参数捕获的错误**不会再传递给**后续的 `.catch()`。

```javascript
Promise.reject('err!!!')
  .then((res) => { console.log('success', res) },
        (err) => { console.log('error', err) })
  .catch(err => { console.log('catch', err) })
```

输出：`error err!!!`

错误直接被then的第二个参数捕获，就不会被catch捕获了。

#### 1️⃣3️⃣ 代码输出结果

> 💡 **要点**：`.finally()` **不管 Promise 成功还是失败都会执行**，但它**不接受任何参数**，且返回值**不会影响**链中下一个 `.then()` 收到的值（仍为前一个 Promise 的值）。

```javascript
Promise.resolve('1')
  .then(res => { console.log(res) })
  .finally(() => { console.log('finally') })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
    return '我是finally2返回的值'
  })
  .then(res => { console.log('finally2后面的then函数', res) })
```

输出：`1 finally2 finally finally2后面的then函数 2`

**.finally()** 不管Promise对象最后的状态如何都会执行，不接受任何参数，返回默认是上一次的Promise对象值。

#### 1️⃣4️⃣ 代码输出结果

> 💡 **要点**：`Promise.all` 接收一个 Promise 数组，**所有 Promise 都成功**后才进入 `.then()`，结果数组**按传入顺序**返回。多个 Promise **同步启动**，但各自异步执行。

```javascript
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then(res => console.log(res))
```

输出：`1 2 3 [1, 2, 3]`

三个函数是同步执行的，结果和函数的执行顺序一致。

#### 1️⃣5️⃣ 代码输出结果

> 💡 **要点**：`Promise.all` 遵循**快速失败**原则——只要有一个 Promise 被 `rejected`，整体立即进入 `.catch()`，但**其他 Promise 仍会继续执行**（只是其结果被忽略）。

```javascript
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
       .then(res => console.log(res))
       .catch(err => console.log(err))
```

输出：

```javascript
// 1s后输出
1 3
// 2s后输出
2 Error: 2
// 4s后输出
4
```

catch捕获到了第一个错误`runReject(2)`的结果。

#### 1️⃣6️⃣ 代码输出结果

> 💡 **要点**：`Promise.race` 返回**第一个状态变更**（无论是 resolved 还是 rejected）的 Promise 结果。其他慢的 Promise 虽然会继续执行，但结果不会被消费。

```javascript
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
```

输出：`1 'result: ' 1 2 3`

then只会捕获第一个成功的方法。

#### 1️⃣7️⃣ async/await 输出

> 💡 **要点**：`await` 后面的代码相当于包裹在 `new Promise` 的构造函数中同步执行，而 `await` 下面的代码相当于放在 `.then()` 中的**微任务**，会等待当前宏任务中的同步代码执行完毕后执行。

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')
```

输出：`async1 start async2 start async1 end`

await 后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中。

#### 1️⃣8️⃣ async/await + Promise + setTimeout 综合

> 💡 **要点**：经典**面试综合题**，考察三者的执行顺序：**同步代码 → 微任务（await 后续 + Promise.then）→ 宏任务（setTimeout）**。注意 `await` 会先执行右侧函数，然后将后续代码放入微任务队列。

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() { console.log("setTimeout"); }, 0);
async1();
new Promise(resolve => {
  console.log("promise1");
  resolve();
}).then(function() { console.log("promise2"); });
console.log('script end')
```

输出：`script start async1 start async2 promise1 script end async1 end promise2 setTimeout`

#### 1️⃣9️⃣ Promise 嵌套

> 💡 **要点**：Promise 的 `resolve` 是同步调用的，但 `.then()` 是微任务。已经 resolve 的 Promise 后续再 resolve/reject 无效，所以 `setTimeout` 中的 `resolve(6)` 不会产生效果。

```javascript
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => { console.log(arg); });
}));
first().then((arg) => { console.log(arg); });
console.log(4);
```

```mermaid
sequenceDiagram
    participant S as 同步
    participant μ as 微任务
    participant M as 宏任务
    
    S->>S: 打印 3
    S->>S: 进入p打印7
    S->>M: 定时器加入宏任务
    S->>S: p.resolve(1)
    S->>S: first.resolve(2)
    S->>μ: p.then 加入微任务
    S->>μ: first().then 加入微任务
    S->>S: 打印 4
    μ->>μ: 打印 1
    μ->>μ: 打印 2
    M->>M: 打印 5
    M->>M: resolve(6) 不执行
    M->>M: console.log(p) 打印 Promise{<resolved>: 1}
```

### 2️⃣ this 指向

#### 1️⃣ 代码输出结果

> 💡 **要点**：**箭头函数不绑定 this**，它的 `this` 继承自定义时的**外层作用域**（此处为全局/模块作用域）。`call/apply/bind` 无法改变箭头函数的 this 指向。

```javascript
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}
obj.say()
var anotherObj = { a: 30 }
obj.say.apply(anotherObj)
```

输出：`10 10`

箭头函数不绑定this，它的this来自其父级所处的上下文。

如果是普通函数，say方法中的this就会指向他所在的对象，输出：`20 30`。

#### 2️⃣ this 绑定优先级

> 💡 **要点**：this 的 **4 种绑定规则**的优先级：**new 绑定 > 显式绑定（call/apply/bind）> 隐式绑定（对象调用）> 默认绑定（全局对象）**。bind 返回的函数被 new 时，bind 绑定失效。

```mermaid
flowchart LR
    A["this绑定优先级"] --> B["new绑定 最高"]
    A --> C["显式绑定 call/apply/bind"]
    A --> D["隐式绑定 对象调用"]
    A --> E["默认绑定 全局对象 最低"]
```

```javascript
function foo(something){
    this.a = something
}
var obj1 = {}
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a);  // 3
```

**结论：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

#### 3️⃣ 综合 this 题目

> 💡 **要点**：`fn()` 是**默认绑定**，this 指向全局（或 undefined 严格模式）。`arguments[0]()` 是**隐式绑定**，this 指向 `arguments` 对象，因此 `this.length` 等于传入的参数个数。

```javascript
var length = 10;
function fn() { console.log(this.length); }
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};
obj.method(fn, 1);
```

输出：`10 2`

- 第一次fn()，this指向window，输出10
- 第二次arguments[0]()，this指向arguments，传了两个参数，输出arguments长度为2

### 3️⃣ 作用域 & 变量提升

#### 1️⃣ 代码输出结果

> 💡 **要点**：`var x = y = 1` **从右向左执行**：`y = 1` 没有 `var` 声明，成为**全局变量**；`var x` 是**函数局部变量**，外部无法访问。

```javascript
(function(){
   var x = y = 1;
})();
var z;
console.log(y); // 1
console.log(z); // undefined
console.log(x); // Uncaught ReferenceError: x is not defined
```

var x = y = 1 实际上是从右往左执行，y = 1 没有var声明，所以是全局变量，x是局部变量。

#### 2️⃣ 变量提升

> 💡 **要点**：`var` 声明会被提升到**函数作用域顶部**。IIFE 内部的 `var friendName` 被提升到函数顶部，导致 `typeof friendName` 为 `'undefined'`（覆盖了外部变量），所以进入 if 分支。

```javascript
var friendName = 'World';
(function() {
  if (typeof friendName === 'undefined') {
    var friendName = 'Jack';
    console.log('Goodbye ' + friendName);
  } else {
    console.log('Hello ' + friendName);
  }
})();
```

```mermaid
flowchart TD
    A["变量提升"] --> B["var声明提升到函数作用域顶部"]
    B --> C["代码等价于在函数顶部声明var name"]
    C --> D["typeof name 为 undefined"]
    D --> E["进入if分支 输出Goodbye Jack"]
```

输出：`Goodbye Jack`

#### 3️⃣ 闭包经典题

> 💡 **要点**：闭包中的内部函数**记住了外部函数的 `n` 值**。关键在于区分每次返回的对象中 `fun` 方法调用时传入的 `n` 是由哪个作用域提供的——这是闭包的核心考点。

```javascript
function fun(n, o) {
  console.log(o)
  return {
    fun: function(m){
      return fun(m, n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);
```

输出：

```javascript
undefined  0  0  0
undefined  0  1  2
undefined  0  1  1
```

闭包中内部函数记住了外部函数的n值，每次调用都会记住当时传入的参数。

### 4️⃣ 原型 & 继承

#### 1️⃣ 原型链

> 💡 **要点**：JavaScript 通过 `__proto__` 链接形成**原型链**，最顶层是 `Object.prototype.__proto__ === null`。`Person.prototype.constructor` 指向 `Person` 自身。

```mermaid
flowchart TD
    A["p2 实例"] --> B["p2.__proto__"]
    B --> C["Person.prototype"]
    C --> D["Person.prototype.constructor"]
    D --> E["Person"]
    C --> F["Person.prototype.__proto__"]
    F --> G["Object.prototype"]
    G --> H["Object.prototype.__proto__"]
    H --> I["null"]
```

```javascript
function Person(name) {
    this.name = name
}
var p2 = new Person('king');
console.log(p2.__proto__) //Person.prototype
console.log(p2.__proto__.__proto__) //Object.prototype
console.log(p2.__proto__.__proto__.__proto__) // null
console.log(Person.constructor)//Function
console.log(Function.prototype.__proto__)//Object.prototype
```

#### 2️⃣ 综合原型题

> 💡 **要点**：属性查找优先级：**实例自身属性 > 原型属性 > 静态方法**。`new Foo()` 时函数内部的 `Foo.a` 覆盖了外部的静态方法，而 `this.a` 则成为实例属性。

```javascript
function Foo(){
    Foo.a = function(){ console.log(1); }
    this.a = function(){ console.log(2); }
}
Foo.prototype.a = function(){ console.log(3); }
Foo.a = function(){ console.log(4); }

Foo.a();      // 4 - 静态方法
let obj = new Foo();
obj.a();      // 2 - 实例方法优先于原型
Foo.a();      // 1 - Foo函数内部覆盖了静态方法
```

#### 3️⃣ 原型继承

> 💡 **要点**：**原型链继承**的核心是 `SubType.prototype = new SuperType()`，子类原型指向父类实例，从而能够访问父类原型上的方法。这是最经典的继承方式之一。

```javascript
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue()); // true
```

#### 4️⃣ 原型属性查找

> 💡 **要点**：**实例属性 > 原型属性**。`new B()` 时 `this.n = 9999` 在实例上创建了自身属性，不会去原型查找。而 `new C()` 没有给 `this.n` 赋值，读取时沿原型链找到 `A.n`（已被 `A.n++` 改为 4400）。

```javascript
var A = {n: 4399};
var B =  function(){this.n = 9999};
var C =  function(){var n = 8888};
B.prototype = A;
C.prototype = A;
var b = new B();
var c = new C();
A.n++
console.log(b.n); // 9999 - 自身有n属性
console.log(c.n); // 4400 - 自身无n,去原型找A.n为4400
```

### 5️⃣ 空值合并 & 可选链

#### 1️⃣ ?? vs || 对比

> 💡 **要点**：`||` 判断**所有 falsy 值**（0、''、false、null、undefined、NaN），而 `??` 只判断 **null 和 undefined**。因此 `0 ?? 'default'` 返回 0，`0 || 'default'` 返回 'default'。

```javascript
const a = 0;
const b = '';
const c = false;
console.log(a || 'default');  // ?
console.log(a ?? 'default');  // ?
console.log(b || 'default');  // ?
console.log(b ?? 'default');  // ?
console.log(c || 'default');  // ?
console.log(c ?? 'default');  // ?
```

**输出：**

```javascript
default
0
default

default
false
```

```mermaid
flowchart TD
    subgraph 逻辑或
        A1["左值"] --> B1{"左值 为 falsy?"}
        B1 -->|是 0 '' false null undefined NaN| C1["返回右值"]
        B1 -->|否| D1["返回左值"]
    end
    subgraph 空值合并??
        A2["左值"] --> B2{"左值 为 null/undefined?"}
        B2 -->|是| C2["返回右值"]
        B2 -->|否| D2["返回左值"]
    end
```

**解析：** `||` 判断**所有 falsy 值**（0、''、false、null、undefined、NaN），而 `??` 只判断 **null 和 undefined**。所以 `0 ?? 'default'` 返回 0，而 `0 || 'default'` 返回 'default'。同理，空字符串和 false 在 `??` 下被认为是有效值。

#### 2️⃣ 可选链 ?. 配合 ??

> 💡 **要点**：**可选链 `?.`** 在遇到 `null/undefined` 时会**短路**返回 `undefined`，不会报错。结合 `??` 使用可以优雅地处理深层嵌套数据的默认值。

```javascript
const obj = { a: { b: 0 } };
console.log(obj?.a?.b ?? 'default');   // ?
console.log(obj?.x?.y ?? 'default');   // ?
console.log(obj?.a?.c?.d ?? 'fallback'); // ?
```

**输出：**

```javascript
0
default
fallback
```

**解析：** `obj?.a?.b` 正常访问到 0，`??` 判断 0 不是 null/undefined，所以返回 0。`obj?.x?.y` 中 x 不存在，可选链短路返回 undefined，`??` 检测到 undefined 返回 'default'。`obj?.a?.c?.d` 中 c 不存在，短路返回 undefined，返回 'fallback'。

#### 3️⃣ 混合运算

> 💡 **要点**：`??` 的优先级**高于** `||`，因此 `null ?? 'a' || 'b'` 等价于 `(null ?? 'a') || 'b'`。了解运算符优先级可以避免意外的逻辑错误。

```javascript
const x = null ?? 'a' || 'b';
const y = (null ?? 'a') || 'b';
console.log(x); // ?
console.log(y); // ?
```

**输出：**

```javascript
a
a
```

**解析：** `null ?? 'a' || 'b'` 等价于 `(null ?? 'a') || 'b'`，因为 `??` 优先级高于 `||`。`null ?? 'a'` 返回 `'a'`，`'a' || 'b'` 返回 `'a'`，所以两者结果相同。如果写成 `null ?? ('a' || 'b')`，结果相同但运算顺序不同。

### 6️⃣ Promise 进阶方法

#### 1️⃣ Promise.allSettled

> 💡 **要点**：`Promise.allSettled` **不会短路**，会等待所有 Promise 完成（无论成功或失败），返回每个 Promise 的结果对象 `{status, value/reason}`。

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject('err');
const p3 = new Promise(r => setTimeout(() => r(3), 100));

Promise.allSettled([p1, p2, p3]).then(console.log);
```

**输出：**

```javascript
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'err' },
  { status: 'fulfilled', value: 3 }
]
```

```mermaid
flowchart TD
    subgraph Promise.all
        A1["任一拒绝"] --> B1["整体立即拒绝"]
    end
    subgraph Promise.allSettled
        A2["全部执行完毕"] --> B2["返回每个结果 包含status:fulfilled/rejected"]
    end
    subgraph Promise.any
        A3["任一成功"] --> B3["整体立即成功"]
        A3 -->|全部失败| C3["拒绝并返回AggregateError"]
    end
    subgraph Promise.race
        A4["任一状态变更"] --> B4["整体立即跟随"]
    end
```

**解析：** `Promise.allSettled` 不会短路，等待所有 promise 完成，返回每个 promise 的结果对象（包含 status 和 value/reason）。即使 p2 被拒绝，仍会等待 p3 的 100ms 定时器完成再输出。

#### 2️⃣ Promise.any

> 💡 **要点**：`Promise.any` 返回**第一个成功**的 Promise 结果，忽略所有拒绝。只有**全部失败**时才会进入 catch，抛出 `AggregateError`。

```javascript
const p1 = Promise.reject('err1');
const p2 = Promise.reject('err2');
const p3 = Promise.resolve('success');

Promise.any([p1, p2, p3]).then(console.log).catch(console.log);
```

**输出：**

```javascript
success
```

**解析：** `Promise.any` 返回第一个成功的 promise 结果。p3 立即成功，所以输出 'success'。p1、p2 的拒绝被忽略。如果所有 promise 都失败，才会进入 catch。

#### 3️⃣ Promise.any 全部失败

> 💡 **要点**：当 `Promise.any` 的所有 Promise 都失败时，抛出 `AggregateError`，其 `errors` 属性是一个包含所有拒绝原因的数组。

```javascript
const p1 = Promise.reject('err1');
const p2 = Promise.reject('err2');

Promise.any([p1, p2]).catch(err => {
  console.log(err.name);
  console.log(err.errors);
});
```

**输出：**

```javascript
AggregateError
['err1', 'err2']
```

**解析：** 当 `Promise.any` 的所有 promise 都失败时，会抛出一个 `AggregateError` 类型的错误。`err.name` 为 'AggregateError'，`err.errors` 是一个数组，包含所有 promise 的拒绝原因。

### 7️⃣ Generator & 迭代器

#### 1️⃣ 基础 Generator

> 💡 **要点**：Generator 函数通过 `yield` 暂停执行并返回值。`return` 也会返回值并将 `done` 置为 `true`。之后调用 `next()` 返回 `{value: undefined, done: true}`。

```javascript
function* gen() {
  yield 1;
  yield 2;
  return 3;
}
const g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
```

**输出：**

```javascript
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: true }
{ value: undefined, done: true }
```

```mermaid
flowchart LR
    A["开始"] --> B["yield 1"]
    B --> C["g.next => {value:1, done:false}"]
    C --> D["yield 2"]
    D --> E["g.next => {value:2, done:false}"]
    E --> F["return 3"]
    F --> G["g.next => {value:3, done:true}"]
    G --> H["g.next => {value:undefined, done:true}"]
```

**解析：** Generator 函数通过 `yield` 暂停执行并返回值。`return` 也会返回值，同时将 `done` 置为 true。之后再次调用 `next()` 返回 `{value: undefined, done: true}`。

#### 2️⃣ Generator + yield 委托

> 💡 **要点**：`yield*` 表达式将执行**委托给另一个 Generator**，相当于内联展开被委托的 Generator 中的所有 yield。`[...gen1()]` 展开迭代器收集所有 yield 的值（不包含 return）。

```javascript
function* gen1() {
  yield 1;
  yield* gen2();
  yield 4;
}
function* gen2() {
  yield 2;
  yield 3;
}
console.log([...gen1()]);
```

**输出：**

```javascript
[1, 2, 3, 4]
```

**解析：** `yield*` 表达式用于委托给另一个 generator。当执行到 `yield* gen2()` 时，进入 gen2 并依次 yield 2 和 3，然后回到 gen1 继续 yield 4。`[...gen1()]` 展开迭代器，收集所有 yield 的值（不包括 return 的值）。

#### 3️⃣ async Generator

> 💡 **要点**：**异步 Generator** 可同时使用 `await` 和 `yield`：先用 `await` 等待 Promise，再 `yield` 结果。`for await...of` 用于消费异步迭代器。

```javascript
async function* asyncGen() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
}
(async () => {
  for await (const val of asyncGen()) {
    console.log(val);
  }
})();
```

**输出：**

```javascript
1
2
```

**解析：** 异步 Generator 可以同时使用 `await` 和 `yield`。每次迭代时，先用 `await` 等待 promise 完成，再 `yield` 结果。`for await...of` 用于消费异步迭代器。

### 8️⃣ Proxy & Reflect

#### 1️⃣ Proxy 基础

> 💡 **要点**：Proxy 通过**陷阱（trap）** 拦截对象的基础操作。`get` 陷阱拦截属性读取，`set` 陷阱拦截属性赋值，需返回 `true` 表示成功。修改 proxy 会同步影响原对象（因为操作的是 target）。

```javascript
const obj = { a: 1, b: 2 };
const proxy = new Proxy(obj, {
  get(target, key) {
    return key in target ? target[key] : 'not found';
  },
  set(target, key, value) {
    console.log(`set ${key} = ${value}`);
    target[key] = value;
    return true;
  }
});
console.log(proxy.a);
console.log(proxy.c);
proxy.b = 3;
console.log(obj.b);
```

**输出：**

```javascript
1
not found
set b = 3
3
```

```mermaid
flowchart TD
    subgraph Proxy 拦截流程
        A["proxy.a"] --> B{"get陷阱"}
        B --> C{"a in target?"}
        C -->|是| D["返回 target.a = 1"]
        C -->|否| E["返回 not found"]
        
        F["proxy.b = 3"] --> G{"set陷阱"}
        G --> H["打印 set b = 3"]
        H --> I["target.b = 3"]
        I --> J["返回 true"]
    end
```

**解析：** Proxy 的 `get` 陷阱拦截属性读取，当 key 不在目标对象中时返回 'not found'。`set` 陷阱拦截属性赋值，可以在赋值前后执行自定义逻辑。修改 proxy 会同步影响原对象（因为修改的是 target）。

#### 2️⃣ Proxy vs defineProperty

> 💡 **要点**：Proxy 只能拦截通过 proxy 对象进行的操作。`proxy.arr` 触发 get 陷阱返回原数组引用后，`.push()` 直接在原数组上操作，不再触发 Proxy 拦截。Proxy 相比 `Object.defineProperty` 能拦截更多底层操作（如数组索引赋值）。

```javascript
const data = { arr: [1, 2, 3] };
const proxy = new Proxy(data, {
  get(target, key) {
    console.log(`get: ${key}`);
    return target[key];
  }
});
proxy.arr.push(4); // 会输出什么？
```

**输出：**

```javascript
get: arr
```

**解析：** Proxy 只拦截了 `get` 操作。`proxy.arr` 触发了 get 陷阱打印 "get: arr"，返回的是原数组引用。后续 `.push(4)` 直接在原数组上操作，不会触发 Proxy 的 get 陷阱（因为 push 内部通过索引访问数组元素是在数组内部进行的）。相比之下，`Object.defineProperty` 无法监听数组元素的增删（push、pop 等），而 Proxy 可以拦截 `[[Get]]`、`[[Set]]` 等底层操作。

#### 3️⃣ Reflect 使用

> 💡 **要点**：`Reflect` 提供了一套操作对象的**规范化 API**。`Reflect.getPrototypeOf` 获取原型，`Reflect.ownKeys` 返回对象自身所有属性键（包括不可枚举和 Symbol 属性）。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
// 使用Reflect检测
console.log(Reflect.getPrototypeOf(Dog) === Animal);
console.log(Reflect.ownKeys(new Dog('Buddy', 'Lab')));
```

**输出：**

```javascript
true
['name', 'breed']
```

**解析：** `Reflect.getPrototypeOf(Dog)` 返回 Dog 的原型，即 Animal（因为 `class Dog extends Animal`）。`Reflect.ownKeys` 返回对象自身的所有属性键（包括不可枚举和 Symbol 属性），Buddy 实例有 name 和 breed 两个自身属性。

### 9️⃣ Class 语法 & 继承

#### 1️⃣ Class 基础

> 💡 **要点**：`extends` 实现继承，`super()` 必须在子类 constructor 中首先调用以初始化 this。子类会继承父类原型上的方法，`instanceof` 沿原型链检查。

```javascript
class Parent {
  constructor() {
    this.name = 'parent';
  }
  sayHello() {
    console.log('Hello from ' + this.name);
  }
}
class Child extends Parent {
  constructor() {
    super();
    this.name = 'child';
  }
}
const c = new Child();
c.sayHello();
console.log(c instanceof Parent);
console.log(c instanceof Child);
```

**输出：**

```javascript
Hello from child
true
true
```

```mermaid
flowchart TD
    A["Child实例 c"] --> B["c.__proto__"]
    B --> C["Child.prototype"]
    C --> D["Child.prototype.__proto__"]
    D --> E["Parent.prototype"]
    E --> F["Parent.prototype.__proto__"]
    F --> G["Object.prototype"]
    G --> H["null"]
    
    C --> I["Child.prototype.constructor"]
    I --> J["Child"]
    E --> K["Parent.prototype.constructor"]
    K --> L["Parent"]
```

**解析：** `super()` 必须在子类 constructor 中调用，它会调用父类的构造函数初始化 this。Child 类继承了 Parent 的 sayHello 方法，由于 this.name 在子类 constructor 中被覆盖为 'child'，所以输出 'Hello from child'。`instanceof` 检查原型链，c 同时是 Child 和 Parent 的实例。

#### 2️⃣ 静态属性和私有字段

> 💡 **要点**：`static` 属性定义在**类本身**（所有实例共享）。`#` 开头的**私有字段**是 JavaScript 的**硬性私有**机制，只能在类内部访问，外部访问会抛出语法错误。

```javascript
class Foo {
  static count = 0;
  #secret = 'hidden';
  
  constructor() {
    Foo.count++;
  }
  
  getSecret() {
    return this.#secret;
  }
}
const f1 = new Foo();
const f2 = new Foo();
console.log(Foo.count);
console.log(f1.getSecret());
console.log(f1.#secret); // 报错?
```

**输出：**

```javascript
2
hidden
Uncaught SyntaxError: Private field '#secret' must be declared in an enclosing class
```

**解析：** `static count` 是类本身的属性，所有实例共享。创建了两个实例，count 为 2。`#secret` 是私有字段，只能在类内部通过 `this.#secret` 访问，`getSecret()` 方法可以正常返回。外部直接访问 `f1.#secret` 会抛出语法错误，这是 JavaScript 的**硬性私有**机制。

#### 3️⃣ super 关键字

> 💡 **要点**：`super()` 必须在子类 constructor 中使用 `this` **之前**调用。执行顺序：先进入子类 constructor → 调用 `super()` 进入父类 constructor → 回到子类继续执行。

```javascript
class A {
  constructor() {
    console.log('A');
  }
}
class B extends A {
  constructor() {
    console.log('B start');
    super();
    console.log('B end');
  }
}
new B();
```

**输出：**

```javascript
B start
A
B end
```

**解析：** 子类 constructor 中 `super()` 必须在 `this` 使用前调用（ES6 要求）。执行顺序是：先进入 B 的 constructor（打印'B start'），然后调用 `super()` 进入 A 的 constructor（打印'A'），最后回到 B 继续执行（打印'B end'）。这保证了父类的初始化先于子类的自定义逻辑。

### 🔟 Map / Set / WeakMap / WeakSet

#### 1️⃣ Map 与 Object 区别

> 💡 **要点**：Map 的 key 可以是**任意类型**（包括对象、数字），而 Object 的 key 只能是字符串或 Symbol。Map 有 `size` 属性，可直接 `for...of` 遍历，且**保持插入顺序**。

```javascript
const map = new Map();
const objKey = { id: 1 };
map.set(objKey, 'value');
map.set('key', 'value2');
map.set(42, 'value3');

console.log(map.size);
console.log(map.get(objKey));
console.log(map.has(42));

for (const [k, v] of map) {
  console.log(typeof k, v);
}
```

**输出：**

```javascript
3
value
true
object value
string value2
number value3
```

**解析：** Map 的 key 可以是任意类型（对象、原始值），而 Object 的 key 只能是字符串或 Symbol。Map 有 `size` 属性直接获取元素数量，可以 `for...of` 直接遍历（Object 需要 `Object.keys()` 或 `Object.entries()`）。Map 保持插入顺序。

#### 2️⃣ Set 唯一性

> 💡 **要点**：Set 中的值**唯一**（自动去重）。`NaN` 在 Set 中被视为相等（尽管 `NaN !== NaN`），只添加一次。两个 `{}` 是**不同引用**，都会被添加。

```javascript
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log([...set]);

set.add(NaN);
set.add(NaN);
set.add({});
set.add({});
console.log(set.size);
```

**输出：**

```javascript
[1, 2, 3, 4, 5]
7
```

**解析：** Set 中的值具有唯一性，重复的 3 和 4 被自动去重。`NaN` 在 Set 中被视为相等（虽然 `NaN !== NaN`），所以只添加一次。两个 `{}` 是不同的引用，所以都会被添加。最终 Set 包含：1, 2, 3, 4, 5, NaN, {}, {} → 共 7 个元素。

#### 3️⃣ WeakMap 弱引用

> 💡 **要点**：WeakMap 的 key 是**弱引用**，不会阻止垃圾回收。当 `obj = null` 断开强引用后，对象被 GC 回收，WeakMap 中的对应键值对**自动清除**。WeakMap 不可迭代，无 `size` 属性，key 必须是对象。

```javascript
let obj = { data: 'important' };
const wm = new WeakMap();
wm.set(obj, 'metadata');
obj = null;
// 此时WeakMap中的键会被GC回收吗？
console.log(wm.has(obj)); // ?
```

**输出：**

```javascript
false
```

```mermaid
flowchart TD
    subgraph WeakMap弱引用
        A["obj 引用"] -->|强引用| B["{data: important}"]
        C["WeakMap"] -->|弱引用| B
        A -.->|obj = null| D["强引用断开"]
        B -.->|GC回收| E["对象被回收"]
        E --> F["WeakMap中对应键值对自动清除"]
    end
    subgraph Map强引用
        G["obj 引用"] -->|强引用| H["{data: important}"]
        I["Map"] -->|强引用| H
        G -.->|obj = null| J["强引用断开"]
        H -.->|Map持有强引用 不会被回收| K["内存泄漏风险"]
    end
```

**解析：** WeakMap 的 key 是**弱引用**，不会阻止垃圾回收。当 `obj = null` 断开强引用后，对象没有其他强引用指向它，会被 GC 回收。此时 `wm.has(obj)` 传入 `null`，返回 false（且 WeakMap 已经自动清除了该键值对）。WeakMap 不可迭代，没有 `size` 属性，key 必须是对象。**注意**：`wm.has(obj)` 中 obj 已经是 null，WeakMap 的 key 只能是对象，所以这里实际传入了 null，返回 false。设计上 WeakMap 不允许原始值作为 key，传入非对象会抛出 TypeError，但 null 不会报错，而是返回 false。更准确地说，WeakMap 中已无该键值对，`wm.has(null)` 返回 false。

**WeakMap 的主要用途：** 存储 DOM 节点的元数据（节点被移除后自动清理，防止内存泄漏）、缓存私有数据。

---

## 📋 总结

```mermaid
mindmap
  root((现代 JavaScript))
    ES2020+
      可选链 ?.
      空值合并 ??
      globalThis
      Promise.allSettled
    ES2022
      Top-level await
      Error cause
      Promise.withResolvers
      Array.fromAsync
      .at（） 方法
    ES2023+
      Array findLast/findLastIndex
      Immutable Array (toSorted/toReversed)
      Hashbang Grammar
      Set 新方法
      Iterator Helpers
    ES2024+
      Object.groupBy / Map.groupBy
      RegExp v flag (Unicode Sets)
      JSON.rawJSON
      Promise.try()
    Web API
      IntersectionObserver: 懒加载/曝光
      ResizeObserver: 自适应
      MutationObserver: DOM监控
      AbortController: 请求中止
      PerformanceObserver: 性能监控
      BroadcastChannel: 跨标签通信
      Navigation API: 前端路由
      File System Access: 本地读写
      Screen Wake Lock: 屏幕常亮
      Clipboard API: 异步剪贴板
    新工具
      structuredClone: 深度克隆
      WeakRef / FinalizationRegistry: 弱引用
```
