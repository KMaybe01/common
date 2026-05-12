/**
 * 题目：队列的实现 - 基于数组
 * 描述：使用数组实现队列数据结构，遵循"先进先出（FIFO）"原则。
 *
 * 核心操作：
 * - enQueue：入队，从队尾添加元素
 * - deQueue：出队，从队首移除元素（使用 shift()，注意性能问题）
 * - top：查看队首元素
 * - isEmpty：检测队列是否为空
 * - size：获取队列长度
 * - clear：清空队列
 *
 * 注意：使用 shift() 出队的时间复杂度为 O(n)，大数据量下推荐使用基于对象的实现。
 * 时间复杂度：入队 O(1)，出队 O(n)；空间复杂度：O(n)
 */
class Queue {
  constructor() {
    /** 用于存储队列数据的数组 */
    this.queue = [];
    this.count = 0;
  }

  /**
   * enQueue - 入队，向队尾添加元素
   * @param {*} item
   */
  enQueue(item) {
    this.queue[this.count++] = item;
  }

  /**
   * deQueue - 出队，移除并返回队首元素
   * @returns {*} 队首元素
   */
  deQueue() {
    if (this.isEmpty()) {
      return;
    }
    this.count--;
    return this.queue.shift();
  }

  /**
   * 检测队列是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * top - 获取队首元素值（不删除）
   * @returns {*}
   */
  top() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[0];
  }

  /**
   * 获取队列中元素个数
   * @returns {number}
   */
  size() {
    return this.count;
  }

  /**
   * 清空队列
   */
  clear() {
    this.queue = [];
    this.count = 0;
  }
}
