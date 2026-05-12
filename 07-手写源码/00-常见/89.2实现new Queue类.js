/* new Queue()
.task(1000,()=>console.log(1))
.task(2000,()=>console.log(2))
.task(3000,()=>console.log(3)).start();
实现一个Queue函数，调用start之后，1s后打印1，接着2s后打印2，然后3s后打印3
 */
function sleep(delay, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback();
            resolve()
        }, delay);
    })
}
class Queue {
    constructor() {
        this.listenser = [];
    }
    task(delay, callback) {
        // 收集函数
        this.listenser.push(() => sleep(delay, callback));
        return this;
    }
    async start() {
        // 遍历函数
        for (let l of this.listenser) {
            await l()
        }
    }
}

new Queue()
    .task(1000, () => console.log(1))
    .task(2000, () => console.log(2))
    .task(3000, () => console.log(3)).start();


// class Queue2 {
//     constructor() {
//         this.allTasks = [];
//         this.limitNumber = 1;
//         this.loop = 0;
//     }
//     task(wait, cb) {
//         this.allTasks.push({
//             wait,
//             cb
//         })
//         return this;
//     }
//     start() {
//         // 启动任务
//         return this.run(this.allTasks.slice(this.loop * this.limitNumber,
//             this.loop * this.limitNumber + this.limitNumber))
//     }
//     run(tasks) {
//         var detail = tasks[0];
//         if (!detail) {
//             this.loop = 0;
//             return Promise.resolve();
//         }
//         return new Promise((resolve, reject) => {
//                 // 本次任务
//                 setTimeout(() => {
//                     detail.cb();
//                     this.loop++;
//                     resolve();
//                 }, detail.wait);
//             })
//             .then(res => {
//                 // 下次任务
//                 return this.run(this.allTasks.slice(this.loop * this.limitNumber,
//                     this.loop * this.limitNumber + this.limitNumber))
//             })
//     }
// }
// new Queue2()
//     .task(1000, () => {
//         console.log(1)
//     })
//     .task(2000, () => {
//         console.log(2)
//     })
//     .task(1000, () => {
//         console.log(3)
//     })
//     .start()