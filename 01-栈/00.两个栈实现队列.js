//1.ES5
var CQueue = function () {
  this.stackA = [];
  this.stackB = [];
};
CQueue.prototype.appendTail = function (value) {
  this.stackA.push(value);
};
CQueue.prototype.deleteHead = function () {
  if (this.stackB.length) {
    return this.stackB.pop();
  } else {
    while (this.stackA.length) {
      this.stackB.push(this.stackA.pop());
    }
    if (!this.stackB.length) {
      return -1;
    } else {
      return this.stackB.pop();
    }
  }
};
//2.ES6
class Queue {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }
  enqueue(item) {
    this.s1.push(item);
  }
  dequeue() {
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop());
    }
    if (!this.s2.length) {
      return -1;
    } else {
      return this.s2.pop();
    }
  }
}

const cQueue = new CQueue();
cQueue.appendTail(1);
cQueue.appendTail(2);

console.log(cQueue.deleteHead());
console.log(cQueue.deleteHead());
console.log(cQueue.deleteHead());
console.log(cQueue.deleteHead());

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
