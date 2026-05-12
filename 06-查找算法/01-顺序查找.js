/**
 * 题目：顺序查找
 * 描述：从数组第一个元素开始，逐个比较查找目标值。
 *       是最简单但效率最低的查找方式。
 * 适用场景：数据量小、无序数组
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

/**
 * @param {Array} items 待查找数组
 * @param {*} item 目标值
 * @returns {number} 元素索引，未找到返回 -1
 */
function sequentialSearch(items, item) {
  for (let i = 0; i < items.length; i++) {
    if (item === items[i]) {
      return i;
    }
  }
  return -1;
}
