/**
 * 题目：快速排序
 * 描述：采用分治思想，选择一个基准元素，将数组分为小于基准和大于基准两部分，
 *       然后递归排序两部分。是最常用的排序算法之一。
 * 特性：不稳定排序，原地排序（第一种实现）
 * 时间复杂度：最好/平均 O(n log n)，最坏 O(n²)
 * 空间复杂度：O(log n)（递归栈）
 *
 * 解法一：原地分区法（荷兰国旗问题思路）
 * 思路：选中间元素为基准，双指针从两端向中间扫描并交换
 *
 * 解法二：非原地法（简单易懂）
 * 思路：选最后一个元素为基准，遍历数组分到 left/right 两个新数组，递归合并
 */

/**
 * quickSort - 原地分区快速排序
 * @param {number[]} arr
 * @returns {number[]}
 */
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;
}

function quick(arr, start, end) {
  if (arr.length > 1) {
    const index = partition(arr, start, end);
    if (start < index - 1) quick(arr, start, index - 1);
    if (index < end) quick(arr, index, end);
  }
}

/**
 * 分区函数：将数组分为小于基准和大于基准的两部分
 * 选中间元素为基准，双指针向中间扫描并交换
 */
function partition(arr, start, end) {
  const pivot = arr[Math.floor((start + end) / 2)];
  let i = start, j = end;
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}

/**
 * quickSortSimple - 非原地快速排序（易理解）
 * @param {number[]} arr
 * @returns {number[]}
 */
function quickSortSimple(arr) {
  if (arr.length < 2) return arr;
  const cur = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= cur) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSortSimple(left), cur, ...quickSortSimple(right)];
}
