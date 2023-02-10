
/*
 * @param fn <function>有回调函数作为参数的函数
 * @param reverse <Boolean> 默认False。当fn的回调函数参数在前时(如setTimeout)，设为True。
 */
function promisify(fn, reverse) {
    if ({}.toString.call(fn) !== '[object Function]') {
        throw new TypeError('Only normal function can be promisified');
    }
    return function (...args) {
        return new Promise((resolve, reject) => {
            const callback = function (...args) {
                if ({}.toString.call(args[0]) === '[object Error]') {
                    return reject(args[0]);
                }
                resolve(args);
            };
            try {
                if (reverse === true) {
                    fn.apply(null, [callback, ...args]);
                } else {
                    fn.apply(null, [...args, callback]);
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}

// foo 可以是任何需要调用回调函数的函数
function foo(str1, str2, callback) {
    setTimeout(() => {
        console.log('wait a minute')
        // callback函数是通过最后一个参数这个位置来识别的，与callback这个名字无关
        callback(str1, str2)
    }, 1000)
}

// 这里的agent已经不是foo函数，而是我们在promisify中返回的自定义匿名函数
// 所以不需要纠结是否传入callback函数。
let agent = promisify(foo)

agent('hello', 'world')
    .then(res => {
        console.log(res)
    })
// wait a minute
// [ 'hello', 'world' ]
    