/**
 * 题目：栈的实现
 * 描述：自定义实现 Stack 数据结构，遵循"后进先出（LIFO）"原则。
 * 使用数组 + 计数器的模式实现，避免直接依赖数组原生方法。
 *
 * 栈的核心操作：
 * - push：入栈，将元素添加到栈顶
 * - pop：出栈，移除并返回栈顶元素
 * - top：查看栈顶元素（不删除）
 * - isEmpty：检测栈是否为空
 * - size：获取栈中元素个数
 * - clear：清空栈
 *
 * 时间复杂度：所有操作均为 O(1)；空间复杂度：O(n)
 */
class Stack {
  constructor() {
    /** 存储栈的数据 */
    this.data = [];
    /** 记录栈的元素个数（相当于 length） */
    this.count = 0;
  }

  /**
   * push - 入栈操作
   * 将元素添加到栈顶（即数组末尾）
   * @param {*} item 入栈的元素
   */
  push(item) {
    this.data[this.count] = item;
    this.count++;
  }

  /**
   * pop - 出栈操作
   * 移除并返回栈顶元素，栈为空时给出提示
   * @returns {*} 被移除的栈顶元素
   */
  pop() {
    if (this.isEmpty()) {
      console.log('栈为空！');
      return;
    }
    const temp = this.data[this.count - 1];
    delete this.data[--this.count];
    return temp;
  }

  /**
   * 检测栈是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * top - 获取栈顶值（不删除）
   * @returns {*} 栈顶元素
   */
  top() {
    if (this.isEmpty()) {
      console.log('栈为空！');
      return;
    }
    return this.data[this.count - 1];
  }

  /**
   * 获取栈中元素个数
   * @returns {number}
   */
  size() {
    return this.count;
  }

  /**
   * 清空栈
   */
  clear() {
    this.data = [];
    this.count = 0;
  }
}


const s = new Stack()
s.push('a')
s.push('b')
s.push('c')
console.log(s)