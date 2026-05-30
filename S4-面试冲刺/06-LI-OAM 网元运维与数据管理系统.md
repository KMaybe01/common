# LI-OAM 网元运维与数据管理系统 

---

## 一、项目概述

### 1.1 项目背景

LI-OAM（Lawful Intercept Operation, Administration & Maintenance）是一套面向 **5G核心网元** 的运维与数据管理系统，服务于电信运营商的网元管理团队。系统覆盖网元全生命周期的运维场景，从网元注册接入、状态监控、配置下发，到日志采集解密、备份恢复、审计溯源，构建了一套完整的网元数据治理体系。

### 1.2 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户层                                    │
│              Web浏览器 (Angular 20 SPA)                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────┴─────────────────────────────────────┐
│                      网关层 (Nginx/Ingress)                      │
│              路由转发 · SSL终结 · 静态资源托管                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │ /api/v1
┌───────────────────────────┴─────────────────────────────────────┐
│                      应用层 (Go + Gin)                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Auth     │ │ NF Mgmt  │ │ Audit    │ │ Backup   │           │
│  │ 认证授权  │ │ 网元管理  │ │ 审计日志  │ │ 备份恢复  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ User     │ │ Config   │ │ Metrics  │ │ LocalHA  │           │
│  │ 用户管理  │ │ 系统配置  │ │ 监控指标  │ │ 高可用   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└────┬──────────────┬──────────────┬──────────────┬───────────────┘
     │              │              │              │
┌────┴────┐  ┌─────┴─────┐  ┌────┴────┐  ┌─────┴─────┐
│ 5G NF   │  │ AWS S3    │  │Prometheus│  │ K8s      │
│ SMF/UPF │  │ 外部存储   │  │ 监控采集  │  │ 集群管理  │
└─────────┘  └───────────┘  └─────────┘  └───────────┘
```

### 1.3 技术栈全景

| 层级 | 技术选型 | 版本 | 说明 |
|------|---------|------|------|
| **前端框架** | Angular | 20.3.17 | Zoneless + Standalone + Signals |
| **UI组件库** | PrimeNG | 20.3.0 | 企业级UI组件 |
| **样式方案** | Tailwind CSS | 4.1.11 | 工具类优先 + SCSS布局 |
| **响应式编程** | RxJS | 7.8.0 | 异步数据流处理 |
| **代码编辑器** | Ace Editor | 1.43.3 | YAML/JSON编辑 |
| **加密库** | node-forge | 1.3.1 | RSA/AES加解密 |
| **压缩库** | fflate | 0.8.2 | ZIP/TAR.GZ解压 |
| **日期处理** | date-fns | 4.1.0 | 日期格式化/计算 |
| **后端框架** | Go + Gin | 1.25.6 | 高性能HTTP服务 |
| **数据库** | — | — | 文件存储 + S3 |
| **监控** | Prometheus | — | 指标采集与暴露 |
| **部署** | Docker + K8s | — | Helm Chart编排 |
| **CI/CD** | GitLab CI | — | 持续集成与部署 |
| **代码质量** | ESLint + Prettier + Husky | — | 静态检查 + 格式化 |

### 1.4 功能模块矩阵

| 模块 | 功能 | 用户角色 | 技术亮点 |
|------|------|---------|---------|
| **网元管理** | NF注册/编辑/删除、NE状态、Provision配置 | 全部用户 | 30秒轮询 + 手动刷新合并 |
| **日志管理** | NF日志查看、前端/后端双解密模式 | 全部用户 | Web Worker并行解密 + 流式输出 |
| **连接监控** | NF连接状态、多接口聚合展示 | 全部用户 | merge + scan多接口并行 |
| **指标监控** | NF指标采集、SMF/UPF差异化展示 | 全部用户 | scan累积排序 |
| **审计日志** | 40+事件类型、加密存储、详情查看 | 管理员 | HKDF + AES-256-GCM |
| **用户管理** | 用户CRUD、NF权限分配、密码策略 | 管理员 | JTI单点登录 + 自动锁定 |
| **备份管理** | NF/审计/用户备份、S3存储、告警 | 全部用户/管理员 | tar.gz压缩 + 保留期管理 |
| **系统设置** | Token过期、私钥存储、审计配置 | 管理员 | 声明式配置表单 |
| **主题系统** | 16色主色调、8表面色、暗黑模式 | 全部用户 | View Transitions API |

### 1.5 业务痛点与解决方案

| 业务痛点 | 解决方案 | 技术挑战 |
|---------|---------|---------|
| 网元状态分散，运维效率低 | 统一管理平台 + 实时监控 | 多接口聚合、轮询策略 |
| 日志加密存储，合规要求高 | HKDF + AES-256-GCM 加密体系 | 异步写入性能、密钥管理 |
| 敏感操作需审计溯源 | 40+事件类型全量审计 | 异步channel、轮转压缩 |
| 多用户权限隔离 | RBAC + JTI单点登录 | 前后端双重权限校验 |
| 大文件解密性能瓶颈 | Web Worker并行解密 | 有序合并、流式渲染 |

### 1.6 项目规模

| 指标 | 数据 |
|------|------|
| **前端组件数** | 40+ 独立组件 |
| **API Service** | 9 个领域服务 |
| **HTTP拦截器** | 4 层拦截器链 |
| **路由页面** | 13 个懒加载页面 |
| **表单控件** | 9 种自定义控件 |
| **自定义验证器** | 5 个跨字段验证器 |
| **工具函数** | 7 个公共工具 |
| **审计事件类型** | 40+ 种 |
| **Prometheus指标** | 9 个监控指标 |
| **TypeScript严格模式** | 全量开启 |

---

## 二、技术架构全景

### 2.1 分层架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        展示层 (Presentation)                     │
│  Angular 20 Standalone + PrimeNG + Tailwind CSS                 │
│  Zoneless + Signals + @if/@for 原生控制流                        │
├─────────────────────────────────────────────────────────────────┤
│                        状态层 (State)                             │
│  signal() / computed() / effect()  ─── 组件级响应式              │
│  BehaviorSubject / Subject         ─── 跨组件数据流              │
│  @StorageDecorator() CACHE         ─── 持久化门面                │
├─────────────────────────────────────────────────────────────────┤
│                        服务层 (Service)                          │
│  API Services (9个)    ─── 领域API封装                           │
│  Core Services (7个)   ─── 认证/轮询/主题/加载/流式/面包屑        │
│  Mock System           ─── 开发环境数据模拟                      │
├─────────────────────────────────────────────────────────────────┤
│                        拦截层 (Interceptor Chain)                │
│  jwtInterceptor → authInterceptor → loadingInterceptor → mock   │
│  Token注入         全局错误处理      Loading状态追踪    Mock数据   │
├─────────────────────────────────────────────────────────────────┤
│                        路由层 (Router)                           │
│  jwtGuard (认证) + adminGuard (权限) + 懒加载 + 错误降级          │
├─────────────────────────────────────────────────────────────────┤
│                        构建层 (Build)                            │
│  esbuild + TypeScript 5.9 strict + ESLint 500行限制 + Husky     │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 数据流架构

```
用户操作
  │
  ▼
Component (signal)
  │
  ├─→ API Service (HttpClient)
  │     │
  │     ├─→ jwtInterceptor: 注入 Bearer Token
  │     ├─→ authInterceptor: 错误处理 + Toast
  │     ├─→ loadingInterceptor: start()/stop() 追踪
  │     │
  │     └─→ 后端 /api/v1/*
  │
  ├─→ signal.set(data)  →  UI自动更新 (Zoneless)
  │
  └─→ effect() / computed()  →  派生状态更新
```

---

## 三、核心设计模式与架构决策

### 3.1 拦截器链 — 职责链模式

**设计决策**：将横切关注点（认证、错误处理、加载状态）分离到独立的函数式拦截器中，按顺序链式执行。

```typescript
// app.config.ts — 拦截器注册顺序
provideHttpClient(withInterceptors([
  jwtInterceptor,       // 1. 认证：注入Token（排除login）
  authInterceptor,      // 2. 错误：401跳转 / 5xx Toast / Blob解析
  loadingInterceptor,   // 3. 追踪：按 "METHOD /path" 标记loading
  ...environment.interceptor,  // 4. 扩展：开发环境注入mockInterceptor
]))
```

**为什么这样设计**：
- **执行顺序有依赖**：authInterceptor依赖jwtInterceptor注入的Token来判断401
- **Loading需在最外层**：loadingInterceptor在catchError之前执行，能追踪到失败请求
- **环境扩展性**：通过environment变量注入mockInterceptor，生产环境零开销

**authInterceptor的Blob错误处理**（面试亮点）：

```typescript
// 文件下载接口返回的错误是Blob格式，需要特殊解析
if (err.error instanceof Blob) {
  const reader = new FileReader();
  reader.readAsText(err.error, 'utf-8');
  reader.onload = () => {
    const ev = JSON.parse(reader.result as string);
    message.add({ severity: 'error', summary: ev.error, detail: ev.message });
  };
}
// 浏览器证书过期导致的网络错误（status=0），在alarm接口自动刷新
if (err.status == 0 && err.statusText == 'Unknown Error' && req.url.endsWith('alarm')) {
  window.location.reload();
}
```

**思考深度**：为什么Blob错误要特殊处理？因为文件下载接口的响应类型是blob，Angular HttpClient在收到5xx时仍然将错误包装为Blob，而不是JSON。这个边界case在常规项目中很少遇到，体现了对HTTP协议的深入理解。

### 3.2 状态管理 — 混合响应式策略

**设计决策**：不引入NgRx等重型状态管理库，采用Signals + RxJS混合方案。

| 场景 | 方案 | 原因 |
|------|------|------|
| 组件本地状态 | `signal()` | Zoneless下最高效的变更检测 |
| 派生计算值 | `computed()` | 自动追踪依赖，惰性求值 |
| 副作用 | `effect()` | 响应式side effect |
| 异步数据流 | `BehaviorSubject` | 30秒轮询、手动刷新 |
| 多接口聚合 | `merge` + `scan` | 并行请求 + 累积合并 |
| 持久化 | `@StorageDecorator()` | localStorage透明代理 |

**NfService — 轮询与手动刷新合并**：

```typescript
// 自动轮询(30s) + 手动刷新(refresh$) 统一处理
merge(interval(30_000), this.refresh$.asObservable())
  .pipe(
    startWith(0),           // 首次立即请求
    switchMap(() => this.api.getNetworkFunctions()),  // 新请求取消旧请求
    takeUntilDestroyed(this.destroyRef),               // 组件销毁自动取消
  )
  .subscribe((data) => {
    this.selectedUpdate(data);  // 保持选中NF有效
    this.data$.next(data);      // 通知订阅者
  });
```

**为什么用BehaviorSubject而不是Signal**：
- `BehaviorSubject` 支持 `pipe(switchMap, scan)` 等RxJS操作符
- `switchMap` 能自动取消上一个未完成的请求
- 轮询场景需要 `interval` + `merge` 的组合能力

**LoadingService — Signal驱动的精确追踪**：

```typescript
// 按 "METHOD /path" 作为key，支持精确匹配
getLoading(path: string): boolean {
  return this.cache().find((x) => this.getRegexp(path).test(x)) != null;
}

getRegexp(url: string) {
  const urls = url.split(' ');
  if (urls.length === 1) {
    if (!urls[0].startsWith('/')) return new RegExp(`...`);
    urls.unshift('GET');
  }
  // 自动补全 /api/v1 前缀
  if (!urls[1].startsWith('/api/v1')) urls[1] = '/api/v1(/.*)?' + urls[1];
  return new RegExp(urls.join(' '));
}
```

**思考深度**：LoadingService支持 `"POST /api/v1/logs"` 格式的匹配，这比简单的URL匹配更精确——同一个URL的GET和POST可以有不同的loading状态。这种设计在表单提交场景下特别有用：列表加载中和提交中可以区分显示。

### 3.3 Web Worker并行解密 — 分治+有序合并

**设计决策**：大日志文件（数百MB）的RSA解密是CPU密集型操作，单线程会阻塞UI。采用Worker Pool分治 + 有序合并 + 流式输出的三阶段策略。

**阶段1：自适应分区**

```typescript
// 根据CPU核心数动态调整Worker数量
const hc = (navigator as any)?.hardwareConcurrency || 4;
this.poolSize = Math.min(3, Math.max(2, hc - 1));  // 2-3个Worker

// 首段较小，实现快速首屏渲染
private partitionTextForPool(src: string, parts: number) {
  const firstSlice = Math.min(2000, Math.ceil(total / (parts * 4)));
  const remaining = total - firstSlice;
  const per = Math.ceil(remaining / (parts - 1));
  // 首段2000行 → 快速展示
  // 其余均匀分配 → 并行处理
}
```

**阶段2：有序合并（Ordered Merge）**

```typescript
// 每个Worker处理一段，带seq序号
private handleChunk(seq: number, chunkText: string) {
  if (seq === this.expectedSeq) {
    // 顺序到达：直接输出
    this.decryptedLog.update((log) => log + (log ? '\n' : '') + chunkText);
    this.expectedSeq++;
    this.flushIfReady();  // 检查缓冲区中是否有后续seq
  } else {
    // 乱序到达：放入缓冲区等待
    this.segBuffers[seq].push(chunkText);
  }
}
```

**阶段3：流式输出**

```typescript
// 大日志(>=5000行)：前10%流式输出，后续批量
const LARGE_MIN_LINES = 5000;
const STREAM_FRACTION = 0.10;  // 先刷10%
const STREAM_LINES = 100;      // 每100行flush一次

// 小日志：全文一次性输出
```

**Worker解密的fallback链**：

```typescript
// 解压策略：先尝试带字典，再尝试无字典，最后Base64解码重试
const strategies = [
  () => unzlibSync(src, { dictionary }),     // zlib + 字典
  () => inflateSync(src, { dictionary }),    // inflate + 字典
  () => unzlibSync(src),                     // zlib 无字典
  () => inflateSync(src),                    // inflate 无字典
  () => {                                    // Base64解码后重试
    const decoded = atob(strFromU8(src));
    return unzlibSync(new Uint8Array([...decoded].map(c => c.charCodeAt(0))));
  },
];
```

**格式校验 `looksValid()`**：

```typescript
// 不是简单的"能解密就行"，而是验证解密结果是否像日志
function looksValid(text: string): boolean {
  const asciiRatio = text.split('').filter(c => c.charCodeAt(0) < 128).length / text.length;
  if (asciiRatio < 0.9) return false;  // ASCII比率 > 90%
  // 检查是否包含日志常见字段
  const logFields = ['"msg"', '"message"', '"level"', '"time"', '"ts"', '"logger"'];
  return logFields.some(f => text.includes(f)) || text.includes('=');
}
```

**思考深度**：
1. **为什么需要有序合并**：RSA解密是同步操作，但每个Worker处理的数据量不同，完成时间不同。如果不做有序合并，输出的日志行顺序会错乱，影响可读性。
2. **为什么首段要小**：用户打开日志时，快速看到前2000行比等待全部解密完成体验更好。
3. **为什么需要格式校验**：私钥不匹配时RSA解密不会报错，而是输出乱码。通过格式校验可以自动切换到正确的私钥。

### 3.4 自研表单系统 — 注册表+工厂模式

**设计决策**：系统中有大量表单（NF配置、用户管理、系统设置），需要统一的声明式定义方式，避免重复的模板代码。

**架构四层**：

```
FormBase<T> (抽象基类)
  │  定义: key, label, controlType, validators, span
  │  方法: toFormControl() → FormControl
  │
  ├── InputTextUnit, PasswordUnit, SelectUnit, ...
  │   每个子类设置 controlType 字符串
  │
  ▼
FormUnitRegistry (注册表)
  │  'input-text' → InputTextComponent
  │  'password'   → PasswordComponent
  │  'select'     → SelectComponent
  │  ... (9种控件)
  │
  ▼
FormUnit (动态渲染组件)
  │  component = registry.getFormUnit(fb.controlType)
  │  模板: <ng-container *ngComponentOutlet="component; inputs: formInput()"/>
  │
  ▼
AxyomForm (表单容器)
  │  接收 FormBase[] + FormGroup
  │  响应式布局 (span控制列宽)
  │  <app-form [fbs]="fbs" [form]="form" [span]="12"/>
```

**使用示例 — 声明式定义**：

```typescript
// nf-add.ts — 添加NF的表单定义
fbs = [
  new SelectUnit({
    key: 'Kind', label: 'Kind',
    options: [{ label: 'SMF', value: 'smf' }, { label: 'UPF', value: 'upf' }],
    required: true,
  }),
  new InputTextUnit({
    key: 'baseUrl', label: 'Base URL',
    placeholder: 'https://<service>.<namespace>.svc.cluster.local:<port>',
    required: true,
  }),
  new PrivateKeyUnit({ key: 'privateKey', label: 'Private Key', required: true }),
];
form = toForm<AddNF>(this.fbs);
```

**跨字段验证器 — 延迟订阅**：

```typescript
// equalTo: 当目标字段变化时，触发当前字段重新验证
export const equalTo = (fb: FormBase): ValidatorFn => {
  let subscribe = false;
  return (control: AbstractControl): ValidResult => {
    if (isEmptyInputValue(control.value)) return null;
    if (!subscribe) {
      subscribe = true;
      // 延迟订阅：只在首次验证时订阅，避免内存泄漏
      fb.control.valueChanges.subscribe(() => control.updateValueAndValidity());
    }
    return fb.control.value === control.value ? null : { equalTo: '...' };
  };
};
```

**思考深度**：
1. **为什么用注册表而不是switch/if-else**：注册表模式符合开闭原则，新增控件只需继承FormBase并注册，不需要修改渲染逻辑。
2. **为什么延迟订阅**：表单初始化时，验证器会被调用一次。如果此时就订阅valueChanges，会导致循环触发。延迟到首次验证后订阅，确保只订阅一次。
3. **为什么不用Formly等第三方库**：本项目的表单控件类型有限（9种），且需要深度定制（如PrivateKey控件的多PEM支持）。自研方案更轻量，且与PrimeNG组件深度集成。

### 3.5 装饰器缓存 — 透明代理模式

```typescript
// @StorageDecorator() — 重写static属性的getter/setter
export function StorageDecorator(parse = true) {
  return function (target: any, propertyKey: string) {
    const storageKey = propertyKey;
    Object.defineProperty(target, propertyKey, {
      get: () => {
        const value = localStorage.getItem(storageKey);
        return value ? (parse ? JSON.parse(value) : value) : null;
      },
      set: (newVal: any) => {
        localStorage.setItem(storageKey, JSON.stringify(newVal));
      },
    });
  };
}

// 使用 — 像普通属性一样读写，自动同步localStorage
export class CACHE {
  @StorageDecorator() static jwt: string | null = null;
  @StorageDecorator(true) static user_info: UserInfo | null = null;
}

// 调用方
CACHE.jwt = 'xxx';         // 自动 localStorage.setItem('jwt', '"xxx"')
const jwt = CACHE.jwt;     // 自动 JSON.parse(localStorage.getItem('jwt'))
```

**思考深度**：
1. **为什么用装饰器而不是普通函数**：装饰器语法让CACHE类的定义更简洁，属性声明即配置。调用方不需要知道localStorage的存在，降低了认知负担。
2. **为什么parse参数默认true**：localStorage只能存字符串，JSON.parse/stringify是必须的。对于已经是字符串的值（如jwt），设置parse=false避免双重序列化。
3. **为什么需要CACHE门面**：避免项目中散落的`localStorage.getItem('xxx')`调用，统一管理存储key和序列化逻辑。

### 3.6 StreamingService — Fetch API的Observable封装

```typescript
fetchStream(url: string, method: 'GET' | 'POST', body?: object): Observable<string> {
  return new Observable<string>((observer) => {
    const controller = new AbortController();
    fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      signal: controller.signal,
    }).then(async (response) => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { done, value } = await reader.read();
        if (done) { observer.complete(); break; }
        const buffer = decoder.decode(value, { stream: true });
        if (response.ok) observer.next(buffer);
        else observer.error(new Error(getErrorMessage(buffer).message));
      }
    });
    return () => controller.abort();  // unSubscribe时取消请求
  });
}
```

**思考深度**：
1. **为什么不用HttpClient + reportProgress**：HttpClient的reportProgress只支持下载进度，不支持流式读取内容。Fetch API的ReadableStream才能实现真正的流式接收。
2. **为什么用Observable封装**：与Angular的异步管道和takeUntilDestroyed等RxJS操作符无缝集成，组件中可以直接用`streamingService.fetchStream().subscribe()`或`| async`。
3. **TextDecoder的stream参数**：处理跨chunk的多字节字符（如中文），`stream: true`告诉decoder保留不完整的多字节序列到下次调用。

---

## 四、安全架构深度分析

### 4.1 认证体系 — JWT + JTI单点登录

```
┌─────────────────────────────────────────────────────────────┐
│                    认证流程                                   │
│                                                             │
│  1. 登录                                                     │
│     用户名/密码 → 后端验证 → 生成JWT(含JTI) → 返回Token       │
│                                │                             │
│                                ▼                             │
│                        JTI存入白名单(每个用户仅一个)           │
│                        旧JTI对应的WebSocket会话断开           │
│                                                             │
│  2. 请求拦截                                                 │
│     jwtInterceptor: 注入 Bearer Token                        │
│     authInterceptor: 401 → 清除Token → 跳转登录              │
│                                                             │
│  3. Token自动刷新                                            │
│     Auth.createTimer():                                      │
│       过期时间 - 当前时间 - 3分钟 = 首次刷新延迟               │
│       timer(delay).subscribe(() => refreshToken())           │
│       刷新后重新创建timer（循环）                              │
│                                                             │
│  4. 单点登录保障                                             │
│     新登录 → 后端替换JTI → 旧会话的JTI失效                    │
│     旧会话下次请求 → auth中间件 → JTI不在白名单 → 401          │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 审计日志加密 — HKDF + AES-256-GCM

```
┌─────────────────────────────────────────────────────────────┐
│                    加密写入流程                               │
│                                                             │
│  HTTP请求 → AuditMiddleware                                 │
│              │                                               │
│              ▼                                               │
│         ResponseCapture (捕获响应)                            │
│              │                                               │
│              ▼                                               │
│         logChan (buffer=1000) ← 异步channel                  │
│              │                                               │
│              ▼                                               │
│         goroutine消费                                        │
│              │                                               │
│              ├─→ HKDF密钥派生                                │
│              │   hkdf.New(sha256.New, ikm, salt, nil)        │
│              │   → 32字节AES-256密钥                         │
│              │                                               │
│              ├─→ AES-256-GCM加密                             │
│              │   每行独立加密 + Base64编码                     │
│              │                                               │
│              ├─→ 文件轮转检查                                │
│              │   大小(maxFileSizeMB) || 时长(maxFileDuration) │
│              │                                               │
│              └─→ tar.gz压缩 + 保留期清理                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    读取解密流程                               │
│                                                             │
│  读取请求 → AuditHandler                                     │
│              │                                               │
│              ├─→ 读取tar.gz文件                              │
│              ├─→ gunzip解压                                  │
│              ├─→ HKDF派生相同密钥                            │
│              ├─→ 逐行Base64解码 → AES-GCM解密               │
│              └─→ 返回明文审计日志                            │
└─────────────────────────────────────────────────────────────┘
```

**为什么选择HKDF而不是直接使用密码**：
- HKDF是密钥派生函数，输出的密钥具有均匀的随机性
- 支持salt参数，即使同一个密码，不同salt生成不同密钥
- NIST推荐的密钥派生方案，符合FIPS标准

**为什么选择AES-GCM而不是CBC**：
- GCM提供认证加密（Authenticated Encryption），同时保证机密性和完整性
- CBC需要额外的MAC验证，且存在padding oracle攻击风险
- GCM支持并行加密，性能更优

### 4.3 防暴力破解 — 三层防护

```
┌─────────────────────────────────────────────────────────────┐
│  第1层: 前端验证                                             │
│  ├── 用户名/密码最大64字符                                   │
│  ├── 必填校验                                               │
│  └── 提交按钮loading状态防止重复点击                         │
│                                                             │
│  第2层: 后端防护                                             │
│  ├── 连续3次失败 → 自动锁定30分钟                           │
│  ├── 时序攻击防护: 不存在的用户名使用dummyPasswordHash        │
│  │   (相同计算时间，避免用户名枚举)                           │
│  └── 密码bcrypt哈希存储                                      │
│                                                             │
│  第3层: 传输安全                                             │
│  ├── HTTPS/TLS加密传输                                      │
│  └── JWT Token有过期时间                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 五、性能工程

### 5.1 Zoneless变更检测

```typescript
// app.config.ts
provideZonelessChangeDetection(),  // 完全移除Zone.js
```

**性能收益**：
- **减少内存占用**：Zone.js需要为每个异步操作创建proxy，Zoneless完全消除这个开销
- **更精确的变更检测**：Signal值变化只触发依赖它的组件更新，而不是整个组件树
- **更快的初始渲染**：不需要Zone.js的polyfill和初始化

### 5.2 ESLint强制性能规则

```javascript
// eslint.config.js
"@angular-eslint/prefer-signals": "error",           // 强制使用Signals
"@angular-eslint/template/use-track-by-function": "warn",  // 强制trackBy
"max-lines": ["error", 500],                          // 文件最大500行
complexity: ["error", 20],                             // 圈复杂度<=20
```

### 5.3 构建预算

```json
// angular.json
"budgets": [
  { "type": "initial", "maximumWarning": "2MB", "maximumError": "4MB" },
  { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }
]
```

### 5.4 数据轮询优化

| 策略 | 实现 | 效果 |
|------|------|------|
| **switchMap取消** | 新请求自动取消旧请求 | 避免请求堆积 |
| **startWith(0)** | 首次立即请求 | 无需等待30秒 |
| **手动刷新合并** | `merge(interval, refresh$)` | 刷新按钮与轮询统一处理 |
| **takeUntilDestroyed** | 组件销毁自动取消 | 避免内存泄漏 |
| **selectedUpdate** | 刷新时保持选中状态 | 用户体验不中断 |

### 5.5 Web Worker性能

| 优化点 | 实现 | 效果 |
|--------|------|------|
| **自适应池大小** | `Math.min(3, Math.max(2, hc-1))` | 适配不同硬件 |
| **首段小分区** | 首段2000行或total/(parts*4) | 快速首屏渲染 |
| **流式输出** | 大文件前10%流式 + yield控制 | 避免UI冻结 |
| **多私钥自动选择** | 首次尝试后记住正确索引 | 减少重复解密 |

---

## 六、可维护性设计

### 6.1 代码组织原则

```
frontend/src/app/
├── core/          # 全局单例，不依赖任何页面
│   ├── api/       # 每个领域一个Service
│   ├── form/      # 自研表单系统
│   ├── guard/     # 路由守卫
│   ├── interceptor/ # HTTP拦截器
│   ├── service/   # 核心服务
│   └── utils/     # 工具函数
├── layout/        # 布局组件（独立于页面）
├── pages/         # 功能页面（全部懒加载）
├── share/         # 共享组件（被多个页面使用）
└── mock/          # Mock系统（仅开发环境）
```

**设计原则**：
- **core不依赖pages**：核心层不依赖任何业务页面
- **share不依赖core**：共享组件只依赖core，不依赖具体页面
- **pages依赖core和share**：页面是最高层，可以依赖所有下层

### 6.2 API层统一模式

```typescript
// 所有API Service遵循相同模式
@Injectable({ providedIn: 'root' })
export class XxxApi {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/v1/xxx';

  // 统一错误降级
  getXxx(): Observable<Xxx[]> {
    return this.http.get<Xxx[] | null>(this.url).pipe(
      catchError(() => of([])),        // 失败返回空数组
      map((data) => data == null ? [] : data),  // null也变空数组
    );
  }
}
```

**为什么catchError返回空数组而不是undefined**：
- 模板中可以安全使用 `@for (item of data; track item.id)` 而不需要空判断
- 避免 `Cannot read property 'xxx' of undefined` 错误
- 所有页面的数据获取逻辑一致，降低认知负担

### 6.3 自定义验证器的可组合性

```typescript
// 验证器是纯函数，可以自由组合
fbs = [
  new DatePickerUnit({
    key: 'start_date',
    valid: [laterTo(endDateFb)],  // 必须早于结束日期
  }),
  new DatePickerUnit({
    key: 'end_date',
    valid: [laterTo(startDateFb, 'yyyy-MM-dd', true)],  // 必须晚于开始日期（允许相等）
  }),
];
```

---

## 七、面试深度问题

### Q1: 为什么选择Zoneless而不是传统Zone.js？

**考察点**：对Angular新特性的理解深度

> **回答要点**：
> 1. Zone.js的问题：为每个异步操作创建proxy，内存开销大；变更检测粒度粗（整个组件树）
> 2. Zoneless的优势：Signal值变化只触发依赖组件更新；无polyfill开销；与Angular新特性（input/output/viewChild）原生集成
> 3. 迁移成本：本项目从一开始就使用Zoneless，没有历史包袱
> 4. ESLint强制：`prefer-signals: error` 确保团队一致使用Signals

### Q2: Web Worker有序合并在什么场景下会出问题？

**考察点**：对并发编程的深入理解

> **回答要点**：
> 1. **Worker崩溃**：如果某个Worker崩溃，expectedSeq会卡住。解决方案：设置超时，超时后跳过该段
> 2. **内存溢出**：segBuffers可能积累大量未合并数据。解决方案：设置缓冲区上限
> 3. **私钥全部失败**：如果所有私钥都不匹配，Worker返回null。解决方案：降级到后端解密
> 4. **实际处理**：本项目通过 `looksValid()` 格式校验提前发现解密失败，自动切换私钥

### Q3: 如果NF数量从10个扩展到1000个，系统需要哪些优化？

**考察点**：可扩展性思维

> **回答要点**：
> 1. **轮询优化**：30秒全量轮询1000个NF会产生大量请求。改为WebSocket推送或增量更新
> 2. **前端渲染**：1000个NF的列表需要虚拟滚动（Virtual Scroll），PrimeNG的Table已经支持
> 3. **Worker池**：1000个NF的日志解密需要更大的Worker池，可能需要任务队列
> 4. **后端防抖**：sync.Map + 3秒防抖需要更精细的并发控制，可能需要分布式锁
> 5. **审计日志**：1000个NF的操作审计量会大幅增加，需要考虑日志分片和归档策略

### Q4: 为什么用Fetch API而不是HttpClient实现流式请求？

**考察点**：对HTTP协议和浏览器API的理解

> **回答要点**：
> 1. HttpClient的 `reportProgress` 只报告下载进度，不提供内容流
> 2. Fetch API的 `ReadableStream` 可以逐块读取响应体
> 3. `TextDecoder({ stream: true })` 处理跨chunk的多字节字符
> 4. `AbortController` 支持请求取消，与Observable的unsubscribe语义一致
> 5. 缺点：Fetch API不支持拦截器链，需要手动注入JWT Token

### Q5: 装饰器缓存相比ngx-store等库的优势？

**考察点**：技术选型能力

> **回答要点**：
> 1. **零依赖**：本项目的缓存需求简单（6个key），不需要引入整个状态管理库
> 2. **类型安全**：装饰器 + TypeScript，CACHE.jwt的类型是 `string | null`，编译时检查
> 3. **透明代理**：调用方像使用普通属性一样读写，不需要 `.getItem()` / `.setItem()` 样板代码
> 4. **可测试性**：CACHE类可以被mock或替换
> 5. **团队认知负担**：比引入新库更容易理解和维护

### Q6: 如何保证审计日志的不可篡改性？

**考察点**：安全架构思维

> **回答要点**：
> 1. **AES-GCM认证加密**：GCM模式生成认证标签（authentication tag），任何篡改都会导致解密失败
> 2. **每行独立加密**：无法替换或删除单行而不破坏整体一致性
> 3. **tar.gz压缩**：压缩后文件结构更紧凑，篡改更容易被发现
> 4. **保留期管理**：过期日志自动清理，避免长期存储的安全风险
> 5. **S3外部备份**：备份文件存储在S3，具有版本控制和访问日志

### Q7: 项目中有哪些设计模式？为什么选择这些模式？

**考察点**：设计模式理解

> **回答要点**：
> 1. **职责链模式**（拦截器链）：每个拦截器只关注一个横切关注点，可独立配置和测试
> 2. **注册表模式**（表单控件）：字符串→组件映射，符合开闭原则
> 3. **工厂模式**（toForm函数）：FormBase[] → FormGroup的转换隐藏了创建细节
> 4. **装饰器模式**（StorageDecorator）：透明代理localStorage，不修改原有接口
> 5. **观察者模式**（BehaviorSubject/Signal）：响应式数据流，自动同步UI
> 6. **模板方法模式**（FormBase）：基类定义骨架，子类设置controlType

### Q8: 如果让你重新设计这个系统，你会做什么不同的决策？

**考察点**：架构反思能力

> **回答要点**：
> 1. **WebSocket替代轮询**：NF状态变化应该是事件驱动的，而不是30秒轮询
> 2. **引入微前端**：如果团队扩大，可以按领域拆分为独立的微前端应用
> 3. **E2E测试**：当前没有测试，应该补充Cypress或Playwright的E2E测试
> 4. **SSR/SSG**：如果SEO有需求，可以考虑Angular Universal
> 5. **国际化**：当前硬编码英文，应该在项目初期就引入i18n

---

## 八、技术体系总结

```
┌─────────────────────────────────────────────────────────────────┐
│                        技术体系全景                               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  前沿技术应用                                               │  │
│  │  Angular 20 Zoneless · Signals · Standalone · View Transitions│
│  │  TypeScript 5.9 strict · Tailwind CSS 4 · esbuild         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  架构设计能力                                               │  │
│  │  职责链(拦截器) · 注册表(表单) · 工厂(toForm) · 装饰器(缓存)│  │
│  │  观察者(Signal) · 模板方法(FormBase) · 策略模式(解密fallback)│  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  性能工程                                                   │  │
│  │  Zoneless零开销 · Signal精确更新 · Web Worker并行解密       │  │
│  │  流式渲染 · switchMap取消 · Build Budget · 100%懒加载       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  安全架构                                                   │  │
│  │  JWT+JTI单点登录 · RBAC权限 · HKDF+AES-GCM加密            │  │
│  │  bcrypt哈希 · 时序攻击防护 · 自动锁定/解锁                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  代码质量                                                   │  │
│  │  ESLint 500行限制 · 圈复杂度20 · Prettier · Husky          │  │
│  │  TypeScript strict · Angular strictTemplates               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  工程化                                                     │  │
│  │  前后端分离 · Docker多阶段构建 · K8s Helm部署               │  │
│  │  GitLab CI · Prometheus监控 · Mock系统                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 九、面试话术模板

### 开场（1分钟）

> "这个项目是一个5G核心网元的运维管理系统，我负责整个前端架构设计和核心功能开发。技术栈是Angular 20 + Go，采用Zoneless + Signals的全新架构，实现了网元管理、配置备份、操作审计、实时监控等功能。"

### 技术深度（2-3分钟）

> "项目有几个比较有技术深度的点：
> 
> 第一是**Web Worker并行解密**。NF日志是RSA加密的，单个文件可能有几百MB。我设计了Worker Pool方案，根据CPU核心数动态创建2-3个Worker并行解密，通过有序合并保证输出顺序，大文件采用流式输出避免UI冻结。
> 
> 第二是**自研表单系统**。系统中有大量表单，我用注册表模式设计了一个声明式表单框架，支持9种控件类型，通过FormBase抽象类和NgComponentOutlet动态渲染，新增控件只需要继承并注册。
> 
> 第三是**审计日志加密存储**。使用HKDF派生AES-256密钥，每行独立加密后存储，支持异步channel写入和tar.gz轮转压缩。"

### 架构思维（1-2分钟）

> "在架构设计上，我遵循几个原则：
> 
> 一是**职责分离**：拦截器链将认证、错误处理、Loading追踪分离到独立的函数式拦截器中。
> 
> 二是**可扩展性**：表单系统用注册表模式，环境配置通过environment注入Mock拦截器，都是为了让系统更容易扩展。
> 
> 三是**代码质量**：ESLint配置了500行文件限制和圈复杂度20，TypeScript开启strict模式，确保代码可维护。"

### 反思与改进（1分钟）

> "如果重新设计，我会考虑用WebSocket替代轮询来获取NF状态变化，这样更实时也更节省资源。另外项目目前没有E2E测试，这是一个可以改进的点。"

---

## 十、Go后端架构深度分析

### 10.1 后端模块架构

```
backend/
├── cmd/main.go                    # 入口：中间件注册 + 路由挂载
├── pkg/
│   ├── router.go                  # 全局路由注册
│   ├── auth/                      # 认证模块
│   │   ├── auth_handler.go        # 登录/登出/刷新Token
│   │   ├── auth_middleware.go      # JWT鉴权中间件
│   │   ├── rbac_middleware.go      # RBAC角色中间件
│   │   └── dependencies.go        # 审计日志接口（解耦依赖）
│   ├── db/                        # 数据持久化
│   │   ├── oam_data.go            # OAM数据模型
│   │   ├── oam_data_handler.go    # 加密读写/初始化/恢复
│   │   ├── nf_data_handler.go     # NF CRUD + JWT管理
│   │   ├── user_data_handler.go   # User CRUD + 锁定/解锁
│   │   └── whitelist_data_handler.go # JTI白名单/登录失败追踪
│   ├── auditlog/                  # 审计日志模块
│   │   ├── mgr.go                 # 异步写入/轮转/清理管理器
│   │   ├── middleware.go          # 请求拦截 + 响应捕获
│   │   ├── handler.go             # 读取/解密/恢复
│   │   ├── event_types.go         # 40+审计事件类型定义
│   │   └── model.go               # AuditLog数据模型
│   ├── nf/                        # 网元管理模块
│   │   ├── nfmgmt/
│   │   │   ├── nf_list_handler.go # NF CRUD + Echo状态检测
│   │   │   ├── log_handler.go     # NF日志解密（RSA + Flate）
│   │   │   ├── backup_handler.go  # NF备份/恢复
│   │   │   └── ...
│   │   └── util/
│   │       ├── nf_jwt.go          # NF JWT生成（RS256）
│   │       ├── nf_tls.go          # mTLS客户端配置
│   │       └── secure_http_client.go # NF安全HTTP代理
│   ├── externalstorage/           # S3外部存储模块
│   │   ├── mgr.go                 # 周期性备份管理器
│   │   ├── backup.go              # 备份压缩/恢复/解压
│   │   ├── s3_operation.go        # S3上传/下载/删除
│   │   └── alarm.go               # 备份告警
│   ├── localha/                   # 高可用模块
│   │   ├── handler.go             # K8s Leader Election
│   │   └── k8s_operation.go       # K8s权限检查
│   ├── metrics/                   # 监控模块
│   │   ├── mgr.go                 # Prometheus HTTP Server
│   │   └── stats.go               # 9个指标定义
│   ├── sysconfig/                 # 系统配置模块
│   │   ├── yaml_config_handler.go # YAML配置 + 动态回调
│   │   └── page_config_handler.go # 前端可配置参数
│   └── util/
│       ├── aes_gcm_util.go        # AES-256-GCM加解密
│       └── gin_util.go            # 统一响应格式
└── init-data/
    └── oam-data.json              # 加密的初始OAM数据
```

### 10.2 中间件链设计

```go
// main.go — 中间件执行顺序
gin.Default()
  → gin.CustomRecovery()              // 1. Panic恢复（最外层）
  → auditlog.LogMiddleware()          // 2. 全局审计拦截
  → auditlog.ResponseCaptureMiddleware() // 3. 响应捕获
  → static.Serve()                   // 4. 静态文件服务
  → pkg.RegisterRouters()            // 5. 路由注册（含各模块中间件）
```

**路由级中间件**：

```
/api/v1/auth/*        → 无鉴权（登录/刷新）
/api/v1/*             → AuthMiddleware() → RBACMiddleware()
/api/v1/network-functions/* → AuthMiddleware() → RBACMiddleware()
/api/v1/users/*       → AuthMiddleware() → RBACMiddleware(Admin)
/api/v1/audit/*       → AuthMiddleware() → RBACMiddleware(Admin)
```

### 10.3 数据持久化 — 加密JSON文件

**设计决策**：不使用关系型数据库，而是将所有数据存储在加密的JSON文件中。

```go
// oam_data_handler.go — 加密写入
func SaveOAMData(data *OAMData) error {
    jsonData, _ := json.Marshal(data)
    encrypted, _ := aesgcm.Encrypt(jsonData, encryptionKey)
    return os.WriteFile(oamDataPath, encrypted, 0600)
}

// oam_data_handler.go — 解密读取
func LoadOAMData() (*OAMData, error) {
    encrypted, _ := os.ReadFile(oamDataPath)
    decrypted, _ := aesgcm.Decrypt(encrypted, encryptionKey)
    var data OAMData
    json.Unmarshal(decrypted, &data)
    return &data, nil
}
```

**为什么选择文件而不是数据库**：
- 部署环境是K8s + PVC，NFS存储已经是持久化的
- 数据量有限（网元数、用户数不会太多）
- 避免引入数据库依赖，降低运维复杂度
- 加密存储满足安全合规要求

### 10.4 NF安全通信 — mTLS + RS256

```
┌─────────────────────────────────────────────────────────────┐
│                    NF通信安全架构                              │
│                                                             │
│  LI-OAM Backend                                             │
│  │                                                          │
│  ├─→ nf_jwt.go: 生成RS256 JWT（NF专用令牌）                 │
│  │   使用RSA私钥签名，NF用公钥验证                           │
│  │                                                          │
│  ├─→ nf_tls.go: mTLS客户端配置                              │
│  │   加载CA证书 + 客户端证书 + 客户端密钥                    │
│  │                                                          │
│  ├─→ secure_http_client.go:                                │
│  │   验证NF URL必须是HTTPS                                  │
│  │   配置mTLS + 自定义CA + Hostname验证                     │
│  │                                                          │
│  └─→ HTTP/2代理转发请求到NF                                 │
│                                                             │
│  5G NF (SMF/UPF)                                            │
│  │                                                          │
│  └─→ 验证RS256 JWT + mTLS双向认证                           │
└─────────────────────────────────────────────────────────────┘
```

### 10.5 高可用 — K8s Leader Election

```go
// localha/handler.go — Leader Election
func StartLeaderElection(ctx context.Context, k8sClient kubernetes.Interface, ...) {
    leaderElection := &leaderelection.LeaderElectionConfig{
        Lock:          &resourcelock.LeaseLock{...},
        LeaseDuration: 5 * time.Second,   // 续约期限
        RetryPeriod:   2 * time.Second,   // 重试间隔
        Callbacks: leaderelection.LeaderCallbacks{
            OnStartedLeading: func(ctx context.Context) {
                // 成为Master，启动所有服务
                startAllServices(ctx)
            },
            OnStoppedLeading: func() {
                // 失去Master身份，停止服务
                stopAllServices()
            },
        },
    }
    go leaderElection.Run(ctx)
}
```

**双副本部署**：
- 2个Pod通过K8s Lease资源进行Leader Election
- Master Pod运行所有服务，Slave Pod待命
- Master故障时，Slave在5秒内接管
- Service的selector包含 `election-identifier: "unknown"`，确保流量只路由到Master

### 10.6 配置管理 — 两层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    两层配置架构                               │
│                                                             │
│  第1层: YAML配置 (ConfigMap分发)                             │
│  ├── sys-config.json: S3/NF/HA配置                          │
│  ├── 通过环境变量 NAMESPACE 加载                             │
│  ├── fsnotify监听文件变更 → 动态重建S3客户端                 │
│  └── 适用于: 基础设施配置，不需要前端修改                     │
│                                                             │
│  第2层: Page配置 (PVC持久化)                                 │
│  ├── maxFileSizeMB / maxFileDuration / maxFileAgeToDelete    │
│  ├── tokenExpiredTimeHours / storePrivateKey                │
│  ├── 通过前端系统设置页面修改                                │
│  ├── 通过API读写，后端落盘到PVC                              │
│  └── 适用于: 业务配置，需要管理员动态调整                     │
└─────────────────────────────────────────────────────────────┘
```

### 10.7 配置热更新 — fsnotify

```go
// s3_operation.go — 监听AWS凭证/CA证书变更
watcher, _ := fsnotify.NewWatcher()
watcher.Add(awsCredentialsPath)
watcher.Add(caCertPath)

go func() {
    for event := range watcher.Events {
        if event.Op&fsnotify.Write == fsnotify.Write {
            // 文件变更 → 重建S3客户端
            rebuildS3Client()
        }
    }
}()
```

---

## 十一、部署架构深度分析

### 11.1 Docker多阶段构建

```dockerfile
# 阶段1: 前端构建
FROM node:24-alpine AS frontend
COPY frontend .
RUN npm install && npm run build
RUN mv dist/li-oam/browser dist/axyom

# 阶段2: 后端构建
FROM golang:1.26 AS backend
COPY backend/ .
RUN CGO_ENABLED=0 go build -o backend

# 阶段3: 生产镜像
FROM alpine:3.23 AS prod
COPY --from=frontend /deploy/frontend/dist/axyom /var/www/axyom
COPY --from=backend /app/backend /backend
COPY nentry.sh /
ENTRYPOINT ["/nentry.sh"]
```

**构建优化**：
- 前端和后端并行构建（Docker BuildKit自动并行）
- 最终镜像基于Alpine，体积小（约50MB）
- 静态文件由Go后端直接serve，不需要Nginx
- CGO_ENABLED=0 静态编译，无动态链接依赖

### 11.2 Kubernetes部署架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    K8s集群部署架构                               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Namespace: oam                                         │   │
│  │                                                         │   │
│  │  ┌───────────────────────┐  ┌───────────────────────┐  │   │
│  │  │  Deployment           │  │  Service              │  │   │
│  │  │  axyom-li-oam         │  │  web-access-oam-backend│  │   │
│  │  │  replicas: 2          │→│  port: 80 → 8080       │  │   │
│  │  │  ┌──────┐ ┌──────┐   │  └───────────────────────┘  │   │
│  │  │  │Pod 0 │ │Pod 1 │   │                              │   │
│  │  │  │Master│ │Slave │   │  ┌───────────────────────┐  │   │
│  │  │  └──────┘ └──────┘   │  │  Route (OpenShift)    │  │   │
│  │  └───────────────────────┘  │  TLS: passthrough     │  │   │
│  │                             │  → web-access-oam     │  │   │
│  │  ┌───────────────────────┐  └───────────────────────┘  │   │
│  │  │  PVC                 │                               │   │
│  │  │  lioam-pvc (5Gi)     │  ┌───────────────────────┐  │   │
│  │  │  NFS storage class   │  │  Metrics Service      │  │   │
│  │  │  ReadWriteMany       │  │  port: 80 → 8081      │  │   │
│  │  └───────────────────────┘  └───────────────────────┘  │   │
│  │                                                         │   │
│  │  ┌───────────────────────┐  ┌───────────────────────┐  │   │
│  │  │  ServiceAccount       │  │  Role + RoleBinding   │  │   │
│  │  │  axyom-li-oam         │  │  leases/pods/services │  │   │
│  │  │  + imagePullSecrets   │  │  get/update/patch     │  │   │
│  │  └───────────────────────┘  └───────────────────────┘  │   │
│  │                                                         │   │
│  │  ┌───────────────────────┐  ┌───────────────────────┐  │   │
│  │  │  ConfigMap            │  │  Secrets (3个)        │  │   │
│  │  │  sys-config.json      │  │  frontend-tls         │  │   │
│  │  │                       │  │  s3-tls               │  │   │
│  │  │                       │  │  nf-tls               │  │   │
│  │  │                       │  │  aws-keys             │  │   │
│  │  └───────────────────────┘  └───────────────────────┘  │   │
│  │                                                         │   │
│  │  ┌───────────────────────┐                              │   │
│  │  │  Istio ServiceAccount │                              │   │
│  │  │  axyom-lioam-nf       │  NF通信的ServiceAccount     │   │
│  │  │  axyom-lioam-s3       │  S3通信的ServiceAccount     │   │
│  │  │  axyom-lioam-frontend │  前端的ServiceAccount       │   │
│  │  └───────────────────────┘                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 11.3 安全架构 — Istio mTLS

```
┌─────────────────────────────────────────────────────────────┐
│                    三套TLS证书体系                            │
│                                                             │
│  1. Frontend TLS (Istio签发)                                │
│     ├── 用途: 前端HTTPS访问                                  │
│     ├── 证书: cert-chain.pem + key.pem                      │
│     ├── CA: root-cert.pem                                   │
│     └── Route: passthrough termination                      │
│                                                             │
│  2. S3 TLS (Istio签发)                                      │
│     ├── 用途: 后端与S3存储通信                               │
│     ├── CA: root-cert.pem (挂载到/etc/secrets/s3)           │
│     └── 支持自定义CA + DualStack                             │
│                                                             │
│  3. NF TLS (Istio签发)                                      │
│     ├── 用途: 后端与5G网元通信                               │
│     ├── 客户端证书: client.crt + client.key                  │
│     ├── CA: root-cert.pem                                   │
│     └── mTLS双向认证                                        │
└─────────────────────────────────────────────────────────────┘
```

### 11.4 Helm Chart价值

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `replicas` | 2 | 双副本高可用 |
| `persistence.size` | 5Gi | NFS持久化存储 |
| `sysConfig.s3Storage.endpoint` | minio地址 | S3兼容存储 |
| `sysConfig.nfConfig.httpTimeoutSec` | 30 | NF请求超时 |
| `secret.frontendTls.enabled` | true | 前端TLS |
| `secret.nfTls.enabled` | true | NF mTLS |
| `serviceMonitor.enabled` | false | Prometheus监控 |
| `route.enabled` | true | OpenShift Route |
| `istioServiceAccounts.create` | true | Istio SA |
| `ipDualStack.enabled` | false | IPv4/IPv6双栈 |

---

## 十二、CI/CD与工程化

### 12.1 GitLab CI流水线

```yaml
# .gitlab-ci.yml
include:
  - project: devops/gitlab-ci
    file: templates/AutoDevOps.gitlab-ci.yml

# Helm Chart打包（手动触发）
li-oam-chart:
  stage: release
  script:
    - helm package $LI_OAM_CHART_DIR
    - jf rt u ... helm-local/li-oam/li-oam-${VERSION}.tgz
  when: manual          # 手动触发
  only: [master, main]  # 仅主分支
  allow_failure: true   # 允许失败
  retry:
    max: 2
    when: runner_system_failure
```

**流水线阶段**：

```
Code Push → Build → Test → Scan → Package → Release (manual)
                                    │
                                    ├─→ Docker Build (多阶段)
                                    ├─→ Helm Package
                                    └─→ JFrog Artifactory上传
```

### 12.2 前端工程化

| 工具 | 配置 | 作用 |
|------|------|------|
| **ESLint** | `max-lines: 500`, `complexity: 20` | 代码质量门禁 |
| **Prettier** | 统一格式化 | 代码风格一致 |
| **Husky** | pre-commit hook | 提交前自动lint |
| **lint-staged** | `src/**/*.{html,ts}` | 只检查暂存文件 |
| **TypeScript** | `strict: true` | 类型安全 |
| **Angular ESLint** | `prefer-signals: error` | 强制使用Signals |
| **模板规则** | `prefer-control-flow: error` | 强制@if/@for |
| **属性顺序** | `attributes-order: error` | 模板属性排序 |

### 12.3 Mock系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    开发环境Mock系统                           │
│                                                             │
│  environment.development.ts                                 │
│  └─→ interceptor: [mockInterceptor]                         │
│                                                             │
│  mock.interceptor.ts                                        │
│  ├── 匹配规则: URL + Method                                 │
│  ├── 延迟: 3000ms (模拟网络延迟)                             │
│  ├── 错误率: 可配置 (模拟502等错误)                          │
│  └── 返回: 预设的JSON数据                                   │
│                                                             │
│  mock/data/                                                 │
│  ├── _audit.ts        审计日志mock数据                       │
│  ├── _backup.ts       备份mock数据                           │
│  ├── _config.ts       配置mock数据                           │
│  ├── _connect-status.ts 连接状态mock数据                     │
│  ├── _metric.ts       指标mock数据                           │
│  ├── _network-function.ts NF mock数据                       │
│  ├── _users.ts        用户mock数据                           │
│  └── li.db.ts         统一mock规则注册                       │
│                                                             │
│  特点:                                                       │
│  ├── 生产环境零开销 (environment.ts interceptor: [])         │
│  ├── 开发环境独立运行，不依赖后端                             │
│  └── 支持延迟和随机错误，模拟真实网络环境                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 十三、架构决策记录 (ADR)

### ADR-001: 选择Zoneless Angular 20

**状态**: 已采纳

**背景**: 项目启动时Angular 20刚发布，Zoneless是全新特性。

**决策**: 从项目初期就使用Zoneless + Signals，不引入Zone.js。

**理由**:
- Zone.js为每个异步操作创建proxy，内存开销大
- Signal提供更精确的变更检测粒度
- Angular官方推荐的方向，社区支持好
- ESLint规则 `prefer-signals: error` 确保团队一致

**后果**: 需要团队学习新的响应式模式，但长期维护成本更低。

### ADR-002: 不引入NgRx

**状态**: 已采纳

**背景**: 考虑过NgRx、Akita等状态管理库。

**决策**: 使用Signals + RxJS BehaviorSubject混合方案。

**理由**:
- 项目状态相对简单，不需要NgRx的全套概念（Store/Action/Reducer/Effect）
- Signals处理组件级状态，BehaviorSubject处理异步数据流
- 减少依赖，降低bundle体积
- 更低的学习曲线

**后果**: 没有统一的状态管理规范，需要团队约定使用模式。

### ADR-003: 加密JSON文件替代数据库

**状态**: 已采纳

**背景**: 部署环境是K8s + NFS PVC，数据量有限。

**决策**: 所有数据存储在AES-256-GCM加密的JSON文件中。

**理由**:
- 避免引入数据库依赖（MySQL/PostgreSQL），降低运维复杂度
- NFS PVC已经提供持久化和ReadWriteMany
- 数据量有限（网元数、用户数不会太多）
- 加密存储满足安全合规要求

**后果**: 不支持高并发写入，但运维场景写入频率低，可以接受。

### ADR-004: Web Worker并行解密

**状态**: 已采纳

**背景**: RSA解密是CPU密集型操作，大文件会阻塞UI。

**决策**: 使用Worker Pool并行解密 + 有序合并 + 流式输出。

**理由**:
- 主线程解密会导致UI冻结
- Worker Pool利用多核CPU，解密速度提升2-3倍
- 有序合并保证输出顺序
- 流式输出提供更好的用户体验

**后果**: 增加了代码复杂度，但性能收益显著。

### ADR-005: 前后端一体部署

**状态**: 已采纳

**背景**: 考虑过前后端分离部署（前端CDN + 后端独立服务）。

**决策**: Docker多阶段构建，Go后端直接serve前端静态文件。

**理由**:
- 简化部署架构，只需要一个K8s Deployment
- 避免CORS配置
- 静态文件由Go的`gin-contrib/static`中间件处理
- 减少网络跳数，降低延迟

**后果**: 前端更新需要重新构建整个镜像，但CI/CD自动化后影响不大。

---

## 十四、扩展面试问题

### Q9: 为什么选择加密JSON文件而不是数据库？

**考察点**：技术选型权衡

> **回答要点**：
> 1. **部署环境**：K8s + NFS PVC，存储层已经解决持久化
> 2. **数据量**：网元数、用户数有限，不需要数据库的索引和查询能力
> 3. **运维复杂度**：少一个数据库组件，降低故障点
> 4. **安全合规**：AES-256-GCM加密存储，满足审计要求
> 5. **trade-off**：不支持高并发写入，但运维场景写入频率低

### Q10: K8s Leader Election的工作原理？

**考察点**：分布式系统理解

> **回答要点**：
> 1. **Lease资源**：K8s的coordination.k8s.io/v1 Lease，包含holderIdentity和renewTime
> 2. **续约机制**：Master每2秒续约，5秒未续约则lease过期
> 3. **竞选流程**：两个Pod同时尝试创建/更新 Lease，成功者成为Master
> 4. **故障转移**：Master Pod消失后，Slave在5秒内检测到lease过期并接管
> 5. **流量切换**：Service selector包含election-identifier，确保只路由到Master

### Q11: mTLS在项目中的应用场景？

**考察点**：网络安全理解

> **回答要点**：
> 1. **NF通信**：后端与5G网元之间的通信，使用客户端证书+服务端证书双向验证
> 2. **S3通信**：后端与S3存储之间的通信，使用CA证书验证
> 3. **Istio集成**：证书由Istio CA签发，通过ServiceAccount挂载
> 4. **证书轮转**：Istio自动轮转证书，无需人工干预
> 5. **Passthrough Route**：OpenShift Route使用passthrough，TLS在Pod内终结

### Q12: 如何保证审计日志的不可篡改性？

**考察点**：安全架构思维

> **回答要点**：
> 1. **AES-GCM认证加密**：GCM模式生成认证标签，任何篡改导致解密失败
> 2. **每行独立加密**：无法替换或删除单行而不破坏整体一致性
> 3. **tar.gz压缩**：压缩后文件结构更紧凑，篡改更容易被发现
> 4. **保留期管理**：过期日志自动清理，避免长期存储的安全风险
> 5. **S3外部备份**：备份文件存储在S3，具有版本控制和访问日志

### Q13: Docker多阶段构建的优势？

**考察点**：DevOps实践

> **回答要点**：
> 1. **并行构建**：Docker BuildKit自动并行构建前端和后端阶段
> 2. **镜像瘦身**：最终镜像只包含编译产物，不包含源码和依赖
> 3. **安全性**：不包含Node.js/Go运行时，减少攻击面
> 4. **缓存优化**：每个阶段独立缓存，npm install和go mod download可以复用
> 5. **CGO_ENABLED=0**：静态编译，无动态链接依赖，Alpine镜像即可运行

### Q14: fsnotify配置热更新的实现？

**考察点**：运维自动化

> **回答要点**：
> 1. **监听目标**：AWS凭证文件和CA证书文件
> 2. **触发条件**：fsnotify监听Write事件
> 3. **处理逻辑**：重建S3客户端，使用新凭证/证书
> 4. **使用场景**：Istio自动轮转证书时，后端自动感知并更新
> 5. **容错**：重建失败时保持旧客户端，不影响现有服务

### Q15: 项目中有哪些设计模式？如何选择？

**考察点**：设计模式理解

> **回答要点**：
> 1. **职责链**（拦截器链）：每个拦截器只关注一个横切关注点
> 2. **注册表**（表单控件）：字符串→组件映射，符合开闭原则
> 3. **工厂**（toForm函数）：隐藏FormGroup创建细节
> 4. **装饰器**（StorageDecorator）：透明代理localStorage
> 5. **观察者**（Signal/BehaviorSubject）：响应式数据流
> 6. **策略**（解密fallback链）：多种解压策略按顺序尝试
> 7. **适配器**（auditlog/adapter.go）：解耦审计日志依赖
> 8. **选择原则**：简单问题用简单模式，不过度设计

### Q16: 如果NF数量扩展到1000个，系统需要哪些优化？

**考察点**：可扩展性思维

> **回答要点**：
> 1. **轮询优化**：30秒全量轮询1000个NF会产生大量请求，改为WebSocket推送或增量更新
> 2. **前端渲染**：1000个NF的列表需要虚拟滚动（Virtual Scroll）
> 3. **Worker池**：1000个NF的日志解密需要更大的Worker池，可能需要任务队列
> 4. **后端防抖**：sync.Map + 3秒防抖需要更精细的并发控制
> 5. **审计日志**：1000个NF的操作审计量会大幅增加，需要考虑日志分片
> 6. **数据存储**：加密JSON文件可能成为瓶颈，需要考虑分片或引入数据库

### Q17: 如何监控系统的健康状态？

**考察点**：可观测性思维

> **回答要点**：
> 1. **Prometheus指标**：9个指标覆盖备份/HA/告警/NF/审计/用户
> 2. **端口分离**：8080业务端口 + 8081指标端口
> 3. **ServiceMonitor**：可选的Prometheus Operator集成
> 4. **结构化日志**：Go后端使用JSON格式日志，便于ELK收集
> 5. **前端错误**：authInterceptor捕获所有HTTP错误并Toast提示
> 6. **扩展方向**：可以添加分布式追踪（OpenTelemetry）和日志聚合（EFK）
