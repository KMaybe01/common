function Node(data) {
    this.data = data;
    this.next = null
}
//初始化队列：创建一个指向队列节点的头指针
function Queue() {
    this.front = null;
}
//入队：创建一个新节点，将它添加到链表尾部，如果链表为空，让头指针指向该节点
Queue.prototype.add = function (node) {
    var current = this.front;
    if (current) {
        while (current.next != null) {
            current = current.next;
        }
        current.next = new Node(node);
    } else {
        this.front = new Node(node)
    }

}
// 出队 free 头指针指向第一个节点， 让头指针指向该节点的下一个节点， 然后返回该节点的值。
Queue.prototype.remove = function () {

    if (this.front) {
        let current = this.front;
        let data = current.data;
        this.front = current.next;
        return data;
    } else {
        throw new Error('the queue is empty!');
    }

}
// 出队 free 头指针指向第一个节点， 让头指针指向该节点的下一个节点， 然后返回该节点的值。
Queue.prototype.isEmpty = function () {

    if (this.front) {
        let current = this.front;
        let data = current.data;
        this.front = current.next;
        return data;
    } else {
        throw new Error('the queue is empty!');
    }
}
// 读队头
Queue.prototype.getFront = function () {

    return this.front.data
}
//输出队列
Queue.prototype.printQueue = function () {

    var temp = this.front;
    while (temp) {
        console.log(temp.data);
        temp = temp.next
    }
}
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