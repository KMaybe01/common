let arr = [1, [2, [3, 4, 5]]];

//递归实现
function flatten1(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten1(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
// console.log(flatten1(arr)); // [1, 2, 3, 4，5]
//方法一: 递归 + reduce() + concat()

function flatten1(array) {
  return array.reduce((pre, item) => {
    if (Array.isArray(item) && item.some((cItem) => Array.isArray(cItem))) {
      return pre.concat(flatten1(item));
    } else {
      return pre.concat(item);
    }
  }, []);
}

/*
方法二: ... + some() + concat()
*/
function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// function flatten2(arr) {
//     return arr.reduce(function (prev, next) {
//         return prev.concat(Array.isArray(next) ? flatten2(next) : next)
//     }, [])
// };

console.log(flatten2(arr)); // [1, 2, 3, 4，5]

//扩展运算符实现
function flatten3(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten3(arr)); // [1, 2, 3, 4，5]
//split 和 toString
function flatten4(arr) {
  return arr.toString().split(",");
}
console.log(flatten4(arr)); // [1, 2, 3, 4，5]

//ES6 中的 flat
function flatten5(arr) {
  return arr.flat(Infinity);
}
console.log(flatten5(arr)); // [1, 2, 3, 4，5]

//正则和 JSON 方法
function flatten6(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, "");
  str = "[" + str + "]";
  return JSON.parse(str);
}
// console.log(flatten6(arr)); // [1, 2, 3, 4，5]
function flattenDeep(arr) {
  const result = [];
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr];
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val);
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val);
    }
  }
  return result;
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];
console.log(flattenDeep(test));
// ["a", "b", "c", "d", "e", "f", "g"]

const flatten = (arr) =>
  arr
    .toString()
    .split(",")
    .map((item) => +item);

    
