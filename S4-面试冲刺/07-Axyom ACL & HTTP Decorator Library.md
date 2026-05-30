# @axyom-ui ACL & HTTP Decorator Library - 技术分析文档

## 一、项目概述

本项目是一个 Angular 20+ 企业级 UI 基础设施库，包含两个核心子包：

| 子包 | 功能定位 | 版本 |
|------|---------|------|
| `@axyom-ui/acl` | 基于角色的访问控制（RBAC）体系 | 20.0.0 |
| `@axyom-ui/theme` | 装饰器驱动的 HTTP 抽象层 + 工具函数库 | 20.0.0 |

**技术栈**：Angular 20+、Standalone Components、RxJS、TypeScript 5.x

---

## 二、架构设计分析

### 2.1 ACL 模块架构

```
┌─────────────────────────────────────────────────────────┐
│                      ACLModule                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ ACLService  │  │ ACLIfDirective│  │   ACLGuard    │  │
│  │  (核心状态)  │  │  (视图控制)   │  │  (路由守卫)   │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                │                   │          │
│         ▼                ▼                   ▼          │
│  ┌─────────────────────────────────────────────────┐   │
│  │            BehaviorSubject<ACLType>             │   │
│  │              (响应式状态流)                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**核心设计决策**：

1. **单例服务 + localStorage 持久化**
   - `providedIn: 'root'` 确保全局单例
   - 构造函数中从 localStorage 恢复状态，支持页面刷新后保持登录态
   - `BehaviorSubject` 作为状态中枢，驱动视图自动更新

2. **递归嵌套权限模型**
   ```typescript
   // ACLType 支持无限嵌套的 OR/AND 组合
   type ACLType = string | ACLType[];
   
   // 语义：OR(AND(a, e), f) || c
   can([[['a', 'e'], 'f'], 'c'])
   ```

3. **多层防护体系**
   - `ACLIfDirective`：模板级 UI 元素显隐控制
   - `ACLGuard`：路由级访问守卫（canActivate / canActivateChild / canLoad）
   - `AclPipe`：模板表达式级权限判断

### 2.2 HTTP Decorator 架构

```
┌──────────────────────────────────────────────────────────────┐
│                      BaseApi (抽象基类)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              inject(HttpClient)                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ▲                                  │
│                           │ extends                          │
│  ┌────────────────────────┴──────────────────────────────┐  │
│  │                  用户 Service 类                       │  │
│  │  @BaseUrl('/api')                                      │  │
│  │  @BaseHeaders({'Content-Type': 'application/json'})    │  │
│  │  class UserService extends BaseApi {                   │  │
│  │    @GET('/:id')                                        │  │
│  │    getUser(@PATH('id') id: number): Observable<User>   │  │
│  │  }                                                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                装饰器元数据层                           │  │
│  │  ┌──────────┬──────────┬──────────┬──────────────┐    │  │
│  │  │  PATH    │  QUERY   │  BODY    │  HEADERS     │    │  │
│  │  │ (路由参数)│(查询参数) │(请求体)  │ (自定义头)   │    │  │
│  │  └──────────┴──────────┴──────────┴──────────────┘    │  │
│  │  ┌──────────┬──────────┬──────────┬──────────────┐    │  │
│  │  │  PAGE    │ PAYLOAD  │  GET     │   POST ...   │    │  │
│  │  │(分页参数) │(批量查询) │ (方法装饰器)│            │    │  │
│  │  └──────────┴──────────┴──────────┴──────────────┘    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

**核心设计模式**：

1. **装饰器工厂 + 闭包记忆**
   ```typescript
   // 高阶函数生成装饰器
   function makeParam(paramName: string) {
     return (key?: string) => {
       return (target, propertyKey, index) => {
         // 通过闭包捕获参数名，存储元数据到原型链
       };
     };
   }
   ```

2. **原型链元数据存储**
   - 元数据存储在 `target.__api_params` 上
   - 实例方法执行时从 `this` 的原型链读取元数据
   - 避免了 `reflect-metadata` 依赖

3. **运行时方法替换**
   ```typescript
   // 装饰器在类定义阶段替换原始方法
   descriptor.value = function (...args) {
     // 读取元数据 → 构建请求 → 调用 HttpClient
   };
   ```

---

## 三、技术亮点

### 3.1 ACL 亮点

| 亮点 | 技术实现 | 价值 |
|------|---------|------|
| **响应式权限流** | `BehaviorSubject` + `pipe(filter)` | 角色变更自动驱动视图更新，无需手动刷新 |
| **声明式权限控制** | `*aclIf` 结构型指令 | 模板中零 JS 代码即可控制元素显隐 |
| **深度嵌套 RBAC** | 递归 `can()` 算法 | 支持任意复杂的 AND/OR 权限组合 |
| **多层权限守卫** | Guard + Directive + Pipe | 路由级、视图级、表达式级全覆盖 |
| **持久化无感恢复** | localStorage + 构造函数初始化 | 页面刷新权限不丢失 |

### 3.2 HTTP Decorator 亮点

| 亮点 | 技术实现 | 价值 |
|------|---------|------|
| **零 boilerplate API 调用** | 装饰器声明式定义 | 一行装饰器替代手写 HttpClient 调用 |
| **类型安全的参数绑定** | 泛型装饰器 + 元数据索引 | PATH/QUERY/BODY 参数自动绑定 |
| **转义路径变量** | `::` → `^^` → `:` 替换链 | 支持 URL 中包含字面量 `:` 的场景 |
| **智能空值过滤** | `ignoreEmpty()` 递归过滤 | 自动清理 null/undefined/空数组参数 |
| **分页参数标准化** | `PAGE` 装饰器 + `genPage()` | 统一 `pageIndex/pageSize/sorts` → `page/size/sort` |
| **方法装饰器全 HTTP 覆盖** | `GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS/JSONP` | 完整 HTTP 方法支持 |

### 3.3 工具函数亮点

```typescript
// getTypeof - 精确类型检测（解决 typeof null === 'object' 等问题）
getTypeof(null)    // 'Null'
getTypeof([])      // 'Array'

// ignoreEmpty - 递归空值过滤
ignoreEmpty({ a: 0, b: false, c: null, d: undefined, e: [] })
// { a: 0, b: false }  保留 0 和 false，过滤 null/undefined/[]

// hasOwn - 安全的属性检测
hasOwn(null, 'key')  // false（不会抛异常）

// enum2Array - 枚举转换
enum2Array({ A: 1, B: 2 }, 2)
// [{ key: 'A', value: 1 }, { key: 'B', value: 2 }]
```

---

## 四、项目难点与解决方案

### 难点 1：装饰器参数索引的元数据存储

**问题**：TypeScript 装饰器的 `index` 参数只提供参数在函数参数列表中的位置，需要存储这个位置并在运行时还原。

**解决方案**：
```typescript
// 1. 使用闭包 + 计数器在装饰器阶段记录索引
function makeParam(paramName: string) {
  return (key?: string) => {
    return (target: BaseApi, propertyKey: string, index: number): void => {
      // index 由 TypeScript 引擎自动传入
      const params = setParam(setParam(target), propertyKey);
      // 按 paramName 分类存储 { key, index }
      (params[paramName] ??= []).push({ key, index });
    };
  };
}

// 2. 运行时通过 index 还原参数值
function getValidArgs(data, key, args) {
  return args[data[key][0].index];  // 精确定位原始参数
}
```

### 难点 2：URL 路径变量的转义机制

**问题**：当 URL 中需要包含字面量 `:` 时（如 `/user/:id/:name` 中 `/user/:id` 是路径段），简单的正则替换会冲突。

**解决方案**：
```typescript
// 三步替换链
requestUrl = requestUrl.replace(/::/g, '^^');  // 1. 先转义 :: → ^^
requestUrl = requestUrl.replace(new RegExp(`:${i.key}`, 'g'), 
  encodeURIComponent(args[i.index]));          // 2. 替换 :param → 值
requestUrl = requestUrl.replace(/\^\^/g, ':');  // 3. 还原 ^^ → :
```

### 难点 3：递归权限判断的正确性

**问题**：`ACLType` 的递归嵌套定义需要正确区分 OR 和 AND 语义。

**解决方案**：
```typescript
can(roles: ACLType[] | null): boolean {
  return !roles ? true : roles.some((role) => {
    if (!Array.isArray(role)) {
      return this.roles.includes(role);  // 叶子节点：OR 语义
    }
    return role.every((r) => {           // 数组节点：AND 语义
      if (!Array.isArray(r)) {
        return this.roles.includes(r);
      }
      return this.can(r);                // 递归处理嵌套
    });
  });
}
```

### 难点 4：Guard 中 Observable 与静态值的统一处理

**问题**：`route.data.acl` 可能是静态数组，也可能是 Observable。

**解决方案**：
```typescript
const acl = data["acl"];
return (acl instanceof Observable ? acl : of(acl))
  .pipe(
    map(v => this.aclService.can(v)),
    tap(v => { if (!v) this.router.navigateByUrl(data["guard_url"]); })
  );
```

### 难点 5：纯 Pipe 的缓存问题

**问题**：`@Pipe({ pure: true })` 会在输入不变时缓存结果，但 ACL 状态是全局可变的。

**解决方案**：通过 `ACLService.change` 的 Observable 订阅触发组件级重渲染，而非依赖 Pipe 的纯检测。实际上 Pipe 在模板中作为表达式使用时，结合 `*aclIf` 指令可以正确响应状态变化。

---

## 五、优化改进点

### 5.1 已完成的优化

| 优化项 | 具体实现 |
|--------|---------|
| **Standalone 化** | 所有组件/指令/Pipe 均支持 standalone，无需声明模块 |
| **内存泄漏防护** | `ACLIfDirective` 实现 `OnDestroy`，正确取消订阅 |
| **空值安全** | `ignoreEmpty()` 递归过滤 null/undefined/空数组，避免发送无效参数 |
| **Tree Shaking** | `sideEffects: false` + 纯 ES Module 导出 |
| **单例模式** | `providedIn: 'root'` 全局唯一实例 |
| **持久化优化** | 空角色时主动移除 localStorage 键，避免存储 `[]` |

### 5.2 可进一步优化的方向

| 方向 | 建议 |
|------|------|
| **Angular Signals** | 迁移到 `signal()` / `computed()` 替代 BehaviorSubject，获得更好的性能 |
| **httpResource 集成** | 利用 Angular 20+ 的 httpResource 实现声明式数据获取 |
| **类型收窄** | 为 `can()` 方法添加更精确的类型重载 |
| **缓存策略** | 在 BaseApi 中增加请求缓存/防抖装饰器 |
| **请求拦截器** | 基于装饰器元数据实现自动重试、Loading 状态管理 |
| **OpenAPI 代码生成** | 从 OpenAPI spec 自动生成装饰器 Service 代码 |

---

## 六、面试技术问题清单

### 6.1 基础原理类

| 问题 | 答题要点 |
|------|---------|
| **TypeScript 装饰器的工作原理？** | 装饰器本质是高阶函数，在类/方法/属性定义时执行，可以修改或替换原始定义。本项目利用方法装饰器的 `descriptor.value` 替换原始方法，在运行时注入 HTTP 调用逻辑。 |
| **`reflect-metadata` 和本项目的元数据存储方式有何区别？** | reflect-metadata 是 TC39 标准化方案，需要 polyfill；本项目直接在原型链上挂载自定义元数据（`__api_params`），零依赖、零运行时开销。 |
| **BehaviorSubject 和 Observable 的区别？** | BehaviorSubject 是 Subject 的变体，有初始值且会"重放"最新值给新订阅者，适合状态管理；普通 Observable 是懒执行的数据流。 |
| **RxJS 的 `pipe(filter(r => r !== null))` 的作用？** | 过滤掉 BehaviorSubject 重放时可能产生的 null 值，确保只处理有效的角色变更事件。 |

### 6.2 架构设计类

| 问题 | 答题要点 |
|------|---------|
| **为什么选择装饰器而非接口/配置对象来定义 HTTP 请求？** | 装饰器提供声明式语法，将请求元数据（URL、方法、参数绑定）与业务逻辑共置，减少样板代码；配置对象需要额外的映射层。 |
| **ACL 模块的三层防护（Guard/Directive/Pipe）设计考虑是什么？** | 路由级守卫防止未授权页面加载；模板级指令控制 UI 元素显隐；表达式级 Pipe 支持动态判断。不同场景使用不同粒度的权限控制。 |
| **如何实现递归的 OR/AND 权限组合？** | 通过 `ACLType = string \| ACLType[]` 的递归类型定义，数组表示 AND，外层数组表示 OR，`can()` 方法递归遍历。 |
| **为什么选择 localStorage 而非 sessionStorage？** | 支持多标签页状态同步（通过 `storage` 事件）；用户刷新页面后权限不丢失。 |

### 6.3 技术深度类

| 问题 | 答题要点 |
|------|---------|
| **装饰器中 `target` 和 `target.prototype` 的区别？** | 方法装饰器中 `target` 是类的构造函数（静态成员）或原型（实例成员）；`target.prototype` 是实例原型，用于存储实例方法的元数据。 |
| **`ignoreEmpty()` 为什么要递归处理嵌套对象？** | 后端 API 通常要求查询参数中不包含 null/undefined，但嵌套对象（如分页参数）也需要同样处理，递归确保深层属性被正确过滤。 |
| **URL 转义机制中的 `::` 替换策略有什么考虑？** | 避免 `/user/:id/:id` 这样的重复参数名导致正则替换冲突；`::` 是常见的"字面量冒号"转义约定。 |
| **如何测试装饰器驱动的 HTTP 调用？** | 使用 `HttpTestingController` mock HttpClient，验证请求方法、URL、参数、请求体是否符合装饰器声明。 |

### 6.4 工程实践类

| 问题 | 答题要点 |
|------|---------|
| **这个库如何支持 tree shaking？** | `sideEffects: false` + 纯函数导出 + standalone 组件按需引入，打包工具可以安全地移除未使用的代码。 |
| **为什么使用 `providedIn: 'root'` 而非 `Module.forRoot()`？** | 从 Angular 6+ 开始，`providedIn: 'root'` 支持 tree shaking，未被引用的服务不会被打包；`forRoot()` 是传统模式的兼容方案。 |
| **如何处理跨组件/跨页面的权限状态同步？** | BehaviorSubject 作为状态中枢 + localStorage 持久化 + ACLIfDirective 订阅 change 事件，三者配合实现全局响应式权限管理。 |

---

## 七、技术架构能力体现

### 7.1 设计模式应用

| 模式 | 应用位置 |
|------|---------|
| **策略模式** | `ACLService.can()` 中的递归权限算法 |
| **观察者模式** | `BehaviorSubject` 驱动的响应式权限流 |
| **装饰器模式** | HTTP 方法装饰器（元编程） |
| **单例模式** | `providedIn: 'root'` 的服务 |
| **模板方法模式** | `BaseApi` 抽象基类 + 具体 Service 实现 |

### 7.2 体系化设计能力

```
                    ┌─────────────────────────┐
                    │     企业级 UI 基础设施    │
                    └───────────┬─────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
   ┌──────┴──────┐      ┌──────┴──────┐      ┌──────┴──────┐
   │  ACL 权限层  │      │  HTTP 通信层 │      │   工具函数层  │
   └──────┬──────┘      └──────┬──────┘      └──────┬──────┘
          │                     │                     │
   ┌──────┴──────┐      ┌──────┴──────┐      ┌──────┴──────┐
   │Guard 路由守卫│      │BaseApi 基类  │      │ignoreEmpty  │
   │Directive 指令│      │方法装饰器    │      │deserialize  │
   │Pipe 管道     │      │参数装饰器    │      │enum2Array   │
   │Service 状态  │      │元数据系统    │      │getTypeof    │
   └─────────────┘      └─────────────┘      └─────────────┘
```

### 7.3 面试表述建议

**开场白**：
> "这个库是我为了解决 Angular 企业项目中的两个核心问题而设计的：**权限控制的声明式管理**和 **HTTP 调用的样板代码消除**。"

**讲 ACL 时**：
> "ACL 模块采用了**三层防护架构**：路由级 Guard 阻止未授权页面加载，模板级 Directive 控制元素显隐，Pipe 提供表达式级判断。核心是一个基于 `BehaviorSubject` 的响应式状态流，角色变更时自动驱动所有订阅者更新。"

**讲 HTTP Decorator 时**：
> "HTTP 层的设计灵感来自 NestJS 的 Controller 装饰器。通过**元编程**，在类定义阶段捕获参数索引和请求元数据，运行时自动构建 HttpClient 请求。这把平均每个 API 方法的样板代码从 15-20 行减少到 3-5 行。"

**收尾**：
> "整个库遵循**渐进式架构**原则：ACL 支持从简单字符串到无限嵌套的 OR/AND 权限模型；HTTP 层支持从简单 GET 到复杂分页查询的所有场景。两个模块都通过 standalone 模式设计，支持 tree shaking，符合 Angular 20+ 的现代最佳实践。"

---

## 八、代码统计

| 模块 | 文件数 | 代码行数 | 测试覆盖 |
|------|--------|---------|---------|
| ACL | 5 个核心文件 | ~180 行 | 10 个单元测试 |
| HTTP Decorator | 1 个核心文件 | ~250 行 | 25+ 个单元测试 |
| Utils | 6 个工具函数 | ~100 行 | 完整测试 |

**总计**：约 **530 行**核心代码，覆盖权限控制、HTTP 抽象、工具函数三大领域。

---

## 九、面试深度亮点（扩展）

### 9.1 技术选型决策能力

> 面试官问："你为什么这样设计？" —— 这是最能体现架构思维的问题。

| 决策点 | 选择 | 对比方案 | 决策理由 |
|--------|------|---------|---------|
| **HTTP 抽象方案** | 装饰器 | Interceptor / 封装 Service | 装饰器**声明式**定义，参数绑定零手动解构；Interceptor 是横向切面，不适合业务级语义绑定 |
| **权限状态管理** | BehaviorSubject | Signal / NgRx / 简单变量 | 需要**重放最新值**给新订阅者（组件懒加载场景）；Signal 还不支持异步；NgRx 过重 |
| **元数据存储** | 原型链挂载 | reflect-metadata / WeakMap | 零依赖、调试直观（`console.log(target)` 可见）；WeakMap 在 SSR 场景有局限 |
| **空值过滤** | 递归过滤 | 手动过滤 / Lodash | 嵌套对象（分页、payload）必须递归；Lodash 体积大，tree-shaking 不友好 |
| **权限类型设计** | `string \| string[]` | 枚举 / 接口 | 递归类型天然支持**任意嵌套的 AND/OR 组合**，表达力远超扁平枚举 |

**面试话术**：
> "我在做技术选型时，主要考虑三个维度：**开发者体验（DX）**、**运行时性能**、**可维护性**。比如选择装饰器而非 Interceptor，是因为 Interceptor 是全局横切关注点，而业务 API 需要的是**方法级别的语义声明**——装饰器恰好能在方法签名上直接表达意图。"

### 9.2 抽象分层能力

```
面试官问："如果要加一个缓存装饰器，你怎么加？"

     当前架构已具备扩展点：
     
     ┌─────────────────────────────────────────────┐
     │  makeMethod() 工厂函数                      │
     │  ┌─────────────────────────────────────┐    │
     │  │  descriptor.value = function(...) {  │    │
     │  │    // ① 读取元数据                    │    │
     │  │    // ② 构建请求                      │    │
     │  │    // ③ 调用 http.request()  ← 可拦截 │    │
     │  │  }                                   │    │
     │  └─────────────────────────────────────┘    │
     └─────────────────────────────────────────────┘
     
     扩展方案：
     - 方案 A：在 makeMethod 中插入缓存逻辑（侵入式）
     - 方案 B：新增 @Cache(ttl) 装饰器，组合方法装饰器（非侵入式）
     - 方案 C：利用 httpInterceptors + 元数据标记（Angular 原生方式）
```

**面试话术**：
> "这个库的分层设计遵循**单一职责**原则：装饰器只负责元数据声明，`makeMethod` 只负责请求构建，`ignoreEmpty` 只负责参数清洗。这使得扩展时不需要修改现有代码——比如加缓存，我可以写一个 `@Cache(5000)` 装饰器，它在 `makeMethod` 之前拦截，检查缓存命中则直接返回，未命中才调用原方法。"

### 9.3 防御式编程能力

| 防御点 | 代码位置 | 防御内容 |
|--------|---------|---------|
| **HttpClient 缺失** | `http.decorator.ts:156` | 检查 `http == null` 并抛出明确错误信息 |
| **空值参数** | `ignoreEmpty()` | 递归过滤 null/undefined/空数组，避免后端报错 |
| **空角色设置** | `acl.service.ts:28` | 空数组时主动移除 localStorage 键，避免脏数据 |
| **模板变量未定义** | `acl-if.directive.ts:34` | `value === null` 时默认放行（向后兼容） |
| **路由 data 缺失** | `acl.guard.ts:27` | `{ acl: null, guard_url: '/', ...data }` 默认值合并 |
| **未定义参数** | `http.decorator.ts:170` | `filter(w => typeof args[w.index] !== 'undefined')` 跳过未传参数 |

**面试话术**：
> "我在写库时特别注重**防御式编程**。比如 Guard 里的 `process` 方法，`route.data` 可能是 `undefined`（路由没配置 data 时），所以先用展开运算符合并默认值。再比如 `aclIf` 指令，当 value 为 null 时默认显示元素——这是**向后兼容**的设计，老页面没配置权限时不会白屏。"

### 9.4 测试策略能力

```
测试金字塔在本项目中的体现：

         ┌───────────────┐
         │  E2E (未覆盖)  │   ← 可用 Playwright 补充
         ├───────────────┤
         │ 集成测试        │   ← ACL Guard + Router 联合测试
         │ (guard.spec)   │
         ├───────────────┤
         │  单元测试       │   ← 核心算法（can/ignoreEmpty）
         │  (service.spec)│
         ├───────────────┤
         │  工具函数测试   │   ← 纯函数，覆盖边界用例
         │  (utils.spec)  │
         └───────────────┘
```

**测试设计亮点**：

| 测试策略 | 实现 | 价值 |
|---------|------|------|
| **参数化测试** | 权限组合的多用例覆盖 | `['a','f']`、`[['a','f']]`、`[[['a','e'],'f'],'c']` 覆盖 OR/AND/嵌套 |
| **状态切换测试** | `ACLIfDirective` 的 switch 测试 | 验证权限变更后视图自动更新 |
| **Mock 测试** | `HttpTestingController` | 验证装饰器生成的请求参数正确性 |
| **边界值测试** | `null`、空数组、未定义参数 | 确保异常输入不崩溃 |
| **存储测试** | localStorage 读写验证 | 验证持久化逻辑正确性 |

**面试话术**：
> "测试方面我特别注意**边界用例**。比如 `can()` 方法的测试用例，我设计了 5 种嵌套深度：单角色、OR 组合、AND 组合、混合嵌套、三层嵌套。再比如 `ignoreEmpty` 的测试，专门验证 `0` 和 `false` 不被过滤——这是后端容易出 bug 的地方。"

### 9.5 问题解决方法论

```
遇到问题时的思维链：

问题："Guard 中 route.data.acl 可能是 Observable 也可能是静态值"

  ① 分析根因
     └─ Angular 路由的 data 支持静态值和 Provider/Factory
     └─ 用户可能用 of(['admin']) 或直接 ['admin']
  
  ② 设计统一抽象
     └─ 用 instanceof Observable 判断类型
     └─ 静态值包装为 of() 统一为 Observable 流
  
  ③ 保持类型安全
     └─ Observable<ACLType[]> 统一返回类型
     └─ map/tap 链式处理，不破坏 RxJS 响应式范式
  
  ④ 考虑扩展性
     └─ 未来如果 ACL 需要从后端动态加载，只需改为 Observable
     └─ 调用方无需修改任何代码
```

### 9.6 代码质量意识

| 实践 | 体现 |
|------|------|
| **单一职责** | `makeParam`、`getValidArgs`、`ignoreEmpty` 各自独立，可单独复用 |
| **开闭原则** | 新增 HTTP 方法只需 `makeMethod('CUSTOM')`，不修改现有代码 |
| **依赖倒置** | `BaseApi` 通过 `inject(HttpClient)` 获取依赖，不直接 new |
| **DRY 原则** | `makeParam` 工厂函数生成 5 个参数装饰器，消除重复 |
| **语义化命名** | `ACLIf`、`ACLGuard`、`AclPipe` 命名直观表达用途 |
| **JSDoc 注释** | 每个公开 API 都有中文注释说明用途和使用场景 |

**面试话术**：
> "我认为写库和写业务代码最大的区别是——**库的使用者会记住你的每一个 API 设计**。所以我在命名上花了很多心思，比如 `aclIf` 而不是 `acl`，因为它是一个结构型指令，名字要暗示它操作 DOM；`PAYLOAD` 而不是 `BODY_QUERY`，因为它表达的是'作为查询参数发送的请求体'。"

### 9.7 性能考量

| 性能点 | 设计决策 | 影响 |
|--------|---------|------|
| **单例服务** | `providedIn: 'root'` | 全局唯一实例，避免重复创建 |
| **纯 Pipe** | `@Pipe({ pure: true })` | 输入不变时跳过计算 |
| **Tree Shaking** | `sideEffects: false` | 未使用的装饰器不进入打包 |
| **按需订阅** | `filter(r => r !== null)` | 只处理有效变更，减少无效计算 |
| **内存泄漏防护** | `ngOnDestroy` 取消订阅 | 避免组件销毁后仍在执行回调 |
| **懒加载兼容** | Guard + BehaviorSubject 重放 | 异步路由加载时立即获得最新权限状态 |

### 9.8 类型体操能力

```typescript
// 递归类型定义 —— 支持无限嵌套的权限模型
type ACLType = string | ACLType[];

// 条件类型 —— 方法装饰器的参数校验
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'JSONP';

// 泛型约束 —— BaseApi 子类必须继承抽象基类
function makeMethod(method: METHOD_TYPE) {
  return (url: string, options?: HttpOptions) => {
    return <TClass extends new (...args: any[]) => BaseApi>(
      target: TClass, ...
    ) => { ... };
  };
}

// 索引类型 —— 元数据的类型安全读取
type ParamType = {
  key: string;
  index: number;
  [key: string]: any;
};
```

**面试话术**：
> "这个项目里最考验 TypeScript 能力的是 `ACLType` 的递归类型定义。它只有一行代码 `type ACLType = string | ACLType[]`，但要让编译器正确推断出 `[['a','b'], 'c']` 是合法的、`[[['a','b'],'c'],'d']` 也是合法的，需要理解 TypeScript 的条件类型和递归类型解析机制。"

### 9.9 与业界方案的对比

| 对比维度 | 本项目 | ng-alain ACL | NestJS Controllers |
|---------|--------|-------------|-------------------|
| **权限模型** | 递归 OR/AND | 扁平角色匹配 | N/A |
| **HTTP 抽象** | 装饰器声明式 | Service 封装 | 装饰器声明式 |
| **元数据存储** | 原型链挂载 | 自定义存储 | reflect-metadata |
| **模块化** | Standalone | NgModule | NgModule |
| **体积** | ~530 行 | ~2000 行 | ~5000 行 |
| **Angular 版本** | 20+ | 15+ | 任意 |

**面试话术**：
> "我的设计参考了 ng-alain 的 ACL 思路，但做了几个关键改进：一是用递归类型替代扁平枚举，支持任意深度的权限组合；二是 HTTP 层借鉴了 NestJS 的装饰器模式，但在 Angular 中去掉了 reflect-metadata 依赖，用原型链存储实现零依赖。"

### 9.10 可以展开聊的延伸话题

| 话题 | 可以聊的方向 |
|------|------------|
| **微前端** | 如何在 Module Federation 中共享 ACL 状态 |
| **SSR** | localStorage 在服务端不可用时的降级方案 |
| **国际化** | 权限名称的多语言支持 |
| **权限变更推送** | 结合 WebSocket 实现实时权限更新 |
| **权限审计日志** | 记录每次权限检查的结果，用于安全审计 |
| **动态权限** | 从后端 API 动态加载权限列表 |
| **权限继承** | 角色之间的继承关系（如 admin 继承 user 的所有权限） |
| **RBAC vs ABAC** | 从基于角色到基于属性的权限模型演进 |

**面试话术**：
> "如果要扩展这个库，我会考虑几个方向：一是**微前端场景**下的状态共享，可以用 CustomEvent 或 BroadcastChannel 跨应用同步权限；二是**动态权限**，把 `set()` 方法改为从后端 API 加载，支持运行时权限变更；三是从 RBAC 演进到 ABAC，支持基于用户属性、资源属性、环境属性的细粒度访问控制。"

### 9.11 面试 STAR 法则整理

**S（Situation）**：
> "在之前的 Angular 企业项目中，API 调用层有大量重复的 HttpClient 调用代码，权限管理分散在各个组件中，没有统一的抽象层。"

**T（Task）**：
> "我负责设计并实现一个可复用的基础设施库，统一 HTTP 调用模式和权限管理机制。"

**A（Action）**：
> "我设计了两个核心模块：ACL 模块用 BehaviorSubject 实现响应式权限流，支持递归嵌套的 OR/AND 权限组合；HTTP 层用装饰器元编程，将请求声明与业务逻辑共置，参数自动绑定。同时编写了完整的单元测试，覆盖边界用例。"

**R（Result）**：
> "API 调用的样板代码减少了 70%+（从 15-20 行降到 3-5 行），权限控制从命令式改为声明式，团队代码一致性显著提升。库通过 standalone 模式发布，支持 tree shaking，体积约 530 行核心代码。"
