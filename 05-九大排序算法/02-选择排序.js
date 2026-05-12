/**
 * 题目：选择排序
 * 描述：每轮从未排序部分选出最小值，放到已排序部分的末尾。
 *       原地排序，不稳定（例如 [5,5,2] 第一个5会被交换到后面）。
 * 时间复杂度：O(n²)（任何情况）
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}
