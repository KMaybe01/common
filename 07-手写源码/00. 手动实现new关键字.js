/* 在调用  new 的过程中会发生以上四件事情：
（1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。(将创建对象的 __proto__ 指向构造函数的 prototype)
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。 */

//方法一
function newObject() {
  let obj = {};
  var Constructor = Array.prototype.shift.apply(arguments);
  obj.__proto__ = Constructor.prototype;
  let res = Constructor.apply(obj, arguments);
  return typeof res == "object" ? res : obj;
}
// 测试
function company(name, address) {
  this.name = name;
  this.address = address;
}

console.log(newObject(company, 'yideng', 'beijing')); //company { name: 'yideng', address: 'beijing' }
/* 
通过现代浏览器的操作属性的便利性， 可以改变⼀ 个对象的[[Prototype]] 属性, 
这种⾏ 为在每⼀ 个JavaScript引擎和浏览器中都是⼀ 个⾮ 常慢且影响性能的操作， 
使⽤ 这种⽅式来改变和继承属性是对性能影响⾮ 常严重的， 并且性能消耗的时间也不是简单的花费
在 obj.__proto__ = ...语句上, 它还会影响到所有继承来⾃ 该[[Prototype]] 的对
象， 如果你关⼼ 性能， 你就不应该在⼀ 个对象中修改它的[[Prototype]]。 相反, 创建⼀ 个新的且
可以继承[[Prototype]] 的对象，推荐使⽤ Object.create()
 */

//方法二 改进版

function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
//objectFactory(构造函数, 初始化参数);
console.log(objectFactory(company, 'yideng', 'beijing')); //company { name: 'yideng', address: 'beijing' }