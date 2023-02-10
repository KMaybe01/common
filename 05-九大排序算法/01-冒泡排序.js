// 冒泡排序
// 时间复杂度： 最好时间复杂度 O(n)，平均时间复杂度 O(n2)
// 空间复杂度：O(1)
const arr = [5, 4, 3, 2, 1, 0];
function bubbleSort(arr) {
  const len = arr.length;
  console.time("1.冒泡排序耗时");
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  console.timeEnd("1.冒泡排序耗时");
  return arr;
}
console.log(bubbleSort(arr));

// 改进冒泡排序
function bubbleSort2(arr) {
  let i = arr.length - 1;
  console.time("2.改进后冒泡排序耗时");
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    i = pos;
  }
  console.timeEnd("2.改进后冒泡排序耗时");
  return arr;
}
console.log(bubbleSort2(arr));

function bubbleSort3(arr) {
  console.time("3.改进后冒泡排序耗时");
  for (let i = 0; i < arr.length; i++) {
    // 提前退出冒泡循环的标识位
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
        // 表示发⽣了数据交换
      }
    }
    // 没有数据交换
    if (!flag) break;
  }
  console.timeEnd("3.改进后冒泡排序耗时");
  return arr;
}

console.log(bubbleSort3(arr)); // [1, 2, 3, 4, 5]
