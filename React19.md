

# React 19 全面学习指南

本指南旨在全面涵盖 React 框架的核心概念、最新特性、最佳实践以及面试常见问题，助您从入门到精通。

## 1. React 基础

React 是一个由 Facebook 开发的用于构建用户界面的 JavaScript 库。它采用组件化思想，通过声明式编程帮助开发者高效构建交互式 UI。

### 核心概念

*   **组件 (Components)**: React 应用的构建基石，是独立的、可复用的 UI 单元。可以是函数组件或类组件。
*   **JSX**: JavaScript XML 的缩写，一种 JavaScript 语法扩展，允许在 JavaScript 代码中编写类似 HTML 的结构。
*   **Props (属性)**: 父组件向子组件传递数据的只读属性。
*   **State (状态)**: 组件内部管理的数据，可随时间变化。`useState` Hook 或 `this.state`。
*   **虚拟 DOM (Virtual DOM)**: React 在内存中维护的真实 DOM 的轻量级副本，通过比较新旧虚拟 DOM 来最小化对真实 DOM 的操作。
*   **声明式编程**: 描述你想要什么，而不是如何实现它。React 负责高效地更新 DOM。
*   **单向数据流**: 数据通常从父组件流向子组件。

### Hello World 示例

```jsx
// App.jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, React 19!</h1>
      <p>This is my first React app.</p>
    </div>
  );
}

export default App;
```

```jsx
// index.js (with React 18+ createRoot for concurrent mode)
import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18+
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
```
`

## 2. React 19 新特性

React 19 带来了许多激动人心的新特性和改进，旨在提升开发者体验、性能和并发能力。

*   **React Compiler (React Forget)**: 革命性的编译优化，在构建时自动优化 `useState`、`useCallback` 等 Hooks，减少不必要的重新渲染，提高性能。
*   **Actions**: 统一的表单处理机制，支持 `useFormStatus`、`useFormState` 等 Hook，简化表单异步提交、乐观更新和错误处理。
*   **`use` Hook**: 一个通用的异步数据获取 Hook，可以直接在组件中 `await` Promise，支持 Suspense。
*   **`useOptimistic` Hook**: 简化乐观更新的实现，改善用户体验。
*   **`use(context)`**: 替代 `useContext`，在 `use` Hook 的基础上提供对 Context 的异步消费能力。
*   **Metadata support (Document Metadata)**: 支持在组件中声明 `<title>`, `<meta>`, `<link>` 等 HTML `<head>` 元素，React 会自动将它们提升到 `<head>`。
*   **Document API**: 允许从组件渲染 `<script>`, `<link>`, `<meta>` 等 HTML 文档元素。
*   **Web Components 的增强支持**: 更好地与 Web Components 集成，改进 Props 传递和事件处理。
*   **ESM 模块化**: React 19 将完全使用 ESM 模块化。
*   **废弃和移除**: 移除了一些老旧的 API 和功能，如 `Context.Provider value` 的函数式更新。

## 3. JSX 与 Babel

### JSX

*   **定义**: JavaScript XML，是 React 的一个语法扩展，允许您在 JavaScript 文件中编写类似 HTML 的标记。它不是标准的 JavaScript，也不是模板语言。
*   **用途**: 在 JavaScript 代码中更直观地描述 UI 结构。
*   **特点**:
    *   **表达式**: 在 JSX 中可以使用花括号 `{}` 嵌入任何 JavaScript 表达式。
    *   **属性**: HTML 属性在 JSX 中通常采用驼峰命名法 (如 `className` 而非 `class`)。
    *   **子元素**: JSX 元素可以包含子元素。
    *   **自闭合标签**: 必须显式闭合，即使没有子元素 (如 `<img />`)。
    *   **根元素**: 每个 JSX 片段必须有一个根元素 (或使用 `<></>` Fragment)。
    *   **`dangerouslySetInnerHTML`**: 插入未经转义的 HTML，需要谨慎使用。

### Babel

*   **定义**: 一个 JavaScript 编译器，用于将 ES6+ 或 JSX 代码转换成浏览器或 Node.js 环境能够理解的 JavaScript 代码。
*   **在 React 中的作用**:
    1.  **JSX 转换**: 将 JSX 语法转换成 `React.createElement()` 函数调用 (经典运行时) 或 `_jsx()` 函数调用 (自动运行时，React 17+)。
    2.  **ES Next 转换**: 将最新的 JavaScript 语法 (如箭头函数、`const`/`let`、async/await) 转换成旧版 JavaScript。
    3.  **TypeScript 转换**: 将 TypeScript 代码转换成 JavaScript。

### 转换示例

```jsx
// 原始 JSX 代码
const element = <h1 className="greeting">Hello, world!</h1>;

// 经过 Babel 转换后的 JavaScript 代码 (大致，具体取决于配置)
// With classic runtime:
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);

// With automatic runtime (React 17+ 默认):
// import { jsx as _jsx } from "react/jsx-runtime"; // 自动引入
// const element = _jsx("h1", { className: "greeting", children: "Hello, world!" });
```

## 4. 组件与 Props

### 组件 (Components)

*   **定义**: React 应用的 UI 构建块。它们是独立的、可重用的代码片段，负责渲染 UI 的特定部分。
*   **类型**:
    *   **函数组件 (Function Components)**: 使用 JavaScript 函数定义，通常使用 Hooks 管理状态和副作用。在 React 16.8 引入 Hooks 后成为主流。
    *   **类组件 (Class Components)**: 使用 ES6 类定义，通过 `render` 方法返回 JSX，并使用 `this.state` 和生命周期方法管理状态和行为 (在现代 React 开发中已较少使用)。

### Props (属性)

*   **定义**: Props 是从父组件传递给子组件的数据。它们是组件的输入。
*   **特点**:
    *   **只读 (Read-Only)**: 子组件不应该直接修改接收到的 Props。
    *   **单向数据流**: 数据总是从父组件流向子组件。
    *   **传递任何 JavaScript 值**: 可以传递字符串、数字、布尔值、对象、数组，甚至是函数和 JSX 元素。
    *   **`children` Prop**: 用于传递子元素，使组件可以组合。

### 示例

```jsx
// ChildComponent.jsx
import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <button onClick={props.onButtonClick}>Click Me</button>
      {props.children} {/* 渲染子元素 */}
    </div>
  );
}

export default ChildComponent;
```

```jsx
// ParentComponent.jsx
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const handleClick = () => {
    alert('Button clicked in ChildComponent!');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent name="Alice" age={30} onButtonClick={handleClick}>
        <p>This is content from the parent passed as children.</p>
      </ChildComponent>
      <ChildComponent name="Bob" age={25} onButtonClick={() => console.log('Bob clicked!')} />
    </div>
  );
}

export default ParentComponent;
```

## 5. Hooks

Hooks 是 React 16.8 引入的特性，允许你在不编写 Class 的情况下使用 state 和其他 React 特性。

### 常用 Hooks

*   **`useState`**:
    *   **用途**: 在函数组件中添加状态。
    *   **返回**: 一个数组，包含当前状态值和一个更新状态的函数。
    *   **示例**: `const [count, setCount] = useState(0);`
*   **`useEffect`**:
    *   **用途**: 在函数组件中执行副作用操作，如数据获取、订阅、手动修改 DOM。
    *   **执行时机**: 在每次渲染后执行，但可以指定依赖项来控制执行时机。
    *   **清理**: 返回一个清理函数，用于取消订阅、清除定时器等。
    *   **示例**: `useEffect(() => { /* side effect */ return () => { /* cleanup */ }; }, [dependencies]);`
*   **`useContext` (或 React 19 中的 `use(Context)`)**:
    *   **用途**: 消费 Context，在组件树中传递数据，避免 Prop Drilling。
    *   **示例**: `const value = useContext(MyContext);`
*   **`useRef`**:
    *   **用途**: 获取 DOM 元素的引用，或在函数组件的多次渲染之间保存可变值 (不触发重新渲染)。
    *   **示例**: `const inputRef = useRef(null);`
*   **`useCallback`**:
    *   **用途**: 缓存函数，避免在每次渲染时都重新创建函数实例，常用于优化子组件的性能 (配合 `React.memo`)。
    *   **示例**: `const memoizedCallback = useCallback(() => { doSomething(); }, [dependencies]);`
*   **`useMemo`**:
    *   **用途**: 缓存计算结果，避免在每次渲染时都重新计算昂贵的值。
    *   **示例**: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
*   **`useReducer`**:
    *   **用途**: `useState` 的替代方案，用于管理复杂状态逻辑，类似于 Redux。
    *   **返回**: 当前状态和一个 `dispatch` 函数。
    *   **示例**: `const [state, dispatch] = useReducer(reducer, initialState);`

### React 19 新增/改进 Hooks

*   **`use` Hook**:
    *   **用途**: 通用的异步数据获取和资源管理 Hook。可以直接 `await Promise`，支持 Suspense。
    *   **示例**: `const data = use(fetchDataPromise);` (可以在组件顶层或 `use` 调用中直接 `await`)
*   **`useOptimistic` Hook**:
    *   **用途**: 简化乐观更新的实现，改善用户体验。当执行异步操作时，可以立即更新 UI，并在异步操作完成后确认或回滚。
    *   **示例**: `const [optimisticState, addOptimistic] = useOptimistic(state, (currentState, payload) => newState);`
*   **`useFormStatus` Hook**:
    *   **用途**: 在表单元素内部，获取当前表单的提交状态，如 `pending`, `data`, `method`, `action`。帮助构建更好的加载 UI。
    *   **示例**: `const { pending } = useFormStatus();`
*   **`useFormState` Hook**:
    *   **用途**: 将表单提交结果返回给客户端，配合表单 Action 进行状态管理和错误展示。
    *   **示例**: `const [state, formAction] = useFormState(myAction, initialState);`

### 自定义 Hooks

*   **定义**: 一个 JavaScript 函数，其名称以 `use` 开头，并且可以调用其他 Hooks。
*   **用途**: 封装可重用的状态逻辑，提高代码复用性。

```jsx
// useCounter.js (自定义 Hook)
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(prevCount => prevCount + 1), []);
  const decrement = useCallback(() => setCount(prevCount => prevCount - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

export default useCounter;
```

```jsx
// CounterComponent.jsx (使用自定义 Hook)
import React from 'react';
import useCounter from './useCounter';

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterComponent;
```

## 6. Context API

Context API 提供了一种在组件树中传递数据的方式，而无需通过 Prop Drilling (逐层手动传递 Props)。它适用于那些全局性数据，如主题、用户认证信息、语言设置等。

### 核心概念

*   **`createContext`**: 创建一个 Context 对象。它会返回一个 `Provider` 和一个 `Consumer`。
    *   `const MyContext = React.createContext(defaultValue);`
*   **`Provider`**:
    *   `MyContext.Provider` 组件。它接收一个 `value` Prop，该值会被传递给其所有子组件。
    *   当 `Provider` 的 `value` 变化时，所有使用该 Context 的子组件都会重新渲染。
*   **`Consumer` (通常被 Hook 替代)**:
    *   `MyContext.Consumer` 组件。使用渲染 Props 模式来访问 Context 值。在 Hooks 出现后，通常被 `useContext` (或 React 19 的 `use(Context)`) 替代。
*   **`useContext` Hook**:
    *   在函数组件中订阅 Context 的推荐方式。它接收 Context 对象作为参数，并返回该 Context 的当前值。
    *   `const value = useContext(MyContext);`
*   **React 19 中的 `use(Context)`**:
    *   新的 `use` Hook 可以直接消费 Context，语法更简洁，并且可以与 Suspense 配合，异步获取 Context 值。
    *   `const value = use(MyContext);`

### 示例

```jsx
// ThemeContext.js
import React from 'react';

const ThemeContext = React.createContext('light'); // 默认值为 'light'

export default ThemeContext;
```

```jsx
// ThemeButton.jsx (使用 useContext)
import React, { useContext } from 'react'; // React 19 可以用 use(ThemeContext)
import ThemeContext from './ThemeContext';

function ThemeButton() {
  const theme = useContext(ThemeContext); // 消费 Context
  // const theme = use(ThemeContext); // React 19 way
  return (
    <button style={{ background: theme === 'dark' ? '#333' : '#eee', color: theme === 'dark' ? '#eee' : '#333' }}>
      Current Theme: {theme}
    </button>
  );
}

export default ThemeButton;
```

```jsx
// App.jsx (提供 Context)
import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import ThemeButton from './ThemeButton';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}> {/* 提供 Context 值 */}
      <div>
        <h1>Context API Demo</h1>
        <ThemeButton />
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

## 7. 状态管理

在 React 应用中，管理好状态是至关重要的。

### 7.1 组件内部状态

*   **`useState` Hook**: 最基础的状态管理方式，用于管理函数组件的局部状态。
*   **`useReducer` Hook**: `useState` 的替代方案，用于管理更复杂的局部状态逻辑，当状态更新依赖于前一个状态或有多个相关操作时，`useReducer` 更适用。
*   **优点**: 简单，易于理解，适用于局部和不共享的状态。
*   **缺点**: 状态不方便在多个组件之间共享 (Prop Drilling)。

### 7.2 共享状态 (跨组件通信)

*   **Props & Callbacks**: 最直接的父子组件通信方式。
*   **Context API**: 用于在组件树中传递全局性数据，避免 Prop Drilling。
*   **自定义 Hooks**: 封装共享的逻辑和状态。

### 7.3 集中式状态管理 (适用于大型应用)

当应用变得复杂，状态在多个组件之间广泛共享且相互依赖时，集中式状态管理库变得很有用。

*   **Redux**:
    *   **核心概念**: Store (单一状态树), Actions (描述事件), Reducers (纯函数，根据 Action 更新状态), Dispatch (发送 Action)。
    *   **工作流**: UI 触发 Action -> Dispatch Action -> Reducer 处理 -> 更新 Store -> UI 重新渲染。
    *   **优点**: 状态可预测、可追溯 (时间旅行调试)、适用于大型复杂应用。
    *   **缺点**: 样板代码多，学习曲线陡峭。
*   **Redux Toolkit (RTK)**:
    *   Redux 官方推荐的工具集，旨在简化 Redux 开发。
    *   提供了 `createSlice` (简化 Reducers 和 Actions), `configureStore` (简化 Store 配置) 等。
    *   **RTK Query**: 强大的数据请求和缓存解决方案，替代传统的异步 Redux 流程 (如 `redux-thunk`, `redux-saga`)。
*   **Zustand**:
    *   轻量级、快速、可伸缩的状态管理库。
    *   基于 Hook API，易于使用。
    *   **优点**: 学习曲线平缓，样板代码少，性能好。
*   **Jotai**:
    *   原子化状态管理库，灵感来自 Recoil。
    *   通过定义 `atom` (状态单元) 来管理状态。
    *   **优点**: 极简 API，性能好，灵活。
*   **Recoil (Facebook 开发)**:
    *   原子化状态管理库，专注于 React 应用。
    *   **核心概念**: `atom` (可订阅的状态单元), `selector` (派生状态)。
    *   **优点**: React 原生感，与 Concurrent Mode 兼容性好。
*   **TanStack Query (React Query)** / **SWR**:
    *   专注于数据请求、缓存、同步和更新的 Hooks 库。
    *   虽然不是严格意义上的“状态管理库”，但它管理了大量的远程数据状态，并提供强大的 API 来处理异步操作。
    *   **优点**: 简化数据获取，自动缓存、重试、后台重新获取、过期数据管理，大幅减少手写状态管理代码。

### React 19 与状态管理的新趋势

*   **Actions & `useFormState`**: React 19 引入的 Actions 机制为表单相关的局部状态管理提供了新的范式，简化了异步提交和状态更新。
*   **`useOptimistic`**: 简化了乐观更新的实现，这是一种重要的 UI 状态管理模式。
*   **`use` Hook**: 结合 Suspense 和错误边界，使得在组件内部直接进行异步数据获取成为可能，减少了对额外状态管理库的依赖，尤其对于一次性数据获取。
*   **React Compiler**: 自动记忆化优化将使得本地状态管理更加高效，减少对复杂全局状态管理方案的依赖，鼓励将更多状态放置在组件本地。

## 8. 事件处理

React 的事件处理与传统的 DOM 事件处理有所不同。

### 8.1 合成事件 (SyntheticEvent)

*   **定义**: React 实现了一套自己的事件系统，它包装了浏览器原生的 DOM 事件，提供了跨浏览器一致的事件行为。
*   **优点**:
    *   **跨浏览器兼容性**: 屏蔽了不同浏览器事件实现的差异。
    *   **性能优化 (事件委托)**: React 会将所有事件监听器绑定到文档根节点，而不是直接绑定到每个 DOM 元素。当事件触发时，React 会根据事件冒泡路径，将事件分发给正确的组件。
    *   **事件池 (Event Pooling)**: (在 React 17 及之前版本，用于性能优化，现在已不使用) 事件对象会被重复利用，在事件回调函数执行完毕后，事件对象的属性会被重置。因此，不能在异步函数中直接访问合成事件对象。

### 8.2 事件绑定

*   在 JSX 中，事件处理器采用驼峰命名法 (如 `onClick`, `onChange`)。
*   事件处理器被赋值为一个函数，而不是字符串。

### 示例

```jsx
// EventHandling.jsx
import React, { useState } from 'react';

function EventHandling() {
  const [inputValue, setInputValue] = useState('');

  // 事件处理器
  const handleClick = (event) => {
    console.log('Button clicked!', event.target);
    // event.persist(); // 在 React 17+ 中不再需要 event.persist()
    setTimeout(() => {
      // console.log('Event target after timeout:', event.target); // 在 React 17+ 仍然可以访问
    }, 0);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    console.log('Input value:', event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
    console.log('Form submitted with value:', inputValue);
  };

  // 传递参数的事件处理器
  const handleItemClick = (id, event) => {
    console.log(`Item ${id} clicked!`, event.target);
  };

  return (
    <div>
      <h2>Event Handling Demo</h2>
      <button onClick={handleClick}>Click Me</button>

      <input type="text" value={inputValue} onChange={handleChange} placeholder="Type something..." />
      <p>Current input: {inputValue}</p>

      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Submit Form</button>
      </form>

      <ul>
        {[1, 2, 3].map(id => (
          <li key={id} onClick={(event) => handleItemClick(id, event)}>
            Item {id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventHandling;
```

## 9. 生命周期

React 组件的生命周期描述了组件从创建、挂载、更新到卸载的整个过程。

### 类组件生命周期 (回顾)

**挂载 (Mounting)**:
*   `constructor()`: 初始化 state 和绑定方法。
*   `static getDerivedStateFromProps()`: 在 render 之前，根据 props 更新 state。
*   `render()`: 渲染 JSX。
*   `componentDidMount()`: 组件挂载到 DOM 后，进行数据获取、订阅等。

**更新 (Updating)**:
*   `static getDerivedStateFromProps()`: 在 render 之前，根据 props 更新 state。
*   `shouldComponentUpdate()`: 决定是否需要重新渲染组件 (性能优化)。
*   `render()`: 渲染 JSX。
*   `getSnapshotBeforeUpdate()`: 在更新 DOM 之前获取快照。
*   `componentDidUpdate()`: 组件更新到 DOM 后，可进行副作用操作。

**卸载 (Unmounting)**:
*   `componentWillUnmount()`: 组件从 DOM 卸载前，进行清理工作 (取消订阅、清除定时器)。

**错误处理 (Error Handling)**:
*   `static getDerivedStateFromError()`: 捕获子组件树中的错误，返回 state 更新。
*   `componentDidCatch()`: 捕获子组件树中的错误，用于日志记录。

### 函数组件生命周期 (通过 Hooks 模拟)

函数组件没有直接的生命周期方法，而是通过 Hooks 来模拟和管理状态及副作用。

*   **`useState`**: 模拟 `this.state` 的初始化和更新。
*   **`useEffect`**:
    *   **挂载**: `useEffect(() => { /* componentDidMount */ }, [])` (空依赖数组，只执行一次)。
    *   **更新**: `useEffect(() => { /* componentDidUpdate */ }, [dependency1, dependency2])` (每次依赖变化都执行)。
    *   **卸载**: `useEffect(() => { /* componentDidMount and componentDidUpdate */ return () => { /* componentWillUnmount */ }; }, [dependencies])`。
*   **`useRef`**: 模拟实例变量，可以在多次渲染之间保持数据。
*   **`useLayoutEffect`**: 类似 `componentDidMount` 和 `componentDidUpdate`，但在浏览器绘制前同步执行。适用于需要测量 DOM 或修改 DOM 的场景。
*   **`useCallback`, `useMemo`**: 优化性能，避免不必要的重新计算或函数创建。
*   **错误边界**: `static getDerivedStateFromError` 和 `componentDidCatch` 仍然需要类组件来实现。函数组件可以通过外部错误边界组件来处理。

### 示例 (函数组件通过 Hooks)

```jsx
// LifecycleHooksDemo.jsx
import React, { useState, useEffect, useCallback } from 'react';

function LifecycleHooksDemo({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState('Hello');

  console.log('Render: Component re-rendered.');

  // 模拟 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    console.log('useEffect: Component mounted or count updated. Current count:', count);
    // 模拟订阅
    const intervalId = setInterval(() => {
      // console.log('Interval tick:', count); // 注意闭包，如果想看到最新count，需依赖或用useRef
    }, 1000);

    // 模拟 componentWillUnmount
    return () => {
      console.log('useEffect cleanup: Component unmounted or count is about to update. Clearing interval.');
      clearInterval(intervalId);
    };
  }, [count]); // 依赖 count，当 count 变化时执行副作用和清理

  // 模拟 componentDidMount (只执行一次)
  useEffect(() => {
    console.log('useEffect: Only runs once after initial mount. Initial count:', initialCount);
  }, []); // 空依赖数组

  // 优化函数创建
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 无依赖，函数不会变

  const changeMessage = useCallback(() => {
    setMessage('Message changed at ' + new Date().toLocaleTimeString());
  }, []);

  return (
    <div>
      <h2>Lifecycle Hooks Demo</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment Count</button>
      <p>Message: {message}</p>
      <button onClick={changeMessage}>Change Message</button>
    </div>
  );
}

export default LifecycleHooksDemo;
```

## 10. 性能优化

优化 React 应用性能是提升用户体验的关键。

### 10.1 减少不必要的重新渲染

*   **`React.memo` (用于函数组件)**:
    *   高阶组件 (HOC)，如果组件的 Props 没有发生变化，则跳过重新渲染。
    *   默认进行浅层比较。可以提供第二个参数自定义比较函数。
    *   **示例**: `const MemoizedComponent = React.memo(MyComponent, (prevProps, nextProps) => /* custom comparison */);`
*   **`shouldComponentUpdate` (用于类组件)**:
    *   在 `render` 之前调用，返回 `true` 则渲染，返回 `false` 则跳过渲染。
    *   **注意**: 必须手动实现浅层比较或深度比较。
*   **`useMemo` Hook**:
    *   缓存计算结果。只有当其依赖项发生变化时，才会重新计算。
    *   **用途**: 优化昂贵计算的性能。
*   **`useCallback` Hook**:
    *   缓存函数实例。只有当其依赖项发生变化时，才会重新创建函数。
    *   **用途**: 优化 Props 传递给 `React.memo` 包裹的子组件时的性能，避免不必要的子组件重新渲染。
*   **不可变数据 (Immutable Data)**:
    *   避免直接修改对象或数组，而是创建新的引用。
    *   这有助于 `React.memo` 和 `shouldComponentUpdate` 进行有效的浅层比较。
*   **React Compiler (React 19)**: 自动进行记忆化优化，减少手动使用 `useMemo` 和 `useCallback` 的需求。

### 10.2 优化渲染性能

*   **列表渲染 `key` 属性**:
    *   在 `map` 函数中为列表项提供唯一的 `key` 属性。
    *   **作用**: 帮助 React 识别列表中哪些项发生了变化、添加或删除，从而高效地更新 DOM。
    *   **注意**: `key` 应该稳定且唯一，不建议使用索引作为 `key`，除非列表项是静态且不会重新排序。
*   **虚拟化 / 窗口化 (Virtualization / Windowing)**:
    *   对于非常长的列表，只渲染可见区域内的项目，大大减少 DOM 元素的数量。
    *   **库**: `react-window`, `react-virtualized`。
*   **延迟加载 (Lazy Loading) / 代码分割 (Code Splitting)**:
    *   使用 `React.lazy()` 和 `Suspense` 来动态导入组件，按需加载代码，减少初始包大小。
    *   结合路由懒加载 (`react-router-dom`)。
*   **服务端渲染 (SSR) / 静态网站生成 (SSG)**:
    *   在服务器端预渲染应用，加快首屏加载速度，提升 SEO (Next.js, Remix)。
*   **Concurrent Mode (并发模式)**:
    *   React 18 引入的特性，允许 React 在渲染繁忙时，同时处理多个任务，提高应用的响应性。
    *   **特性**: `startTransition`, `useDeferredValue`。
*   **`useTransition` Hook**:
    *   允许将状态更新标记为“过渡”，使 UI 保持响应性，避免阻塞用户交互。
    *   **示例**: `const [isPending, startTransition] = useTransition();`
*   **`useDeferredValue` Hook**:
    *   延迟更新非紧急 UI 部分，让紧急更新优先渲染。
    *   **示例**: `const deferredValue = useDeferredValue(value);`
*   **Profiling (性能分析)**:
    *   使用 React DevTools 的 Profiler 来分析组件的渲染时间和原因，找出性能瓶颈。

### 10.3 其他优化

*   **图片优化**: 压缩图片、使用 WebP/AVIF 等现代格式、响应式图片 (`srcset`)。
*   **字体优化**: 仅加载所需的字体子集，使用 WOFF2 格式。
*   **避免在组件中进行复杂计算**: 将计算逻辑放到 `useMemo` 中。
*   **事件监听清理**: 在 `useEffect` 的清理函数中取消事件监听器和定时器，防止内存泄漏。
*   **Web Workers**: 将复杂的计算或 CPU 密集型任务放到 Web Workers 中执行，不阻塞主线程。

### 示例 (`React.memo`, `useMemo`, `useCallback`)

```jsx
// MemoizedChild.jsx
import React, { memo } from 'react';

// 使用 React.memo 优化子组件
const MemoizedChild = memo(function MemoizedChild({ name, onClick }) {
  console.log('MemoizedChild rendered');
  return (
    <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
      <p>Child Name: {name}</p>
      <button onClick={onClick}>Child Button</button>
    </div>
  );
});

export default MemoizedChild;
```

```jsx
// PerformanceOptimization.jsx
import React, { useState, useMemo, useCallback } from 'react';
import MemoizedChild from './MemoizedChild';

function computeExpensiveValue(num) {
  console.log('Computing expensive value...');
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += num * Math.random();
  }
  return sum;
}

function PerformanceOptimization() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  const [randomVal, setRandomVal] = useState(0);

  // 使用 useMemo 缓存昂贵的计算结果
  const expensiveResult = useMemo(() => computeExpensiveValue(count), [count]);

  // 使用 useCallback 缓存函数实例
  const handleChildClick = useCallback(() => {
    console.log('Child button clicked in parent. Count:', count);
  }, [count]); // 依赖 count，当 count 变化时函数会重新创建

  console.log('Parent Component rendered');

  return (
    <div>
      <h1>Performance Optimization Demo</h1>
      <p>Count: {count}</p>
      <p>Expensive Result: {expensiveResult.toFixed(2)}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <p>Name: {name}</p>
      <button onClick={() => setName(name === 'Alice' ? 'Bob' : 'Alice')}>Change Name (triggers parent re-render)</button>

      <p>Random Value: {randomVal}</p>
      <button onClick={() => setRandomVal(Math.random())}>Change Random Value (triggers parent re-render)</button>

      <MemoizedChild name={name} onClick={handleChildClick} />
      {/* 
        当 name 变化时，MemoizedChild 会重新渲染 (因为 name prop 变化)。
        当 count 变化时，handleChildClick 会重新创建，MemoizedChild 也会重新渲染 (因为 onClick prop 变化)。
        如果 name 和 count 都不变，MemoizedChild 将不会重新渲染。
      */}
    </div>
  );
}

export default PerformanceOptimization;
```

## 11. SSR 与 Hydration

### Server-Side Rendering (SSR)

*   **定义**: 在服务器端预先渲染 React 应用，生成完整的 HTML 内容，然后发送给客户端。
*   **优势**:
    *   **更好的 SEO**: 搜索引擎爬虫可以直接抓取到完整的页面内容。
    *   **更快的首次内容绘制 (FCP)**: 用户可以更快地看到页面内容，即使 JavaScript 尚未完全加载和执行。
    *   **更好的用户体验**: 减少白屏时间。
*   **挑战**:
    *   **开发复杂性**: 需要处理浏览器和服务器环境的差异。
    *   **服务器负载**: 服务器需要承担渲染页面的工作。
    *   **脱水 (Dehydration)**: 将服务器端的状态发送到客户端。

### Hydration (水合)

*   **定义**: 在 SSR 之后，当客户端的 JavaScript 加载并执行时，它会“接管”服务器渲染的 HTML，将其转换为完全交互式的 React 应用。这个过程包括重新挂载事件监听器、恢复应用状态等。
*   **优势**:
    *   **无缝的用户体验**: 用户在 JavaScript 加载期间可以与页面进行交互 (尽管可能没有完全的功能)。
    *   **避免闪烁**: SSR 解决了白屏问题，Hydration 避免了客户端重新渲染导致的页面闪烁。
*   **React 18+ 的改进**:
    *   **Selective Hydration (选择性水合)**: React 可以在 HTML 完全水合之前，优先水合用户交互的部分，提高响应性。
    *   **Streaming HTML**: 服务器可以分块发送 HTML，允许浏览器逐步显示内容。

### 工作流程

1.  用户请求页面。
2.  服务器接收请求，使用 `react-dom/server` 渲染 React 应用，并生成 HTML。
3.  服务器将生成的 HTML (可能包含客户端应用程序的状态，即脱水) 发送给客户端。
4.  浏览器接收 HTML 并立即显示。
5.  浏览器开始下载并执行客户端 React 应用的 JavaScript。
6.  当 JavaScript 加载完成后，React 客户端应用程序调用 `ReactDOM.hydrateRoot()` (React 18+) 或 `ReactDOM.hydrate()` (旧版)，开始 Hydration 过程，将服务器渲染的 HTML 附加到客户端应用上，使其变得交互式。

### 启用 SSR 和 Hydration

通常通过 Next.js 或 Remix 等框架来简化 SSR 的开发和配置。

```jsx
// server.js (简化的 SSR 示例)
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './App'; // 你的 React App 组件

const app = express();

app.get('/', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(<App />); // 服务器端渲染
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/static/client.js"></script> <!-- 客户端 JS -->
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

```jsx
// client.js (客户端 Hydration 示例)
import React from 'react';
import { hydrateRoot } from 'react-dom/client'; // React 18+
import App from './App';

const container = document.getElementById('root');
hydrateRoot(container, <App />); // 客户端水合
```

## 12. 路由 (React Router)

React Router 是 React 应用中最流行的路由库，用于管理单页面应用中的导航。React Router v6 是当前的主流版本。

### 核心概念

*   **`BrowserRouter` / `HashRouter`**: 路由模式，包裹整个应用。
*   **`Routes`**: 容器组件，用于包裹所有 `Route`。
*   **`Route`**: 定义 URL 路径与组件之间的映射关系。
*   **`Link` / `NavLink`**: 用于导航到指定路由的组件，会渲染成一个 `<a>` 标签。
*   **`useNavigate()` Hook**: 用于编程式导航。
*   **`useParams()` Hook**: 用于获取 URL 中的动态参数。
*   **`useLocation()` Hook**: 用于获取当前 URL 的位置信息。
*   **`useSearchParams()` Hook**: 用于获取和操作 URL 中的查询参数。
*   **嵌套路由**: 通过在 `Route` 中嵌套 `Route` 来实现。
*   **`Outlet`**: 在嵌套路由中，用于渲染子路由组件的占位符。

### 路由配置示例 (React Router v6)

```jsx
// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';

// Home Component
function Home() {
  return <h1>Home Page</h1>;
}

// About Component
function About() {
  return <h1>About Page</h1>;
}

// Product Detail Component
function ProductDetail() {
  const { id } = useParams(); // 获取路由参数
  const navigate = useNavigate(); // 获取导航函数

  const goToHome = () => {
    navigate('/'); // 编程式导航
  };

  return (
    <div>
      <h1>Product Detail for ID: {id}</h1>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}

// Dashboard Layout Component (用于嵌套路由)
function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/dashboard">Overview</Link> |
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <hr />
      <Outlet /> {/* 子路由会在这里渲染 */}
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview() {
  return <h3>Dashboard Overview</h3>;
}

// Dashboard Settings Component
function DashboardSettings() {
  return <h3>Dashboard Settings</h3>;
}

// Not Found Component
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/about">About</Link> |
        <Link to="/products/123">Product 123</Link> |
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* 嵌套路由 */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} /> {/* 默认子路由 */}
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="reports" element={<div><h3>Dashboard Reports</h3></div>} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* 匹配所有未定义路由 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 13. 表单

React 提供了两种方式来处理表单输入和验证：**受控组件 (Controlled Components)** 和 **非受控组件 (Uncontrolled Components)**。

### 13.1 受控组件 (Controlled Components)

*   **定义**: 表单元素的值由 React State 管理和控制。
*   **工作原理**:
    1.  表单元素的值绑定到组件的 State。
    2.  `onChange` 事件处理器更新 State。
    3.  每次 State 更新都会触发组件重新渲染，表单元素显示最新的 State 值。
*   **优点**: 易于实现表单验证、动态输入、条件禁用等复杂逻辑。
*   **推荐**: 大多数 React 表单开发都推荐使用受控组件。

### 13.2 非受控组件 (Uncontrolled Components)

*   **定义**: 表单元素的值由 DOM 自身管理。React 只在需要时通过 `ref` 访问 DOM 元素获取其值。
*   **工作原理**: 不通过 React State 管理值，直接从 DOM 获取。
*   **优点**: 简单，在少量表单字段时可以减少代码量。
*   **缺点**: 难以实现即时验证、动态修改。
*   **使用**: 通常使用 `useRef` 获取 DOM 元素的引用。

### 13.3 React 19 Actions 与表单

React 19 引入的 **Actions** 机制为表单处理带来了新的范式，特别适合处理表单提交的异步操作。

*   **`action` Prop**: 在 `<form>` 元素上直接指定一个 `action` 函数 (服务器或客户端)。
*   **`useFormStatus` Hook**: 在表单内部组件中获取表单提交的 `pending` 状态，实现加载反馈。
*   **`useFormState` Hook**: 将 Action 的返回结果作为表单状态，用于显示成功/失败信息、验证错误等。
*   **乐观更新**: 结合 `useOptimistic`，可以实现表单提交的乐观更新，提升用户体验。

### 示例

```jsx
// FormDemo.jsx
import React, { useState, useRef } from 'react';
import { useFormStatus, useFormState, useOptimistic } from 'react-dom'; // React 19 specific hooks

// 模拟一个异步提交的 Action (可以是服务器 Action 或客户端函数)
async function submitFormAction(prevState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');
  console.log('Submitting form:', { username, password });

  await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟

  if (username === 'test' && password === 'password') {
    return { success: true, message: 'Login successful!' };
  } else {
    return { success: false, message: 'Invalid credentials!' };
  }
}

function FormDemo() {
  // 受控组件
  const [controlledUsername, setControlledUsername] = useState('');
  const [controlledPassword, setControlledPassword] = useState('');

  // 非受控组件
  const uncontrolledUsernameRef = useRef(null);
  const uncontrolledPasswordRef = useRef(null);

  // React 19 Actions hooks
  const [formState, formAction] = useFormState(submitFormAction, { success: null, message: '' });
  const [optimisticMessage, addOptimisticMessage] = useOptimistic(
    formState.message, // 初始乐观状态基于实际状态
    (currentMessage, newMessage) => newMessage
  );


  const handleControlledSubmit = (e) => {
    e.preventDefault();
    console.log('Controlled Form Submitted:', { controlledUsername, controlledPassword });
    // 可以在这里进行验证或发送 API 请求
  };

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    console.log('Uncontrolled Form Submitted:', {
      username: uncontrolledUsernameRef.current.value,
      password: uncontrolledPasswordRef.current.value,
    });
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus(); // 获取表单提交状态
    return <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit with Action'}</button>;
  };

  return (
    <div>
      <h1>Form Handling Demo</h1>

      <h2>Controlled Form</h2>
      <form onSubmit={handleControlledSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={controlledUsername}
            onChange={(e) => setControlledUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={controlledPassword}
            onChange={(e) => setControlledPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit Controlled</button>
      </form>

      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleUncontrolledSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" ref={uncontrolledUsernameRef} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" ref={uncontrolledPasswordRef} />
        </div>
        <button type="submit">Submit Uncontrolled</button>
      </form>

      <h2>React 19 Form Action</h2>
      <form action={formAction}> {/* 使用 Action 函数 */}
        <div>
          <label htmlFor="action-username">Username:</label>
          <input type="text" id="action-username" name="username" />
        </div>
        <div>
          <label htmlFor="action-password">Password:</label>
          <input type="password" id="action-password" name="password" />
        </div>
        <SubmitButton />
        {formState.success !== null && (
          <p style={{ color: formState.success ? 'green' : 'red' }}>
            {optimisticMessage} {/* 显示乐观更新的消息 */}
          </p>
        )}
      </form>
    </div>
  );
}

export default FormDemo;
```

## 14. HTTP 与数据请求

在 React 应用中，HTTP 请求是获取和提交数据到后端的关键。

### 14.1 客户端 HTTP 请求

*   **`fetch` API**: 浏览器原生的异步请求 API。
    *   **优点**: 无需安装额外库，支持 Promise。
    *   **缺点**: 不支持请求取消，错误处理略显繁琐，需要手动处理 JSON 解析，没有内置请求拦截器。
*   **`axios`**: 广泛使用的第三方 HTTP 客户端库。
    *   **优点**: 自动转换 JSON 数据，支持请求/响应拦截器，更好的错误处理，支持请求取消。
    *   **推荐**: 在许多 React 应用中，`axios` 仍然是非常流行且功能强大的 HTTP 客户端。
*   **数据获取 Hooks (推荐)**:
    *   **`TanStack Query` (原 `React Query`)**: 提供数据缓存、去重、后台刷新、加载/错误状态管理、乐观更新、分页等高级功能。大大简化了数据获取的复杂性。
    *   **`SWR`**: 另一个流行的 Hook 库，基于 `stale-while-revalidate` 缓存策略。
    *   **React 19 `use` Hook**: 在组件内部直接 `await Promise` 来获取数据，配合 Suspense。

### 14.2 请求拦截器 (通过 `axios` 或自定义 `fetch` 封装)

*   **功能**: 允许在 HTTP 请求发送前或响应到达应用前进行拦截和修改。
*   **应用场景**:
    *   添加认证头 (`Authorization`)。
    *   统一的错误处理 (例如，401 自动跳转登录)。
    *   请求日志记录。
    *   数据转换。

### 14.3 React 19 `use` Hook 进行数据获取

`use` Hook 是 React 19 的一个重要特性，它允许你在组件的顶层或 Hooks 中直接 `await Promise`，从而简化异步数据获取和与 Suspense 的集成。

```jsx
// api/axiosInstance.ts (同 Vue 的示例，用于拦截器)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request. Redirecting to login...');
      // 例如：跳转到登录页
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

```jsx
// components/PostList.jsx (使用 React 19 `use` Hook)
import React, { Suspense } from 'react';
import axiosInstance from '../api/axiosInstance'; // 假设你已配置

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 假设这是一个异步函数，返回 Promise
const fetchPostsPromise = axiosInstance.get<Post[]>('/posts').then(res => res.data);

function PostItem({ post }: { post: Post }) {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>
  );
}

function PostListContent() {
  // 直接在组件中使用 use Hook await Promise
  // React 会在 Promise resolve 之前暂停渲染，并通过 Suspense 提供 fallback
  const posts = React.use(fetchPostsPromise);

  return (
    <ul>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

function PostList() {
  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostListContent />
      </Suspense>
    </div>
  );
}

export default PostList;
```

## 15. 错误处理

在 React 应用中，有效的错误处理是构建健壮应用的关键。

### 15.1 错误边界 (Error Boundaries)

*   **定义**: React 16 引入的特性。错误边界是**捕获其子组件树中 JavaScript 错误，记录错误，并显示回退 UI** 的组件。
*   **实现**: 错误边界必须是**类组件**，并实现 `static getDerivedStateFromError()` (用于渲染回退 UI) 或 `componentDidCatch()` (用于记录错误)。
*   **用途**: 防止整个应用崩溃，提供更好的用户体验。
*   **注意**: 错误边界**只能捕获渲染阶段、生命周期方法和构造函数中的错误**，不能捕获事件处理器、异步代码、自身错误。

```jsx
// ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // 用于在渲染阶段捕获错误，并返回一个值来更新 state，从而渲染回退 UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 用于捕获子组件树中的 JavaScript 错误，并将其记录下来
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    // 可以在这里上报错误日志到服务
  }

  render() {
    if (this.state.hasError) {
      // 渲染任何自定义的回退 UI
      return (
        <div style={{ border: '1px solid red', padding: '15px', margin: '15px', backgroundColor: '#ffe6e6' }}>
          <h2>Something went wrong.</h2>
          <p>We are sorry for the inconvenience. Please try again later.</p>
          {this.props.showDetails && this.state.errorInfo && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children; // 正常渲染子组件
  }
}

export default ErrorBoundary;
```

### 15.2 其他错误处理

*   **事件处理器中的错误**: 使用 `try-catch` 块。
*   **异步代码中的错误**: 使用 `try-catch` 或 Promise 的 `.catch()` 方法。
*   **HTTP 请求错误**: 在 `fetch` 或 `axios` 的 `.catch()` 中处理，或使用响应拦截器。
*   **React 19 Actions 中的错误**: `useFormState` 的返回结果可以包含错误信息。
*   **全局错误捕获**:
    *   对于未被 React 捕获的全局 JavaScript 错误，可以使用 `window.onerror` 或 `window.addEventListener('error', ...)`。
    *   对于未被 Promise 捕获的 reject，可以使用 `window.addEventListener('unhandledrejection', ...)`。

### 示例 (错误边界使用)

```jsx
// BuggyComponent.jsx
import React, { useState } from 'react';

function BuggyComponent({ throwError }) {
  const [count, setCount] = useState(0);

  const triggerError = () => {
    if (throwError) {
      throw new Error('I am a synthetic error in BuggyComponent!');
    }
    setCount(count + 1);
  };

  if (count > 5) {
    // 模拟渲染阶段的错误
    throw new Error('Count exceeded limit in BuggyComponent!');
  }

  return (
    <div style={{ border: '1px solid orange', padding: '10px', margin: '10px' }}>
      <h3>Buggy Component</h3>
      <p>Count: {count}</p>
      <button onClick={triggerError}>Increment or Throw Error</button>
    </div>
  );
}

export default BuggyComponent;
```

```jsx
// App.jsx (使用 ErrorBoundary 包装 BuggyComponent)
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';

function App() {
  const [showBuggy, setShowBuggy] = useState(true);

  return (
    <div>
      <h1>App Component</h1>
      <button onClick={() => setShowBuggy(!showBuggy)}>Toggle Buggy Component</button>

      {showBuggy && (
        <ErrorBoundary showDetails={true}>
          <BuggyComponent throwError={false} />
          {/* <BuggyComponent throwError={true} /> */}
        </ErrorBoundary>
      )}

      <p>This part of the app is still working.</p>
    </div>
  );
}

export default App;
```

## 16. 测试

React 提供了全面的测试工具和策略，包括单元测试、集成测试和端到端测试。

### 16.1 单元测试 (Unit Testing)

*   **工具**:
    *   **Jest**: Facebook 开发的 JavaScript 测试框架，功能强大，开箱即用。
    *   **React Testing Library (RTL)**: 官方推荐的测试实用工具库，专注于模拟用户行为，以用户视角测试组件。
*   **目的**: 测试单个组件、Hooks、工具函数或模块的独立功能。
*   **核心思想**: 隔离被测单元，模拟其依赖项，断言其渲染输出、状态变化或方法调用。

### 单元测试示例 (使用 Jest 和 React Testing Library)

```jsx
// Counter.jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 data-testid="count-display">Count: {count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

```jsx
// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // 引入扩展的断言
import Counter from './Counter';

describe('Counter Component', () => {
  it('should render with initial count 0', () => {
    render(<Counter />);
    // 使用 getByTestId 找到元素，并使用 toBeInTheDocument() 和 toHaveTextContent() 断言
    expect(screen.getByTestId('count-display')).toBeInTheDocument();
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
  });

  it('should increment count when Increment button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /increment/i }); // 找到按钮
    fireEvent.click(incrementButton); // 模拟点击事件
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
  });

  it('should decrement count when Decrement button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: -1');
  });

  it('should increment then decrement correctly', () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    fireEvent.click(incrementButton); // 0 -> 1
    fireEvent.click(incrementButton); // 1 -> 2
    fireEvent.click(decrementButton); // 2 -> 1

    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
  });
});
```

### 16.2 集成测试 (Integration Testing)

*   **工具**: 通常也使用 Jest 和 React Testing Library。
*   **目的**: 测试多个组件或 Hooks 协同工作时的功能，验证它们之间的交互和数据流。
*   **核心思想**: 渲染一个包含多个组件的父组件或路由视图，模拟用户流程。可以模拟 Context、Redux Store 或 React Router 行为。

### 16.3 端到端测试 (End-to-End Testing / E2E Testing)

*   **工具**: **Cypress**, **Playwright**, Selenium 等。
*   **目的**: 测试整个应用的真实用户流程，从用户角度验证应用的功能和集成。
*   **核心思想**: 在真实浏览器环境中，模拟用户操作（点击、输入、导航），验证最终结果。

## 17. 微前端

微前端 (Micro Frontends) 是一种架构模式，它将大型前端应用拆分成更小、更独立、可自主开发和部署的微应用。

### 核心理念

*   **技术无关**: 各个微应用可以使用不同的前端技术栈 (例如 React, Vue, Angular)。
*   **独立部署**: 各个微应用可以独立部署和更新。
*   **团队自治**: 不同的团队可以独立负责各自的微应用。
*   **渐进式升级**: 逐步替换旧系统，而不是一次性重写。

### React 中的微前端方案

*   **Module Federation (Webpack 5)**: 这是实现微前端最推荐和强大的方式之一。
    *   **优点**: 允许应用在运行时共享代码、组件和依赖项，实现真正的运行时集成。
    *   **缺点**: 配置相对复杂，对 Webpack 版本有要求。
*   **`single-spa`**: 一个流行的微前端框架，可以集成各种前端框架。
    *   **优点**: 框架无关，提供生命周期管理、路由管理、沙箱隔离等。
    *   **缺点**: 需要额外的配置和学习成本。
    *   **React 适配**: `single-spa-react` 提供 React 框架的适配器。
*   **`qiankun` (乾坤)**: 阿里开源的微前端框架。
    *   **优点**: 类似 `single-spa`，提供沙箱、样式隔离、JS 隔离等，国内社区支持好。
    *   **React 适配**: 良好支持 React 应用。
*   **Web Components**: 原生浏览器标准，可以作为微前端的构建单元。
    *   **优点**: 强封装性、技术无关。
    *   **缺点**: 生态不如 React 组件丰富，浏览器兼容性需要 Polyfills。
*   **IFrames**: 最简单但最受限制的方案。
    *   **优点**: 强隔离性。
    *   **缺点**: 通信困难、SEO 差、用户体验不佳。

### Module Federation 概念 (回顾)

*   **Host**: 宿主应用，负责加载和协调远程应用。
*   **Remote**: 远程应用，提供可共享的模块或组件。
*   **Shared Dependencies**: 宿主和远程应用之间共享的依赖项，避免重复加载。

### React + Module Federation 示例 (概念性)

**`host-app/webpack.config.js` (宿主应用)**

```javascript
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ... 其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mfe1: "mfe1@http://localhost:3001/remoteEntry.js", // 远程应用的 URL
      },
      shared: {
        react: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'react-dom': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // ... 其他共享依赖
      },
    }),
  ],
};
```

**`mfe1-app/webpack.config.js` (微应用)**

```javascript
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // ... 其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1',
      filename: 'remoteEntry.js', // 远程应用的入口文件
      exposes: {
        './Component': './src/components/MyMicroApp.jsx', // 暴露组件
      },
      shared: {
        react: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'react-dom': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // ... 其他共享依赖
      },
    }),
  ],
  devServer: {
    port: 3001,
  },
};
```

**`host-app/src/App.js` (宿主应用中加载微应用组件)**

```jsx
import React, { lazy, Suspense } from 'react';

// 异步加载微应用暴露的组件
const RemoteComponent = lazy(() => import('mfe1/Component'));

function App() {
  return (
    <div>
      <h1>Host Application</h1>
      <Suspense fallback={<div>Loading Micro App Component...</div>}>
        <RemoteComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

## 18. 工程化

Create React App (CRA) 和 Next.js / Vite 是 React 工程化的核心工具。

### 18.1 Create React App (CRA) (传统)

*   **特点**: 官方支持，零配置启动项目，内置 Webpack, Babel, ESLint 等。
*   **创建项目**: `npx create-react-app my-app --template typescript`
*   **运行应用**: `npm start` / `yarn start`
*   **构建应用**: `npm run build` / `yarn build`
*   **测试应用**: `npm test` / `yarn test`
*   **`eject`**: 暴露 Webpack 配置，但通常不推荐。

### 18.2 Next.js (推荐，全栈框架)

*   **特点**:
    *   基于 React 的全栈框架，支持 SSR, SSG, ISR。
    *   文件系统路由。
    *   内置 API 路由，方便构建后端。
    *   开箱即用的优化 (图片优化、代码分割)。
    *   **React Server Components (RSC)** 支持。
*   **创建项目**: `npx create-next-app@latest my-app --typescript`
*   **运行应用**: `npm run dev` / `yarn dev`
*   **构建应用**: `npm run build` / `yarn build`

### 18.3 Vite (推荐，前端构建工具)

*   **特点**:
    *   **基于 ESM (ES Modules) 的开发服务器**: 启动速度极快，HMR 效率高。
    *   **开箱即用**: 对 React, Vue 等提供良好支持。
    *   **Rollup 作为生产环境打包工具**: 高度优化，生成优化的静态资源。
    *   **轻量和灵活**: 插件 API 简单易用。
*   **创建项目**: `npm create vite@latest my-react-app -- --template react-ts`
*   **运行应用**: `npm run dev` / `yarn dev`
*   **构建应用**: `npm run build` / `yarn build`

### 18.4 规范与约定

*   **React 风格指南**: 遵循 Airbnb 或官方风格指南，确保代码一致性和可读性。
*   **命名约定**:
    *   组件文件名和组件名采用 PascalCase (例如 `UserList.jsx`)。
    *   Hooks 文件名以 `use` 开头 (例如 `useCounter.js`)。
    *   CSS 类名采用 kebab-case 或 BEM 规范。
*   **ESLint**: 用于代码质量检查和风格统一。
*   **Prettier**: 格式化代码，保持一致性。
*   **Husky & Lint-staged**: 在 Git 提交前自动运行 Lint 和格式化。
*   **Commit Lint**: 规范 Git 提交信息。

### 18.5 构建与部署

*   **Tree Shaking**: 移除未使用的代码，减小最终 bundle 的大小。
*   **代码压缩和混淆 (Minification & Uglification)**: 减小 JavaScript、CSS 和 HTML 的文件大小。
*   **Source Map**: 用于调试，生产环境通常只保留 `hidden-source-map` 或不生成。
*   **CDN (Content Delivery Network)**: 将静态资源部署到 CDN，加速加载。
*   **HTTP/2 或 HTTP/3**: 提高资源加载效率。
*   **Gzip/Brotli 压缩**: 在服务器端对静态资源进行压缩，进一步减小传输体积。
*   **浏览器缓存策略**: 配置正确的 HTTP 缓存头。
*   **PWA (Progressive Web Apps)**: Service Worker 缓存，离线能力。
*   **持续集成/持续部署 (CI/CD)**: 自动化测试、构建和部署流程。
*   **Monorepo 工具 (如 Nx, Turborepo)**: 适用于大型项目，管理多个 React 应用和库。

## 19. 安全

在 React 应用开发中，安全性是一个重要的考虑因素。

### 19.1 跨站脚本 (XSS)

*   **React 的内置保护**: React 默认会对所有值进行 HTML 转义 (escapes HTML)，阻止 XSS 攻击。
*   **谨慎使用 `dangerouslySetInnerHTML`**: 只有当内容来源完全可信时才使用 `dangerouslySetInnerHTML`，因为它会直接插入未经转义的 HTML。
*   **信任值净化**: 如果必须插入动态 HTML 或 URL，请使用一个可靠的 DOM 净化库 (如 `DOMPurify`) 来过滤掉恶意代码。
*   **URL 净化**: 对于动态生成的 `href` 或 `src` 属性，应确保 URL 是安全的，防止 `javascript:` 协议攻击。

### 19.2 跨站请求伪造 (CSRF)

*   **防护**:
    *   使用 CSRF token (通常由后端生成并验证)。
    *   在 HTTP 请求中添加 `X-CSRF-TOKEN` 或其他自定义头部。
    *   使用 `SameSite=Lax` 或 `Strict` 属性的 Cookie。
*   **`axios` 配合拦截器**: 通常在 `axios` 请求拦截器中自动添加 CSRF token。
*   **React 19 Actions**: `form` 元素的 `action` 可以更安全地处理提交，尤其是在 Next.js 的服务器 Actions 中。

### 19.3 HTTP 安全

*   **HTTPS**: 始终使用 HTTPS 来加密客户端和服务器之间的通信。
*   **HTTP 头部**: 配置安全的 HTTP 头部，例如 `Content-Security-Policy` (CSP), `X-Content-Type-Options`, `X-Frame-Options`。
*   **CORS (跨域资源共享)**: 正确配置 CORS 策略，只允许受信任的域访问您的 API。
*   **身份验证与授权**:
    *   使用安全的身份验证机制 (如 JWT, OAuth 2.0)。
    *   在后端进行严格的授权检查。
    *   将敏感信息存储在 HttpOnly Cookie 中或服务器端。

### 19.4 其他安全措施

*   **依赖项审计**: 定期检查项目依赖项的漏洞 (例如使用 `npm audit` 或 `yarn audit`)。
*   **最小权限原则**: 组件和 Hooks 只拥有完成其任务所需的最小权限。
*   **输入验证**: 始终在后端和前端验证用户输入。
*   **避免在客户端存储敏感数据**: 密码、API 密钥等不应存储在浏览器本地存储中。
*   **安全编码实践**: 遵循 OWASP Top 10 等安全准则。

### `dangerouslySetInnerHTML` 示例 (危险性警示)

```jsx
// DangerousHtml.jsx
import React from 'react';
// import DOMPurify from 'dompurify'; // 实际项目中应使用净化库

function DangerousHtml() {
  const rawHtml = '<p>This is <script>alert("XSS!");</script> dangerous HTML.</p>';
  const safeHtml = '<p>This is <b>safe</b> HTML.</p>';

  // 实际使用时应该这样净化
  // const sanitizedHtml = { __html: DOMPurify.sanitize(rawHtml) };

  return (
    <div>
      <h2>`dangerouslySetInnerHTML` Demo</h2>
      <h3>Potentially Dangerous HTML:</h3>
      <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>

      <h3>Safe HTML:</h3>
      <div dangerouslySetInnerHTML={{ __html: safeHtml }}></div>
    </div>
  );
}

export default DangerousHtml;
```

## 20. 场景题

以下是一些常见的 React 场景题，用于考察对框架的理解和解决实际问题的能力。

### 场景 1: 如何在父子组件之间进行通信？

**回答要点**:
*   **父到子**:
    *   **Props**: 最常见方式，父组件通过属性传递数据给子组件。
    *   **`useRef` + `useImperativeHandle`**: 父组件通过 `ref` 获取子组件实例，并调用子组件暴露的特定方法或访问属性 (不推荐过度使用，除非必要)。
    *   **Context API**: 适用于跨多层组件传递数据，避免 Prop Drilling。
*   **子到父**:
    *   **Callbacks (函数 Props)**: 父组件将一个函数作为 Prop 传递给子组件，子组件在事件发生时调用这个函数并传递数据。
*   **兄弟组件通信**:
    *   **共同父组件作为中介**: 兄弟组件将数据通过回调传递给父组件，父组件再通过 Prop 传递给另一个兄弟组件。
    *   **Context API**: 如果兄弟组件有共同祖先且数据是全局性的。
    *   **状态管理库**: (Redux, Zustand, Recoil 等) 用于复杂的兄弟组件或无关联组件通信。
*   **无关联组件通信**:
    *   **Context API**: 用于共享全局状态。
    *   **状态管理库**: (Redux, Zustand, Recoil, Jotai 等) 最推荐的方式。

### 场景 2: 如何处理复杂的表单，例如动态添加/删除表单字段？

**回答要点**:
*   **受控组件**: 使用 `useState` 管理一个包含表单字段数据的数组。
*   **`map` 渲染**: 使用 `map` 方法遍历数组，渲染每个表单字段组件。
*   **唯一 `key`**: 为每个动态生成的表单字段提供唯一的 `key` 属性。
*   **添加/删除**: 提供按钮，通过 `setArray(prev => [...prev, newItem])` 或 `setArray(prev => prev.filter(...))` 来添加或删除表单字段。
*   **第三方库**: 结合 `react-hook-form` 或 `Formik` 可以大大简化复杂表单的实现，包括验证、动态字段管理等。
*   **React 19 Actions**: 对于提交逻辑，可以利用 `form` 元素的 `action` 属性和 `useFormState` 来处理动态表单的提交和响应。

### 场景 3: 如何在应用中实现权限控制？

**回答要点**:
*   **前端 (路由守卫)**:
    *   在 React Router 中，可以通过在路由配置中添加高阶组件 (HOC) 或自定义 Hook 来检查用户是否有权限访问某个路由。
    *   例如，创建一个 `ProtectedRoute` 组件，在内部检查用户身份，如果未授权则重定向到登录页。
*   **前端 (UI 元素)**:
    *   在组件内部，根据从 Context、Redux Store 或 Auth Hook 获取的用户权限信息，使用条件渲染 (`{condition && <Component />}`) 来显示/隐藏特定 UI 元素或禁用按钮。
*   **后端**:
    *   最重要的权限控制应始终在后端进行。前端的权限控制只是为了用户体验，不能依赖前端进行安全保障。

### 场景 4: 如何优化大型 React 应用的性能？

**回答要点**:
参考 [10. 性能优化](#10-性能优化) 部分。主要策略包括：
*   **减少不必要的重新渲染**: `React.memo`, `useMemo`, `useCallback`。
*   **React Compiler (React 19)**: 自动优化。
*   **`key` 属性优化**: `map` 列表时使用稳定唯一的 `key`。
*   **虚拟化/窗口化**: 处理长列表。
*   **延迟加载 / 代码分割**: `React.lazy`, `Suspense`, 路由懒加载。
*   **SSR / SSG**: 提升首屏性能和 SEO。
*   **Concurrent Mode 特性**: `useTransition`, `useDeferredValue` 提升响应性。
*   **不可变数据**: 配合记忆化优化。
*   **性能分析**: 使用 React DevTools Profiler。

### 5. 在 React 应用中订阅数据后，如何避免内存泄漏？

**回答要点**:
*   **`useEffect` 的清理函数**: 这是最重要的。当在 `useEffect` 中设置了订阅、定时器、事件监听器等副作用时，必须在 `useEffect` 的返回函数中进行清理。
    *   取消订阅 (RxJS `unsubscribe`)。
    *   清除定时器 (`clearInterval`, `clearTimeout`)。
    *   移除事件监听器 (`removeEventListener`)。
*   **`useRef`**: 对于需要在多次渲染中保持不变且不触发重新渲染的值 (如 WebSocket 实例)，可以使用 `useRef`。但清理仍需在 `useEffect` 中进行。
*   **第三方库的自动管理**: 像 `TanStack Query` 或 `SWR` 这样的数据获取库会自动处理订阅和缓存的清理。
*   **Context API**: 如果 Context 值包含副作用，`Provider` 卸载时也可能需要清理。

### 场景 6: 如何实现一个通用的错误处理机制？

**回答要点**:
*   **错误边界 (Error Boundaries)**: 推荐的 React 方式，用于捕获组件渲染阶段的错误，并显示回退 UI。
*   **事件处理器中的 `try-catch`**: 捕获用户交互引起的错误。
*   **异步代码中的 `try-catch` 或 `.catch()`**: 处理数据请求等异步操作的错误。
*   **HTTP 请求拦截器**: 使用 `axios` 等库的响应拦截器，统一处理 HTTP 错误 (例如，401 自动跳转登录、显示全局通知)。
*   **React 19 Actions 的 `useFormState`**: 处理表单提交的错误响应。
*   **全局错误捕获**: `window.onerror` 和 `window.onunhandledrejection` 捕获未被 React 捕获的全局错误。
*   **日志上报**: 将捕获到的错误上报到 Sentry, Bugsnag 等错误监控服务。

### 场景 7: `useEffect` 的依赖数组有什么作用？如果没有提供依赖数组会发生什么？

**回答要点**:
*   **作用**: `useEffect` 的依赖数组 (`[dep1, dep2, ...]`) 用于告诉 React 何时重新执行副作用函数。
    *   当数组中的任何依赖项在两次渲染之间发生变化时，`useEffect` 会重新执行其副作用函数。
    *   这有助于控制副作用的执行频率，避免不必要的重复执行，从而提高性能和避免资源浪费。
*   **没有提供依赖数组会发生什么？**:
    *   `useEffect(fn)`: 副作用函数会在**每次组件渲染后**都执行。这通常不是期望的行为，可能导致无限循环或性能问题。
*   **空依赖数组 (`[]`) 会发生什么？**:
    *   `useEffect(fn, [])`: 副作用函数只会在**组件首次挂载后**执行一次，并在组件**卸载前**执行其清理函数 (如果有)。
    *   这模拟了类组件的 `componentDidMount` 和 `componentWillUnmount` (对于清理)。
*   **`useLayoutEffect` vs `useEffect`**:
    *   `useLayoutEffect` 的签名与 `useEffect` 相同，但它在**浏览器绘制之前同步执行**。
    *   适用于需要同步测量 DOM 布局或修改 DOM 的场景 (如动画计算、定位元素)。
    *   因为它会阻塞浏览器绘制，所以应谨慎使用，避免在其中执行耗时操作。

## 21. 手写题

### 手写题 1: 实现一个简单的 `debounce` Hook (在 React 中常用于输入搜索)

```jsx
import { useState, useEffect, useCallback } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置一个定时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函数会在每次依赖变化或组件卸载时执行
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 只有当 value 或 delay 变化时才重新设置定时器

  return debouncedValue;
}

export default useDebounce;

// 示例用法 (在 React 组件中)
// import React, { useState } from 'react';
// import useDebounce from './useDebounce';
//
// function SearchInput() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms 防抖
//
//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       console.log('Performing search for:', debouncedSearchTerm);
//       // 实际的搜索 API 调用
//     }
//   }, [debouncedSearchTerm]);
//
//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       placeholder="Type to search..."
//     />
//   );
// }
```

### 手写题 2: 实现一个 `useToggle` Hook

用于切换布尔值状态。

```jsx
import { useState, useCallback } from 'react';

type UseToggleReturn = [boolean, (value?: boolean) => void];

function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value === 'boolean') {
      setState(value);
    } else {
      setState(prevState => !prevState);
    }
  }, []); // toggle 函数的引用保持不变

  return [state, toggle];
}

export default useToggle;

// 示例用法 (在 React 组件中)
// import React from 'react';
// import useToggle from './useToggle';
//
// function ToggleButton() {
//   const [isActive, toggleActive] = useToggle(false);
//
//   const toggleWithArgument = () => {
//     toggleActive(true); // 设置为 true
//     // 或者 toggleActive(false); // 设置为 false
//   };
//
//   return (
//     <div>
//       <p>Is Active: {isActive ? 'Yes' : 'No'}</p>
//       <button onClick={() => toggleActive()}>Toggle</button>
//       <button onClick={toggleWithArgument}>Set Active to True</button>
//     </div>
//   );
// }
```

### 手写题 3: 实现一个简单的 `usePrevious` Hook

用于获取上一次渲染的值。

```jsx
import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value; // 在每次渲染后将当前值存储起来
  });

  return ref.current; // 返回上一次渲染时存储的值
}

export default usePrevious;

// 示例用法 (在 React 组件中)
// import React, { useState } from 'react';
// import usePrevious from './usePrevious';
//
// function CounterWithPrevious() {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count);
//
//   return (
//     <div>
//       <p>Current Count: {count}</p>
//       <p>Previous Count: {prevCount !== undefined ? prevCount : 'N/A'}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }
```

## 22. React 19 高频面试题

### 1. 简述 React 19 相较于之前版本，有哪些重要的更新或改进？

**回答要点**:
*   **React Compiler (React Forget)**: 编译时优化，自动记忆化，减少手动 `useMemo`/`useCallback`。
*   **Actions**: 统一表单提交处理，简化异步操作、乐观更新、错误管理。
*   **`use` Hook**: 在组件中直接 `await Promise`，简化异步数据获取，与 Suspense 集成。
*   **`useOptimistic` Hook**: 简化乐观更新的实现。
*   **Document Metadata**: 支持在组件中直接声明 `<head>` 元素。
*   **Web Components 增强支持**: 更好的集成。
*   **ESM 模块化**: 完全过渡到 ESM。

### 2. 请解释 `React Compiler` (React Forget) 是什么？它解决了哪些问题？对开发者有何影响？

**回答要点**:
*   **是什么**: React Compiler 是一个实验性的编译器，它在构建时自动分析 React 组件，并自动插入 `useMemo`, `useCallback` 等记忆化优化，确保组件只在必要的 Props 或 State 变化时才重新渲染。
*   **解决了哪些问题**:
    *   **手动记忆化的负担**: 开发者不再需要手动编写 `useMemo`, `useCallback` 来优化性能，减少了样板代码和心智负担。
    *   **性能陷阱**: 避免了因忘记记忆化或记忆化不当而导致的性能问题。
    *   **重新渲染优化**: 使得组件的重新渲染行为更可预测和高效。
*   **对开发者有何影响**:
    *   **提升开发效率**: 减少了手动性能优化的工作量。
    *   **降低心智负担**: 开发者可以更专注于业务逻辑，而不需要过多担心性能问题。
    *   **鼓励更好的实践**: 即使没有手动记忆化，也能获得良好的性能，但也鼓励写出更“纯”的组件。

### 3. React 19 中的 `Actions` 机制是什么？`useFormStatus` 和 `useFormState` 有何作用？

**回答要点**:
*   **Actions 机制**: React 19 引入了一种统一的表单处理机制，允许 `<form>` 元素直接绑定一个 `action` 函数，该函数可以在服务器端 (Server Actions) 或客户端执行。它简化了表单的异步提交、状态管理和错误处理。
*   **`useFormStatus`**:
    *   **作用**: 在表单元素内部的任意组件中，用于获取当前表单的提交状态。
    *   **返回**: 一个包含 `pending` (是否正在提交), `data` (提交的数据), `method` (提交方法), `action` (提交的 Action 函数) 的对象。
    *   **用途**: 方便地在表单提交期间显示加载指示器、禁用按钮等。
*   **`useFormState`**:
    *   **作用**: 允许将 Action 函数的返回结果作为组件的状态进行管理。
    *   **返回**: 一个数组，包含当前状态 (`state`) 和绑定到 Action 的函数 (`formAction`)。
    *   **用途**: 用于在表单提交后显示成功/失败消息、验证错误等，并将 Action 的返回值与 UI 状态关联起来。

### 4. 解释 React 19 的 `use` Hook 的作用和优势。它与 `useEffect` 或 `useContext` 有何不同？

**回答要点**:
*   **作用**: `use` Hook 是一个通用的异步数据获取和资源管理 Hook。它允许在组件的顶层或 Hooks 中**直接 `await Promise`**。
*   **优势**:
    *   **简化异步数据获取**: 无需手动管理 `loading`, `error`, `data` 状态，更直观。
    *   **与 Suspense 集成**: 当 `use` Hook 内部的 Promise 尚未解决时，React 会暂停组件渲染，并向上查找最近的 `Suspense` 边界显示 `fallback`。
    *   **与错误边界集成**: Promise Rejection 会被最近的错误边界捕获。
    *   **统一的 API**: 既可以用于异步数据 (Promise)，也可以用于同步资源 (如 Context)。
*   **与 `useEffect` 的不同**:
    *   `useEffect` 是用来管理副作用的，在渲染**之后**执行，不能直接 `await` Promise。`use` Hook 是用于**读取** Promise 结果的，可以在渲染**期间**执行 (但会暂停渲染直到 Promise 解决)。
    *   `useEffect` 主要用于同步外部系统，而 `use` 主要用于数据获取。
*   **与 `useContext` 的不同**:
    *   `useContext` 只能同步地获取 Context 值。
    *   `use(Context)` 允许**异步**地获取 Context 值，并且可以利用 Suspense。

### 5. `useOptimistic` Hook 在 React 19 中解决了什么问题？请举例说明其应用场景。

**回答要点**:
*   **解决了什么问题**: `useOptimistic` Hook 解决了在执行异步操作时，**用户体验**的问题。它允许开发者在异步操作发起后**立即更新 UI (乐观更新)**，而无需等待服务器响应。如果异步操作失败，UI 会自动回滚到之前的状态。
*   **应用场景**:
    *   **点赞/取消点赞**: 用户点击点赞按钮后，UI 立即显示点赞成功，同时发送网络请求。
    *   **发送消息**: 用户点击发送按钮后，消息立即显示在列表末尾，同时发送网络请求。
    *   **任务列表**: 用户勾选任务完成，UI 立即更新任务状态，同时发送网络请求。
*   **优点**: 大幅提升用户体验，减少了用户感知的等待时间。

### 6. React 的 SSR (Server-Side Rendering) 和 Hydration (水合) 如何工作？React 18/19 在 SSR 和 Hydration 方面带来了哪些改进？

**回答要点**:
*   **SSR 工作原理**:
    1.  服务器使用 `react-dom/server` 将 React 组件渲染成 HTML 字符串。
    2.  客户端接收 HTML 并立即显示。
*   **Hydration 工作原理**:
    1.  客户端 JavaScript 加载后，使用 `ReactDOM.hydrateRoot()` (React 18+) 或 `ReactDOM.hydrate()` (旧版) 接管服务器渲染的 HTML。
    2.  React 将事件监听器附加到现有 DOM，使其变得交互式。
*   **React 18/19 的改进**:
    *   **Streaming HTML (流式 HTML)**: 服务器可以分块发送 HTML，允许浏览器逐步显示内容，而不是等待整个页面渲染完成。
    *   **Selective Hydration (选择性水合)**: 这是 React 18 的核心并发特性。当用户与页面交互时，React 可以优先水合用户交互的部分，即使其他部分尚未完成水合。这提高了用户交互的响应性，避免了“阻塞”现象。
    *   **`useId` Hook**: 用于在 SSR 和客户端保持 ID 的一致性，避免水合不匹配警告。
    *   **`use` Hook 和 Suspense**: 更好地支持 SSR 中的异步数据获取和加载状态，使服务器渲染和水合过程更加顺畅。

### 7. 什么是 Concurrent Mode (并发模式)？`useTransition` 和 `useDeferredValue` 如何与它协同工作？

**回答要点**:
*   **Concurrent Mode**: React 18 引入的特性，允许 React 在渲染繁忙时**同时处理多个任务**，而不会阻塞主线程。它使得 React 可以在后台准备新的 UI，并在准备好后才“提交”到 DOM。
*   **解决了什么问题**: 解决了传统 React 中，长时间运行的渲染任务会阻塞主线程，导致 UI 响应迟钝的问题。
*   **`useTransition` Hook**:
    *   **作用**: 允许将某些状态更新标记为“过渡”(非紧急更新)。
    *   **工作方式**: 当你使用 `startTransition` 包装一个状态更新时，React 会将其视为可中断的、优先级较低的任务。它会在后台准备新的 UI，同时保持旧 UI 可交互，直到新 UI 准备好才切换。
    *   **用途**: 在路由切换、数据过滤等场景，保持 UI 的响应性，避免用户感到卡顿。
*   **`useDeferredValue` Hook**:
    *   **作用**: 延迟更新非紧急 UI 部分，让紧急更新 (如输入框打字) 优先渲染。
    *   **工作方式**: 它会返回一个值，这个值会在非紧急渲染中更新。当紧急更新发生时，React 会先渲染紧急更新，再在后台渲染 `useDeferredValue` 关联的非紧急 UI。
    *   **用途**: 实现输入框的防抖功能 (不阻塞输入)，或在大型列表中延迟渲染搜索结果。
*   **协同工作**: 它们都是 Concurrent Mode 下的 Hooks，旨在让 React 应用在处理大量或耗时工作时，仍然能够保持响应性和流畅的用户体验。`useTransition` 标记**状态更新**，`useDeferredValue` 标记**值**。

### 8. React 19 对 `Web Components` 的支持有哪些改进？在什么场景下你会考虑使用 Web Components？

**深入回答**:
*   **React 19 对 Web Components 的改进**:
    *   **Props 传递**: 改进了向 Web Components 传递复杂数据 (如对象、数组) 作为 Props 的方式，使其更可靠。
    *   **事件处理**: 更好地处理 Web Components 触发的自定义事件，可能无需手动 `addEventListener`。
    *   **Refs 访问**: 更容易通过 `ref` 访问 Web Components 的实例。
*   **考虑使用 Web Components 的场景**:
    1.  **技术栈无关的 UI 库**: 当你需要创建一个可以在任何前端框架 (React, Vue, Angular, jQuery, Vanilla JS) 中使用的 UI 组件库时。
    2.  **遗留系统集成**: 将现代化的 UI 组件嵌入到老旧的、不同技术栈的系统中。
    3.  **微前端架构**: 作为微前端的构建单元，实现各个微应用之间的 UI 共享和技术隔离。
    4.  **组件分发**: 将组件作为独立的、可分发的文件发布，无需消费者安装整个框架。
    5.  **原生平台集成**: 未来可能与原生移动应用或桌面应用更紧密集成。
*   **权衡**: 尽管有改进，但 Web Components 的生态系统和开发效率通常不如直接使用 React 组件。在纯 React 项目中，通常优先使用 React 组件。只有在需要**强隔离性**、**技术栈无关**或**分发**的特定场景下，才会考虑 Web Components。

### 9. React Compiler (React Forget) 和手动使用 `useMemo`/`useCallback` 的区别是什么？未来开发者是否还需要手动进行记忆化？

**深入回答**:
*   **React Compiler (React Forget)**:
    *   **自动化**: 在构建时自动分析组件代码，并智能地插入记忆化 (`useMemo`, `useCallback`)。
    *   **编译器级别**: 这是一个编译器优化，而非运行时 Hook。它修改了组件的输出代码。
    *   **无额外心智负担**: 开发者无需关注何时记忆化、记忆化的依赖项是什么。
    *   **精确性**: 编译器理论上可以比人类更精确地判断何时需要记忆化以及正确的依赖项。
*   **手动使用 `useMemo`/`useCallback`**:
    *   **手动控制**: 开发者需要自己决定何时以及如何使用这些 Hooks。
    *   **运行时 Hook**: 它们是运行时 Hook，在每次渲染时都会执行其依赖项比较逻辑。
    *   **心智负担**: 容易忘记记忆化、依赖数组写错 (导致无限循环或不必要的重新渲染)，增加了代码复杂性。
*   **未来开发者是否还需要手动进行记忆化？**:
    *   **大部分情况下可能不需要**: React Compiler 的目标就是让开发者在大多数场景下**无需手动**进行记忆化。这将大大简化开发并提高代码的可读性。
    *   **特定场景可能仍需要**:
        *   **调试**: 在 Compiler 无法优化某些复杂或不纯的组件时，开发者可能仍然需要手动进行干预。
        *   **极度边缘的性能需求**: 对于那些对性能有极致要求的场景，手动调整可能仍然提供更精细的控制 (尽管这会变得非常罕见)。
        *   **与外部系统集成**: 对于一些与 DOM 或其他非 React 系统交互的副作用，`useEffect` 仍然是不可替代的。
        *   **早期阶段**: 在 Compiler 尚未完全成熟或普及的过渡阶段，手动记忆化仍然是有效的后备方案。
    *   **总的来说，趋势是自动化，手动记忆化将成为一种更专业的“逃生舱口”，而非日常实践。**

### 10. 你对 React 19 的新特性（如 `use` Hook, Actions, `useOptimistic`）如何看待？它们对 React 应用的架构和开发模式会带来怎样的影响？

**深入回答**:
*   **整体看法**: React 19 的新特性共同推动 React 进入一个更强大的**并发模型**和**全栈开发**时代。它们旨在简化异步操作、提升用户体验，并减少客户端的复杂性，将更多逻辑推向服务器端。
*   **对架构和开发模式的影响**:
    1.  **更强的全栈集成 (Server Components, Actions)**:
        *   **客户端-服务器界限模糊**: `Actions` (尤其是服务器 Actions) 允许直接在前端组件中触发服务器端逻辑，极大地简化了 API 调用和数据提交。
        *   **减少客户端复杂性**: 以前需要 Redux Saga/Thunk 或 `useEffect` + `useState` 组合来处理的异步表单提交逻辑，现在可以通过 `Actions` 和 `useFormState` 更简洁地实现。
        *   **数据流改变**: 数据获取和提交不再是纯客户端的担忧，而是更加紧密地与服务器集成。
    2.  **异步组件与 Suspense 的普及**:
        *   **`use` Hook**: 将异步数据获取直接引入组件内部，使得组件在等待数据时能够自然地暂停渲染，并通过 `Suspense` 提供优雅的加载回退。
        *   **更细粒度的加载状态**: 以前通常是整个组件或页面显示加载状态，现在可以精确到某个异步数据获取的部分。
        *   **简化数据层**: 减少了对 `useEffect` 中复杂条件判断和状态管理的依赖，代码更清晰。
    3.  **用户体验的提升 (Optimistic UI, Transitions)**:
        *   **`useOptimistic`**: 极大地简化了乐观更新的实现，这是一种重要的 UI 模式，能够显著提高用户对操作的感知速度。
        *   **`useTransition` 和 `useDeferredValue`**: 配合 Concurrent Mode，使得在处理耗时更新时，UI 仍然能够保持响应性，提升了大型或复杂应用的用户体验。
    4.  **本地状态管理的地位提升**:
        *   **React Compiler**: 自动化记忆化将使得在组件内部管理状态的性能不再是一个主要瓶颈，鼓励将更多状态放在组件内部。
        *   **`use` Hook 和 `useOptimistic`**: 这些新的 Hooks 本身就为本地异步状态和乐观更新提供了强大的工具。
        *   **对全局状态管理库的影响**: 对于一些仅仅为了同步远程数据而引入的复杂全局状态管理库 (如 Redux Sagas/Thunks, `useEffect` 瀑布流)，其使用场景可能会减少，因为 `use` Hook 和 Actions 提供了更直接的替代方案。但对于复杂的本地共享状态或需要严格数据流管理的场景，Redux Toolkit、Zustand 等仍有其价值。
    5.  **元数据管理 (Document Metadata)**: 允许在组件中直接管理 `<head>` 中的元素，简化了 SEO 和页面配置，使得组件更加“自包含”。

**总结**: React 19 的特性倾向于简化异步编程、提升开发者和用户体验，并将 React 推向一个更高效、更紧密集成的全栈开发模式，尤其是在搭配 Next.js 等框架时。开发者将能够编写更少、更简洁的代码来处理复杂的异步和交互逻辑。