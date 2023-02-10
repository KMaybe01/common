/* function A() {
    console.log("调用了函数A");
} */

//原型方法
Function.prototype.before = function (beforeFN) {
  if (typeof callback !== "function")
    throw new TypeError("callback must be function");
  var _self = this; //保存原函数的引用
  return function () {
    //返回包含了原函数和新函数的代理函数
    beforeFN.apply(_self, arguments); //执行新函数，修正this
    return _self.apply(this, arguments); //执行原函数
  };
};

Function.prototype.after = function (afterFN) {
  if (typeof callback !== "function")
    throw new TypeError("callback must be function");
  var _self = this;
  return function () {
    var fn = _self.apply(this, arguments);
    afterFN.apply(_self, arguments);
    return fn;
  };
};

var A = function () {
  console.warn("调用了函数A");
};

A = A.before(function () {
  console.warn("前置钩子 HelloWorld");
}).after(function () {
  console.warn("后置钩子 HelloWorld");
});

A();

//暴力方法

function A() {
  console.log("调用了函数A");
}
const nativeA = A;
A = function () {
  console.log("HelloWorld");
  nativeA();
};
A();

Function.prototype.before = function before(callback) {
  if (typeof callback !== "function")
    throw new TypeError("callback must be function");
  // this->func
  let _self = this;
  return function proxy(...params) {
    // this !== func 调用时候才知道
    //控制callback和func本身的先后执行顺序
    callback.call(this, ...params);
    return _self.call(this, ...params); //func执行结果
  };
};
Function.prototype.after = function after(callback) {
  if (typeof callback !== "function")
    throw new TypeError("callback must be function");
  let _self = this;
  return function proxy(...params) {
    _self.call(this, ...params); //func执行结果
    callback.call(this, ...params);
  };
};

let func = () => {
  // 主要的业务逻辑
  console.log("func");
};
/* func.before(() => {
    console.log('===before===');
})(); */

func
  .before(() => {
    console.log("===before===");
  })
  .after(() => {
    console.log("===after===");
  })();

// ===before===
// func
// ===after===
