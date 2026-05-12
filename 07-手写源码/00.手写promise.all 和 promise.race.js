// 1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
// 2. 这个方法返回一个新的 promise 对象，
// 3. 遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
// 4. 参数所有回调成功才是成功，返回值数组与参数顺序一致
// 5. 参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息
// 手写promise.all 
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value => {
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
          return resolve(resolvedResult)
        }
      }, error => {
        return reject(error)
      })
    }
  })
}
//测试
let p11 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1 is OK!");
  }, 1000);
});
let p22 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 is OK!");
  }, 2000);
});
console.time("cost - all");
promiseAll([p11, p22]).then((res) => {
  console.log(res);
  console.timeEnd("cost - all");
});


// 手写promise.race 方法一
function myRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      Promise.resolve(item).then(
        (res) => {
          return resolve(res);
        },
        (reasons) => {
          return reject(reasons);
        }
      );
    });
  });
};
// 手写promise.race 方法二 简洁
function promiseRace(args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject)
    }
  })
}

let p13 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1 is OK!");
  }, 1000);
});
let p23 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 is OK!");
  }, 2000);
});
console.time("cost2 - race");
myRace([p13, p23]).then((res) => {
  console.log(res);
  console.timeEnd("cost2 - race");
});