# Angular 全面学习指南

本指南旨在全面涵盖 Angular 框架的核心概念、最新特性、最佳实践以及面试常见问题，助您从入门到精通。

## 1. Angular 基础

Angular 是一个由 Google 开发的开源前端框架，用于构建单页面应用 (SPA)。它采用 TypeScript 语言，并以组件化、模块化的方式组织代码。

### 核心概念

*   **组件 (Components)**: Angular 应用的构建基石，由模板、样式和类组成，负责 UI 的一部分。
*   **模块 (Modules)**: 用于组织应用的不同功能，每个 Angular 应用至少有一个根模块 (`AppModule`)。
*   **数据绑定 (Data Binding)**: 连接组件类和模板，实现数据同步。包括单向绑定（属性绑定 `[]`、事件绑定 `()`）和双向绑定 `[()]`。
*   **指令 (Directives)**: 用于修改 DOM 行为或结构。
    *   **组件指令**: 带有模板的指令。
    *   **结构型指令**: 如 `*ngIf`, `*ngFor`，用于添加/删除 DOM 元素。
    *   **属性型指令**: 如 `ngClass`, `ngStyle`，用于修改元素的外观或行为。

### Hello World 示例

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello, Angular!</h1>',
  styles: ['h1 { color: blue; }']
})
export class AppComponent { }
```

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
`

## 2. Angular 20 新特性

Angular 20 带来了许多激动人心的新特性和改进，旨在提升开发者体验和应用性能。

*   **Signals 进化与稳定性**: Signals 响应式原语的进一步完善，提供更细粒度的变更检测和性能优化。
*   **新的控制流语法 (`@if`, `@for`, `@switch`)**: 更简洁、更具表现力的模板语法，取代了传统的 `*ngIf`, `*ngFor` 等结构型指令，提升可读性和性能。
*   **延迟加载块 (`@defer`)**: 允许组件、指令和管道在需要时才加载，显著优化初始加载性能。
*   **新的 HTTP 客户端 API**: 提供更现代、更易用的 HTTP 请求方式，支持类型安全和拦截器。
*   **改进的 Server-Side Rendering (SSR) 和 Hydration**: 更高效的 SSR 和更快的 hydration 过程，提升用户体验和 SEO。
*   **Standalone Components (独立组件) 的默认生成**: `ng generate component` 命令现在默认生成独立组件，简化模块管理。
*   **Zoneless Angular (无 Zone.js 模式)**: 允许应用在不使用 Zone.js 的情况下运行，提供更精细的变更检测控制，提高性能。
*   **新的 CLI 命令和选项**: 提升开发效率和构建优化。
*   **弃用和移除**: 一些旧的 API 和功能被弃用或移除，以推动框架的现代化。

## 3. TypeScript 与 Angular

TypeScript 是 JavaScript 的一个超集，为 JavaScript 带来了静态类型。Angular 核心完全采用 TypeScript 编写，并强烈推荐在开发中使用 TypeScript。

### TypeScript 优势

*   **类型安全**: 在编译阶段捕获错误，减少运行时 bug。
*   **代码可读性与可维护性**: 明确的类型定义使代码更易理解和维护。
*   **强大的工具支持**: 更好的 IDE 自动完成、代码导航和重构。
*   **面向对象编程**: 支持接口、类、继承等面向对象特性。

### Angular 中常用的 TypeScript 特性

*   **装饰器 (Decorators)**: 用于为类、属性、方法添加元数据，如 `@Component`, `@Injectable`, `@Input`, `@Output`。
*   **接口 (Interfaces)**: 定义对象的结构，用于类型检查。
*   **类 (Classes)**: 用于定义组件、服务等。
*   **类型定义 (Type Definitions)**: `interface`, `type` 关键字定义复杂类型。

```typescript
// 示例：使用接口定义数据结构
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // 可选属性
}

// 示例：组件中使用类型
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <h2>{{ product.name }}</h2>
    <p>Price: {{ product.price | currency }}</p>
  `
})
export class ProductCardComponent {
  @Input() product!: Product; // 使用非空断言
}
```

## 4. 组件与模板

组件是 Angular 应用的 UI 单元，模板定义了组件的视图。

### 组件 (Components)

*   **定义**: 使用 `@Component` 装饰器装饰一个类。
*   **构成**:
    *   `selector`: 组件的 CSS 选择器，用于在模板中使用。
    *   `templateUrl` 或 `template`: HTML 模板。
    *   `styleUrls` 或 `styles`: CSS 样式。
    *   `providers`: 组件级别的依赖注入提供者。
    *   `standalone: true` (可选): 使组件成为独立组件，无需在模块中声明。
*   **输入 (Input)**: 使用 `@Input()` 装饰器接收父组件传递的数据。
*   **输出 (Output)**: 使用 `@Output()` 和 `EventEmitter` 向父组件发送事件。

### 模板 (Templates)

*   **插值表达式 (`{{ }}`)**: 将组件类中的数据绑定到模板中显示。
*   **属性绑定 (`[property]`)**: 将组件类中的数据绑定到 HTML 元素的属性。
*   **事件绑定 (`(event)`)**: 监听 HTML 元素的事件，并在组件类中执行方法。
*   **双向数据绑定 (`[(ngModel)]`)**: 实现表单输入元素的值和组件属性之间的双向同步。
*   **管道 (Pipes)**: 用于转换模板中显示的数据，如 `currency`, `date`, `json`。
*   **新的控制流语法**:
    *   `@if (condition) { ... } @else if (anotherCondition) { ... } @else { ... }`: 条件渲染。
    *   `@for (item of items; track item.id; let i = $index) { ... }`: 列表渲染。
    *   `@switch (expression) { @case (value1) { ... } @default { ... } }`: 多条件渲染。
*   **延迟加载块 (`@defer`)**: 优化性能，仅在满足条件时加载内容。

```html
<!-- 示例：模板语法 -->
<div *ngIf="product">
  <h2>{{ product.name | uppercase }}</h2>
  <p>价格: {{ product.price | currency:'CNY':'symbol':'1.2-2' }}</p>
  <button (click)="addToCart(product)">添加到购物车</button>
</div>

<!-- 新的控制流语法 -->
@if (product) {
  <h2>{{ product.name | uppercase }}</h2>
  <p>价格: {{ product.price | currency:'CNY':'symbol':'1.2-2' }}</p>
  <button (click)="addToCart(product)">添加到购物车</button>
} @else {
  <p>商品信息加载中...</p>
}

@for (item of items; track item.id) {
  <app-list-item [item]="item"></app-list-item>
}

@defer (on viewport) {
  <app-comments></app-comments>
}
```

## 5. Signals 响应式系统

Signals 是 Angular 16 引入并逐渐完善的响应式原语，旨在提供更细粒度的变更检测机制和更好的性能。

### 核心概念

*   **Signal**: 一个可以持有值并通知订阅者值发生变化的包装器。
*   **WritableSignal**: 可以直接修改值的 Signal。
*   **Computed**: 一个基于其他 Signal 派生出的只读 Signal，当其依赖的 Signal 变化时自动更新。
*   **Effect**: 一个当其依赖的 Signal 变化时执行副作用的函数，如打印日志、更新 DOM (仅限非视图更新)。

### Signals 的优势

*   **细粒度变更检测**: 只重新渲染真正受影响的组件或部分视图，而不是整个组件树。
*   **更好的性能**: 减少了不必要的变更检测循环，尤其是在大型应用中。
*   **更简单的心智模型**: 响应式编程变得更直观，减少了对 RxJS 操作符的依赖 (在某些场景)。
*   **可预测性**: 明确地定义了数据流和依赖关系。

### 使用示例

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double Count: {{ doubleCount() }}</p>
    <button (click)="increment()">Increment</button>
  `,
  standalone: true
})
export class CounterComponent {
  count = signal(0); // WritableSignal

  // Computed Signal
  doubleCount = computed(() => this.count() * 2);

  constructor() {
    // Effect：当 count 变化时执行
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }

  increment() {
    this.count.update(value => value + 1); // 更新 Signal 的值
  }
}
```
`

## 6. RxJS

RxJS (Reactive Extensions for JavaScript) 是一个使用可观察对象 (Observables) 进行响应式编程的库。Angular 大量使用 RxJS 处理异步事件和数据流。

### 核心概念

*   **Observable**: 表示一个未来会发生的事件或数据流。
*   **Observer**: 订阅 Observable 的对象，包含 `next`, `error`, `complete` 方法。
*   **Subscription**: Observable 和 Observer 之间的连接，用于管理和取消订阅。
*   **Operators (操作符)**: 用于转换、过滤、组合 Observable 的函数，如 `map`, `filter`, `debounceTime`, `switchMap`。

### 常见应用场景

*   **HTTP 请求**: `HttpClient` 返回 `Observable`。
*   **路由事件**: `Router` 暴露的事件流。
*   **表单控件值变化**: `FormControl` 的 `valueChanges`。
*   **自定义事件**: 使用 `Subject` 或 `BehaviorSubject` 创建自定义 Observable。

### RxJS 示例

```typescript
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-search',
  template: `
    <input type="text" placeholder="Search..." (input)="onSearch($event)">
    <div *ngIf="results$ | async as results">
      <div *ngFor="let result of results">{{ result.title }}</div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule] // Add CommonModule here
})
export class SearchComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private searchTerms = new Subject<string>();
  results$: Observable<any[]> | undefined; // Make it optional or initialize later

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300), // 等待 300ms，避免频繁请求
      distinctUntilChanged(), // 只有当搜索词发生变化时才继续
      switchMap((term: string) => this.searchProducts(term)), // 切换到新的搜索 Observable
      takeUntilDestroyed(this.destroyRef) // 组件销毁时自动取消订阅
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerms.next(inputElement.value);
  }

  searchProducts(term: string): Observable<any[]> {
    if (!term.trim()) {
      return new Observable<any[]>(); // 返回空 Observable
    }
    return this.http.get<any[]>(`https://api.example.com/products?q=${term}`);
  }
  // 无需 ngOnDestroy — takeUntilDestroyed 自动处理
}
```

## 7. Dependency Injection（DI）

依赖注入 (DI) 是 Angular 的一个核心特性，它允许您声明组件、服务或其他对象所依赖的外部服务，而无需手动创建它们。Angular 的 DI 系统会在运行时提供这些依赖。

### 核心概念

*   **Injector (注入器)**: 负责创建依赖实例并将其注入到需要它们的对象中。每个 Angular 应用都有一个根注入器，模块、组件也可以有自己的注入器。
*   **Provider (提供者)**: 告诉注入器如何创建服务的实例。
    *   `providedIn: 'root'`: 在根注入器中提供服务，使其在整个应用中作为单例。
    *   `providedIn: SomeModule`: 在特定模块的注入器中提供服务。
    *   在 `@Component` 或 `@NgModule` 的 `providers` 数组中声明。
*   **Token (令牌)**: 用于标识一个依赖。通常是类的类型 (例如 `UserService`)，但也可以是字符串或 `InjectionToken`。

### 工作原理

1.  当一个组件或服务声明了它的依赖项 (通过构造函数参数)。
2.  Angular 的注入器查找与依赖项令牌对应的提供者。
3.  如果找到提供者，注入器会使用它来创建依赖项的实例。
4.  注入器将创建的实例提供给请求它的组件或服务。

### 示例

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 在根注入器中提供，作为单例
})
export class UserService {
  getUsers(): string[] {
    return ['Alice', 'Bob', 'Charlie'];
  }
}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: `
    <h2>Users:</h2>
    <ul>
      <li *ngFor="let user of users">{{ user }}</li>
    </ul>
  `
})
export class AppComponent {
  users: string[];

  constructor(private userService: UserService) { // 通过构造函数注入 UserService
    this.users = this.userService.getUsers();
  }
}
```

### 几种提供者类型

*   `{ provide: SomeService, useClass: AnotherService }`: 当请求 `SomeService` 时，提供 `AnotherService` 的实例。
*   `{ provide: SomeService, useValue: someObject }`: 提供一个现有的值作为依赖项。
*   `{ provide: SomeService, useFactory: someFactoryFunction }`: 使用工厂函数创建依赖项。

## 8. Router 路由

Angular Router 允许您构建单页面应用，并在应用中导航到不同的视图，而无需刷新整个页面。

### 核心概念

*   **路由配置 (Route Configuration)**: 定义 URL 路径和组件之间的映射关系。
*   **`RouterModule`**: 提供路由相关的服务和指令。
*   **`RouterOutlet`**: 一个占位符指令，用于显示当前活跃路由对应的组件。
*   **`routerLink`**: 用于导航到指定路由的指令。
*   **`ActivatedRoute`**: 提供当前路由的信息，如路由参数、查询参数、片段等。
*   **路由守卫 (Route Guards)**: 用于控制导航行为，如 `CanActivate`, `CanDeactivate`, `Resolve`, `CanLoad`。

### 路由配置示例

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 默认路由
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }, // 使用路由守卫
  { path: 'product/:id', component: ProductDetailComponent }, // 带有参数的路由
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // 延迟加载模块
  },
  { path: '**', component: NotFoundComponent } // 匹配所有未定义路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 导航示例

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a [routerLink]="['/product', 123]" routerLinkActive="active">Product 123</a>
</nav>
<router-outlet></router-outlet>
```

```typescript
// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: '<p>Product ID: {{ productId }}</p>'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // 订阅路由参数变化
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
    });
  }
}
```

## 9. Forms 表单

Angular 提供了两种构建表单的方式：模板驱动表单 (Template-driven Forms) 和响应式表单 (Reactive Forms)。

### 模板驱动表单 (Template-driven Forms)

*   **特点**: 简单，适合简单的表单。逻辑主要在模板中。
*   **模块**: 需要导入 `FormsModule`。
*   **使用**: 依赖 `ngModel` 指令实现双向数据绑定，`#ref="ngModel"` 创建 `NgModel` 实例。

```html
<!-- 模板驱动表单示例 -->
<form #heroForm="ngForm" (ngSubmit)="onSubmit(heroForm.value)">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name"
           required
           [(ngModel)]="model.name" name="name"
           #name="ngModel">
    <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
      Name is required
    </div>
  </div>

  <button type="submit" class="btn btn-success" [disabled]="!heroForm.valid">Submit</button>
</form>
```

### 响应式表单 (Reactive Forms)

*   **特点**: 强大，可伸缩，适合复杂的表单。表单控件在组件类中以编程方式创建和管理。
*   **模块**: 需要导入 `ReactiveFormsModule`。
*   **核心类**:
    *   `FormControl`: 表示单个表单输入字段。
    *   `FormGroup`: 表示一组 `FormControl` 或 `FormGroup`，用于管理一个表单。
    *   `FormArray`: 表示一组动态的 `FormControl` 或 `FormGroup`。
    *   `FormBuilder`: 一个服务，用于简化 `FormGroup` 和 `FormArray` 的创建。

```typescript
// 响应式表单示例
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form-reactive',
  template: `
    <form [formGroup]="heroForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" formControlName="name">
        <div *ngIf="heroForm.get('name')?.invalid && heroForm.get('name')?.touched" class="alert alert-danger">
          Name is required.
        </div>
      </div>

      <button type="submit" class="btn btn-success" [disabled]="heroForm.invalid">Submit</button>
    </form>
  `
})
export class HeroFormReactiveComponent implements OnInit {
  heroForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
      alterEgo: ['']
    });
  }

  onSubmit(): void {
    console.log(this.heroForm.value);
  }
}
```

### 验证 (Validation)

*   **内置验证器**: `Validators.required`, `Validators.minLength`, `Validators.maxLength`, `Validators.pattern` 等。
*   **自定义验证器**: 实现 `Validator` 接口或返回 `ValidationErrors` 对象的函数。
*   **异步验证器**: 用于需要服务器端检查的场景。

## 10. 生命周期

Angular 组件和指令有一系列的生命周期钩子，允许您在特定时间点执行代码。

### 主要生命周期钩子

1.  **`ngOnChanges()`**: 当 Angular 设置或重置数据绑定输入属性时响应。在组件实例化后和输入属性发生变化时调用。
2.  **`ngOnInit()`**: 在组件初始化时调用，通常用于初始化数据、订阅可观察对象。只调用一次。
3.  **`ngDoCheck()`**: 在每次变更检测运行时调用，可用于实现自定义的变更检测逻辑。
4.  **`ngAfterContentInit()`**: 在组件内容 (通过 `<ng-content>` 投影的内容) 初始化后调用。
5.  **`ngAfterContentChecked()`**: 在组件内容每次检查后调用。
6.  **`ngAfterViewInit()`**: 在组件视图及其子视图初始化后调用。
7.  **`ngAfterViewChecked()`**: 在组件视图及其子视图每次检查后调用。
8.  **`ngOnDestroy()`**: 在组件销毁之前调用，用于清理资源，如取消订阅、解除事件绑定。

### 执行顺序

`ngOnChanges` (如果存在输入属性) -> `ngOnInit` -> `ngDoCheck` -> `ngAfterContentInit` -> `ngAfterContentChecked` -> `ngAfterViewInit` -> `ngAfterViewChecked` -> `ngOnDestroy`

### 示例

```typescript
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-hook-demo',
  template: `
    <p>Message: {{ message }}</p>
    <ng-content></ng-content>
  `
})
export class LifecycleHookDemoComponent implements
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {

  @Input() message: string = '';

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called', changes);
    if (changes['message']) {
      console.log('Message changed to:', this.message);
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
    // 清理资源，如取消订阅
  }
}
```

## 11. Change Detection

变更检测是 Angular 核心机制之一，它负责检测组件数据模型的变化，并相应地更新 DOM。

### 工作原理

Angular 的变更检测机制基于 `Zone.js` (默认情况下)。当异步事件 (如用户交互、HTTP 请求、定时器) 触发时，Zone.js 会拦截这些事件，并通知 Angular。Angular 收到通知后，会从根组件开始遍历组件树，检查每个组件的数据模型是否发生变化，并更新对应的视图。

### 策略 (ChangeDetectionStrategy)

*   **`ChangeDetectionStrategy.Default` (默认)**: 当任何组件或其子组件的输入属性发生变化、DOM 事件触发、HTTP 请求返回等时，Angular 会遍历整个组件树，检查所有组件。
*   **`ChangeDetectionStrategy.OnPush`**: 当输入属性发生 **引用变化** (而不是内部属性变化)、或者组件的 `Input` 绑定使用 `async` 管道、或者组件自身或其某个子组件触发事件时，才会触发变更检测。这显著提高了性能，尤其是在大型应用中。

### 使用 `OnPush` 优化

为了充分利用 `OnPush` 策略，需要确保：

1.  **不可变数据**: 避免直接修改对象和数组，而是创建新的引用。
    *   **对象**: `this.obj = { ...this.obj, newProp: 'newValue' };`
    *   **数组**: `this.arr = [...this.arr, newItem];`
2.  **使用 `async` 管道**: 对于 Observable 数据，直接在模板中使用 `async` 管道，它会自动管理订阅和取消订阅，并在数据到来时触发变更检测。
3.  **手动触发变更检测**: 在某些特殊情况下，可以通过 `ChangeDetectorRef` 服务手动触发变更检测。
    *   `cdRef.detectChanges()`: 触发一次变更检测。
    *   `cdRef.markForCheck()`: 标记组件为脏，下次变更检测时会检查该组件。

### `ChangeDetectorRef` 示例

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-on-push-demo',
  template: `
    <p>Count: {{ count }}</p>
    <button (click)="increment()">Increment</button>
    <button (click)="incrementAndMarkForCheck()">Increment & Mark for Check</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush // 使用 OnPush 策略
})
export class OnPushDemoComponent {
  count: number = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  increment(): void {
    this.count++;
    // 在 OnPush 策略下，直接修改原始类型数据不会触发变更检测
    // 需要手动触发或依赖父组件的变更检测
    console.log('Count incremented (OnPush):', this.count);
  }

  incrementAndMarkForCheck(): void {
    this.count++;
    this.cdRef.markForCheck(); // 标记为脏，下次变更检测时会检查
    console.log('Count incremented and marked for check (OnPush):', this.count);
  }
}
```

## 12. 性能优化

优化 Angular 应用性能是提升用户体验的关键。

### 12.1 减少包大小

*   **延迟加载 (Lazy Loading)**: 按需加载模块和组件，减少初始加载时间。Angular Router 支持模块的延迟加载。
*   **摇树优化 (Tree Shaking)**: 移除未使用的代码。Webpack 等构建工具会自动执行。
*   **AOT 编译 (Ahead-of-Time Compilation)**: 在构建时编译 Angular 模板和组件，而不是在运行时。减少了浏览器需要下载的 Angular 编译器，提高了渲染速度。
*   **移除不必要的模块和库**: 只导入和使用需要的模块。
*   **Webpack 配置优化**: 调整 Webpack 配置，如 `optimization.splitChunks`。

### 12.2 优化渲染性能

*   **`ChangeDetectionStrategy.OnPush`**: 如前所述，通过不可变数据和 `OnPush` 策略减少不必要的变更检测。
*   **跟踪函数 (`trackBy`)**: 在 `*ngFor` 循环中使用 `trackBy` 函数，帮助 Angular 识别列表中的哪些项发生了变化，只重新渲染变化的项。
*   **优化 `*ngFor` 列表**: 避免在 `*ngFor` 内部执行复杂的计算或函数调用。
*   **虚拟滚动 (Virtual Scrolling)**: 对于非常长的列表，只渲染可见区域内的项目，大大减少 DOM 元素数量。
*   **延迟加载内容 (`@defer`)**: 使用 `@defer` 块按需加载组件或内容，例如当它们进入视口时。

### 12.3 优化运行时性能

*   **事件解绑**: 在 `ngOnDestroy` 中取消订阅 RxJS Observable，移除事件监听器，防止内存泄漏。
*   **Web Workers**: 将复杂的计算或 CPU 密集型任务放到 Web Workers 中执行，不阻塞主线程。
*   **避免在模板中进行复杂计算**: 将计算逻辑放到组件类中，并缓存结果。
*   **管道 (`Pure Pipes`)**: 纯管道只有当输入值发生变化时才会重新计算，可以避免不必要的重复计算。
*   **最小化 DOM 操作**: 减少直接操作 DOM，让 Angular 处理视图更新。

### 示例：`trackBy`

```html
<!-- app.component.html -->
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }
  ];

  trackById(index: number, item: any): number {
    return item.id; // 根据唯一 ID 跟踪
  }

  // 假设有一些操作会更新 items 数组
  updateItem() {
    this.items = [
      { id: 1, name: 'Item A updated' }, // 变化
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Item C' },
      { id: 4, name: 'Item D' } // 新增
    ];
  }
}
```

## 13. SSR 与 Hydration

### Server-Side Rendering (SSR)

*   **定义**: 在服务器端预先渲染 Angular 应用，生成完整的 HTML 内容，然后发送给客户端。
*   **优势**:
    *   **更好的 SEO**: 搜索引擎爬虫可以直接抓取到完整的页面内容。
    *   **更快的首次内容绘制 (FCP)**: 用户可以更快地看到页面内容，即使 JavaScript 尚未完全加载和执行。
    *   **更好的用户体验**: 减少白屏时间。
*   **挑战**:
    *   **开发复杂性**: 需要处理浏览器和服务器环境的差异。
    *   **服务器负载**: 服务器需要承担渲染页面的工作。

### Hydration (水合)

*   **定义**: 在 SSR 之后，当客户端的 JavaScript 加载并执行时，它会“接管”服务器渲染的 HTML，将其转换为完全交互式的 Angular 应用。这个过程包括重新挂载事件监听器、恢复应用状态等。
*   **优势**:
    *   **无缝的用户体验**: 用户在 JavaScript 加载期间可以与页面进行交互 (尽管可能没有完全的功能)。
    *   **避免闪烁**: SSR 解决了白屏问题，Hydration 避免了客户端重新渲染导致的页面闪烁。
*   **Angular 20 的改进**:
    *   Angular 20 改进了 Hydration 机制，使其更高效、更稳定。
    *   支持 `View Transitions API`，提供更流畅的页面切换动画。

### 工作流程

1.  用户请求页面。
2.  服务器接收请求，使用 Angular Universal 运行 Angular 应用，并生成 HTML。
3.  服务器将生成的 HTML 发送给客户端。
4.  浏览器接收 HTML 并立即显示。
5.  浏览器开始下载并执行客户端 Angular 应用的 JavaScript。
6.  当 JavaScript 加载完成后，Angular 开始 Hydration 过程，将服务器渲染的 HTML 附加到客户端应用上，使其变得交互式。

### 启用 SSR 和 Hydration

通常通过 Angular CLI 命令来启用和配置：

```bash
ng add @angular/ssr
```
`

## 14. 状态管理

在复杂的 Angular 应用中，有效管理应用状态至关重要。

### 14.1 传统方式

*   **组件内部状态**: `Input`/`Output`、`ViewChild`、`EventEmitter` 等。
*   **服务共享状态**: 使用可注入的服务作为单例来共享数据，通常结合 RxJS 的 `Subject` 或 `BehaviorSubject`。
    *   **优点**: 简单，易于实现。
    *   **缺点**: 在大型应用中，状态分散，难以追踪和调试。

### 14.2 集中式状态管理 (Redux/NGRX 模式)

*   **NgRx**: Angular 官方推荐的基于 RxJS 的 Redux 模式状态管理库。
    *   **Store**: 存储应用的单一状态树。
    *   **Actions**: 描述发生的事件。
    *   **Reducers**: 纯函数，接收当前状态和 Action，返回新的状态。
    *   **Selectors**: 用于从 Store 中查询数据的纯函数。
    *   **Effects**: 处理副作用 (如 HTTP 请求)，响应 Actions 并调度新的 Actions。
    *   **优点**: 状态集中，可预测，易于调试，支持时间旅行调试。
    *   **缺点**: 学习曲线陡峭，引入额外样板代码。

### NgRx 示例 (简略)

```typescript
// 定义一个 Action
export const increment = createAction('[Counter Component] Increment');

// 定义一个 Reducer
export const counterReducer = createReducer(
  0, // 初始状态
  on(increment, state => state + 1)
);

// 定义一个 Selector
export const selectCount = createSelector(
  (state: { count: number }) => state.count,
  count => count
);

// 在组件中使用
import { Store } from '@ngrx/store';

@Component({...})
export class MyCounterComponent {
  count$ = this.store.select(selectCount);

  constructor(private store: Store<{ count: number }>) {}

  increment() {
    this.store.dispatch(increment());
  }
}
```

### 14.3 新兴解决方案

*   **Signals**: Angular 引入的 Signals 提供了组件内部和组件间共享状态的一种更轻量级、细粒度的方式。
    *   **优点**: 更简单，更直观，减少样板代码，与 Angular 本身深度集成。
    *   **缺点**: 对于非常复杂的全局状态，可能仍需要额外的组织模式 (例如 NgRx Signals Store 或其他基于 Signals 的库)。

*   **`@ngrx/signals`**: NgRx 团队正在开发基于 Signals 的状态管理解决方案，旨在结合 Signals 的优点和 Redux 模式的结构化。

## 15. HTTP 与拦截器

Angular 的 `HttpClient` 模块提供了一种简单、现代的方式来发起 HTTP 请求。

### 15.1 `HttpClient`

*   **模块**: 需要导入 `HttpClientModule`。
*   **方法**: `get()`, `post()`, `put()`, `delete()`, `patch()`, `head()`, `jsonp()`。
*   **返回 `Observable`**: 所有 `HttpClient` 方法都返回 RxJS `Observable`，需要订阅才能触发请求。
*   **类型化响应**: 通过泛型指定响应数据的类型，提供类型安全。
*   **错误处理**: 使用 RxJS 操作符 (如 `catchError`, `retry`) 处理错误。

### 示例

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(
        retry(3), // 重试 3 次
        catchError(this.handleError) // 错误处理
      );
  }

  createPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Post>(this.apiUrl, post, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // 客户端或网络错误
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // 后端返回的错误码或错误信息
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

### 15.2 HTTP 拦截器 (HTTP Interceptors)

*   **定义**: 允许您在 HTTP 请求发送到服务器之前对其进行拦截和修改，或在响应到达应用之前对其进行拦截和修改。
*   **应用场景**:
    *   添加认证头 (`Authorization`)。
    *   错误处理和重试机制。
    *   日志记录。
    *   缓存。
    *   修改 URL 或请求体。
*   **实现**: 实现 `HttpInterceptor` 接口，并提供 `intercept` 方法。

```typescript
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 获取 token
    const authToken = localStorage.getItem('token');

    // 如果有 token，则克隆请求并添加认证头
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // 继续请求，并处理响应
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // console.log('Response received:', event.status);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // 处理未经授权的错误，例如跳转到登录页
          console.error('Unauthorized request:', error.message);
          // this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
```

### 注册拦截器

在 `app.module.ts` (或使用独立组件时在 `main.ts` 中通过 `provideHttpClient(withInterceptorsFromDi())` 或 `provideHttpClient(withInterceptors([authInterceptor]))`) 中注册拦截器：

```typescript
// app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  // ...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // 允许多个拦截器
    }
  ],
  // ...
})
export class AppModule { }
```

## 16. 测试

Angular 提供了全面的测试工具和策略，包括单元测试、集成测试和端到端测试。

### 16.1 单元测试 (Unit Testing)

*   **工具**: Karma (测试运行器), Jasmine (测试框架)。
*   **目的**: 测试单个组件、服务、管道或指令的独立功能。
*   **`TestBed`**: Angular 提供的测试工具，用于配置和创建测试模块，模拟依赖项。
*   **`ComponentFixture`**: 用于与组件的 DOM 和实例进行交互。

### 单元测试示例 (组件)

```typescript
// hello.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<h1>Hello, {{ name }}!</h1>'
})
export class HelloComponent {
  @Input() name: string = 'World';
}
```

```typescript
// hello.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { By } from '@angular/platform-browser'; // 用于查询 DOM 元素

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloComponent]
    })
    .compileComponents(); // 编译组件的模板和 CSS
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloComponent); // 创建组件实例和其宿主元素
    component = fixture.componentInstance; // 获取组件实例
    fixture.detectChanges(); // 触发初始变更检测
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default name "World"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, World!');
  });

  it('should display input name', () => {
    component.name = 'Angular User';
    fixture.detectChanges(); // 触发变更检测以更新视图
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Angular User!');
  });

  it('should display input name using debugElement', () => {
    component.name = 'Test User';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Hello, Test User!');
  });
});
```

### 16.2 服务测试

```typescript
// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 导入用于模拟 HTTP 请求的模块
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // 确保没有未完成的请求
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected users (HttpClient called once)', () => {
    const expectedUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

    service.getUsers().subscribe(users =>
      expect(users).toEqual(expectedUsers)
    );

    const req = httpTestingController.expectOne('api/users'); // 期望有一个请求到 'api/users'
    expect(req.request.method).toEqual('GET'); // 验证请求方法
    req.flush(expectedUsers); // 模拟服务器响应
  });
});
```

### 16.3 端到端测试 (End-to-End Testing)

*   **工具**: Cypress 或 Protractor (Protractor 逐渐被弃用)。
*   **目的**: 测试整个应用的用户流程，模拟真实用户行为。

## 17. 微前端

微前端 (Micro Frontends) 是一种架构模式，它将大型前端应用拆分成更小、更独立、可自主开发和部署的微应用。

### 核心理念

*   **技术无关**: 各个微应用可以使用不同的前端技术栈 (例如 Angular, React, Vue)。
*   **独立部署**: 各个微应用可以独立部署和更新。
*   **团队自治**: 不同的团队可以独立负责各自的微应用。
*   **渐进式升级**: 逐步替换旧系统，而不是一次性重写。

### Angular 中的微前端方案

*   **Module Federation (Webpack 5)**: 这是实现微前端最推荐和强大的方式之一。
    *   **优点**: 允许应用在运行时共享代码、组件和依赖项，实现真正的运行时集成。
    *   **缺点**: 配置相对复杂，对 Webpack 版本有要求。
*   **`@angular-architects/module-federation`**: 一个简化 Angular 中 Module Federation 配置的库。
*   **`ngx-build-plus`**: 允许扩展 Angular CLI 的构建过程，适用于一些自定义集成场景。
*   **其他通用方案**:
    *   **`single-spa`**: 一个流行的微前端框架，可以集成各种前端框架。
    *   **`qiankun` (乾坤)**: 阿里开源的微前端框架。
    *   **IFrames**: 最简单但最受限制的方案，隔离性好但通信困难。

### Module Federation 概念

*   **Host**: 宿主应用，负责加载和协调远程应用。
*   **Remote**: 远程应用，提供可共享的模块或组件。
*   **Shared Dependencies**: 宿主和远程应用之间共享的依赖项，避免重复加载。

### Module Federation 示例 (伪代码)

在 `webpack.config.js` 中配置 `ModuleFederationPlugin`。

```javascript
// host-app/webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mfe1: "mfe1@http://localhost:4201/remoteEntry.js", // 远程应用的 URL
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // ... 其他共享依赖
      },
    }),
  ],
};
```

```javascript
// mfe1-app/webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe1',
      filename: 'remoteEntry.js', // 远程应用的入口文件
      exposes: {
        './Component': './src/app/my-mfe-component/my-mfe-component.component.ts', // 暴露组件
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // ... 其他共享依赖
      },
    }),
  ],
};
```

在宿主应用中动态加载远程组件：

```typescript
// host-app/app.component.ts
import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div #container></div>`
})
export class AppComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  async ngOnInit() {
    // 动态加载远程组件
    const { MyMfeComponent } = await import('mfe1/Component');
    this.container.createComponent(this.cfr.resolveComponentFactory(MyMfeComponent));
  }
}
```

## 18. 工程化

Angular CLI (Command Line Interface) 是 Angular 工程化的核心工具，它提供了强大的功能来帮助开发者创建、开发、构建和维护 Angular 应用。

### 18.1 Angular CLI

*   **创建项目**: `ng new my-app`
*   **生成代码**: `ng generate component my-component`, `ng generate service my-service`, `ng generate module my-module` 等。
*   **运行应用**: `ng serve`
*   **构建应用**: `ng build` (生产环境构建 `ng build --configuration production`)
*   **测试应用**: `ng test` (单元测试), `ng e2e` (端到端测试)
*   **添加功能**: `ng add @angular/material`, `ng add @angular/ssr` 等。
*   **更新 Angular**: `ng update`

### 18.2 规范与约定

*   **Angular 风格指南**: 遵循官方的 Angular 风格指南，确保代码一致性和可读性。
*   **命名约定**:
    *   组件类名以 `Component` 结尾 (例如 `UserListComponent`)。
    *   服务类名以 `Service` 结尾 (例如 `AuthService`)。
    *   模块类名以 `Module` 结尾 (例如 `AppModule`)。
    *   文件命名采用 Kebab-case (例如 `user-list.component.ts`)。
*   **ESLint / TSLint (废弃)**: 用于代码质量检查和风格统一。Angular 推荐使用 ESLint。
*   **Prettier**: 格式化代码，保持一致性。
*   **Husky & Lint-staged**: 在 Git 提交前自动运行 Lint 和格式化。
*   **Commit Lint**: 规范 Git 提交信息。

### 18.3 构建与部署

*   **AOT 编译 (Ahead-of-Time Compilation)**: 默认启用，提高性能。
*   **Tree Shaking**: 移除未使用的代码。
*   **Webpack**: 底层构建工具。
*   **生产环境优化**: `ng build --configuration production` 会自动进行多项优化，如代码压缩、死代码消除等。
*   **CDN**: 将静态资源部署到 CDN，加速加载。
*   **持续集成/持续部署 (CI/CD)**: 自动化测试、构建和部署流程。

### 18.4 Monorepo (单体仓库)

*   **Nx**: 一个强大的 Monorepo 工具，适用于大型 Angular 应用和多项目管理。
    *   **优点**: 共享代码、统一工具、强制一致性、更容易进行架构重构。
    *   **缺点**: 初始设置复杂，需要适应新的工作流。

### 18.5 Schematics

*   **定义**: Angular CLI 的强大扩展机制，允许您创建、转换和更新代码。
*   **应用**: `ng generate` 命令背后就是 Schematics。您也可以编写自定义 Schematics 来自动化重复任务。

```bash
# 示例：创建新组件
ng generate component users/user-list --skip-tests

# 示例：创建新服务
ng generate service auth/auth --providedIn=root

# 示例：构建生产环境应用
ng build --configuration production
```

## 19. 安全

在 Angular 应用开发中，安全性是一个重要的考虑因素。

### 19.1 跨站脚本 (XSS)

*   **Angular 的内置保护**: Angular 默认会对所有值进行净化 (sanitization)，阻止 XSS 攻击。
*   **信任值 (Trusting values)**: 如果确定某个值是安全的，可以使用 `DomSanitizer` 服务将其标记为信任。
    *   `bypassSecurityTrustHtml()`
    *   `bypassSecurityTrustStyle()`
    *   `bypassSecurityTrustScript()`
    *   `bypassSecurityTrustUrl()`
    *   `bypassSecurityTrustResourceUrl()`
    *   **注意**: 谨慎使用这些方法，确保您完全信任这些值。

### 19.2 跨站请求伪造 (CSRF)

*   **防护**:
    *   使用 CSRF token (通常由后端生成并验证)。
    *   在 HTTP 请求中添加 `X-Requested-With` 头 (如果服务器配置了该头)。
    *   使用 `SameSite=Lax` 或 `Strict` 属性的 Cookie。
*   **Angular `HttpClient`**: 对于 CSRF token 的管理通常由后端和 HTTP 拦截器配合完成。

### 19.3 HTTP 安全

*   **HTTPS**: 始终使用 HTTPS 来加密客户端和服务器之间的通信。
*   **HTTP 头部**: 配置安全的 HTTP 头部，例如 `Content-Security-Policy` (CSP), `X-Content-Type-Options`, `X-Frame-Options`。
*   **CORS (跨域资源共享)**: 正确配置 CORS 策略，只允许受信任的域访问您的 API。
*   **身份验证与授权**:
    *   使用安全的身份验证机制 (如 JWT, OAuth 2.0)。
    *   在后端进行严格的授权检查。
    *   将敏感信息存储在 HttpOnly Cookie 中或服务器端。

### 19.4 其他安全措施

*   **依赖项审计**: 定期检查项目依赖项的漏洞 (例如使用 `npm audit`)。
*   **最小权限原则**: 组件和服务只拥有完成其任务所需的最小权限。
*   **输入验证**: 始终在后端和前端验证用户输入。
*   **避免在客户端存储敏感数据**: 密码、API 密钥等不应存储在浏览器本地存储中。
*   **安全编码实践**: 遵循 OWASP Top 10 等安全准则。

### `DomSanitizer` 示例

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-safe-html-demo',
  template: `
    <h3>Unsanitized HTML (will be stripped):</h3>
    <div [innerHTML]="dangerousHtml"></div>

    <h3>Sanitized HTML (safe):</h3>
    <div [innerHTML]="safeHtml"></div>
  `
})
export class SafeHtmlDemoComponent {
  dangerousHtml: string = '<p>This is <script>alert("XSS!");</script> dangerous HTML.</p>';
  safeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    // 标记为信任，但请务必确保其来源安全
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('<p>This is <b>safe</b> HTML.</p>');
  }
}
```

## 20. 场景题

以下是一些常见的 Angular 场景题，用于考察对框架的理解和解决实际问题的能力。

### 场景 1: 如何在父子组件之间进行通信？

*   **父到子**:
    *   使用 `@Input()` 装饰器。父组件通过属性绑定 (`[property]="value"`) 将数据传递给子组件。
    *   使用 `ViewChild` 或 `ViewChildren` (如果父组件需要直接调用子组件的方法或访问属性，不推荐过度使用)。
*   **子到父**:
    *   使用 `@Output()` 装饰器和 `EventEmitter`。子组件通过事件绑定 (`(event)="handler()"`) 向父组件发送事件。
*   **兄弟组件通信**:
    *   通过共享服务 (通常结合 RxJS `Subject` 或 `BehaviorSubject`)。
    *   通过共同的父组件作为中介。
*   **无关联组件通信**:
    *   通过共享服务 (通常结合 RxJS `Subject` 或 `BehaviorSubject`)。
    *   使用全局状态管理库 (如 NgRx)。

### 场景 2: 如何处理复杂的表单，例如动态添加/删除表单字段？

使用**响应式表单**和 `FormArray`。

*   创建 `FormGroup` 作为主表单。
*   在 `FormGroup` 中添加 `FormArray`，用于管理动态的表单项。
*   每个表单项可以是 `FormControl` 或 `FormGroup`。
*   使用 `push()`, `insert()`, `removeAt()` 等方法动态操作 `FormArray`。

### 场景 3: 如何在应用中实现权限控制？

*   **前端 (路由守卫)**:
    *   使用 `CanActivate` 守卫来检查用户是否有权限访问某个路由。
    *   `CanLoad` 守卫可以在模块加载前进行权限检查，防止不必要的资源下载。
*   **前端 (UI 元素)**:
    *   在模板中使用 `*ngIf` 结合服务返回的权限信息来显示/隐藏特定 UI 元素或禁用按钮。
*   **后端**:
    *   最重要的权限控制应始终在后端进行。前端的权限控制只是为了用户体验，不能依赖前端进行安全保障。

### 场景 4: 如何优化大型 Angular 应用的性能？

参考 [12. 性能优化](#12-性能优化) 部分。主要策略包括：

*   **减少包大小**: 延迟加载、AOT、Tree Shaking。
*   **优化渲染**: `OnPush` 策略、`trackBy`、虚拟滚动、`@defer`。
*   **优化运行时**: 事件解绑、Web Workers、避免模板中的复杂计算。

### 场景 5: 当 Observable 数据在组件中订阅后，如何避免内存泄漏？

*   **`async` 管道**: 优先使用 `async` 管道，它会自动管理订阅和取消订阅。
*   **`takeUntilDestroyed()` 操作符 (Angular 20+ 推荐)**: 基于 `DestroyRef`，无需手动维护 `Subject` 和 `ngOnDestroy`。在 `constructor` 中可省略 `destroyRef` 参数。
*   **`takeUntil()` 操作符 (传统方式)**: 结合 `ngOnDestroy` 和 `Subject` 来在组件销毁时取消所有订阅。
*   **`take(1)` 操作符**: 对于只需要获取一次数据的 Observable。
*   **手动 `unsubscribe()`**: 在 `ngOnDestroy` 中手动调用 `subscription.unsubscribe()`。

### 场景 6: 如何实现一个通用的错误处理机制？

*   **HTTP 拦截器**: 创建一个 `HttpInterceptor`，在其中 `catchError`，统一处理 HTTP 请求的错误。可以显示错误通知、记录日志、重定向等。
*   **错误处理服务**: 创建一个全局错误处理服务 (`ErrorHandler`)，捕获未被处理的 JavaScript 错误和运行时异常。
*   **自定义错误页面**: 当发生严重错误时，显示友好的错误页面。

### 场景 7: 如何处理浏览器不兼容问题？

*   **Polyfills**: Angular CLI 会自动添加一些必要的 Polyfills。对于特定的浏览器功能，可能需要手动添加更多。
*   **CSS 预处理器**: 使用 Sass, Less 等预处理器来编写带浏览器前缀的 CSS。
*   **条件渲染**: 根据浏览器特性进行条件渲染或功能降级。
*   **CanIUse.com**: 检查特定 Web API 或 CSS 属性的浏览器兼容性。

## 21. 手写题

### 手写题 1: 实现一个简单的 `debounce` 函数 (在 Angular 中常用于输入搜索)

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null; // 执行后清除
    }, delay);
  };
}

// 示例用法
const logInput = (text: string) => console.log('Searching for:', text);
const debouncedLogInput = debounce(logInput, 500);

// 在 Angular 中可以这样用：
// <input type="text" (input)="debouncedSearch($event.target.value)">
// debouncedSearch = debounce((term: string) => this.searchService.search(term), 300);
```

### 手写题 2: 实现一个自定义的结构型指令 `*ngUnless`，与 `*ngIf` 相反

当条件为 `false` 时，显示内容。

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngUnless]' // 指令选择器
})
export class NgUnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>, // 引用宿主元素包裹的模板
    private viewContainer: ViewContainerRef // 引用宿主元素的视图容器
  ) { }

  @Input() set ngUnless(condition: boolean) {
    if (!condition && !this.hasView) { // 如果条件为 false 且视图未创建
      this.viewContainer.createEmbeddedView(this.templateRef); // 创建并插入视图
      this.hasView = true;
    } else if (condition && this.hasView) { // 如果条件为 true 且视图已创建
      this.viewContainer.clear(); // 清除视图
      this.hasView = false;
    }
  }
}

// 使用示例：
// <div *ngUnless="isLoading">
//   Content will be shown when isLoading is false.
// </div>
```

### 手写题 3: 实现一个简单的 `EventEmitter`

在 Angular 中，`EventEmitter` 用于子组件向父组件发出事件。这里实现一个简化版本。

```typescript
type Listener<T> = (data: T) => void;

class CustomEventEmitter<T = any> {
  private listeners: Listener<T>[] = [];

  /**
   * 注册一个事件监听器
   * @param listener 监听函数
   * @returns 取消订阅函数
   */
  subscribe(listener: Listener<T>): () => void {
    this.listeners.push(listener);
    // 返回一个函数，用于取消订阅
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * 触发事件，并向所有监听器发送数据
   * @param data 要发送的数据
   */
  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }

  /**
   * 清除所有监听器
   */
  unsubscribe(): void {
    this.listeners = [];
  }
}

// 示例用法
const myEmitter = new CustomEventEmitter<string>();

const unsub1 = myEmitter.subscribe((message) => {
  console.log('Listener 1 received:', message);
});

const unsub2 = myEmitter.subscribe((message) => {
  console.log('Listener 2 received:', message);
});

myEmitter.emit('Hello World!'); // 两个监听器都会收到
myEmitter.emit('Another message!');

unsub1(); // 取消第一个监听器
myEmitter.emit('After unsub1!'); // 只有 Listener 2 收到

myEmitter.unsubscribe(); // 清除所有
myEmitter.emit('After all unsubscribed!'); // 没有任何监听器收到
```

## 22. Angular 20 高频面试题

### 1. 简述 Angular 的核心特性和优势。

**回答要点**:
*   **组件化**: UI 构建的基石，提高复用性、可维护性。
*   **TypeScript**: 静态类型、代码可读性、IDE 友好。
*   **依赖注入 (DI)**: 解耦组件和服务，提高可测试性。
*   **数据绑定**: 视图与模型同步 (插值、属性、事件、双向绑定)。
*   **路由**: 构建单页面应用。
*   **响应式编程 (RxJS)**: 处理异步事件和数据流。
*   **命令行工具 (CLI)**: 提高开发效率。
*   **模块化**: 组织代码。
*   **SSR & Hydration**: 优化 SEO 和首次加载。
*   **Signals**: 细粒度变更检测，性能提升。

### 2. Angular 20 相较于之前的版本，有哪些重要的更新或改进？

**回答要点**:
*   **Signals 进化与稳定性**: 细粒度变更检测的核心。
*   **新的控制流语法 (`@if`, `@for`, `@switch`)**: 替代 `*ngIf`, `*ngFor`，更简洁高效。
*   **延迟加载块 (`@defer`)**: 按需加载组件，显著提升性能。
*   **更好的 SSR 和 Hydration**: 更高效的水合过程。
*   **Standalone Components 默认生成**: 简化模块管理。
*   **Zoneless Angular (无 Zone.js 模式)**: 提升性能控制。
*   新的 HTTP 客户端 API。

### 3. 请解释 `ChangeDetectionStrategy.OnPush` 的作用和原理，以及如何有效利用它。

**回答要点**:
*   **作用**: 优化变更检测性能，减少不必要的组件检查。
*   **原理**: 只有在以下情况才会触发组件的变更检测：
    1.  组件的 `Input` 属性引用发生变化 (对于对象/数组是引用，不是内部属性)。
    2.  组件模板中使用的 Observable 通过 `async` 管道发出新值。
    3.  组件自身或其子组件触发了 DOM 事件。
    4.  通过 `ChangeDetectorRef` 手动调用 `markForCheck()` 或 `detectChanges()`。
*   **有效利用**:
    *   使用**不可变数据结构** (immutable data) 避免直接修改对象和数组。
    *   广泛使用 **`async` 管道** 处理 Observable。
    *   必要时使用 `ChangeDetectorRef` 手动标记组件为脏。

### 4. 什么是 Angular 的依赖注入 (DI)？它的好处是什么？

**回答要点**:
*   **定义**: 一种设计模式，允许在不创建或管理依赖项的情况下声明依赖项。Angular 注入器负责创建和提供这些依赖。
*   **好处**:
    *   **解耦**: 组件和服务之间低耦合。
    *   **可测试性**: 容易模拟依赖项进行单元测试。
    *   **可维护性**: 易于更换依赖实现。
    *   **可重用性**: 服务可以在不同组件中共享。

### 5. RxJS 在 Angular 中扮演什么角色？请举例说明其常见应用场景。

**回答要点**:
*   **角色**: 处理异步事件和数据流的核心库，使响应式编程成为可能。
*   **应用场景**:
    *   **HTTP 请求**: `HttpClient` 返回 `Observable`。
    *   **表单值变化**: `FormControl.valueChanges`。
    *   **路由事件**: 监听路由参数、导航事件。
    *   **用户事件**: `fromEvent` 监听 DOM 事件。
    *   **状态管理**: NgRx 内部大量使用 RxJS。
    *   **防抖/节流**: `debounceTime`, `throttleTime`。
    *   **组合数据流**: `merge`, `combineLatest`, `switchMap` 等操作符。

### 6. 什么是 Angular 的生命周期钩子？请列举并简述几个常用的。

**回答要点**:
*   **定义**: 在组件或指令生命周期中特定时间点执行回调函数的接口。
*   **常用钩子**:
    *   `ngOnChanges`: 输入属性变化时。
    *   `ngOnInit`: 组件初始化后 (只调用一次)，常用作初始化逻辑。
    *   `ngDoCheck`: 每次变更检测运行时。
    *   `ngAfterViewInit`: 组件视图及其子视图初始化后。
    *   `ngOnDestroy`: 组件销毁前，用于资源清理。

### 7. 解释 `*ngIf`, `*ngFor` 和 `@if`, `@for` 之间的区别和优势。

**回答要点**:
*   **`*ngIf`, `*ngFor`**: 结构型指令，是旧的控制流语法。它们会创建一个包装元素 (`<ng-template>`)。
    *   **缺点**: 在 DOM 中引入额外的 `<ng-template>` 元素，可能影响性能和调试。
*   **`@if`, `@for`**: Angular 20 引入的新控制流语法。
    *   **优势**:
        *   **无额外 DOM 元素**: 不会创建 `<ng-template>` 包装器，更接近纯 HTML，提高了渲染效率。
        *   **更清晰的语法**: 更具表现力，易于阅读。
        *   **更好的类型推断**: 编译器可以更好地理解模板中的类型。
        *   **性能提升**: 在某些场景下，由于减少了中间层的 DOM 操作，性能有所提升。

### 8. 什么是 Angular SSR 和 Hydration？它们解决了什么问题？

**回答要点**:
*   **SSR (Server-Side Rendering)**: 在服务器端预渲染 Angular 应用，生成完整 HTML。
    *   **解决问题**: 提升 SEO、加快首次内容绘制 (FCP)、减少白屏时间。
*   **Hydration (水合)**: 客户端 JavaScript 加载后，接管服务器渲染的 HTML，使其变为完全交互式应用。
    *   **解决问题**: 避免客户端重新渲染导致的页面闪烁、提供无缝的用户体验。

### 9. 独立组件 (Standalone Components) 有何优势？

**回答要点**:
*   **简化模块管理**: 无需 `NgModule` 声明、导入和导出，减少样板代码。
*   **更好的 Tree Shaking**: 构建工具可以更容易地移除未使用的代码。
*   **更小的应用包**: 减少了模块元数据的开销。
*   **更直观的依赖管理**: 组件直接声明其依赖项。
*   **微前端友好**: 更容易作为独立的单元集成。

### 10. 你如何处理 Angular 应用中的安全性问题？

**回答要点**:
*   **XSS**: Angular 默认净化机制，谨慎使用 `DomSanitizer`。
*   **CSRF**: CSRF token, `X-Requested-With` 头，`SameSite` Cookie。
*   **HTTPS**: 全程加密通信。
*   **CORS**: 合理配置跨域策略。
*   **输入验证**: 前后端双重验证。
*   **依赖项审计**: 定期检查漏洞。
*   **身份验证/授权**: JWT, OAuth2，后端权限检查。
*   **CSP (Content Security Policy)**: 限制脚本和资源的加载。

## 23. 大厂高频追问

### 1. 深入理解 Angular 的变更检测机制。Zoneless Angular 的原理和优势是什么？未来趋势如何？

**深入回答**:
*   **Zone.js 机制**:
    *   Zone.js 猴子补丁 (monkey-patches) 了浏览器大部分异步 API (如 `setTimeout`, `addEventListener`, `Promise`)。
    *   每当这些异步操作触发时，Zone.js 会创建一个新的 Zone 上下文，并在其 `onMicrotaskEmpty` 或 `onStable` 钩子中通知 Angular。
    *   Angular 收到通知后，从根组件开始自上而下遍历整个组件树，检查所有绑定属性的变化，并更新 DOM。
    *   **缺点**: 全局性、粗粒度、可能导致不必要的性能开销、难以调试。
*   **Signals 机制**:
    *   基于拉取 (pull-based) 的响应式原语。
    *   当 Signal 变化时，只有直接或间接依赖它的 `computed` 或 `effect` 会收到通知。
    *   当视图绑定到 Signal 时，只有当该 Signal 变化时，对应的视图区域才会被标记为脏，并进行局部更新。
    *   **优势**: 细粒度、局部更新、性能提升、更简单的心智模型。
*   **Zoneless Angular (无 Zone.js 模式)**:
    *   允许开发者选择禁用 Zone.js。
    *   **原理**: 应用程序不再依赖 Zone.js 触发变更检测。而是完全依赖 Signals 来驱动变更检测。
    *   **优势**:
        *   **性能提升**: 消除了 Zone.js 引入的额外开销和全局变更检测。
        *   **更可预测**: 开发者对变更检测有更精细的控制。
        *   **更易调试**: 消除了 Zone.js 带来的栈追踪污染。
        *   **与其他库的更好兼容性**: 避免 Zone.js 可能与其他库冲突。
    *   **未来趋势**: Angular 正在逐步向 Zoneless 靠拢，Signals 是其核心。未来，Zoneless 将成为主流，开发者将主要通过 Signals 及其衍生的 `NgRx/signals` 等库来管理状态和驱动视图更新。

### 2. Angular 的微前端方案有哪些？你更倾向于哪种？为什么？Module Federation 如何解决微前端中的共享依赖和通信问题？

**深入回答**:
*   **方案**:
    *   **Module Federation (Webpack 5)**: 最推荐和功能最强大。
    *   **`single-spa`**: 框架无关的微前端框架。
    *   **`qiankun`**: 阿里开源的微前端框架。
    *   **IFrames**: 简单但限制多，通信复杂。
    *   **Web Components**: 原生技术，但生态不够完善。
*   **倾向**: 倾向于 **Module Federation**。
    *   **原因**:
        *   **原生集成**: Webpack 5 自带功能，与 Angular CLI 的构建流程更匹配。
        *   **运行时共享**: 真正实现了代码和依赖的运行时共享，避免重复加载，优化性能。
        *   **强类型**: 能够以类型安全的方式暴露和消费组件/模块。
        *   **生态支持**: Angular Architects 等社区提供了很好的工具和指南。
*   **Module Federation 解决共享依赖和通信**:
    *   **共享依赖**:
        *   通过 `shared` 配置项，可以指定宿主和远程应用之间共享的库 (如 `@angular/core`, `rxjs`)。
        *   `singleton: true` 确保在运行时只加载一份共享依赖。
        *   `strictVersion: true` 和 `requiredVersion: 'auto'` 有助于解决版本冲突。
        *   这样可以显著减少应用的包大小，避免重复下载。
    *   **通信问题**:
        *   **输入/输出 (Props/Events)**: 如果远程应用暴露的是组件，宿主应用可以像普通组件一样传递 `Input` 和监听 `Output` (需要确保组件可以接收和发出事件)。
        *   **共享服务 (Shared Services)**: 远程应用可以暴露服务，宿主应用可以注入并使用这些服务进行通信。
        *   **全局状态管理**: 使用 NgRx 或基于 Signals 的共享服务作为中央事件总线，进行更复杂的状态同步。
        *   **`window` 对象或自定义事件**: 低级但有效的跨应用通信方式。
        *   **路由**: 微应用之间可以通过路由进行导航，并传递路由参数。

### 3. 如何在 Angular 中实现高性能的列表渲染？除了 `trackBy` 和虚拟滚动，还有哪些可以考虑的策略？

**深入回答**:
*   **`trackBy` 和虚拟滚动**: 这是最基本的两项。
    *   `trackBy`: 帮助 Angular 识别列表项的身份，只更新变化的 DOM 元素。
    *   虚拟滚动 (`@angular/cdk/scrolling`): 只渲染可见区域内的列表项，大大减少 DOM 元素数量，适用于大数据量列表。
*   **其他策略**:
    *   **`ChangeDetectionStrategy.OnPush`**: 对列表项组件应用 `OnPush` 策略，配合不可变数据，减少不必要的子组件检查。
    *   **避免在 `*ngFor` 或 `@for` 内部进行复杂计算**:
        *   将计算逻辑移到组件类中，并缓存结果。
        *   使用 **纯管道 (Pure Pipes)** 对数据进行转换，纯管道只有在输入值变化时才会重新计算。
    *   **延迟加载列表项组件**: 如果列表项非常复杂或资源密集，可以考虑使用 `@defer` 或 Intersection Observer API，只在列表项进入视口时才完全加载和渲染。
    *   **Web Workers**: 对于数据处理密集型任务 (如大数据量的过滤、排序)，将这些任务放到 Web Worker 中执行，避免阻塞主线程。
    *   **分页加载**: 如果数据量巨大，后端支持分页，前端应实现分页加载，而不是一次性加载所有数据。
    *   **`requestAnimationFrame`**: 在某些需要高帧率动画或频繁 DOM 更新的场景中，可以利用 `requestAnimationFrame` 来优化更新时机。
    *   **`ng-template` 优化**: 如果列表项内容非常简单，有时可以利用 `<ng-template>` 结合 `ViewContainerRef` 手动渲染，减少组件实例的开销 (但通常不推荐，除非有极致性能需求)。
    *   **CSS 优化**: 避免在列表项中触发昂贵的 CSS 样式计算 (如 `layout` 或 `paint` 属性)。

### 4. 谈谈你对 Angular Reactive Forms 和 Template-driven Forms 的选择和权衡。在实际项目中，你更倾向于哪种？为什么？

**深入回答**:
*   **Template-driven Forms (模板驱动表单)**:
    *   **优点**: 简单，易于上手，适合小型、简单的表单。逻辑大部分在模板中。
    *   **缺点**: 难以测试，不易控制，不适合复杂或动态的表单。验证逻辑分散在模板中。
    *   **核心**: `ngModel` 指令，双向数据绑定。
*   **Reactive Forms (响应式表单)**:
    *   **优点**:
        *   **可测试性强**: 表单模型在组件类中，易于进行单元测试。
        *   **可伸缩性强**: 适合复杂、动态的表单，可以轻松添加/删除字段、嵌套表单。
        *   **强控制**: 开发者对表单的控制力更强，可以通过代码动态修改表单结构和验证规则。
        *   **响应式**: 利用 RxJS `valueChanges` 和 `statusChanges` 轻松处理表单值的变化。
        *   **类型安全**: 更好的 TypeScript 支持。
    *   **缺点**: 学习曲线稍陡峭，需要更多样板代码。
    *   **核心**: `FormControl`, `FormGroup`, `FormArray`。
*   **选择和权衡**:
    *   **Template-driven Forms**: 当表单非常简单，且不需要复杂的验证或动态行为时，可以快速实现。
    *   **Reactive Forms**: 对于大多数企业级应用，尤其是有中等到复杂表单的场景，**强烈推荐使用响应式表单**。
*   **实际项目倾向**:
    *   在实际项目中，我**更倾向于使用响应式表单**。
    *   **原因**:
        1.  **可维护性**: 复杂的表单逻辑集中在组件类中，而不是分散在模板中，更易于理解和维护。
        2.  **可测试性**: 能够对表单的各个部分进行独立单元测试，确保表单行为的正确性。
        3.  **灵活性和动态性**: 轻松实现动态添加/删除表单控件、根据条件改变验证规则、处理复杂的交互逻辑。
        4.  **类型安全**: TypeScript 与响应式表单的配合更好，减少运行时错误。
        5.  **与 RxJS 结合**: 可以很方便地使用 RxJS 操作符处理表单值的变化，实现防抖、异步验证等高级功能。
    *   即使是简单的表单，我也可能会选择响应式表单，因为它提供了更好的代码一致性和未来的扩展性。

### 5. Angular 的性能优化除了代码层面的优化，在项目构建和部署方面还有哪些可以做？

**深入回答**:
*   **构建优化**:
    *   **AOT (Ahead-of-Time) Compilation**: 默认启用。在构建时将 Angular 模板和组件编译成高效的 JavaScript 代码，减少了浏览器在运行时编译模板的时间和下载 Angular 编译器的体积。
    *   **Tree Shaking**: 默认启用。移除未使用的代码，减小最终 bundle 的大小。确保只导入真正需要的模块和功能。
    *   **Dead Code Elimination**: 进一步移除编译后未使用的代码。
    *   **代码压缩和混淆 (Minification & Uglification)**: 减小 JavaScript、CSS 和 HTML 的文件大小。
    *   **CSS 和 HTML 压缩**: Angular CLI 会在生产构建时自动压缩它们。
    *   **Differential Loading**: 生成针对现代浏览器 (ES2015+) 和旧版浏览器 (ES5) 的不同 bundles，只为必要的浏览器提供旧版代码，减少现代浏览器的下载量。
    *   **Bundle Splitting (Code Splitting)**:
        *   **路由级延迟加载**: 通过 `loadChildren` 拆分路由模块，按需加载。
        *   **自定义 Webpack 配置**: 对于非路由模块，可以通过调整 `angular.json` 或自定义 `webpack.config.js` (`ngx-build-plus`) 来进一步配置更细粒度的代码拆分，例如按功能模块或公共库拆分。
    *   **图片优化**: 压缩图片、使用 WebP/AVIF 等现代格式、响应式图片 (`srcset`)。
    *   **字体优化**: 仅加载所需的字体子集，使用 WOFF2 格式。
*   **部署优化**:
    *   **CDN (Content Delivery Network)**: 将静态资源 (JS, CSS, 图片) 部署到 CDN，利用其分布式特性，加速用户访问。
    *   **HTTP/2 或 HTTP/3**: 提高资源加载效率，支持多路复用。
    *   **Gzip/Brotli 压缩**: 在服务器端对静态资源进行压缩，进一步减小传输体积。
    *   **浏览器缓存策略**: 配置正确的 HTTP 缓存头 (`Cache-Control`, `Expires`)，让浏览器缓存静态资源，避免重复下载。
    *   **Server-Side Rendering (SSR) / Hydration**: 提升首屏性能和 SEO。
    *   **Progressive Web Apps (PWA)**:
        *   **Service Worker**: 缓存应用外壳，提供离线能力和更快的后续加载。
        *   **Web App Manifest**: 提供安装到主屏幕的能力。
    *   **预连接/预加载 (Preconnect/Preload)**: 通过 `<link rel="preconnect">` 和 `<link rel="preload">` 提前建立连接或加载关键资源。
    *   **Long-Term Caching**: 在文件名中包含内容的哈希值 (例如 `main.d24c3e.js`)，当文件内容不变时，浏览器可以长时间缓存，只有文件内容变化时才下载新版本。
    *   **监控**: 使用性能监控工具 (如 Lighthouse, Web Vitals) 持续追踪和优化应用性能。