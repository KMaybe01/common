/**
 * 题目：包含 min 函数的栈（最小栈）
 * 描述：设计一个栈，除了支持常规的 push、pop、top 操作外，还支持在 O(1) 时间内获取栈中最小元素。
 *
 * 解法思路：使用"辅助栈"策略
 * - stackA（数据栈）：正常存储所有元素
 * - stackB（最小栈）：降序存储——每次入栈时，只有 <= stackB 栈顶的值才入 stackB
 * - 这样 stackB 的栈顶始终是当前所有元素的最小值
 * - 出栈时，如果出栈元素恰好是最小值，则 stackB 也出栈
 *
 * 时间复杂度：所有操作 O(1)；空间复杂度：O(n)
 */
class MinStack {
  constructor() {
    /** stackA 用于存储所有数据 */
    this.stackA = [];
    this.countA = 0;
    /** stackB 用于降序存储最小值（栈顶始终为最小值） */
    this.stackB = [];
    this.countB = 0;
  }

  /**
   * push - 入栈操作
   * @param {*} item 入栈元素
   */
  push(item) {
    this.stackA[this.countA++] = item;
    // 当前值 <= 已有最小值时，也压入 stackB
    if (this.countB === 0 || item <= this.min()) {
      this.stackB[this.countB++] = item;
    }
  }

  /**
   * 获取当前栈中的最小值
   * @returns {*} 最小值
   */
  min() {
    return this.stackB[this.countB - 1];
  }

  /**
   * top - 获取栈顶元素（不删除）
   * @returns {*} 栈顶元素
   */
  top() {
    return this.stackA[this.countA - 1];
  }

  /**
   * pop - 出栈操作
   * 如果出栈元素是当前最小值，则 stackB 也同步出栈
   */
  pop() {
    if (this.top() === this.min()) {
      delete this.stackB[--this.countB];
    }
    delete this.stackA[--this.countA];
  }
}

const m = new MinStack()
