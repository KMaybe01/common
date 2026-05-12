/**
 * 题目：归并排序（分治策略）
 * 描述：采用分治思想，将数组递归分成两半分别排序，再合并为有序数组。
 *       分治的三步：分解 -> 解决 -> 合并
 * 时间复杂度：O(n log n)；空间复杂度：O(n)
 */

/**
 * mergeSort - 归并排序
 * @param {number[]} arr
 * @returns {number[]}
 */
const mergeSort = (arr) => {
  if (arr.length > 1) {
    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    arr = merge(left, right);
  }
  return arr;
};

/**
 * merge - 合并两个有序数组
 */
const merge = (left, right) => {
  let i = 0, j = 0;
  const res = [];
  while (i < left.length && j < right.length) {
    res.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return res.concat(i < left.length ? left.slice(i) : right.slice(j));
};
