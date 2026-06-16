import{f as r,D as d,o as a,c as u,a9 as t,b as e,w as n,a as l,G as i,a8 as o,k as c}from"./chunks/framework.BSdZLMbP.js";const C=JSON.parse('{"title":"React 高级特性","description":"","frontmatter":{"title":"React 高级特性"},"headers":[],"relativePath":"S2-框架深入/React19/02-高级特性.md","filePath":"S2-框架深入/React19/02-高级特性.md","lastUpdated":1781504964000}'),g={name:"S2-框架深入/React19/02-高级特性.md"};function h(m,s,b,E,B,A){const p=d("Mermaid");return a(),u("div",null,[s[6]||(s[6]=t('<h1 id="第二部分-高级特性" tabindex="-1">第二部分：高级特性 <a class="header-anchor" href="#第二部分-高级特性" aria-label="Permalink to &quot;第二部分：高级特性&quot;">​</a></h1><h2 id="_1️⃣-context-api-深度应用" tabindex="-1">1️⃣ Context API 深度应用 <a class="header-anchor" href="#_1️⃣-context-api-深度应用" aria-label="Permalink to &quot;1️⃣ Context API 深度应用&quot;">​</a></h2><h3 id="🔄-context-完整工作流" tabindex="-1">🔄 Context 完整工作流 <a class="header-anchor" href="#🔄-context-完整工作流" aria-label="Permalink to &quot;🔄 Context 完整工作流&quot;">​</a></h3>',3)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-9",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20A%5B%22createContext%22%5D%20--%3E%7C%E5%88%9B%E5%BB%BA%7C%20B%5B%22Context%20%E5%AF%B9%E8%B1%A1%22%5D%0A%20%20%20%20B%20--%3E%20C%5B%22Provider%20%E7%BB%84%E4%BB%B6%22%5D%0A%20%20%20%20B%20--%3E%20D%5B%22useContext%20Hook%22%5D%0A%0A%20%20%20%20C%20--%3E%7C%E6%8F%90%E4%BE%9B%7C%20E%5B%22value%22%5D%0A%20%20%20%20E%20--%3E%7C%E4%BC%A0%E9%80%92%E7%BB%99%7C%20F%5B%22%E5%90%8E%E4%BB%A3%E7%BB%84%E4%BB%B6%22%5D%0A%20%20%20%20D%20--%3E%7C%E6%B6%88%E8%B4%B9%7C%20F%0A%20%20%20%20F%20--%3E%7C%E8%8E%B7%E5%8F%96%7C%20E%0A"})]),fallback:n(()=>[...s[0]||(s[0]=[l(" Loading... ",-1)])]),_:1})),s[7]||(s[7]=t(`<h3 id="🎯-实战-主题系统" tabindex="-1">🎯 实战：主题系统 <a class="header-anchor" href="#🎯-实战-主题系统" aria-label="Permalink to &quot;🎯 实战：主题系统&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// theme-context.ts</span></span>
<span class="line"><span>interface ThemeContextType {</span></span>
<span class="line"><span>  theme: { primary: string; background: string; text: string };</span></span>
<span class="line"><span>  toggleTheme: () =&gt; void;</span></span>
<span class="line"><span>  currentThemeName: &#39;light&#39; | &#39;dark&#39;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const ThemeContext = createContext&lt;ThemeContextType | undefined&gt;(undefined);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const themes = {</span></span>
<span class="line"><span>  light: { primary: &#39;#007bff&#39;, background: &#39;#ffffff&#39;, text: &#39;#000000&#39; },</span></span>
<span class="line"><span>  dark: { primary: &#39;#0d6efd&#39;, background: &#39;#1a1a1a&#39;, text: &#39;#ffffff&#39; }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function ThemeProvider({ children }: { children: ReactNode }) {</span></span>
<span class="line"><span>  const [themeName, setThemeName] = useState&lt;&#39;light&#39; | &#39;dark&#39;&gt;(&#39;light&#39;);</span></span>
<span class="line"><span>  const value: ThemeContextType = {</span></span>
<span class="line"><span>    theme: themes[themeName],</span></span>
<span class="line"><span>    toggleTheme: () =&gt; setThemeName(prev =&gt; prev === &#39;light&#39; ? &#39;dark&#39; : &#39;light&#39;),</span></span>
<span class="line"><span>    currentThemeName: themeName</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  return &lt;ThemeContext.Provider value={value}&gt;{children}&lt;/ThemeContext.Provider&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function useTheme() {</span></span>
<span class="line"><span>  const context = useContext(ThemeContext);</span></span>
<span class="line"><span>  if (!context) throw new Error(&#39;useTheme must be used within ThemeProvider&#39;);</span></span>
<span class="line"><span>  return context;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 🛒 实战：购物车 Context</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface CartItem {</span></span>
<span class="line"><span>  id: number;</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span>  price: number;</span></span>
<span class="line"><span>  quantity: number;</span></span>
<span class="line"><span>  image: string;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface CartContextType {</span></span>
<span class="line"><span>  items: CartItem[];</span></span>
<span class="line"><span>  addItem: (item: CartItem) =&gt; void;</span></span>
<span class="line"><span>  removeItem: (id: number) =&gt; void;</span></span>
<span class="line"><span>  updateQuantity: (id: number, quantity: number) =&gt; void;</span></span>
<span class="line"><span>  clearCart: () =&gt; void;</span></span>
<span class="line"><span>  totalAmount: number;</span></span>
<span class="line"><span>  totalCount: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const CartContext = createContext&lt;CartContextType | undefined&gt;(undefined);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function CartProvider({ children }: { children: React.ReactNode }) {</span></span>
<span class="line"><span>  const [items, setItems] = useState&lt;CartItem[]&gt;([]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const addItem = useCallback((item: CartItem) =&gt; {</span></span>
<span class="line"><span>    setItems(prev =&gt; {</span></span>
<span class="line"><span>      const existing = prev.find(i =&gt; i.id === item.id);</span></span>
<span class="line"><span>      if (existing) {</span></span>
<span class="line"><span>        return prev.map(i =&gt;</span></span>
<span class="line"><span>          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return [...prev, item];</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const totalAmount = useMemo(() =&gt;</span></span>
<span class="line"><span>    items.reduce((sum, item) =&gt; sum + item.price * item.quantity, 0),</span></span>
<span class="line"><span>    [items]</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const totalCount = useMemo(() =&gt;</span></span>
<span class="line"><span>    items.reduce((sum, item) =&gt; sum + item.quantity, 0),</span></span>
<span class="line"><span>    [items]</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;CartContext.Provider value={{</span></span>
<span class="line"><span>      items, addItem,</span></span>
<span class="line"><span>      removeItem: (id) =&gt; setItems(prev =&gt; prev.filter(i =&gt; i.id !== id)),</span></span>
<span class="line"><span>      updateQuantity: (id, qty) =&gt; setItems(prev =&gt;</span></span>
<span class="line"><span>        prev.map(i =&gt; i.id === id ? { ...i, quantity: qty } : i)</span></span>
<span class="line"><span>      ),</span></span>
<span class="line"><span>      clearCart: () =&gt; setItems([]),</span></span>
<span class="line"><span>      totalAmount, totalCount,</span></span>
<span class="line"><span>    }}&gt;</span></span>
<span class="line"><span>      {children}</span></span>
<span class="line"><span>    &lt;/CartContext.Provider&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function useCart() {</span></span>
<span class="line"><span>  const context = useContext(CartContext);</span></span>
<span class="line"><span>  if (!context) throw new Error(&#39;useCart must be used within CartProvider&#39;);</span></span>
<span class="line"><span>  return context;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="购物车持久化-localstorage" tabindex="-1">购物车持久化（localStorage） <a class="header-anchor" href="#购物车持久化-localstorage" aria-label="Permalink to &quot;购物车持久化（localStorage）&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function CartProvider({ children }: { children: React.ReactNode }) {</span></span>
<span class="line"><span>  const [items, setItems] = useState&lt;CartItem[]&gt;(() =&gt; {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      const saved = localStorage.getItem(&#39;cart&#39;);</span></span>
<span class="line"><span>      return saved ? JSON.parse(saved) : [];</span></span>
<span class="line"><span>    } catch {</span></span>
<span class="line"><span>      return [];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 自动持久化</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    localStorage.setItem(&#39;cart&#39;, JSON.stringify(items));</span></span>
<span class="line"><span>  }, [items]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 多标签同步</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const handleStorage = (e: StorageEvent) =&gt; {</span></span>
<span class="line"><span>      if (e.key === &#39;cart&#39; &amp;&amp; e.newValue) {</span></span>
<span class="line"><span>        setItems(JSON.parse(e.newValue));</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    window.addEventListener(&#39;storage&#39;, handleStorage);</span></span>
<span class="line"><span>    return () =&gt; window.removeEventListener(&#39;storage&#39;, handleStorage);</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ... rest of the provider</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p>🔗 <strong>链式思考</strong>：React 状态管理生态最为多元——从内置的 <code>useState</code>/<code>useReducer</code> 到第三方 Zustand/Redux/Jotai，体现&quot;轻核心 + 重生态&quot;哲学。Vue 的 Pinia 是官方统一方案，深度集成响应式系统。Angular 的 NgRx SignalStore 则结合了 RxJS 和 Signals。选择策略：小型应用用内置方案，中型应用用 Zustand/Pinia/SignalStore，大型应用用 Redux/NgRx。详见 <a href="./../框架对比/">框架对比</a> 的&quot;状态管理生态&quot;。</p></blockquote><hr><h2 id="_2️⃣-状态管理完全指南" tabindex="-1">2️⃣ 状态管理完全指南 <a class="header-anchor" href="#_2️⃣-状态管理完全指南" aria-label="Permalink to &quot;2️⃣ 状态管理完全指南&quot;">​</a></h2><h3 id="📊-状态管理全景图" tabindex="-1">📊 状态管理全景图 <a class="header-anchor" href="#📊-状态管理全景图" aria-label="Permalink to &quot;📊 状态管理全景图&quot;">​</a></h3><table tabindex="0"><thead><tr><th style="text-align:left;">本地状态</th><th style="text-align:left;">跨组件共享</th><th style="text-align:left;">全局状态</th><th style="text-align:left;">服务器状态</th></tr></thead><tbody><tr><td style="text-align:left;"><code>useState</code></td><td style="text-align:left;">Context API</td><td style="text-align:left;">Redux</td><td style="text-align:left;">TanStack Query</td></tr><tr><td style="text-align:left;"><code>useReducer</code></td><td style="text-align:left;"><code>useMemo</code>(值)</td><td style="text-align:left;">Zustand</td><td style="text-align:left;">SWR</td></tr><tr><td style="text-align:left;"><code>useRef</code></td><td style="text-align:left;"></td><td style="text-align:left;">Jotai</td><td style="text-align:left;">Apollo</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"></td><td style="text-align:left;">MobX</td><td style="text-align:left;">RTK Query</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"></td><td style="text-align:left;">Valtio</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"></td><td style="text-align:left;">Legend State</td><td style="text-align:left;"></td></tr></tbody></table><h3 id="🧭-状态管理分类与演进" tabindex="-1">🧭 状态管理分类与演进 <a class="header-anchor" href="#🧭-状态管理分类与演进" aria-label="Permalink to &quot;🧭 状态管理分类与演进&quot;">​</a></h3><p><strong>四个象限分类法：</strong></p><table tabindex="0"><thead><tr><th>象限</th><th>范围</th><th>典型方案</th><th>核心问题</th></tr></thead><tbody><tr><td><strong>本地</strong></td><td>单个组件内</td><td>useState / useReducer / useRef</td><td>表单输入、UI 开关</td></tr><tr><td><strong>共享</strong></td><td>组件树内</td><td>Context API / 组合提升</td><td>主题、语言、用户</td></tr><tr><td><strong>全局（客户端）</strong></td><td>整个应用</td><td>Redux / Zustand / Jotai / MobX</td><td>缓存数据、复杂交互</td></tr><tr><td><strong>全局（服务端）</strong></td><td>服务端来源</td><td>TanStack Query / SWR / Apollo</td><td>API 数据同步</td></tr></tbody></table><p><strong>版本演进时间线：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2014: Redux 发布（Flux 理念 + 单一状态树）</span></span>
<span class="line"><span>2015: MobX 发布（响应式可变状态）</span></span>
<span class="line"><span>2016: Redux 成为 React 标配</span></span>
<span class="line"><span>2018: React Context + useReducer（内置替代方案）</span></span>
<span class="line"><span>2019: Recoil 发布（原子化先驱，Meta）</span></span>
<span class="line"><span>      SWR 发布（stale-while-revalidate）</span></span>
<span class="line"><span>2020: Zustand 发布（极简 API，~1KB）</span></span>
<span class="line"><span>      Jotai 发布（原子化改进，Recoil 竞争者）</span></span>
<span class="line"><span>      TanStack Query v3（服务器状态管理）</span></span>
<span class="line"><span>2021: Valtio 发布（Proxy 响应式）</span></span>
<span class="line"><span>      Redux Toolkit 成为官方推荐</span></span>
<span class="line"><span>2022: Legend State 发布（高性能信号式）</span></span>
<span class="line"><span>2023: Zustand v4 + Middleware</span></span>
<span class="line"><span>      Jotai v2（突破性改进）</span></span>
<span class="line"><span>2024-2026: React 19 + Signal 状态库融合</span></span>
<span class="line"><span>           Server State + Client State 界限模糊</span></span>
<span class="line"><span>           Zustand v5 / Jotai v2 稳定</span></span></code></pre></div><h3 id="💡-实战-usestate-状态模式" tabindex="-1">💡 实战：useState 状态模式 <a class="header-anchor" href="#💡-实战-usestate-状态模式" aria-label="Permalink to &quot;💡 实战：useState 状态模式&quot;">​</a></h3><h4 id="sku-选择器" tabindex="-1">SKU 选择器 <a class="header-anchor" href="#sku-选择器" aria-label="Permalink to &quot;SKU 选择器&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>interface SKU {</span></span>
<span class="line"><span>  color: string;</span></span>
<span class="line"><span>  size: string;</span></span>
<span class="line"><span>  stock: number;</span></span>
<span class="line"><span>  price: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function SKUSelector({ skus }: { skus: SKU[] }) {</span></span>
<span class="line"><span>  const [selectedColor, setSelectedColor] = useState(&#39;&#39;);</span></span>
<span class="line"><span>  const [selectedSize, setSelectedSize] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const availableSizes = useMemo(() =&gt;</span></span>
<span class="line"><span>    [...new Set(skus.filter(s =&gt; !selectedColor || s.color === selectedColor).map(s =&gt; s.size))],</span></span>
<span class="line"><span>    [skus, selectedColor]</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const currentSKU = useMemo(() =&gt;</span></span>
<span class="line"><span>    skus.find(s =&gt; s.color === selectedColor &amp;&amp; s.size === selectedSize),</span></span>
<span class="line"><span>    [skus, selectedColor, selectedSize]</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;div className=&quot;mb-4&quot;&gt;</span></span>
<span class="line"><span>        &lt;label className=&quot;block mb-2&quot;&gt;颜色：&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;div className=&quot;flex gap-2&quot;&gt;</span></span>
<span class="line"><span>          {[...new Set(skus.map(s =&gt; s.color))].map(color =&gt; (</span></span>
<span class="line"><span>            &lt;button key={color}</span></span>
<span class="line"><span>              onClick={() =&gt; { setSelectedColor(color); setSelectedSize(&#39;&#39;); }}</span></span>
<span class="line"><span>              className={\`px-4 py-2 rounded \${selectedColor === color ? &#39;bg-blue-500 text-white&#39; : &#39;bg-gray-200&#39;}\`}&gt;</span></span>
<span class="line"><span>              {color}</span></span>
<span class="line"><span>            &lt;/button&gt;</span></span>
<span class="line"><span>          ))}</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;div className=&quot;mb-4&quot;&gt;</span></span>
<span class="line"><span>        &lt;label className=&quot;block mb-2&quot;&gt;尺寸：&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;div className=&quot;flex gap-2&quot;&gt;</span></span>
<span class="line"><span>          {availableSizes.map(size =&gt; (</span></span>
<span class="line"><span>            &lt;button key={size}</span></span>
<span class="line"><span>              onClick={() =&gt; setSelectedSize(size)}</span></span>
<span class="line"><span>              className={\`px-4 py-2 rounded \${selectedSize === size ? &#39;bg-blue-500 text-white&#39; : &#39;bg-gray-200&#39;}\`}&gt;</span></span>
<span class="line"><span>              {size}</span></span>
<span class="line"><span>            &lt;/button&gt;</span></span>
<span class="line"><span>          ))}</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      {currentSKU &amp;&amp; (</span></span>
<span class="line"><span>        &lt;div className=&quot;p-4 bg-gray-50 rounded&quot;&gt;</span></span>
<span class="line"><span>          &lt;p&gt;价格：¥{currentSKU.price}&lt;/p&gt;</span></span>
<span class="line"><span>          &lt;p&gt;库存：{currentSKU.stock &gt; 0 ? \`\${currentSKU.stock}件\` : &#39;已售罄&#39;}&lt;/p&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      )}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="状态提升-lifting-state-up" tabindex="-1">状态提升（Lifting State Up） <a class="header-anchor" href="#状态提升-lifting-state-up" aria-label="Permalink to &quot;状态提升（Lifting State Up）&quot;">​</a></h4>`,18)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-230",class:"mermaid",graph:"graph%20LR%0A%20%20%20%20subgraph%20%E9%94%99%E8%AF%AF%3A%20%E7%8A%B6%E6%80%81%E5%88%86%E6%95%A3%0A%20%20%20%20%20%20%20%20A%5B%22%E7%88%B6%E7%BB%84%E4%BB%B6%22%5D%20--%3E%20B%5B%22%E5%AD%90%E7%BB%84%E4%BB%B6A%3Cbr%2F%3E%E6%9C%89%E8%87%AA%E5%B7%B1%E7%9A%84%20count%22%5D%0A%20%20%20%20%20%20%20%20A%20--%3E%20C%5B%22%E5%AD%90%E7%BB%84%E4%BB%B6B%3Cbr%2F%3E%E6%9C%89%E8%87%AA%E5%B7%B1%E7%9A%84%20count%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20%E6%AD%A3%E7%A1%AE%3A%20%E7%8A%B6%E6%80%81%E6%8F%90%E5%8D%87%0A%20%20%20%20%20%20%20%20D%5B%22%E7%88%B6%E7%BB%84%E4%BB%B6%3Cbr%2F%3Ecount%20%E7%8A%B6%E6%80%81%E5%9C%A8%E6%AD%A4%22%5D%20--%3E%20E%5B%22%E5%AD%90%E7%BB%84%E4%BB%B6A%3Cbr%2F%3Eprops%20%E6%8E%A5%E6%94%B6%20count%22%5D%0A%20%20%20%20%20%20%20%20D%20--%3E%20F%5B%22%E5%AD%90%E7%BB%84%E4%BB%B6B%3Cbr%2F%3Eprops%20%E6%8E%A5%E6%94%B6%20count%22%5D%0A%20%20%20%20end%0A"})]),fallback:n(()=>[...s[1]||(s[1]=[l(" Loading... ",-1)])]),_:1})),s[8]||(s[8]=t(`<div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Parent() {</span></span>
<span class="line"><span>  const [count, setCount] = useState(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;CounterDisplay count={count} /&gt;</span></span>
<span class="line"><span>      &lt;CounterControls count={count} setCount={setCount} /&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CounterDisplay({ count }: { count: number }) {</span></span>
<span class="line"><span>  return &lt;h2&gt;计数：{count}&lt;/h2&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function CounterControls({ count, setCount }: {</span></span>
<span class="line"><span>  count: number;</span></span>
<span class="line"><span>  setCount: React.Dispatch&lt;React.SetStateAction&lt;number&gt;&gt;;</span></span>
<span class="line"><span>}) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;+&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; setCount(c =&gt; c - 1)}&gt;-&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="immer-复杂状态简化" tabindex="-1">Immer：复杂状态简化 <a class="header-anchor" href="#immer-复杂状态简化" aria-label="Permalink to &quot;Immer：复杂状态简化&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { produce } from &#39;immer&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface User {</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span>  address: { city: string; district: string; detail: string };</span></span>
<span class="line"><span>  hobbies: string[];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const [user, setUser] = useState&lt;User&gt;({</span></span>
<span class="line"><span>  name: &#39;张三&#39;,</span></span>
<span class="line"><span>  address: { city: &#39;北京&#39;, district: &#39;海淀&#39;, detail: &#39;...&#39; },</span></span>
<span class="line"><span>  hobbies: [&#39;读书&#39;, &#39;跑步&#39;],</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Immer：以可变的方式写不可变逻辑</span></span>
<span class="line"><span>function updateAddress(district: string) {</span></span>
<span class="line"><span>  setUser(produce(draft =&gt; {</span></span>
<span class="line"><span>    draft.address.district = district;</span></span>
<span class="line"><span>  }));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function addHobby(hobby: string) {</span></span>
<span class="line"><span>  setUser(produce(draft =&gt; {</span></span>
<span class="line"><span>    draft.hobbies.push(hobby);</span></span>
<span class="line"><span>  }));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// State 不可变更新速查</span></span>
<span class="line"><span>// ❌ 直接修改：todos.push(&#39;c&#39;), setTodos(todos) → 不触发渲染</span></span>
<span class="line"><span>// ✅ 添加：setTodos([...todos, &#39;c&#39;])</span></span>
<span class="line"><span>// ✅ 删除：setTodos(todos.filter(t =&gt; t !== &#39;a&#39;))</span></span>
<span class="line"><span>// ✅ 修改：setTodos(todos.map(t =&gt; t === &#39;a&#39; ? &#39;A&#39; : t))</span></span></code></pre></div><h3 id="🎯-主流方案快速对比" tabindex="-1">🎯 主流方案快速对比 <a class="header-anchor" href="#🎯-主流方案快速对比" aria-label="Permalink to &quot;🎯 主流方案快速对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方案</th><th>范式</th><th>Bundle</th><th>Star</th><th>学习曲线</th><th>TS 支持</th><th>适用规模</th></tr></thead><tbody><tr><td><strong>useState</strong></td><td>不可变</td><td>0KB（内置）</td><td>—</td><td>🟢 极低</td><td>✅</td><td>单组件</td></tr><tr><td><strong>Context + useReducer</strong></td><td>不可变</td><td>0KB（内置）</td><td>—</td><td>🟢 低</td><td>✅</td><td>小功能</td></tr><tr><td><strong>Zustand</strong></td><td>不可变</td><td>~1KB</td><td>50k+</td><td>🟢 低</td><td>✅ 优秀</td><td>中/大型</td></tr><tr><td><strong>Jotai</strong></td><td>原子不可变</td><td>~3KB</td><td>22k+</td><td>🟢 低</td><td>✅ 优秀</td><td>中/大型</td></tr><tr><td><strong>Valtio</strong></td><td>可变（Proxy）</td><td>~2KB</td><td>9k+</td><td>🟢 低</td><td>✅ 好</td><td>中/大型</td></tr><tr><td><strong>MobX</strong></td><td>可变（Proxy）</td><td>~16KB</td><td>27k+</td><td>🟡 中</td><td>⚠️ 一般</td><td>中/大型</td></tr><tr><td><strong>Redux Toolkit</strong></td><td>不可变（Immer）</td><td>~12KB</td><td>60k+</td><td>🔴 中-高</td><td>✅ 优秀</td><td>大型企业</td></tr><tr><td><strong>TanStack Query</strong></td><td>不可变（缓存）</td><td>~13KB</td><td>45k+</td><td>🟡 中</td><td>✅ 优秀</td><td>任意（服务端）</td></tr><tr><td><strong>Legend State</strong></td><td>信号式</td><td>~3KB</td><td>4k+</td><td>🟢 低</td><td>✅ 好</td><td>中/大型</td></tr></tbody></table><h3 id="🏆-方案深度对比" tabindex="-1">🏆 方案深度对比 <a class="header-anchor" href="#🏆-方案深度对比" aria-label="Permalink to &quot;🏆 方案深度对比&quot;">​</a></h3><h4 id="_1-zustand-—-极简全局状态-💡-推荐首选" tabindex="-1">1. <a href="https://github.com/pmndrs/zustand" target="_blank" rel="noreferrer">Zustand</a> — 极简全局状态（💡 推荐首选） <a class="header-anchor" href="#_1-zustand-—-极简全局状态-💡-推荐首选" aria-label="Permalink to &quot;1. [Zustand](https://github.com/pmndrs/zustand) — 极简全局状态（💡 推荐首选）&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { create } from &#39;zustand&#39;;</span></span>
<span class="line"><span>import { devtools, persist, subscribeWithSelector } from &#39;zustand/middleware&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>interface BearStore {</span></span>
<span class="line"><span>  bears: number;</span></span>
<span class="line"><span>  fishes: number;</span></span>
<span class="line"><span>  addBear: () =&gt; void;</span></span>
<span class="line"><span>  consumeFish: (n: number) =&gt; void;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const useBearStore = create&lt;BearStore&gt;()(</span></span>
<span class="line"><span>  subscribeWithSelector(</span></span>
<span class="line"><span>    devtools(</span></span>
<span class="line"><span>      persist(</span></span>
<span class="line"><span>        (set) =&gt; ({</span></span>
<span class="line"><span>          bears: 0,</span></span>
<span class="line"><span>          fishes: 10,</span></span>
<span class="line"><span>          addBear: () =&gt; set((s) =&gt; ({ bears: s.bears + 1 })),</span></span>
<span class="line"><span>          consumeFish: (n) =&gt; set((s) =&gt; ({ fishes: s.fishes - n })),</span></span>
<span class="line"><span>        }),</span></span>
<span class="line"><span>        { name: &#39;bear-storage&#39; }</span></span>
<span class="line"><span>      ),</span></span>
<span class="line"><span>      { name: &#39;BearStore&#39; }</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组件外读写</span></span>
<span class="line"><span>const bears = useBearStore.getState().bears;</span></span>
<span class="line"><span>useBearStore.getState().addBear();</span></span>
<span class="line"><span>useBearStore.subscribe((s) =&gt; console.log(&#39;changed:&#39;, s.bears));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 选择器自动优化重渲染</span></span>
<span class="line"><span>function BearCounter() {</span></span>
<span class="line"><span>  const bears = useBearStore((s) =&gt; s.bears);</span></span>
<span class="line"><span>  return &lt;h1&gt;{bears} bears&lt;/h1&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组合多个选择器</span></span>
<span class="line"><span>const { bears, fishes } = useBearStore((s) =&gt; ({ bears: s.bears, fishes: s.fishes }), shallow);</span></span></code></pre></div><p><strong>Zustand vs Context 核心差异：</strong></p><ul><li>Context 导致 Provider 嵌套地狱，Zustand 无 Provider</li><li>Context 会重渲染所有消费者，Zustand 选择器精确订阅</li><li>Zustand 可在组件外读写（Router/Promise 回调）</li></ul><h4 id="_2-redux-toolkit-—-大型企业标准" tabindex="-1">2. Redux Toolkit — 大型企业标准 <a class="header-anchor" href="#_2-redux-toolkit-—-大型企业标准" aria-label="Permalink to &quot;2. Redux Toolkit — 大型企业标准&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createSlice, configureStore } from &#39;@reduxjs/toolkit&#39;;</span></span>
<span class="line"><span>import { useDispatch, useSelector } from &#39;react-redux&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// slice：action + reducer 自动生成</span></span>
<span class="line"><span>const counterSlice = createSlice({</span></span>
<span class="line"><span>  name: &#39;counter&#39;,</span></span>
<span class="line"><span>  initialState: { value: 0 },</span></span>
<span class="line"><span>  reducers: {</span></span>
<span class="line"><span>    increment: (state) =&gt; { state.value += 1; },      // Immer 可变写法</span></span>
<span class="line"><span>    decrement: (state) =&gt; { state.value -= 1; },</span></span>
<span class="line"><span>    incrementByAmount: (state, action) =&gt; { state.value += action.payload; },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 异步 thunk</span></span>
<span class="line"><span>const incrementAsync = createAsyncThunk(&#39;counter/fetchCount&#39;, async (amount: number) =&gt; {</span></span>
<span class="line"><span>  const response = await fetch(&#39;/api/count&#39;);</span></span>
<span class="line"><span>  return response.json() as number;</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const store = configureStore({</span></span>
<span class="line"><span>  reducer: { counter: counterSlice.reducer },</span></span>
<span class="line"><span>  middleware: (gDM) =&gt; gDM().concat(logger),</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Hooks 封装 + TypeScript 类型</span></span>
<span class="line"><span>type RootState = ReturnType&lt;typeof store.getState&gt;;</span></span>
<span class="line"><span>type AppDispatch = typeof store.dispatch;</span></span>
<span class="line"><span>export const useAppSelector = useSelector.withTypes&lt;RootState&gt;();</span></span>
<span class="line"><span>export const useAppDispatch = useDispatch.withTypes&lt;AppDispatch&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const count = useAppSelector((s) =&gt; s.counter.value);</span></span>
<span class="line"><span>  const dispatch = useAppDispatch();</span></span>
<span class="line"><span>  return &lt;button onClick={() =&gt; dispatch(increment())}&gt;{count}&lt;/button&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,12)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-506",class:"mermaid",graph:"flowchart%20TD%0A%20%20%20%20A%5B%22React%20Component%22%5D%20--%3E%7CuseAppDispatch%7C%20B%5B%22dispatch(action)%22%5D%0A%20%20%20%20B%20--%3E%20C%5B%22Middleware%20Chain%22%5D%0A%20%20%20%20C%20--%3E%20D%5B%22createAsyncThunk%3Cbr%2F%3E%E8%AF%B7%E6%B1%82%2F%E6%88%90%E5%8A%9F%2F%E5%A4%B1%E8%B4%A5%22%5D%0A%20%20%20%20C%20--%3E%20E%5B%22reducer%20(Immer)%22%5D%0A%20%20%20%20E%20--%3E%20F%5B%22Store%3Cbr%2F%3EconfigureStore%22%5D%0A%20%20%20%20F%20--%3E%7CuseAppSelector%7C%20A%0A%0A%20%20%20%20subgraph%20%E4%B8%89%E5%A4%A7%E5%8E%9F%E5%88%99%0A%20%20%20%20%20%20%20%20P1%5B%22%E5%8D%95%E4%B8%80%E6%95%B0%E6%8D%AE%E6%BA%90%22%5D%0A%20%20%20%20%20%20%20%20P2%5B%22%E7%8A%B6%E6%80%81%E5%8F%AA%E8%AF%BB%22%5D%0A%20%20%20%20%20%20%20%20P3%5B%22%E7%BA%AF%E5%87%BD%E6%95%B0%E4%BF%AE%E6%94%B9%22%5D%0A%20%20%20%20end%0A"})]),fallback:n(()=>[...s[2]||(s[2]=[l(" Loading... ",-1)])]),_:1})),s[9]||(s[9]=c("p",null,[c("strong",null,"Redux 中间件洋葱模型：")],-1)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-510",class:"mermaid",graph:"flowchart%20LR%0A%20%20%20%20A%5B%22dispatch%22%5D%20--%3E%20B%5B%22logger%22%5D%0A%20%20%20%20B%20--%3E%20C%5B%22thunk%22%5D%0A%20%20%20%20C%20--%3E%20D%5B%22saga%22%5D%0A%20%20%20%20D%20--%3E%20E%5B%22reducer%22%5D%0A%20%20%20%20E%20--%3E%20F%5B%22store%22%5D%0A%20%20%20%20style%20B%20fill%3A%23e3f2fd%0A%20%20%20%20style%20C%20fill%3A%23e3f2fd%0A%20%20%20%20style%20D%20fill%3A%23e3f2fd%0A"})]),fallback:n(()=>[...s[3]||(s[3]=[l(" Loading... ",-1)])]),_:1})),s[10]||(s[10]=t(`<h4 id="_3-jotai-—-原子化状态" tabindex="-1">3. Jotai — 原子化状态 <a class="header-anchor" href="#_3-jotai-—-原子化状态" aria-label="Permalink to &quot;3. Jotai — 原子化状态&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { atom, useAtom, useAtomValue, useSetAtom } from &#39;jotai&#39;;</span></span>
<span class="line"><span>import { atomWithStorage, splitAtom, loadable } from &#39;jotai/utils&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基础原子</span></span>
<span class="line"><span>const countAtom = atom(0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 派生原子（懒计算，自动缓存）</span></span>
<span class="line"><span>const doubledAtom = atom((get) =&gt; get(countAtom) * 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 异步原子</span></span>
<span class="line"><span>const userAtom = atom(async () =&gt; {</span></span>
<span class="line"><span>  const res = await fetch(&#39;/api/user&#39;);</span></span>
<span class="line"><span>  return res.json();</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 存储原子（自动持久化）</span></span>
<span class="line"><span>const themeAtom = atomWithStorage(&#39;theme&#39;, &#39;light&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 拆分原子（数组管理）</span></span>
<span class="line"><span>const itemsAtom = atom([{ id: 1, text: &#39;hello&#39; }]);</span></span>
<span class="line"><span>const itemAtomsAtom = splitAtom(itemsAtom);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const count = useAtomValue(countAtom);       // 只读</span></span>
<span class="line"><span>  const setCount = useSetAtom(countAtom);       // 只写</span></span>
<span class="line"><span>  return &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;{count}&lt;/button&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 异步 + loading 状态</span></span>
<span class="line"><span>function User() {</span></span>
<span class="line"><span>  const user = useAtomValue(loadable(userAtom));</span></span>
<span class="line"><span>  if (user.state === &#39;loading&#39;) return &lt;Spinner /&gt;;</span></span>
<span class="line"><span>  if (user.state === &#39;hasError&#39;) return &lt;Error message={user.error} /&gt;;</span></span>
<span class="line"><span>  return &lt;div&gt;{user.data.name}&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><table tabindex="0"><thead><tr><th>维度</th><th>Context API</th><th>Jotai</th><th>Recoil（已停更）</th></tr></thead><tbody><tr><td>渲染优化</td><td>❌ 所有消费者重渲染</td><td>✅ 仅关联原子变化</td><td>✅ 仅关联原子变化</td></tr><tr><td>组合性</td><td>❌ 多层 Provider 嵌套</td><td>✅ 原子自由组合</td><td>✅ 原子自由组合</td></tr><tr><td>异步支持</td><td>❌ 需手动管理</td><td>✅ loadable / 异步原子</td><td>✅ selector</td></tr><tr><td>Bundle</td><td>0KB</td><td>~3KB</td><td>~15KB</td></tr><tr><td>维护状态</td><td>✅ 活跃</td><td>✅ 活跃</td><td>❌ Meta 已不推荐</td></tr></tbody></table><h4 id="_4-mobx-—-可变响应式" tabindex="-1">4. MobX — 可变响应式 <a class="header-anchor" href="#_4-mobx-—-可变响应式" aria-label="Permalink to &quot;4. MobX — 可变响应式&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { makeAutoObservable } from &#39;mobx&#39;;</span></span>
<span class="line"><span>import { observer } from &#39;mobx-react-lite&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可观察状态（class-based）</span></span>
<span class="line"><span>class TodoStore {</span></span>
<span class="line"><span>  todos: Todo[] = [];</span></span>
<span class="line"><span>  filter: &#39;all&#39; | &#39;active&#39; | &#39;completed&#39; = &#39;all&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    makeAutoObservable(this);  // 自动将属性转为 observable</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // action：修改状态</span></span>
<span class="line"><span>  addTodo(text: string) {</span></span>
<span class="line"><span>    this.todos.push({ id: Date.now(), text, completed: false });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // computed：自动衍生</span></span>
<span class="line"><span>  get filteredTodos() {</span></span>
<span class="line"><span>    if (this.filter === &#39;all&#39;) return this.todos;</span></span>
<span class="line"><span>    return this.todos.filter(t =&gt; t.completed === (this.filter === &#39;completed&#39;));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const todoStore = new TodoStore();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组件自动追踪依赖</span></span>
<span class="line"><span>const TodoList = observer(({ store }: { store: TodoStore }) =&gt; (</span></span>
<span class="line"><span>  &lt;ul&gt;</span></span>
<span class="line"><span>    {store.filteredTodos.map(todo =&gt; (</span></span>
<span class="line"><span>      &lt;li key={todo.id}&gt;{todo.text}&lt;/li&gt;</span></span>
<span class="line"><span>    ))}</span></span>
<span class="line"><span>  &lt;/ul&gt;</span></span>
<span class="line"><span>));</span></span></code></pre></div><p><strong>MobX 与 Zustand 核心差异：</strong></p><ul><li>MobX 可变响应式（类似 Vue reactive），Zustand 不可变（类似 React setState）</li><li>MobX 自动追踪依赖，Zustand 手动选择器</li><li>MobX 更适合 OOP 思维，Zustand 更适合函数式</li></ul><h4 id="_5-valtio-—-proxy-响应式" tabindex="-1">5. Valtio — Proxy 响应式 <a class="header-anchor" href="#_5-valtio-—-proxy-响应式" aria-label="Permalink to &quot;5. Valtio — Proxy 响应式&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { proxy, useSnapshot } from &#39;valtio&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Proxy 代理对象，类似 Vue reactive</span></span>
<span class="line"><span>const state = proxy({</span></span>
<span class="line"><span>  count: 0,</span></span>
<span class="line"><span>  user: { name: &#39;John&#39;, todos: [] as Todo[] },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// mutations</span></span>
<span class="line"><span>state.count++;</span></span>
<span class="line"><span>state.user.todos.push({ id: 1, text: &#39;hello&#39; });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组件订阅快照（不可变）</span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const snap = useSnapshot(state);        // 只读快照</span></span>
<span class="line"><span>  return &lt;button onClick={() =&gt; state.count++}&gt;{snap.count}&lt;/button&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 派生状态</span></span>
<span class="line"><span>const doubled = ref(0);</span></span>
<span class="line"><span>subscribe(state, () =&gt; { doubled.value = state.count * 2; });</span></span></code></pre></div><h4 id="_6-legend-state-—-信号式高性能" tabindex="-1">6. Legend State — 信号式高性能 <a class="header-anchor" href="#_6-legend-state-—-信号式高性能" aria-label="Permalink to &quot;6. Legend State — 信号式高性能&quot;">​</a></h4><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { observable, useObservable, batch } from &#39;@legendapp/state&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 信号式状态（类似 Angular Signals）</span></span>
<span class="line"><span>const state = observable({</span></span>
<span class="line"><span>  count: 0,</span></span>
<span class="line"><span>  user: { name: &#39;&#39; },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 精确依赖追踪，无需选择器</span></span>
<span class="line"><span>function Counter() {</span></span>
<span class="line"><span>  const count = useObservable(state.count);</span></span>
<span class="line"><span>  return &lt;button onClick={() =&gt; state.count.set(c =&gt; c + 1)}&gt;{count}&lt;/button&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 批量更新（合并触发）</span></span>
<span class="line"><span>batch(() =&gt; {</span></span>
<span class="line"><span>  state.count.set(5);</span></span>
<span class="line"><span>  state.user.name.set(&#39;Jane&#39;);</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="📊-八维对比矩阵" tabindex="-1">📊 八维对比矩阵 <a class="header-anchor" href="#📊-八维对比矩阵" aria-label="Permalink to &quot;📊 八维对比矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>useState</th><th>Zustand</th><th>Redux Toolkit</th><th>Jotai</th><th>MobX</th><th>Valtio</th><th>TanStack Query</th></tr></thead><tbody><tr><td><strong>范式</strong></td><td>不可变</td><td>不可变</td><td>不可变(Immer)</td><td>不可变</td><td>可变</td><td><strong>Proxy</strong></td><td>不可变</td></tr><tr><td><strong>Bundle</strong></td><td>0KB</td><td>~1KB</td><td>~12KB</td><td>~3KB</td><td>~16KB</td><td>~2KB</td><td>~13KB</td></tr><tr><td><strong>模板代码</strong></td><td>无</td><td>极少</td><td>中</td><td>少</td><td>少</td><td>极少</td><td>少</td></tr><tr><td><strong>组件外访问</strong></td><td>❌</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><strong>异步支持</strong></td><td>❌</td><td>Promise</td><td>createAsyncThunk</td><td>atom(async)</td><td>flow</td><td>proxy +</td><td>✅ 内置</td></tr><tr><td><strong>中间件</strong></td><td>—</td><td>persist/imber</td><td>thunk/saga</td><td>utils</td><td>—</td><td>—</td><td>查询/变更</td></tr><tr><td><strong>DevTools</strong></td><td>React DevTools</td><td>Zustand DevTools</td><td><strong>Redux DevTools</strong></td><td>Jotai DevTools</td><td>MobX DevTools</td><td>—</td><td>React Query Devtools</td></tr><tr><td><strong>SSR 友好</strong></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>⚠️</td><td>✅</td><td>✅</td></tr></tbody></table><h3 id="🎯-技术选型决策树" tabindex="-1">🎯 技术选型决策树 <a class="header-anchor" href="#🎯-技术选型决策树" aria-label="Permalink to &quot;🎯 技术选型决策树&quot;">​</a></h3>`,14)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-883",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20A%5B%22%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E9%80%89%E5%9E%8B%22%5D%20--%3E%20B%7B%22%E7%8A%B6%E6%80%81%E6%9D%A5%E6%BA%90%22%7D%0A%20%20%20%20B%20--%3E%7C%22%E6%9C%8D%E5%8A%A1%E7%AB%AF%20API%22%7C%20C%5B%22TanStack%20Query%20%2F%20SWR%20%2F%20RTK%20Query%22%5D%0A%20%20%20%20B%20--%3E%7C%22%E5%AE%A2%E6%88%B7%E7%AB%AF%22%7C%20D%7B%22%E5%BA%94%E7%94%A8%E8%A7%84%E6%A8%A1%22%7D%0A%0A%20%20%20%20D%20--%3E%7C%22%E5%8D%95%E7%BB%84%E4%BB%B6%22%7C%20E%5B%22useState%22%5D%0A%20%20%20%20D%20--%3E%7C%22%E5%B0%91%E6%95%B0%E7%BB%84%E4%BB%B6%22%7C%20F%5B%22Context%20%2B%20useReducer%22%5D%0A%20%20%20%20D%20--%3E%7C%22%E4%B8%AD%E7%AD%89%E8%A7%84%E6%A8%A1%22%7C%20G%7B%22%E5%9B%A2%E9%98%9F%E5%81%8F%E5%A5%BD%22%7D%0A%20%20%20%20D%20--%3E%7C%22%E5%A4%A7%E5%9E%8B%E4%BC%81%E4%B8%9A%22%7C%20H%5B%22Redux%20Toolkit%3Cbr%2F%3E%EF%BC%88%E8%A7%84%E8%8C%83%20%2B%20%E7%94%9F%E6%80%81%EF%BC%89%22%5D%0A%0A%20%20%20%20G%20--%3E%7C%22%E6%9E%81%E7%AE%80%20API%22%7C%20I%5B%22Zustand%20%F0%9F%92%A1%22%5D%0A%20%20%20%20G%20--%3E%7C%22%E5%8E%9F%E5%AD%90%E5%8C%96%22%7C%20J%5B%22Jotai%22%5D%0A%20%20%20%20G%20--%3E%7C%22%E5%93%8D%E5%BA%94%E5%BC%8F%2F%E5%8F%AF%E5%8F%98%22%7C%20K%5B%22MobX%20%2F%20Valtio%22%5D%0A%0A%20%20%20%20I%20--%3E%20L%7B%22%E9%9C%80%E8%A6%81%E4%B8%AD%E9%97%B4%E4%BB%B6%22%7D%0A%20%20%20%20L%20--%3E%7C%22%E6%8C%81%E4%B9%85%E5%8C%96%22%7C%20M%5B%22Zustand%20%2B%20persist%22%5D%0A%20%20%20%20L%20--%3E%7C%22DevTools%22%7C%20N%5B%22Zustand%20%2B%20devtools%22%5D%0A%20%20%20%20L%20--%3E%7C%22%E5%A4%A7%E9%A1%B9%E7%9B%AE%22%7C%20O%5B%22Zustand%20%2B%20immer%22%5D%0A"})]),fallback:n(()=>[...s[4]||(s[4]=[l(" Loading... ",-1)])]),_:1})),s[11]||(s[11]=t(`<h3 id="📊-性能基准-粗略" tabindex="-1">📊 性能基准（粗略） <a class="header-anchor" href="#📊-性能基准-粗略" aria-label="Permalink to &quot;📊 性能基准（粗略）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 更新 1000 个状态项 + 订阅组件重渲染（ms）</span></span>
<span class="line"><span>Zustand:     ~2ms  （选择器精确订阅）</span></span>
<span class="line"><span>Jotai:       ~3ms  （原子级依赖追踪）</span></span>
<span class="line"><span>MobX:        ~4ms  （自动追踪）</span></span>
<span class="line"><span>Valtio:      ~3ms  （Proxy + 快照对比）</span></span>
<span class="line"><span>Redux:       ~8ms  （全量 selector 检查）</span></span>
<span class="line"><span>Context:     ~15ms （所有消费者重渲染）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Bundle 体积（gzip）</span></span>
<span class="line"><span>Zustand:     1.2KB</span></span>
<span class="line"><span>Valtio:      1.8KB</span></span>
<span class="line"><span>Jotai:       2.5KB</span></span>
<span class="line"><span>MobX:        12KB</span></span>
<span class="line"><span>RTK:         10KB</span></span>
<span class="line"><span>TanStack Q:  11KB</span></span></code></pre></div><blockquote><p>🔗 <strong>链式思考</strong>：React Router v6.4+ 引入的 <code>loaders</code>/<code>actions</code> 本质是&quot;声明式数据获取&quot;，在路由匹配时自动加载数据——这与 Vue Router 的导航守卫 + 手动数据获取模式不同，更接近 Angular Router 的 <code>resolve</code> 守卫。三者都支持懒加载和嵌套路由，但 React Router 以 URL 为中心，Vue Router 以组件树为中心，Angular Router 以配置为中心。详见 <a href="./../框架对比/">框架对比</a> 的&quot;路由方案&quot;。</p></blockquote><hr><h2 id="_3️⃣-路由完全指南" tabindex="-1">3️⃣ 路由完全指南 <a class="header-anchor" href="#_3️⃣-路由完全指南" aria-label="Permalink to &quot;3️⃣ 路由完全指南&quot;">​</a></h2><h3 id="📍-react-router-实现原理" tabindex="-1">📍 React Router 实现原理 <a class="header-anchor" href="#📍-react-router-实现原理" aria-label="Permalink to &quot;📍 React Router 实现原理&quot;">​</a></h3>`,6)),(a(),e(o,null,{default:n(()=>[i(p,{id:"mermaid-900",class:"mermaid",graph:"flowchart%20TD%0A%20%20%20%20subgraph%20HashRouter%0A%20%20%20%20%20%20%20%20H1%5B%22URL%3A%20http%3A%2F%2Fxxx%2F%23%2Fpath%22%5D%20--%3E%20H2%5B%22%E7%9B%91%E5%90%AC%20hashchange%20%E4%BA%8B%E4%BB%B6%22%5D%0A%20%20%20%20%20%20%20%20H2%20--%3E%20H3%5B%22hash%20%E5%8F%98%E5%8C%96%20%E2%86%92%20%E5%8C%B9%E9%85%8D%E8%B7%AF%E7%94%B1%20%E2%86%92%20%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20BrowserRouter%0A%20%20%20%20%20%20%20%20B1%5B%22URL%3A%20http%3A%2F%2Fxxx%2Fpath%22%5D%20--%3E%20B2%5B%22%E4%BD%BF%E7%94%A8%20History%20API%22%5D%0A%20%20%20%20%20%20%20%20B2%20--%3E%20B3%5B%22pushState%2FreplaceState%3Cbr%2F%3E%E6%94%B9%E5%8F%98%20URL%20%E4%B8%8D%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2%22%5D%0A%20%20%20%20%20%20%20%20B3%20--%3E%20B4%5B%22%E7%9B%91%E5%90%AC%20popstate%20%E4%BA%8B%E4%BB%B6%20%E2%86%92%20%E5%8C%B9%E9%85%8D%E8%B7%AF%E7%94%B1%22%5D%0A%20%20%20%20end%0A%0A%20%20%20%20subgraph%20react-router%20%E5%B0%81%E8%A3%85%0A%20%20%20%20%20%20%20%20L1%5B%22history%20%E5%BA%93%3Cbr%2F%3E%E6%8A%B9%E5%B9%B3%20hash%20%E4%B8%8E%20history%20%E5%B7%AE%E5%BC%82%22%5D%0A%20%20%20%20%20%20%20%20L2%5B%22Route%20%E7%BB%84%E4%BB%B6%3Cbr%2F%3Epath%20%E5%8C%B9%E9%85%8D%E5%BD%93%E5%89%8D%20URL%22%5D%0A%20%20%20%20%20%20%20%20L3%5B%22Link%20%E7%BB%84%E4%BB%B6%3Cbr%2F%3E%E9%98%BB%E6%AD%A2%20a%20%E9%BB%98%E8%AE%A4%E8%A1%8C%E4%B8%BA%22%5D%0A%20%20%20%20end%0A"})]),fallback:n(()=>[...s[5]||(s[5]=[l(" Loading... ",-1)])]),_:1})),s[12]||(s[12]=t(`<h3 id="🛣️-完整路由配置" tabindex="-1">🛣️ 完整路由配置 <a class="header-anchor" href="#🛣️-完整路由配置" aria-label="Permalink to &quot;🛣️ 完整路由配置&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createBrowserRouter, RouterProvider, Outlet } from &#39;react-router-dom&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/&#39;,</span></span>
<span class="line"><span>    element: &lt;RootLayout /&gt;,</span></span>
<span class="line"><span>    children: [</span></span>
<span class="line"><span>      { index: true, element: &lt;Home /&gt; },</span></span>
<span class="line"><span>      { path: &#39;about&#39;, element: &lt;About /&gt; },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        path: &#39;dashboard&#39;,</span></span>
<span class="line"><span>        element: &lt;DashboardLayout /&gt;,</span></span>
<span class="line"><span>        children: [</span></span>
<span class="line"><span>          { index: true, element: &lt;DashboardHome /&gt; },</span></span>
<span class="line"><span>          { path: &#39;settings&#39;, element: &lt;Settings /&gt; },</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      { path: &#39;products/:id&#39;, element: &lt;ProductDetail /&gt; },</span></span>
<span class="line"><span>      { path: &#39;*&#39;, element: &lt;NotFound /&gt; }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function RootLayout() {</span></span>
<span class="line"><span>  return &lt;div&gt;&lt;Header /&gt;&lt;Outlet /&gt;&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function App() {</span></span>
<span class="line"><span>  return &lt;RouterProvider router={router} /&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>参数读取与导航：</strong></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function ProductDetail() {</span></span>
<span class="line"><span>  const { id } = useParams&lt;{ id: string }&gt;();</span></span>
<span class="line"><span>  const navigate = useNavigate();</span></span>
<span class="line"><span>  return &lt;div&gt;Product: {id}&lt;button onClick={() =&gt; navigate(&#39;/&#39;)}&gt;返回&lt;/button&gt;&lt;/div&gt;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 受保护路由</span></span>
<span class="line"><span>function ProtectedRoute({ children }: { children: ReactNode }) {</span></span>
<span class="line"><span>  const isAuthenticated = useAuth();</span></span>
<span class="line"><span>  return isAuthenticated ? children : &lt;Navigate to=&quot;/login&quot; /&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="📍-loaders-actions-v6-4" tabindex="-1">📍 loaders / actions (v6.4+) <a class="header-anchor" href="#📍-loaders-actions-v6-4" aria-label="Permalink to &quot;📍 loaders / actions (v6.4+)&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const router = createBrowserRouter([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/products/:id&#39;,</span></span>
<span class="line"><span>    element: &lt;ProductDetail /&gt;,</span></span>
<span class="line"><span>    loader: async ({ params }) =&gt; {</span></span>
<span class="line"><span>      const product = await fetch(\`/api/products/\${params.id}\`);</span></span>
<span class="line"><span>      return product.json();</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    action: async ({ request, params }) =&gt; {</span></span>
<span class="line"><span>      const formData = await request.formData();</span></span>
<span class="line"><span>      await fetch(\`/api/products/\${params.id}\`, { method: &#39;PUT&#39;, body: formData });</span></span>
<span class="line"><span>      return { success: true };</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ProductDetail() {</span></span>
<span class="line"><span>  const product = useLoaderData();</span></span>
<span class="line"><span>  const actionData = useActionData();</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;{product.name}&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;Form method=&quot;put&quot;&gt;</span></span>
<span class="line"><span>        &lt;input name=&quot;price&quot; defaultValue={product.price} /&gt;</span></span>
<span class="line"><span>        &lt;button type=&quot;submit&quot;&gt;更新&lt;/button&gt;</span></span>
<span class="line"><span>        {actionData?.success &amp;&amp; &lt;p&gt;更新成功&lt;/p&gt;}</span></span>
<span class="line"><span>      &lt;/Form&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>defer / Await（延迟数据加载）：</strong></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async function loader() {</span></span>
<span class="line"><span>  const reviewsPromise = fetch(&#39;/api/reviews&#39;).then(r =&gt; r.json());</span></span>
<span class="line"><span>  return defer({</span></span>
<span class="line"><span>    product: await fetch(&#39;/api/product&#39;).then(r =&gt; r.json()),</span></span>
<span class="line"><span>    reviews: reviewsPromise,</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ProductPage() {</span></span>
<span class="line"><span>  const data = useLoaderData();</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;ProductDetail product={data.product} /&gt;</span></span>
<span class="line"><span>      &lt;Suspense fallback={&lt;ReviewsSkeleton /&gt;}&gt;</span></span>
<span class="line"><span>        &lt;Await resolve={data.reviews}&gt;</span></span>
<span class="line"><span>          {(reviews) =&gt; &lt;ReviewsList reviews={reviews} /&gt;}</span></span>
<span class="line"><span>        &lt;/Await&gt;</span></span>
<span class="line"><span>      &lt;/Suspense&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_4️⃣-表单系统" tabindex="-1">4️⃣ 表单系统 <a class="header-anchor" href="#_4️⃣-表单系统" aria-label="Permalink to &quot;4️⃣ 表单系统&quot;">​</a></h2><h3 id="📋-受控组件完整示例" tabindex="-1">📋 受控组件完整示例 <a class="header-anchor" href="#📋-受控组件完整示例" aria-label="Permalink to &quot;📋 受控组件完整示例&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>interface FormData {</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span>  email: string;</span></span>
<span class="line"><span>  password: string;</span></span>
<span class="line"><span>  agreeTerms: boolean;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function RegistrationForm() {</span></span>
<span class="line"><span>  const [formData, setFormData] = useState&lt;FormData&gt;({</span></span>
<span class="line"><span>    name: &#39;&#39;, email: &#39;&#39;, password: &#39;&#39;, agreeTerms: false</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  const [errors, setErrors] = useState&lt;Partial&lt;FormData&gt;&gt;({});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const handleChange = (e: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; {</span></span>
<span class="line"><span>    const { name, type, value, checked } = e.target;</span></span>
<span class="line"><span>    setFormData(prev =&gt; ({ ...prev, [name]: type === &#39;checkbox&#39; ? checked : value }));</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const validate = (): boolean =&gt; {</span></span>
<span class="line"><span>    const newErrors: Partial&lt;FormData&gt; = {};</span></span>
<span class="line"><span>    if (!formData.name) newErrors.name = &#39;姓名必填&#39;;</span></span>
<span class="line"><span>    if (!formData.email) newErrors.email = &#39;邮箱必填&#39;;</span></span>
<span class="line"><span>    if (!formData.password || formData.password.length &lt; 6) newErrors.password = &#39;密码至少6个字符&#39;;</span></span>
<span class="line"><span>    setErrors(newErrors);</span></span>
<span class="line"><span>    return Object.keys(newErrors).length === 0;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const handleSubmit = async (e: FormEvent) =&gt; {</span></span>
<span class="line"><span>    e.preventDefault();</span></span>
<span class="line"><span>    if (!validate()) return;</span></span>
<span class="line"><span>    await submitForm(formData);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;form onSubmit={handleSubmit}&gt;</span></span>
<span class="line"><span>      &lt;input name=&quot;name&quot; value={formData.name} onChange={handleChange} /&gt;</span></span>
<span class="line"><span>      {errors.name &amp;&amp; &lt;span&gt;{errors.name}&lt;/span&gt;}</span></span>
<span class="line"><span>      &lt;input type=&quot;email&quot; name=&quot;email&quot; value={formData.email} onChange={handleChange} /&gt;</span></span>
<span class="line"><span>      &lt;input type=&quot;checkbox&quot; name=&quot;agreeTerms&quot; checked={formData.agreeTerms} onChange={handleChange} /&gt;</span></span>
<span class="line"><span>      &lt;button type=&quot;submit&quot;&gt;提交&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/form&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="_5️⃣-组件设计模式" tabindex="-1">5️⃣ 组件设计模式 <a class="header-anchor" href="#_5️⃣-组件设计模式" aria-label="Permalink to &quot;5️⃣ 组件设计模式&quot;">​</a></h2><h3 id="🎭-复合组件-compound-component" tabindex="-1">🎭 复合组件 (Compound Component) <a class="header-anchor" href="#🎭-复合组件-compound-component" aria-label="Permalink to &quot;🎭 复合组件 (Compound Component)&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const AccordionContext = createContext(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Accordion({ children }) {</span></span>
<span class="line"><span>  const [openIndex, setOpenIndex] = useState(null);</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;AccordionContext.Provider value={{ openIndex, setOpenIndex }}&gt;</span></span>
<span class="line"><span>      &lt;div className=&quot;accordion&quot;&gt;{children}&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/AccordionContext.Provider&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Item({ index, children }) {</span></span>
<span class="line"><span>  const { openIndex, setOpenIndex } = useContext(AccordionContext);</span></span>
<span class="line"><span>  const isOpen = openIndex === index;</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div className=&quot;accordion-item&quot;&gt;</span></span>
<span class="line"><span>      &lt;button onClick={() =&gt; setOpenIndex(isOpen ? null : index)}&gt;{children}&lt;/button&gt;</span></span>
<span class="line"><span>      {isOpen &amp;&amp; &lt;div&gt;{children}&lt;/div&gt;}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Accordion.Item = Item;</span></span>
<span class="line"><span>// 使用: &lt;Accordion&gt;&lt;Accordion.Item index={0}&gt;内容&lt;/Accordion.Item&gt;&lt;/Accordion&gt;</span></span></code></pre></div><h3 id="🎨-render-props-模式" tabindex="-1">🎨 Render Props 模式 <a class="header-anchor" href="#🎨-render-props-模式" aria-label="Permalink to &quot;🎨 Render Props 模式&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function MouseTracker({ render }: { render: (data: MousePosition) =&gt; ReactNode }) {</span></span>
<span class="line"><span>  const [position, setPosition] = useState({ x: 0, y: 0 });</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    const handleMouseMove = (e: MouseEvent) =&gt; setPosition({ x: e.clientX, y: e.clientY });</span></span>
<span class="line"><span>    window.addEventListener(&#39;mousemove&#39;, handleMouseMove);</span></span>
<span class="line"><span>    return () =&gt; window.removeEventListener(&#39;mousemove&#39;, handleMouseMove);</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span>  return render(position);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="🔧-control-props-受控属性" tabindex="-1">🔧 Control Props（受控属性） <a class="header-anchor" href="#🔧-control-props-受控属性" aria-label="Permalink to &quot;🔧 Control Props（受控属性）&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Toggle({ on, onChange, defaultOn = false }) {</span></span>
<span class="line"><span>  const isControlled = on !== undefined;</span></span>
<span class="line"><span>  const [internalOn, setInternalOn] = useState(defaultOn);</span></span>
<span class="line"><span>  const isOn = isControlled ? on : internalOn;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function toggle() {</span></span>
<span class="line"><span>    if (isControlled) onChange?.(!isOn);</span></span>
<span class="line"><span>    else setInternalOn(!isOn);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return &lt;button onClick={toggle}&gt;{isOn ? &#39;ON&#39; : &#39;OFF&#39;}&lt;/button&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="💡-state-reducer-状态归约器" tabindex="-1">💡 State Reducer（状态归约器） <a class="header-anchor" href="#💡-state-reducer-状态归约器" aria-label="Permalink to &quot;💡 State Reducer（状态归约器）&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useToggle({ reducer = defaultReducer } = {}) {</span></span>
<span class="line"><span>  const [state, dispatch] = useReducer(reducer, { on: false });</span></span>
<span class="line"><span>  return { on: state.on, toggle: () =&gt; dispatch({ type: &#39;toggle&#39; }) };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function customReducer(state, action) {</span></span>
<span class="line"><span>  switch (action.type) {</span></span>
<span class="line"><span>    case &#39;toggle&#39;: return { on: !state.on };</span></span>
<span class="line"><span>    default: return state;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr>`,23))])}const f=r(g,[["render",h]]);export{C as __pageData,f as default};
