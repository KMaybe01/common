/**
 * 题目：冒泡排序
 * 描述：重复遍历数组，依次比较相邻两个元素，如果顺序错误则交换。
 *       每轮遍历将最大（或最小）元素"冒泡"到数组末尾。
 * 特性：稳定排序，原地排序
 * 时间复杂度：最好 O(n)（已有序），最坏/平均 O(n²)
 * 空间复杂度：O(1)
 *
 * 三个版本对比：
 * - bubbleSort：标准冒泡
 * - bubbleSort2：记录最后交换位置优化（已排序区域无需再比较）
 * - bubbleSort3：提前退出优化（一轮无交换即有序）
 */

const arr = [5, 4, 3, 2, 1, 0];

/** 标准冒泡排序 */
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return arr;
}

/** 改进版：记录最后交换位置，已排序部分不再比较 */
function bubbleSort2(arr) {
  let i = arr.length - 1;
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
  return arr;
}

/** 改进版：提前退出，一轮无交换即有序 */
function bubbleSort3(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (!flag) break;
  }
  return arr;
}
