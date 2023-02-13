/*
 * 数据类型检测：
 *   + typeof
 *     + 直接在计算机底层基于数据类型的值（二进制）进行检测
 *     + tyepof null  "object"   对象存储在计算机中，都是以000开始的二进制存储，null也是，所以检测出来的结果是对象
 *     + typeof 普通对象/数组对象/正则对象/日期对象  "object"
 *
 *   + instanceof  检测当前实例是否属于这个类的
 *     + 底层机制：只要当前类出现在实例的原型链上，结果都是true
 *     + 由于我们可以肆意的修改原型的指向，所以检测出来的结果是不准的
 *     + 不能检测基本数据类型
 *
 *   + constructor
 *     + 用起来看似比instanceof还好用一些（基本类型支持的）
 *     + constructor可以随便改，所以也不准
 *
 *   + Object.prototype.toString.call([value])
 *     + 标准检测数据类型的办法：Object.prototype.toString不是转换为字符串，是返回当前实例所属类的信息
 *     + 标准检测的办法 "[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RegExp/Date/Function]"
 */

//简洁面试版
const getType = (value) => {

  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    // let valueClass = Object.prototype.toString.call(value),
    //     type = valueClass.split(" ")[1].split("");
    // type.pop();
    // return type.join("").toLowerCase();
    return changeData(Object.prototype.toString.call(value).slice(8, -1).toLowerCase()); // -1代表最后一位
    // [object Array] ===> Array [object Object] ==> Object
  } else if (value === null){
     // 判断数据是 null 的情况
     return changeData(value);
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return changeData(typeof value);
  }
}

const changeData = (value) => {
  return value[0].toUpperCase() + value.slice(1);
};

console.log("========getType==========");
console.log(getType(Symbol())); //symbol
console.log(getType(null)); //null
console.log(getType([])); //array
console.log(getType({})); //Object
console.log(getType(12)); //number
console.log(getType(undefined)) //undefined
//==================

let obj2 = {
  name: "珠峰培训",
};
// console.log(obj2.toString()); //=>"[object Object]"
// -> toString方法执行，this是obj，所以检测是obj它的所属类信息
// 推测：是不是只要把Object.prototype.toString执行，让它里面的this变为要检测的值，那就能返回当前值所属类的信息
console.log(obj2.toString()); // [object Object]
console.log(obj2.valueOf()); // { name: '珠峰培训' }
