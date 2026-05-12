/**
 * 题目：希尔排序
 * 描述：插入排序的改进版，通过将数组分组进行插入排序来减少元素移动距离。
 *       先取一个间隔 gap，将数组分为 gap 组分别插入排序，
 *       然后缩小 gap 重复操作，直到 gap = 1 完成最终排序。
 * 特性：不稳定排序，原地排序。
 * 时间复杂度：O(n log n) ~ O(n²) 取决于 gap 序列
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function shellSort(arr) {
  let length = arr.length;
  let interval = Math.floor(length / 2);

  while (interval >= 1) {
    for (let i = interval; i < length; i++) {
      let temp = arr[i];
      let j = i;
      while (arr[j - interval] > temp && j - interval >= 0) {
        arr[j] = arr[j - interval];
        j -= interval;
      }
      arr[j] = temp;
    }
    interval = Math.floor(interval / 2);
  }
  return arr;
}
