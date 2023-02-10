/**
 * @param {number[]} nums 传入数组
 * @param {number} k 滑动窗口宽度
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (k <= 1) {
    return nums;
  }
  const result = [];
  const deque = [];
  // 1 将窗口第一个位置的数据添加到 deque 中，保持递减
  deque.push(nums[0]);
  let i = 1;
  for (; i < k; i++) {
    // - 存在数据
    // - 当前数据大于队尾值
    //   - 出队，再重复比较
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }
  // 将第一个位置的最大值添加到 result
  result.push(deque[0]);

  // 2 遍历后续的数据
  const len = nums.length;
  for (; i < len; i++) {
    // 同上进行比较
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
    // 检测当前最大值是否位于窗口外
    if (deque[0] === nums[i - k]) {
      deque.shift();
    }
    // 添加最大值到 result
    result.push(deque[0]);
  }

  return result;
};
//暴力
// 时间复杂度：O(n*k)
// 空间复杂度：O(n)
const maxSlidingWindow = function (nums, k) {
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
// 优化：双端队列
//时间复杂度 O(n)
// 空间复杂度 O(n)
const maxSlidingWindow = function (nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // 把滑动窗⼝之外的踢出
    if (i - deque[0] >= k) {
      deque.shift();
    }
    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
};
