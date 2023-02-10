//方法一
Array.prototype.myForEach = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + "is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    fn.call(this, this[i], i, this);
  }
};
var a = [3, 4, 5, 6];
console.log("方法一")
a.myForEach((item, index) => {
  console.log(item, index, "====");
});
/* 
  3 0 === =
  4 1 === =
  5 2 === =
  6 3 === = 
  */

//方法二
Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  let obj = Object(this),
    len = obj.length;
  idx = 0;
  while (idx < len) {
    let value;
    if (k in obj) {
      value = obj[k];
      callback.call(thisArg, value, k, obj);
    }
    idx++;
  }
};
console.log("方法二")
var a = [3, 4, 5, 6];
a.myForEach((item, index) => {
  console.log(item, index, "====");
});