/**
 * 题目：堆排序
 * 描述：利用堆数据结构进行排序。先将数组构建成一个大顶堆，
 *       然后反复将堆顶（最大值）与末尾交换，缩小堆范围并堆化。
 *
 * 核心概念：
 * - 大顶堆：每个节点的值 >= 其子节点的值
 * - 自下而上堆化：节点与父节点比较调整
 * - 自上而下堆化：节点与子节点比较调整（本文使用）
 *
 * 注意：此实现使用 1-based 索引（堆的有效范围从索引 1 开始），
 *       输入数组索引 0 位置为空。
 * 时间复杂度：建堆 O(n)，排序 O(n log n)
 * 空间复杂度：O(1)
 */

/**
 * heapSort - 堆排序
 * @param {number[]} items
 * @returns {number[]}
 */
function heapSort(items) {
  buildHeap(items, items.length - 1);
  let heapSize = items.length - 1;
  for (var i = items.length - 1; i > 1; i--) {
    swap(items, 1, i);
    heapSize--;
    heapify(items, heapSize, 1);
  }
  return items;
}

/**
 * buildHeap - 原地建大顶堆
 * 从最后一个非叶子节点开始，自下而上堆化
 * @param {number[]} items
 * @param {number} heapSize
 */
function buildHeap(items, heapSize) {
  for (let i = Math.floor(heapSize / 2); i >= 1; --i) {
    heapify(items, heapSize, i);
  }
}

/**
 * heapify - 自上而下堆化
 * 将节点 i 与左右子节点比较，与最大值交换后继续向下堆化
 * @param {number[]} items
 * @param {number} heapSize
 * @param {number} i 当前节点索引
 */
function heapify(items, heapSize, i) {
  while (true) {
    var maxIndex = i;
    if (2 * i <= heapSize && items[i] < items[i * 2]) {
      maxIndex = i * 2;
    }
    if (2 * i + 1 <= heapSize && items[maxIndex] < items[i * 2 + 1]) {
      maxIndex = i * 2 + 1;
    }
    if (maxIndex === i) break;
    swap(items, i, maxIndex);
    i = maxIndex;
  }
}

function swap(items, i, j) {
  let temp = items[i];
  items[i] = items[j];
  items[j] = temp;
}

// items[0] 为空，实际数据从索引 1 开始
var items = [1, 9, 2, 8, 3, 7, 4, 6, 5];
