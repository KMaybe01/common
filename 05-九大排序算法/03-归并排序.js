/**
 * 题目：归并排序
 * 描述：采用分治思想，将数组递归地分成两半，分别排序后再合并。
 *       稳定排序，需要额外空间。
 * 步骤：
 * 1. 将数组平分成两个子数组
 * 2. 递归对子数组排序，直到长度为 1
 * 3. 合并两个有序子数组为一个有序数组
 * 时间复杂度：O(n log n)（任何情况）
 * 空间复杂度：O(n)
 */

/**
 * 归并排序（递归分治 + 合并）
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
 * 合并两个有序数组
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
const merge = (left, right) => {
  let i = 0, j = 0;
  const res = [];
  while (i < left.length && j < right.length) {
    res.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return res.concat(i < left.length ? left.slice(i) : right.slice(j));
};
