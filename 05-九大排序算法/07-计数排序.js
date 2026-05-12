/**
 * 题目：计数排序
 * 描述：非比较排序，将输入数据值转化为键（数组下标）存储在额外开辟的数组空间中。
 *       适用于数据范围不大且为整数的场景。
 * 特性：稳定排序，非原地排序。
 * 时间复杂度：O(n + k)（k 为数据范围）
 * 空间复杂度：O(n + k)
 */

/**
 * @param {number[]} arr
 * @param {number} maxValue 数据中的最大值
 * @returns {number[]}
 */
function countingSort(arr, maxValue) {
  var bucket = new Array(maxValue + 1),
    sortedIndex = 0,
    arrLen = arr.length,
    bucketLen = maxValue + 1;

  for (var i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) bucket[arr[i]] = 0;
    bucket[arr[i]]++;
  }

  for (var j = 0; j < bucketLen; j++) {
    while (bucket[j]-- > 0) {
      arr[sortedIndex++] = j;
    }
  }
  return arr;
}
