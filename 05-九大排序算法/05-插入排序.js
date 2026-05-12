/**
 * 题目：插入排序
 * 描述：构建有序序列，遍历未排序数据，在已排序序列中从后向前扫描找到插入位置。
 *       类似打扑克牌时整理手牌的过程。
 * 特性：稳定排序，原地排序。小规模数据时性能优于冒泡和选择排序。
 * 时间复杂度：最好 O(n)（已有序），最坏/平均 O(n²)
 * 空间复杂度：O(1)
 */

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
function insertionSort(arr) {
  const len = arr.length;
  let temp;
  for (let i = 1; i < len; i++) {
    temp = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
