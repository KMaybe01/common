const task1 = (callback) => setTimeout(() => {
    console.log(1);
    callback();
}, 500);
const task2 = (callback) => setTimeout(() => {
    console.log(2);
    callback();
}, 200);
const task3 = (callback) => setTimeout(() => {
    console.log(3);
    callback();
}, 300);
// 同步实现func([task1, task2, task3])
const func = args => {
    if (args.length > 0) new Promise(resolve => args.shift()(resolve)).then(() => func(args))
}
func([task1, task2, task3])