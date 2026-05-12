/**
 * 题目：滑动窗口最大值（LeetCode 239）
 * 描述：给定数组 nums 和滑动窗口大小 k，窗口从数组最左端移动到最右端，
 *       每次只向右移动一位。返回每个滑动窗口中的最大值。
 * 示例：nums = [1,3,-1,-3,5,3,6,7], k = 3
 *       输出：[3,3,5,5,6,7]
 *
 * 解法一：双端队列法 - 正向初始化
 * 思路：维护一个递减的双端队列，队首始终为当前窗口的最大值。
 *       分两步处理：先初始化第一个窗口，再遍历剩余元素。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {number[]} nums
 * @param {number} k 窗口大小
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (k <= 1) return nums;
  const result = [];
  const deque = [];

  // 1. 初始化第一个窗口
  deque.push(nums[0]);
  let i = 1;
  for (; i < k; i++) {
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }
  result.push(deque[0]);

  // 2. 滑动窗口
  const len = nums.length;
  for (; i < len; i++) {
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
    // 最大值滑出窗口时移除
    if (deque[0] === nums[i - k]) {
      deque.shift();
    }
    result.push(deque[0]);
  }
  return result;
};

/**
 * 解法二：暴力法
 * 思路：每次窗口滑动后，遍历窗口内所有元素求最大值。
 * 时间复杂度：O(n*k)；空间复杂度：O(n)
 */
const maxSlidingWindowBrute = function (nums, k) {
  if (k === 1) return nums;
  let result = [],
    arr = [];
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    if (i >= k - 1) {
      result.push(Math.max(...arr));
      arr.shift();
    }
  }
  return result;
};

/**
 * 解法三：双端队列法 - 存储索引（优化版）
 * 思路：双端队列中存储数组下标而非值，便于判断元素是否在窗口外。
 *       队首始终是当前窗口的最大值下标。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */
const maxSlidingWindowOptimized = function (nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // 移除不在窗口内的元素
    if (i - deque[0] >= k) {
      deque.shift();
    }
    // 保持递减：移除所有小于当前值的队尾
    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);
    // 窗口形成后记录最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
};
