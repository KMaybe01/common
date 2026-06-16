import{f as n,o as a,c as e,a9 as p}from"./chunks/framework.BSdZLMbP.js";const h=JSON.parse('{"title":"React 调试与场景","description":"","frontmatter":{"title":"React 调试与场景"},"headers":[],"relativePath":"S2-框架深入/React19/07-调试与场景.md","filePath":"S2-框架深入/React19/07-调试与场景.md","lastUpdated":1781504964000}'),t={name:"S2-框架深入/React19/07-调试与场景.md"};function l(i,s,c,r,o,u){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="第六部分-常见-bug-与调试技巧" tabindex="-1">第六部分：常见 Bug 与调试技巧 <a class="header-anchor" href="#第六部分-常见-bug-与调试技巧" aria-label="Permalink to &quot;第六部分：常见 Bug 与调试技巧&quot;">​</a></h1><h2 id="_1️⃣-闭包陷阱" tabindex="-1">1️⃣ 闭包陷阱 <a class="header-anchor" href="#_1️⃣-闭包陷阱" aria-label="Permalink to &quot;1️⃣ 闭包陷阱&quot;">​</a></h2><h3 id="📍-问题场景" tabindex="-1">📍 问题场景 <a class="header-anchor" href="#📍-问题场景" aria-label="Permalink to &quot;📍 问题场景&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 问题：闭包捕获旧值</span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const timer = setInterval(() =&gt; {</span></span>
<span class="line"><span>      console.log(count);  // ❌ 始终输出 0</span></span>
<span class="line"><span>      setCount(count + 1); // ❌ 始终设置为 1</span></span>
<span class="line"><span>    }, 1000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return () =&gt; clearInterval(timer);</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;{count}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 解决方案 1：使用函数式更新</span></span>
<span class="line"><span>setCount(prev =&gt; prev + 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 解决方案 2：使用 useRef</span></span>
<span class="line"><span>const countRef = useRef(0);</span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>  countRef.current = count;</span></span>
<span class="line"><span>}, [count]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>  const timer = setInterval(() =&gt; {</span></span>
<span class="line"><span>    console.log(countRef.current);  // ✅ 总是最新值</span></span>
<span class="line"><span>    setCount(countRef.current + 1);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return () =&gt; clearInterval(timer);</span></span>
<span class="line"><span>}, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 解决方案 3：使用 useEffect 的依赖</span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>  const timer = setInterval(() =&gt; {</span></span>
<span class="line"><span>    console.log(count);  // ✅ 依赖变化时重新创建</span></span>
<span class="line"><span>    setCount(count + 1);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return () =&gt; clearInterval(timer);</span></span>
<span class="line"><span>}, [count]);  // 依赖变化时重新执行</span></span></code></pre></div><h2 id="_2️⃣-内存泄漏排查" tabindex="-1">2️⃣ 内存泄漏排查 <a class="header-anchor" href="#_2️⃣-内存泄漏排查" aria-label="Permalink to &quot;2️⃣ 内存泄漏排查&quot;">​</a></h2><h3 id="📍-常见泄漏场景" tabindex="-1">📍 常见泄漏场景 <a class="header-anchor" href="#📍-常见泄漏场景" aria-label="Permalink to &quot;📍 常见泄漏场景&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 泄漏场景 1：未清理的订阅</span></span>
<span class="line"><span>function UserProfile({ userId }) {</span></span>
<span class="line"><span>  const [user, setUser] = useState(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const subscription = api.subscribe(userId, setUser);</span></span>
<span class="line"><span>    // ❌ 组件卸载后仍在监听</span></span>
<span class="line"><span>  }, [userId]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;{user?.name}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 正确：清理订阅</span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>  const subscription = api.subscribe(userId, setUser);</span></span>
<span class="line"><span>  return () =&gt; subscription.unsubscribe();  // ✅ 清理</span></span>
<span class="line"><span>}, [userId]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ 泄漏场景 2：未清理的事件监听</span></span>
<span class="line"><span>function WindowSize() {</span></span>
<span class="line"><span>  const [size, setSize] = useState({ width: 0, height: 0 });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const handleResize = () =&gt; setSize({</span></span>
<span class="line"><span>      width: window.innerWidth,</span></span>
<span class="line"><span>      height: window.innerHeight</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    window.addEventListener(&#39;resize&#39;, handleResize);</span></span>
<span class="line"><span>    // ❌ 组件卸载后仍在监听</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;{size.width} x {size.height}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 正确：清理事件监听</span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>  const handleResize = () =&gt; setSize({</span></span>
<span class="line"><span>    width: window.innerWidth,</span></span>
<span class="line"><span>    height: window.innerHeight</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  window.addEventListener(&#39;resize&#39;, handleResize);</span></span>
<span class="line"><span>  return () =&gt; window.removeEventListener(&#39;resize&#39;, handleResize);  // ✅</span></span>
<span class="line"><span>}, []);</span></span></code></pre></div><h3 id="📍-内存泄漏检测" tabindex="-1">📍 内存泄漏检测 <a class="header-anchor" href="#📍-内存泄漏检测" aria-label="Permalink to &quot;📍 内存泄漏检测&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 使用 Chrome DevTools Memory 面板</span></span>
<span class="line"><span>// 1. 堆快照对比：查找 Detached 节点</span></span>
<span class="line"><span>// 2. 分配时间线：观察内存增长趋势</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 自动检测</span></span>
<span class="line"><span>export function detectMemoryLeaks() {</span></span>
<span class="line"><span>  if (performance.memory) {</span></span>
<span class="line"><span>    const used = performance.memory.usedJSHeapSize / 1024 / 1024;</span></span>
<span class="line"><span>    console.log(\`内存使用: \${used.toFixed(2)}MB\`);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (used &gt; 100) {  // 超过 100MB</span></span>
<span class="line"><span>      console.warn(&#39;可能存在内存泄漏&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_3️⃣-调试技巧" tabindex="-1">3️⃣ 调试技巧 <a class="header-anchor" href="#_3️⃣-调试技巧" aria-label="Permalink to &quot;3️⃣ 调试技巧&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 1. React DevTools Profiler</span></span>
<span class="line"><span>// - 记录渲染性能</span></span>
<span class="line"><span>// - 分析组件更新原因</span></span>
<span class="line"><span>// - 查看组件渲染次数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. 自定义 Hook 调试</span></span>
<span class="line"><span>function useCounter(initialValue = 0) {</span></span>
<span class="line"><span>  const [count, setCount] = useState(initialValue);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;[useCounter] count:&#39;, count);</span></span>
<span class="line"><span>  }, [count]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return { count, increment: () =&gt; setCount(c =&gt; c + 1) };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 组件渲染追踪</span></span>
<span class="line"><span>function TrackedComponent({ data }) {</span></span>
<span class="line"><span>  const renderCount = useRef(0);</span></span>
<span class="line"><span>  renderCount.current++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    console.log(\`[TrackedComponent] rendered \${renderCount.current} times\`);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;{data}&lt;/div&gt;;</span></span></code></pre></div><hr><h2 id="hooks-实现原理" tabindex="-1">Hooks 实现原理 <a class="header-anchor" href="#hooks-实现原理" aria-label="Permalink to &quot;Hooks 实现原理&quot;">​</a></h2><h3 id="🧬-usestate-实现原理" tabindex="-1">🧬 useState 实现原理 <a class="header-anchor" href="#🧬-usestate-实现原理" aria-label="Permalink to &quot;🧬 useState 实现原理&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 简化版 useState 内部实现</span></span>
<span class="line"><span>let stateIndex = 0;</span></span>
<span class="line"><span>const stateQueue = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useState(initialValue) {</span></span>
<span class="line"><span>  const currentIndex = stateIndex;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (stateQueue[currentIndex] === undefined) {</span></span>
<span class="line"><span>    stateQueue[currentIndex] = initialValue;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function setState(newValue) {</span></span>
<span class="line"><span>    const resolvedValue = typeof newValue === &#39;function&#39;</span></span>
<span class="line"><span>      ? newValue(stateQueue[currentIndex])</span></span>
<span class="line"><span>      : newValue;</span></span>
<span class="line"><span>    stateQueue[currentIndex] = resolvedValue;</span></span>
<span class="line"><span>    scheduleUpdate(); // 触发重新渲染</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  stateIndex++;</span></span>
<span class="line"><span>  return [stateQueue[currentIndex], setState];</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>核心要点：</strong></p><ul><li>每个组件实例有一个 Fiber 节点，存储 hooks 链表</li><li>通过 <code>stateIndex</code> 按调用顺序匹配状态</li><li><strong>不能在条件/循环中调用 Hooks</strong>（保证调用顺序一致）</li><li><code>setState</code> 触发更新调度，合并到批量更新队列</li></ul><h3 id="🧬-useeffect-实现原理" tabindex="-1">🧬 useEffect 实现原理 <a class="header-anchor" href="#🧬-useeffect-实现原理" aria-label="Permalink to &quot;🧬 useEffect 实现原理&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useEffect(callback, deps) {</span></span>
<span class="line"><span>  const currentIndex = effectIndex;</span></span>
<span class="line"><span>  const previousDeps = effectQueue[currentIndex];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const hasChanged = !previousDeps || deps.some((dep, i) =&gt; !Object.is(dep, previousDeps[i]));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (hasChanged) {</span></span>
<span class="line"><span>    if (effectQueue[currentIndex]?.cleanup) {</span></span>
<span class="line"><span>      effectQueue[currentIndex].cleanup();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    scheduleAfterPaint(() =&gt; {</span></span>
<span class="line"><span>      const cleanup = callback();</span></span>
<span class="line"><span>      effectQueue[currentIndex] = { deps, cleanup };</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  effectIndex++;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>核心要点：</strong></p><ul><li>在 commit 阶段后异步执行（LayoutEffect 则是同步）</li><li>通过 <code>Object.is</code> 比较依赖项</li><li>返回的 cleanup 函数在下一次 effect 执行前调用</li></ul><h3 id="🧬-useref-实现原理" tabindex="-1">🧬 useRef 实现原理 <a class="header-anchor" href="#🧬-useref-实现原理" aria-label="Permalink to &quot;🧬 useRef 实现原理&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useRef(initialValue) {</span></span>
<span class="line"><span>  const currentIndex = refIndex;</span></span>
<span class="line"><span>  if (refQueue[currentIndex] === undefined) {</span></span>
<span class="line"><span>    refQueue[currentIndex] = { current: initialValue };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  refIndex++;</span></span>
<span class="line"><span>  return refQueue[currentIndex];</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>核心要点：</strong></p><ul><li>返回一个稳定的对象引用（整个生命周期不变）</li><li><code>.current</code> 变化不会触发重新渲染</li><li>常用于 DOM 引用、保存可变值</li></ul><h3 id="🧬-usecontext-实现原理" tabindex="-1">🧬 useContext 实现原理 <a class="header-anchor" href="#🧬-usecontext-实现原理" aria-label="Permalink to &quot;🧬 useContext 实现原理&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useContext(Context) {</span></span>
<span class="line"><span>  const fiber = getCurrentFiber();</span></span>
<span class="line"><span>  let provider = fiber;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (provider) {</span></span>
<span class="line"><span>    if (provider.type === Context.Provider) {</span></span>
<span class="line"><span>      return provider.memoizedProps.value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    provider = provider.return; // 父 Fiber</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return Context._defaultValue;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>核心要点：</strong></p><ul><li>本质是沿着 Fiber 树向上遍历查找最近的 Context.Provider</li><li>Provider 的 value 变化时，所有消费该 Context 的组件会强制更新</li></ul><hr><h2 id="实战场景题" tabindex="-1">实战场景题 <a class="header-anchor" href="#实战场景题" aria-label="Permalink to &quot;实战场景题&quot;">​</a></h2><h3 id="场景-1-实现一个具有分页、搜索、排序的数据表格" tabindex="-1">场景 1：实现一个具有分页、搜索、排序的数据表格 <a class="header-anchor" href="#场景-1-实现一个具有分页、搜索、排序的数据表格" aria-label="Permalink to &quot;场景 1：实现一个具有分页、搜索、排序的数据表格&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function DataTable() {</span></span>
<span class="line"><span>  const [data, setData] = useState&lt;Item[]&gt;([]);</span></span>
<span class="line"><span>  const [searchTerm, setSearchTerm] = useState(&#39;&#39;);</span></span>
<span class="line"><span>  const [sortBy, setSortBy] = useState&lt;&#39;name&#39; | &#39;date&#39;&gt;(&#39;name&#39;);</span></span>
<span class="line"><span>  const [page, setPage] = useState(1);</span></span>
<span class="line"><span>  const pageSize = 10;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const filtered = useMemo(() =&gt; data.filter(item =&gt;</span></span>
<span class="line"><span>    item.name.toLowerCase().includes(searchTerm.toLowerCase())</span></span>
<span class="line"><span>  ), [data, searchTerm]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const sorted = useMemo(() =&gt; {</span></span>
<span class="line"><span>    const newData = [...filtered];</span></span>
<span class="line"><span>    newData.sort((a, b) =&gt; sortBy === &#39;name&#39;</span></span>
<span class="line"><span>      ? a.name.localeCompare(b.name)</span></span>
<span class="line"><span>      : new Date(a.date).getTime() - new Date(b.date).getTime());</span></span>
<span class="line"><span>    return newData;</span></span>
<span class="line"><span>  }, [filtered, sortBy]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const paginatedData = useMemo(() =&gt; {</span></span>
<span class="line"><span>    const start = (page - 1) * pageSize;</span></span>
<span class="line"><span>    return sorted.slice(start, start + pageSize);</span></span>
<span class="line"><span>  }, [sorted, page]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;input placeholder=&quot;搜索...&quot; value={searchTerm}</span></span>
<span class="line"><span>        onChange={(e) =&gt; { setSearchTerm(e.target.value); setPage(1); }} /&gt;</span></span>
<span class="line"><span>      &lt;table&gt;</span></span>
<span class="line"><span>        {paginatedData.map(item =&gt; &lt;tr key={item.id}&gt;</span></span>
<span class="line"><span>          &lt;td&gt;{item.name}&lt;/td&gt;&lt;td&gt;{item.date}&lt;/td&gt;</span></span>
<span class="line"><span>        &lt;/tr&gt;)}</span></span>
<span class="line"><span>      &lt;/table&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; setPage(Math.max(1, page - 1))}&gt;上一页&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;span&gt;{page}&lt;/span&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; setPage(page + 1)}&gt;下一页&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="场景-2-实现一个具有撤销-重做功能的编辑器" tabindex="-1">场景 2：实现一个具有撤销/重做功能的编辑器 <a class="header-anchor" href="#场景-2-实现一个具有撤销-重做功能的编辑器" aria-label="Permalink to &quot;场景 2：实现一个具有撤销/重做功能的编辑器&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useHistory&lt;T&gt;(initialValue: T) {</span></span>
<span class="line"><span>  const [state, setState] = useState(initialValue);</span></span>
<span class="line"><span>  const [history, setHistory] = useState&lt;T[]&gt;([initialValue]);</span></span>
<span class="line"><span>  const [historyStep, setHistoryStep] = useState(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const updateState = (newState: T) =&gt; {</span></span>
<span class="line"><span>    const newHistory = history.slice(0, historyStep + 1);</span></span>
<span class="line"><span>    newHistory.push(newState);</span></span>
<span class="line"><span>    setHistory(newHistory);</span></span>
<span class="line"><span>    setHistoryStep(newHistory.length - 1);</span></span>
<span class="line"><span>    setState(newState);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const undo = () =&gt; {</span></span>
<span class="line"><span>    if (historyStep &gt; 0) {</span></span>
<span class="line"><span>      const newStep = historyStep - 1;</span></span>
<span class="line"><span>      setHistoryStep(newStep);</span></span>
<span class="line"><span>      setState(history[newStep]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const redo = () =&gt; {</span></span>
<span class="line"><span>    if (historyStep &lt; history.length - 1) {</span></span>
<span class="line"><span>      const newStep = historyStep + 1;</span></span>
<span class="line"><span>      setHistoryStep(newStep);</span></span>
<span class="line"><span>      setState(history[newStep]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return { state, updateState, undo, redo, canUndo: historyStep &gt; 0, canRedo: historyStep &lt; history.length - 1 };</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="📚-推荐学习资源" tabindex="-1">📚 推荐学习资源 <a class="header-anchor" href="#📚-推荐学习资源" aria-label="Permalink to &quot;📚 推荐学习资源&quot;">​</a></h2><ul><li>🌐 <a href="https://react.dev" target="_blank" rel="noreferrer">官方文档</a></li><li>📖 <a href="https://react.dev/learn" target="_blank" rel="noreferrer">React 最佳实践</a></li><li>🎓 <a href="https://react.dev/reference" target="_blank" rel="noreferrer">React 核心概念深入</a></li><li>💻 <a href="https://codesandbox.io" target="_blank" rel="noreferrer">CodeSandbox 在线编辑</a></li><li>🧪 <a href="https://testing-library.com" target="_blank" rel="noreferrer">React Testing Library</a></li></ul>`,38)])])}const g=n(t,[["render",l]]);export{h as __pageData,g as default};
