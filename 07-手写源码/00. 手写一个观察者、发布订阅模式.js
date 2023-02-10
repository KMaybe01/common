/* 
发布-订阅模式就好像报社， 邮局和个⼈的关系，报纸的订阅和分发是由邮局来完成的。
报社只负责将报纸发送给邮局。
观察者模式就好像 个体奶农和个⼈的关系。奶农负责统计有多少⼈订了产品，
所以个⼈都会有⼀个相同拿⽜奶的⽅法。奶农有新奶了就负责调⽤这个⽅法。
 */
/* 
两种模式本质都是⼀样的，主要关键点都在于注册（添加到注册数组中）和触发（触发注册
数组中的内容），只是订阅/发布模式对注册和触发进⾏了解耦。可以看到，使⽤订阅发布模式中发布者
触发publish的时候，可以选择触发哪⼀些订阅者集合（因为publish参数传递了中间集合，可以定义
多个pubsub集合），⽽观察者模式则只能触发所有的被观察对象。 
*/

//观察者
var subject = {
    observers: [],
    notify() {
        this.observers.forEach(observer => {
            observer.update()
        })
    },
    attach(observer) {
        this.observers.push(observer)
    }
}
var observer = {
    update() {
        console.log('观察者updated')
    }
}
subject.attach(observer)
subject.notify()

// 观察者模式:vue2.0响应式原理...

//目标
class ObserverList {
    constructor() {
        this.observerList = [];
    }
    add(observer) {
        this.observerList.push(observer);
        return this;
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
        return this;
    }
    get(index) {
        return this.observerList[index];
    }
    count() {
        return this.observerList.length;
    }
}

class Subject {
    observers = new ObserverList;
    add(observer) {
        this.observers.add(observer);
    }
    remove(observer) {
        this.observers.remove(observer);
    }
    notify(...params) {
        for (let i = 0; i < this.observers.count(); i++) {
            let item = this.observers.get(i);
            item.update(...params);
        }
    }
}

class Observer {
    update(message) {
        // 消息触达，通知update执行
        console.log('消息接收Obserer！', message);
    }
}
class Demo {
    update(message) {
        console.log('消息接收Demo！', message);
    }
}

let sub = new Subject;
sub.add(new Observer);
sub.add(new Observer);
sub.add(new Demo);
setTimeout(() => {
    sub.notify('你好~！');
}, 1000);


// ⽽使⽤订阅发布模式，使⽤中间订阅发布对象的⽅式如下
var publisher = {
    publish(pubsub) {
        pubsub.publish()
    }
}
var pubsub = {
    subscribes: [],
    publish() {
        this.subscribes.forEach(subscribe => {
            subscribe.update();
        })
    },
    subscribe(sub) {
        this.subscribes.push(sub)
    }
}
var subscribe = {
    update() {
        console.log('订阅者update')
    },
    subscribe(pubsub) {
        pubsub.subscribe(this);
    }
}
subscribe.subscribe(pubsub)
publisher.publish(pubsub)