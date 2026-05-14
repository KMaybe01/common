# 异步并发调度器 Scheduler

> 实现一个任务调度器，控制同时执行的任务数量不超过 2 个，超出部分进入队列等待。

## Mermaid 流程图

```mermaid
flowchart TD
    A[add promiseCreator] --> B{usingTask.length < 2?}
    B -->|是| C[调用 usingRun 立即执行]
    B -->|否| D[加入 tasks 队列等待]
    C --> E[promiseCreator 执行完毕]
    E --> F[调用 usingMove 移除]
    F --> G{tasks 队列有任务?}
    G -->|是| H[shift 取出第一个任务执行]
    G -->|否| I[结束]

    subgraph 执行顺序示例
        J[addTask 400,4] --> K[addTask 200,2]
        K --> L[addTask 300,3]
        L --> M[addTask 100,1]
        M --> N[并发执行 400 和 200]
        N --> O[200 先完成 → 打印 2]
        O --> P[从队列取出 300 执行]
        P --> Q[300 完成 → 打印 3]
        Q --> R[400 完成 → 打印 4]
        R --> S[从队列取出 100 执行]
        S --> T[100 完成 → 打印 1]
    end
```

## 源代码

```javascript
class Scheduler {
	constructor() {
		this.tasks = [], // 待运行的任务
			this.usingTask = []; // 正在运行的任务
	}
	// promiseCreator 是一个异步函数，return Promise
	add(promiseCreator) {
		return new Promise((resolve, reject) => {
			promiseCreator.resolve = resolve
			if (this.usingTask.length < 2) {
				this.usingRun(promiseCreator)
			} else {
				this.tasks.push(promiseCreator)
			}
		})
	}

	usingRun(promiseCreator) {
		this.usingTask.push(promiseCreator)
		promiseCreator().then(() => {
			promiseCreator.resolve()
			this.usingMove(promiseCreator)
			if (this.tasks.length > 0) {
				this.usingRun(this.tasks.shift())
			}
		})
	}

	usingMove(promiseCreator) {
		let index = this.usingTask.findIndex(promiseCreator)
		this.usingTask.splice(index, 1)
	}
}

const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
	scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(400, 4)
addTask(200, 2)
addTask(300, 3)
addTask(100, 1)

// 2, 4, 3, 1
```

## 逐行解析

### Scheduler 类
- **`this.tasks`**：待运行的任务队列。
- **`this.usingTask`**：正在运行中的任务列表（最多 2 个）。
- **`add(promiseCreator)`**：添加一个异步任务。返回一个 Promise，外部可以通过 `.then` 拿到任务完成的信号。在内部，将 `resolve` 挂载到 `promiseCreator.resolve` 上，以便在任务真正完成时通知外部。
- **`if (this.usingTask.length < 2)`**：如果当前并发数未达到上限（2），立即执行；否则入队等待。
- **`usingRun(promiseCreator)`**：将任务加入 `usingTask`，然后执行它。执行完毕后，调用 `resolve` 通知外部，从 `usingTask` 中移除自己，并从 `tasks` 队列中取出下一个任务执行。
- **`usingMove(promiseCreator)`**：从 `usingTask` 中找到并移除已完成的 promiseCreator。

### 测试部分
- **`timeout(time)`**：返回一个在指定时间后 resolve 的 Promise。
- **`addTask(400, 4)`**：400ms 后打印 4。
- 四个任务的执行顺序：初始并发执行前两个（400 和 200），200 先完成（打印 2），从队列取出 300；300 完成（打印 3）；400 完成（打印 4），从队列取出 100；100 完成（打印 1）。最终输出顺序：**2, 4, 3, 1**。

## 复杂度分析

| 维度 | 复杂度 | 说明 |
|------|--------|------|
| 时间复杂度 | O(n) | 每个任务添加为 O(1)，执行与完成的回调为 O(1) |
| 空间复杂度 | O(n) | tasks 队列和 usingTask 数组存储所有待处理和正在处理的任务 |
| 并发控制 | 2 | 通过 `usingTask.length < 2` 限制最大并发数 |
