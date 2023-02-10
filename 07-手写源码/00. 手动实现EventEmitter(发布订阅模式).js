/* ev.on('事件1', fn)
ev.on('事件1', () => {
  console.log('事件1----2')
})

ev.emit('事件1', 1, 2)
ev.emit('事件1', 1, 2) */

/* ev.on('事件1', fn)
ev.emit('事件1', '前')
ev.off('事件1', fn)
ev.emit('事件1', '后') */



//ES5
function MyEvent() {
  // 准备一个数据结构用于缓存订阅者信息,null不继承任何属性方法
  this._events = Object.create(null)
}

MyEvent.prototype.on = function (type, callback) {
  // 判断当前次的事件是否已经存在，然后再决定如何做缓存
  if (this._events[type]) {
    this._events[type].push(callback)
  } else {
    this._events[type] = [callback]
  }
}

MyEvent.prototype.off = function (type, callback) {
  // 判断当前 type 事件监听是否存在，如果存在则取消指定的监听
  if (this._events && this._events[type]) {
    this._events[type] = this._events[type].filter((item) => {
      return item !== callback && item.link !== callback
    })
  }
}

MyEvent.prototype.once = function (type, callback) {
  let foo = function (...args) {
    callback.call(this, ...args)
    this.off(type, foo)
  }
  //foo.link = callback
  this.on(type, foo)
}

MyEvent.prototype.emit = function (type, ...args) {
  if (this._events && this._events[type].length) {
    this._events[type].forEach((callback) => {
      callback.call(this, ...args)
    })
  }
}

let ev = new MyEvent()

let fn = function (...data) {
  console.log('事件1执行了', data)
}


ev.once('事件1', fn)
ev.emit('事件1', 'once-es5')
ev.emit('事件1', 'once-es5-2')
// 事件1执行了 [ 'once-es5' ]
ev.on('事件1:on', fn)
ev.emit('事件1:on', 'on-es5')
ev.off('事件1:on', fn)
ev.emit('事件1:on', 'on-es5-2')
// 事件1执行了 [ 'on-es5' ]

//ES6
class MyEvent2 {
  // 准备一个数据结构用于缓存订阅者信息,null不继承任何属性方法
  constructor() {
    this._events = Object.create(null)
  }
  on(type, callback) {
    // 判断当前次的事件是否已经存在，然后再决定如何做缓存
    if (this._events[type]) {
      this._events[type].push(callback)
    } else {
      this._events[type] = [callback]
    }
  }

  emit(type, ...args) {
    if (this._events && this._events[type].length) {
      this._events[type].forEach((callback) => {
        callback.call(this, ...args)
      })
    }
  }

  off(type, callback) {
    // 判断当前 type 事件监听是否存在，如果存在则取消指定的监听
    if (this._events && this._events[type]) {
      this._events[type] = this._events[type].filter((item) => {
        return item !== callback && item.link !== callback
      })
    }
  }

  once(type, callback) {
    let foo = function (...args) {
      callback.call(this, ...args)
      this.off(type, foo)
    }
    //foo.link = callback
    this.on(type, foo)
  }
}

let ev2 = new MyEvent2()
let fn2 = function (...data) {
  console.log('事件2执行了', data)
}
ev2.once('事件2', fn2)
ev2.emit('事件2', 'once-class')
ev2.emit('事件2', 'once-class2')
// 事件2执行了 [ 'once-class' ]
ev2.on('事件：on', fn2)
ev2.emit('事件：on', 'on-class')
ev2.off('事件：on', fn2)
ev2.emit('事件：on', 'on-class2')

// 事件2执行了 [ 'on-class' ]