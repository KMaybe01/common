import{f as n,o as a,c as p,a9 as e}from"./chunks/framework.BSdZLMbP.js";const u=JSON.parse('{"title":"React 19 新特性","description":"","frontmatter":{"title":"React 19 新特性"},"headers":[],"relativePath":"S2-框架深入/React19/06-React19新特性.md","filePath":"S2-框架深入/React19/06-React19新特性.md","lastUpdated":1781504964000}'),l={name:"S2-框架深入/React19/06-React19新特性.md"};function i(t,s,c,o,r,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="第五部分-react-19-新特性深度解析" tabindex="-1">第五部分：React 19 新特性深度解析 <a class="header-anchor" href="#第五部分-react-19-新特性深度解析" aria-label="Permalink to &quot;第五部分：React 19 新特性深度解析&quot;">​</a></h1><h2 id="_1️⃣-react-compiler-深度解析" tabindex="-1">1️⃣ React Compiler 深度解析 <a class="header-anchor" href="#_1️⃣-react-compiler-深度解析" aria-label="Permalink to &quot;1️⃣ React Compiler 深度解析&quot;">​</a></h2><h3 id="🔄-工作原理" tabindex="-1">🔄 工作原理 <a class="header-anchor" href="#🔄-工作原理" aria-label="Permalink to &quot;🔄 工作原理&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// React Compiler 的核心思想：</span></span>
<span class="line"><span>// 1. 静态分析组件</span></span>
<span class="line"><span>// 2. 自动推断依赖</span></span>
<span class="line"><span>// 3. 自动添加 memo/useMemo/useCallback</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 编译器会做的事情：</span></span>
<span class="line"><span>// - 自动缓存计算结果</span></span>
<span class="line"><span>// - 自动优化 re-render</span></span>
<span class="line"><span>// - 自动跳过不必要的更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例：</span></span>
<span class="line"><span>function ProductList({ products, onSelect }) {</span></span>
<span class="line"><span>  // 编译器自动分析：</span></span>
<span class="line"><span>  // - products 依赖</span></span>
<span class="line"><span>  // - onSelect 依赖</span></span>
<span class="line"><span>  // - 生成 useMemo/useCallback</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const sorted = products.sort((a, b) =&gt; a.price - b.price);</span></span>
<span class="line"><span>  const handleClick = (id) =&gt; onSelect(id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>      {sorted.map(p =&gt; (</span></span>
<span class="line"><span>        &lt;li key={p.id} onClick={() =&gt; handleClick(p.id)}&gt;</span></span>
<span class="line"><span>          {p.name}</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>      ))}</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 编译后（简化）：</span></span>
<span class="line"><span>function ProductList({ products, onSelect }) {</span></span>
<span class="line"><span>  const sorted = useMemo(() =&gt; products.sort((a, b) =&gt; a.price - b.price), [products]);</span></span>
<span class="line"><span>  const handleClick = useCallback((id) =&gt; onSelect(id), [onSelect]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>      {sorted.map(p =&gt; (</span></span>
<span class="line"><span>        &lt;li key={p.id} onClick={() =&gt; handleClick(p.id)}&gt;</span></span>
<span class="line"><span>          {p.name}</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>      ))}</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="📍-编译器配置" tabindex="-1">📍 编译器配置 <a class="header-anchor" href="#📍-编译器配置" aria-label="Permalink to &quot;📍 编译器配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// .babelrc 或 babel.config.js（推荐使用 flat config 方式）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;presets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;react-compiler&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;sources&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">(filename)</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">        return</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> filename.endsWith(&#39;.tsx&#39;)</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ||</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> filename.endsWith(&#39;.jsx&#39;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;compilationMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;annotation&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;panicThreshold&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CRITICAL_ERRORS&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="🔍-react-compiler-源码原理" tabindex="-1">🔍 React Compiler 源码原理 <a class="header-anchor" href="#🔍-react-compiler-源码原理" aria-label="Permalink to &quot;🔍 React Compiler 源码原理&quot;">​</a></h2><h3 id="🔄-编译流程" tabindex="-1">🔄 编译流程 <a class="header-anchor" href="#🔄-编译流程" aria-label="Permalink to &quot;🔄 编译流程&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// packages/babel-plugin-react-compiler/src/index.ts</span></span>
<span class="line"><span>// React Compiler 的编译流程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function compileFunctionAST(ast) {</span></span>
<span class="line"><span>  // 1. 分析组件</span></span>
<span class="line"><span>  const analysis = analyzeComponent(ast);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 2. 确定依赖</span></span>
<span class="line"><span>  const dependencies = analyzeDependencies(analysis);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 3. 生成缓存代码</span></span>
<span class="line"><span>  const optimized = generateMemoCode(analysis, dependencies);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return optimized;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例：</span></span>
<span class="line"><span>// 原始代码</span></span>
<span class="line"><span>function Counter({ initialCount }) {</span></span>
<span class="line"><span>  const [count, setCount] = useState(initialCount);</span></span>
<span class="line"><span>  const double = count * 2;</span></span>
<span class="line"><span>  return &lt;div&gt;{double}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 编译后</span></span>
<span class="line"><span>function Counter({ initialCount }) {</span></span>
<span class="line"><span>  const $ = useMemo(() =&gt; [initialCount], [initialCount]);</span></span>
<span class="line"><span>  const [count, setCount] = useState($[0]);</span></span>
<span class="line"><span>  const double = useMemo(() =&gt; count * 2, [count]);</span></span>
<span class="line"><span>  return &lt;div&gt;{double}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="📍-依赖分析算法" tabindex="-1">📍 依赖分析算法 <a class="header-anchor" href="#📍-依赖分析算法" aria-label="Permalink to &quot;📍 依赖分析算法&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// packages/babel-plugin-react-compiler/src/DependencyAnalysis.ts</span></span>
<span class="line"><span>function analyzeDependencies(analysis) {</span></span>
<span class="line"><span>  const dependencies = new Map();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 1. 遍历所有 reactive 表达式</span></span>
<span class="line"><span>  for (const expr of analysis.reactiveExpressions) {</span></span>
<span class="line"><span>    // 2. 分析表达式依赖</span></span>
<span class="line"><span>    const deps = analyzeExpression(expr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3. 确定依赖项</span></span>
<span class="line"><span>    dependencies.set(expr, deps);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return dependencies;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 依赖类型</span></span>
<span class="line"><span>enum DependencyType {</span></span>
<span class="line"><span>  State = &#39;state&#39;,         // useState</span></span>
<span class="line"><span>  Ref = &#39;ref&#39;,             // useRef</span></span>
<span class="line"><span>  Context = &#39;context&#39;,     // useContext</span></span>
<span class="line"><span>  Props = &#39;props&#39;,         // props</span></span>
<span class="line"><span>  Memo = &#39;memo&#39;,           // useMemo</span></span>
<span class="line"><span>  Callback = &#39;callback&#39;    // useCallback</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 依赖分析结果</span></span>
<span class="line"><span>interface Dependency {</span></span>
<span class="line"><span>  type: DependencyType;</span></span>
<span class="line"><span>  source: string;          // 依赖来源</span></span>
<span class="line"><span>  path: string[];          // 访问路径</span></span>
<span class="line"><span>  isStable: boolean;       // 是否稳定</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_2️⃣-actions-机制深度解析" tabindex="-1">2️⃣ Actions 机制深度解析 <a class="header-anchor" href="#_2️⃣-actions-机制深度解析" aria-label="Permalink to &quot;2️⃣ Actions 机制深度解析&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Actions 的核心思想：</span></span>
<span class="line"><span>// 1. 自动管理 pending 状态</span></span>
<span class="line"><span>// 2. 自动处理错误</span></span>
<span class="line"><span>// 3. 自动批量更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用 useActionState</span></span>
<span class="line"><span>function Form() {</span></span>
<span class="line"><span>  const [state, formAction, isPending] = useActionState(</span></span>
<span class="line"><span>    async (previousState, formData) =&gt; {</span></span>
<span class="line"><span>      // 异步操作</span></span>
<span class="line"><span>      const result = await submitForm(formData);</span></span>
<span class="line"><span>      return result;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    { success: false, message: &#39;&#39; }</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;form action={formAction}&gt;</span></span>
<span class="line"><span>      &lt;input name=&quot;email&quot; type=&quot;email&quot; /&gt;</span></span>
<span class="line"><span>      &lt;button type=&quot;submit&quot; disabled={isPending}&gt;</span></span>
<span class="line"><span>        {isPending ? &#39;提交中...&#39; : &#39;提交&#39;}</span></span>
<span class="line"><span>      &lt;/button&gt;</span></span>
<span class="line"><span>      {state.message &amp;&amp; &lt;p&gt;{state.message}&lt;/p&gt;}</span></span>
<span class="line"><span>    &lt;/form&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// useOptimistic 乐观更新</span></span>
<span class="line"><span>function TodoList({ todos, addTodo }) {</span></span>
<span class="line"><span>  const [optimisticTodos, addOptimisticTodo] = useOptimistic(</span></span>
<span class="line"><span>    todos,</span></span>
<span class="line"><span>    (state, newTodo) =&gt; [...state, { ...newTodo, pending: true }]</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  async function handleSubmit(formData) {</span></span>
<span class="line"><span>    const text = formData.get(&#39;text&#39;);</span></span>
<span class="line"><span>    addOptimisticTodo({ id: Date.now(), text, done: false });</span></span>
<span class="line"><span>    await addTodo(text);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;form action={handleSubmit}&gt;</span></span>
<span class="line"><span>      &lt;input name=&quot;text&quot; /&gt;</span></span>
<span class="line"><span>      &lt;button type=&quot;submit&quot;&gt;添加&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;ul&gt;</span></span>
<span class="line"><span>        {optimisticTodos.map(todo =&gt; (</span></span>
<span class="line"><span>          &lt;li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}&gt;</span></span>
<span class="line"><span>            {todo.text}</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>        ))}</span></span>
<span class="line"><span>      &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;/form&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_3️⃣-use-hook-深度解析" tabindex="-1">3️⃣ use() Hook 深度解析 <a class="header-anchor" href="#_3️⃣-use-hook-深度解析" aria-label="Permalink to &quot;3️⃣ use() Hook 深度解析&quot;">​</a></h2><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// use() 的核心能力：</span></span>
<span class="line"><span>// 1. 在渲染时读取 Promise</span></span>
<span class="line"><span>// 2. 在渲染时读取 Context</span></span>
<span class="line"><span>// 3. 条件调用（打破 Hooks 规则）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读取 Promise</span></span>
<span class="line"><span>function UserProfile({ userPromise }) {</span></span>
<span class="line"><span>  const user = use(userPromise);  // 暂挂组件直到 Promise resolve</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;{user.name}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读取 Context</span></span>
<span class="line"><span>function Theme() {</span></span>
<span class="line"><span>  const theme = use(ThemeContext);  // 类似 useContext</span></span>
<span class="line"><span>  return &lt;div style={{ color: theme.color }}&gt;Hello&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 条件调用</span></span>
<span class="line"><span>function ConditionalComponent({ showData }) {</span></span>
<span class="line"><span>  const [data, setData] = useState(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (showData) {</span></span>
<span class="line"><span>    const result = use(fetchData());  // 条件调用</span></span>
<span class="line"><span>    return &lt;div&gt;{result}&lt;/div&gt;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;div&gt;No data&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 与 Suspense 配合</span></span>
<span class="line"><span>function App() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Suspense fallback={&lt;Loading /&gt;}&gt;</span></span>
<span class="line"><span>      &lt;UserProfile userPromise={fetchUser()} /&gt;</span></span>
<span class="line"><span>    &lt;/Suspense&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,17)])])}const k=n(l,[["render",i]]);export{u as __pageData,k as default};
