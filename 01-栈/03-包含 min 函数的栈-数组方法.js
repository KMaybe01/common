/**
 * 题目：包含 min 函数的栈 - 数组方法版本
 * 描述：简化版最小栈，直接使用数组的 Math.min 遍历查找最小值。
 * 注意：此版本的 min() 时间复杂度为 O(n)，大数据量下效率较低。
 * 仅作为理解辅助栈原理的对比参考。
 *
 * 时间复杂度：push O(1)，pop O(1)，top O(1)，min O(n)
 * 空间复杂度：O(n)
 */
class MinStack {
  constructor() {
    this.stack = [];
  }

  /**
   * push - 入栈
   * @param {*} item
   */
  push(item) {
    this.stack.push(item);
  }

  /**
   * top - 获取栈顶值
   * @returns {*}
   */
  top() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * min - 获取最小值（遍历查找，O(n) 复杂度）
   * @returns {number} 最小值
   */
  min() {
    return Math.min.apply(null, this.stack);
  }

  /**
   * pop - 出栈
   * @returns {*}
   */
  pop() {
    return this.stack.pop();
  }
}

const m = new MinStack()