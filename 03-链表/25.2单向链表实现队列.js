/**
 * 题目：单向链表实现队列
 * 描述：使用单向链表实现队列（先进先出 FIFO）数据结构。
 *       入队在尾部添加（遍历到尾部 O(n)），出队在头部删除（O(1)）。
 *       注意：当前实现入队为 O(n)，可优化为维护 tail 指针实现 O(1) 入队。
 */

/** 节点构造函数 */
function Node(data) {
  this.data = data;
  this.next = null;
}

/**
 * Queue - 基于单向链表的队列实现
 */
function Queue() {
  this.front = null;
}

/**
 * add - 入队（在链表尾部添加）
 * @param {*} node
 */
Queue.prototype.add = function (node) {
  var current = this.front;
  if (current) {
    while (current.next != null) {
      current = current.next;
    }
    current.next = new Node(node);
  } else {
    this.front = new Node(node);
  }
};

/**
 * remove - 出队（移除头节点）
 * @returns {*} 被移除节点的数据
 * @throws 队列为空时抛出异常
 */
Queue.prototype.remove = function () {
  if (this.front) {
    let current = this.front;
    let data = current.data;
    this.front = current.next;
    return data;
  } else {
    throw new Error('the queue is empty!');
  }
};

/**
 * isEmpty - 判断队列是否为空
 * @returns {boolean}
 */
Queue.prototype.isEmpty = function () {
  return this.front === null;
};

/**
 * getFront - 读取队头元素
 * @returns {*}
 */
Queue.prototype.getFront = function () {
  return this.front.data;
};

/**
 * printQueue - 打印队列所有元素
 */
Queue.prototype.printQueue = function () {
  var temp = this.front;
  while (temp) {
    console.log(temp.data);
    temp = temp.next;
  }
};
// Queue.prototype = {
//     add(node) { //入队：创建一个新节点，将它添加到链表尾部，如果链表为空，让头指针指向该节点
//         var current = this.front;
//         if (current) {
//             while (current.next != null) {
//                 current = current.next;
//             }
//             current.next = new Node(node);
//         } else {
//             this.front = new Node(node)
//         }

//     },
//     remove() { // 出队 free 头指针指向第一个节点， 让头指针指向该节点的下一个节点， 然后返回该节点的值。
//         if (this.front) {
//             let current = this.front;
//             let data = current.data;
//             this.front = current.next;
//             return data;
//         } else {
//             throw new Error('the queue is empty!');
//         }
//     },
//     isEmpty() { //判空
//         return this.front === null;
//     },
//     getFront() { // 读队头
//         return this.front.data
//     },
//     printQueue() { //输出队列
//         var temp = this.front;
//         while (temp) {
//             console.log(temp.data);
//             temp = temp.next
//         }
//     }
// }
/** test ***/
var queue = new Queue();
queue.add(1);
queue.add(2);
queue.add(3);
queue.printQueue();
console.log('-----split remove----')
queue.remove();
queue.printQueue();
console.log('-----split getFront----')
console.log(queue.getFront());
console.log(queue.isEmpty());