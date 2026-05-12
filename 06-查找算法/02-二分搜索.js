/**
 * 题目：二分搜索
 * 描述：在有序数组中查找目标值，每次将搜索范围缩小一半。
 * 局限性：
 * - 只适用于顺序存储结构（数组）
 * - 元素必须有序
 * - 数据太小不适合（顺序查找即可），数据太大不适合（需要连续内存）
 *
 * 包含四种实现：
 * 1. 基本二分搜索（迭代）
 * 2. 左侧边界二分搜索
 * 3. 右侧边界二分搜索
 * 4. 递归二分搜索
 * 时间复杂度：O(log n)；空间复杂度：O(1)
 */

/**
 * binarySearch - 基本二分搜索（迭代）
 * 找到目标值即返回，不保证是第一个或最后一个
 * @param {number[]} arr
 * @param {number} value
 * @returns {number} 索引，未找到返回 -1
 */
var binarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const pivot = sortedArr[mid];
    if (pivot < value) low = mid + 1;
    else if (pivot > value) high = mid - 1;
    else return mid;
  }
  return -1;
};

/**
 * leftBinarySearch - 左侧边界二分搜索
 * 找到第一个等于目标值的索引
 */
var leftBinarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (sortedArr[mid] < value) low = mid + 1;
    else if (sortedArr[mid] > value) high = mid - 1;
    else high = mid - 1; // 收缩右边界
  }
  if (low >= arr.length || arr[low] != value) return -1;
  return low;
};

/**
 * rightBinarySearch - 右侧边界二分搜索
 * 找到最后一个等于目标值的索引
 */
var rightBinarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (sortedArr[mid] < value) low = mid + 1;
    else if (sortedArr[mid] > value) high = mid - 1;
    else low = mid + 1; // 收缩左边界
  }
  if (high < 0 || arr[high] != value) return -1;
  return high;
};

/**
 * binarySearchRecursive - 递归二分搜索
 */
const binarySearchRecursive = (arr, value, low, high) => {
  if (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < value) return binarySearchRecursive(arr, value, mid + 1, high);
    else if (arr[mid] > value) return binarySearchRecursive(arr, value, low, mid - 1);
    else return mid;
  }
  return -1;
};

const binarySearchRecursiveWrapper = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  return binarySearchRecursive(sortedArr, value, 0, sortedArr.length - 1);
};
