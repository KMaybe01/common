/**
 * 题目：数组中的第 K 个最大元素（LeetCode 215）
 * 描述：在未排序的数组中找到第 k 个最大的元素。注意是排序后的第 k 个最大元素。
 * 示例：输入 [4,5,1,6,2,7,3,8] 和 k = 4，输出 5
 *
 * 四种解法对比：
 * 1. 暴力法：排序后取第 k-1 个
 * 2. 局部排序（冒泡）：只冒泡 k 轮
 * 3. 小顶堆：维护大小为 k 的小顶堆
 * 4. 快速选择（QuickSelect）：利用快排分区思想
 */

/**
 * 解法一：暴力法
 * 直接降序排序，取第 k-1 个元素
 * 时间复杂度：O(n log n)；空间复杂度：O(log n)
 */
let findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
};

/**
 * 解法二：局部冒泡排序
 * 只进行 k 轮冒泡，第 k 轮冒泡后第 k 个最大元素已就位
 * 时间复杂度：最好 O(n)，平均 O(n*k)；空间复杂度：O(1)
 */
let findKthLargest2 = function (nums, k) {
  bubbleSort(nums, k);
  return nums[nums.length - k];
};

let bubbleSort = function (arr, k) {
  for (let i = 0; i < k; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        flag = true;
      }
    }
    if (!flag) break;
  }
};

/**
 * 解法三：小顶堆法
 * 维护一个大小为 k 的小顶堆，堆顶就是第 k 大的元素
 * 时间复杂度：O(n log k)；空间复杂度：O(k)
 */
let findKthLargest3 = function (nums, k) {
  let heap = [,], i = 0;
  while (i < k) heap.push(nums[i++]);
  buildHeap(heap, k);

  for (let i = k; i < nums.length; i++) {
    if (heap[1] < nums[i]) {
      heap[1] = nums[i];
      heapify(heap, k, 1);
    }
  }
  return heap[1];
};

let buildHeap = (arr, k) => {
  if (k === 1) return;
  for (let i = Math.floor(k / 2); i >= 1; i--) {
    heapify(arr, k, i);
  }
};

let heapify = (arr, k, i) => {
  while (true) {
    let minIndex = i;
    if (2 * i <= k && arr[2 * i] < arr[i]) minIndex = 2 * i;
    if (2 * i + 1 <= k && arr[2 * i + 1] < arr[minIndex]) minIndex = 2 * i + 1;
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      i = minIndex;
    } else break;
  }
};

/**
 * 解法四：快速选择（QuickSelect）
 * 利用快排的 partition 分区，根据分区索引与目标位置的关系只递归一侧
 * 平均时间复杂度：O(n)；最坏 O(n²)；空间复杂度：O(1)
 */
let findKthLargest4 = function (nums, k) {
  return quickSelect(nums, nums.length - k);
};

let quickSelect = (arr, k) => {
  return quick(arr, 0, arr.length - 1, k);
};

let quick = (arr, left, right, k) => {
  let index;
  if (left < right) {
    index = partition(arr, left, right);
    if (k === index) return arr[index];
    else if (k < index) return quick(arr, left, index - 1, k);
    else return quick(arr, index + 1, right, k);
  }
  return arr[left];
};

let partition = (arr, left, right) => {
  var datum = arr[Math.floor(Math.random() * (right - left + 1)) + left],
    i = left, j = right;
  while (i < j) {
    while (arr[i] < datum) i++;
    while (arr[j] > datum) j--;
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
    if (arr[i] === arr[j] && i !== j) i++;
  }
  return i;
};
