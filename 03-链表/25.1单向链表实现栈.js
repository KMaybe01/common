/**
 * 题目：单向链表实现栈
 * 描述：使用单向链表实现栈（后进先出 LIFO）数据结构。
 *       头部插入/删除 = O(1)，尾部操作 = O(n)
 *       因此采用头插法实现入栈，从头遍历到尾部实现出栈（删除尾节点）。
 *
 * 注意：文件名虽为 LinkQueue，实际实现的是栈的 add（头插）和 remove（尾部删除）语义，
 *       不过 remove 遍历到尾部效率较低。更优方案是始终在头部操作。
 */

/** 节点构造函数 */
function Node(val, next) {
  this.val = val;
  this.next = next || null;
}

/**
 * LinkStack - 基于单向链表的栈实现
 */
function LinkQueue() {
  this.head = null; // 头指针
  this.len = 0; // 栈长度
}

/**
 * add - 入栈（头插法）
 * @param {*} val
 */
LinkQueue.prototype.add = function (val) {
  const node = new Node(val, this.head);
  this.head = node;
  this.len++;
};

/**
 * remove - 出栈（移除最后一个节点）
 */
LinkQueue.prototype.remove = function () {
  if (this.len === 0) return;
  if (this.len === 1) {
    this.head = null;
  } else {
    let p = this.head;
    while (p.next.next !== null) {
      p = p.next;
    }
    p.next = null;
  }
  this.len--;
};

/**
 * getHead - 获取栈顶元素
 * @returns {Node}
 */
LinkQueue.prototype.getHead = function () {
  return this.head;
};

/**
 * clear - 清空栈
 */
LinkQueue.prototype.clear = function () {
  while (this.head) {
    let node = this.head;
    node.next = null;
    node = null;
    this.head = this.head.next;
  }
  this.len = 0;
};

/**
 * console - 打印栈中所有元素
 */
LinkQueue.prototype.console = function () {
  console.log('打印队列');
  if (!this.head) return;
  let p = this.head;
  while (p) {
    console.log(p.val);
    p = p.next;
  }
  console.log('打印队列完成');
};

const queue = new LinkQueue()
queue.add(1)
queue.add(2)
queue.add(3)
queue.add(4)
console.log('队列长度：' + queue.len)
console.log('-----split remove----')
queue.remove()
console.log('队列长度：' + queue.len)
queue.console()
queue.clear()
console.log('队列长度：' + queue.len)
queue.console()