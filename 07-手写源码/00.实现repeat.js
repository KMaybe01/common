/* 
实现一个repeat方法

function repeat(func, times, wait) {
    // TODO
  }
const repeatFunc = repeat(alert, 4, 3000); */
// 调用这个 repeatFunc ("hellworld")，会alert4次 helloworld, 每次间隔3秒

//方法一
function repeat1(func, times, wait) {
    const oThis = this;
    let timer = null;

    const rFuntion = (msg) => {
        timer = setTimeout(() => {
            func.call(oThis, msg);
            times--;
            if (times > 0) {
                rFuntion(msg);
            } else {
                clearTimeout(timer);
            }
        }, wait);
    };
    return (msg) => {
        if (timer) clearTimeout(timer);
        rFuntion(msg);
    };
} //实现打印4次，每次间隔 3000ms

const repeatFun1 = repeat1(console.log, 4, 3000);
repeatFun1("Hello World1");


//方法二
function repeat2(func, times, wait) {
    const oThis = this;
    let timer = null;

    const rFuntion = (msg) => {
        return new Promise(function (resolve) {
            timer = setTimeout(() => {
                func.call(oThis, msg);
                resolve();
            }, wait);
        });
    };
    return async function (msg) {
        while (times > 0) {
            await rFuntion(msg);
            times--;
        }
        clearTimeout(timer);
    };
} //实现打印4次，每次间隔 3000ms

const repeatFun2 = repeat2(console.log, 4, 3000);
repeatFun2("Hello World2");

//方法三

function repeat3(func, times, wait) {
    // your code
    return async function (str) {
        let print = function () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    func(str);

                    resolve();
                }, wait);
            });
        };

        for (let x of Array.from({
                length: times
            })) {
            await print();
        }
    };
}
const repeatFun3 = repeat3(console.log, 4, 3000);
repeatFun3("Hello World3"); // 实现打印4次，每次间隔3000ms

//方法四
function repeat4(func, times, wait) {
    return function (content) {
        let count = 0;
        let interval = setInterval(function () {
            count += 1;
            func(content);
            if (count === times) {
                clearInterval(interval);
            }
        }, wait);
    };
}
const repeatFun4 = repeat4(console.log, 4, 3000);
repeatFun4("Hello World4");


/* function repeat(s, n) {
    return (new Array(n + 1)).join(s);
}
//递归
function repeat(s, n) {
    return (n > 0) ? s.concat(repeat(s, --n)) : "";
}
const s = "helloword!!!"
console.log(repeat(s, 3)); */