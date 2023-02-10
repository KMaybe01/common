//实现函数柯里化

//参数长度固定

// const curry = (fn) =>
// (judge = (...args) =>
//     args.length === fn.length
//     ? fn(...args)
//     : (...arg) => judge(...args, ...arg));
// const add = (a, b, c) => a + b + c;
// const curryAdd = curry(add);
// console.log(curryAdd(1)(2)(3)); // 6

//粗暴版
function add2(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(add2(1)(2)(3)); //6

//完美法
function add(...args) {
  return args.reduce((a, b) => a + b);
}

function currying(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      // args.push(...newArgs)
      // args = args.concat(newArgs)

      return temp;
    } else {
      let val = fn.apply(this, args);
      args = []; //保证再次调用时清空
      return val;
    }
  };
}
let addCurry = currying(add);
console.log(add(1, 2, 3, 4, 5)); //15
console.log(addCurry(1)(2)(3)(4, 5)()); //15
console.log(addCurry(1)(2)(3, 4, 5)()); //15
console.log(addCurry(1)(2, 3, 4, 5)()); //15

//箭头函数
const curry = (fn) => {
  let argList = [];
  return function curryFn(...args) {
    if (!args.length) {
      return fn(...argList);
    } else {
      argList = argList.concat(args);
      return curryFn;
    }
  };
};
const addFn = (...args) => args.reduce((total, cur) => total + cur, 0);
// addFn 的输入参数个数不一定，会将传入的所有参数都相加求和
console.log(addFn(1, 2, 3, 4)); //10
const add3 = curry(addFn);
console.log(add3(1, 2)(3)(4)()); //10

// ES6 实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

let addCurry2 = curry(add, 1, 5, 8);
console.log(addCurry2); //=>14
