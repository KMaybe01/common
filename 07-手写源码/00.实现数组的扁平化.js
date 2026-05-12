let arr = [1, [2, [3, 4, 5]]];


// 栈
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
console.log(flattenDeep(test));  // [ 'a', 'b', 'c','d', 'e', 'f', 'g']


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

/*
方法二: ... + some() + concat()
*/
//扩展运算符实现
function flatten3(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log('====test3=====')
console.log(flatten3(test))

//split 和 toString
function flatten4(arr) {
  return arr.toString().split(",");
}


//ES6 中的 flat
function flatten5(arr) {
  return arr.flat(Infinity);
}






    
