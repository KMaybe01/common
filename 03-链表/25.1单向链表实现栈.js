function Node(val, next) {
    this.val = val
    this.next = next || null
}

function LinkQueue() {
    // 记录头部指针
    this.head = null
    this.len = 0
}

// 入队列
LinkQueue.prototype.add = function (val) {
    const node = new Node(val, this.head)
    this.head = node
    this.len++
}

// 出队列
LinkQueue.prototype.remove = function () {
    if (this.len === 0) {
        return
    }
    if (this.len === 1) {
        this.head = null
    } else {
        let p = this.head
        while (p.next.next !== null) {
            p = p.next
        }
        p.next = null
    }
    this.len--
}
// 获得队头指针
LinkQueue.prototype.getHead = function () {
    return this.head
}
// 清空队列
LinkQueue.prototype.clear = function () {
    while (this.head) {
        let node = this.head
        node.next = null
        node = null
        this.head = this.head.next
    }
    this.len = 0
}
// 打印队列所有元素
LinkQueue.prototype.console = function () {
    console.log('打印队列')
    if (!this.head) {
        return
    } else {
        while (this.head) {
            console.log(this.head.val)
            this.head = this.head.next
        }
        console.log('打印队列完成')
    }

}

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