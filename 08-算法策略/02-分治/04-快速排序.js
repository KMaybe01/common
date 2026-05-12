/**
 * 题目：快速排序（分治策略）
 * 描述：选择一个基准元素，将数组分为小于基准和大于基准两部分，递归排序。
 *       分治三步：选择基准 -> 分区 -> 递归排序
 *
 * 解法一：原地分区法
 * 思路：双指针从两端向中间扫描，交换不符合要求的元素
 * 时间复杂度：平均 O(n log n)，最坏 O(n²)；空间复杂度：O(log n)
 *
 * 解法二：非原地法（易理解）
 * 思路：遍历数组，将元素分类到 left/right 两个新数组，递归合并
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
 * quickSortSimple - 非原地快速排序
 * @param {number[]} arr
 * @returns {number[]}
 */
function quickSortSimple(arr) {
  if (arr.length < 2) return arr;
  const cur = arr[arr.length - 1];
  let left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= cur) right.push(arr[i]);
    else left.push(arr[i]);
  }
  return [...quickSortSimple(left), cur, ...quickSortSimple(right)];
}
