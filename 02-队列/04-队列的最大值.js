/**
 * 题目：队列的最大值（剑指 Offer 59-II / LeetCode 面试题59）
 * 描述：设计一个队列，支持在 O(1) 时间内获取队列中的最大值。
 *      包含 push_back（队尾入队）、pop_front（队首出队）和 max_value（获取最大值）操作。
 *
 * 解法思路：辅助双端队列维护最大值
 * - queue：常规队列，存储所有数据（基于对象实现）
 * - deque：辅助双端队列，维护一个递减序列，队首始终为当前最大值
 * - 入队时，将 deque 中所有小于当前值的元素从队尾移除，再入队
 * - 出队时，如果 queue 的队首与 deque 的队首相同，则 deque 也出队
 * - max_value 直接返回 deque 的队首
 *
 * 时间复杂度：所有操作均为 O(1)（均摊）；空间复杂度：O(n)
 */

/**
 * 构造函数 - 初始化队列和双端队列
 */
var MaxQueue = function () {
  /** queue 存储所有队列数据 */
  this.queue = {};
  /** deque 双端队列维护每个阶段的最大值 */
  this.deque = {};
  this.countQ = this.countD = this.headQ = this.headD = 0;
};

/**
 * push_back - 队尾入队
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  this.queue[this.countQ++] = value;
  // 将 deque 中所有小于 value 的队尾元素移除（保持递减）
  while (!this.isEmptyDeque() && value > this.deque[this.countD - 1]) {
    delete this.deque[--this.countD];
  }
  this.deque[this.countD++] = value;
};

/**
 * pop_front - 队首出队
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  if (this.isEmptyQueue()) {
    return -1;
  }
  // 如果出队元素是当前最大值，deque 也同步出队
  if (this.queue[this.headQ] === this.deque[this.headD]) {
    delete this.deque[this.headD++];
  }
  const frontData = this.queue[this.headQ];
  delete this.queue[this.headQ++];
  return frontData;
};

/**
 * max_value - 获取队列中的最大值
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  if (this.isEmptyDeque()) {
    return -1;
  }
  return this.deque[this.headD];
};

/**
 * 检测双端队列 deque 是否为空
 */
MaxQueue.prototype.isEmptyDeque = function () {
  return !(this.countD - this.headD);
};

/**
 * 检测常规队列 queue 是否为空
 */
MaxQueue.prototype.isEmptyQueue = function () {
  return !(this.countQ - this.headQ);
};