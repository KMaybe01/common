/**
 * 题目：双端队列（Deque）
 * 描述：双端队列允许在队首和队尾两端进行添加和删除操作。
 *       基于对象实现，通过 head 和 count 两个指针管理两端。
 *
 * 核心操作：
 * - addFront/addBack：队首/队尾添加元素
 * - removeFront/removeBack：队首/队尾删除元素
 * - frontTop/backTop：查看队首/队尾元素
 *
 * 双端队列常用于滑动窗口最大值、队列最大值等场景。
 * 时间复杂度：所有操作 O(1)；空间复杂度：O(n)
 */
class Deque {
  constructor() {
    /** 使用对象存储队列数据 */
    this.queue = {};
    this.count = 0;
    /** head 记录队首的键 */
    this.head = 0;
  }

  /**
   * addFront - 队首添加元素
   * head 前移并赋值
   * @param {*} item
   */
  addFront(item) {
    this.queue[--this.head] = item;
  }

  /**
   * addBack - 队尾添加元素
   * @param {*} item
   */
  addBack(item) {
    this.queue[this.count++] = item;
  }

  /**
   * removeFront - 队首删除元素
   * @returns {*} 被删除的队首元素
   */
  removeFront() {
    if (this.isEmpty()) {
      return;
    }
    const headData = this.queue[this.head];
    delete this.queue[this.head++];
    return headData;
  }

  /**
   * removeBack - 队尾删除元素
   * @returns {*} 被删除的队尾元素
   */
  removeBack() {
    if (this.isEmpty()) {
      return;
    }
    const backData = this.queue[this.count - 1];
    delete this.queue[--this.count];
    return backData;
  }

  /**
   * frontTop - 获取队首值（不删除）
   * @returns {*}
   */
  frontTop() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.head];
  }

  /**
   * backTop - 获取队尾值（不删除）
   * @returns {*}
   */
  backTop() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.count - 1];
  }

  /**
   * 检测队列是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 获取队列元素个数
   * @returns {number}
   */
  size() {
    return this.count - this.head;
  }
}

const deq = new Deque()