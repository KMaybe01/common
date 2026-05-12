/**
 * 题目：队列的实现 - 基于对象
 * 描述：使用对象（哈希表）实现队列，避免数组 shift() 的 O(n) 性能问题。
 *       通过 head 和 count 两个指针来标记队首和队尾，实现 O(1) 的出入队操作。
 *
 * 核心操作：
 * - 入队时以 count 为键存储，count 自增
 * - 出队时读取 head 指向的元素，head 自增
 * - 通过 count - head 计算队列长度
 *
 * 时间复杂度：所有操作 O(1)；空间复杂度：O(n)
 */
class Queue {
  constructor() {
    /** 使用对象存储队列数据 */
    this.queue = {};
    this.count = 0;
    /** head 记录队首的键 */
    this.head = 0;
  }

  /**
   * enQueue - 入队
   * @param {*} item
   */
  enQueue(item) {
    this.queue[this.count++] = item;
  }

  /**
   * deQueue - 出队
   * @returns {*} 队首元素
   */
  deQueue() {
    if (this.isEmpty()) {
      return;
    }
    const headData = this.queue[this.head];
    delete this.queue[this.head];
    this.head++;
    this.count--;
    return headData;
  }

  /**
   * 检测队列是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * 清空队列
   */
  clear() {
    this.queue = {};
    this.count = 0;
    this.head = 0;
  }
}

const q = new Queue()