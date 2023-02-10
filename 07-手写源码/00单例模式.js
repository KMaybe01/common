//类
class SingletonCar {
    constructor() {
        this.name = 'benz';
    }
    static getInstance() {
        if (!SingletonCar.instance) {
            SingletonCar.instance = new SingletonCar();
        }
        return SingletonCar.instance;
    }
}

let car1 = SingletonCar.getInstance();
let car2 = SingletonCar.getInstance();

console.log(car1 === car2) // true


//闭包
var SingletonCar2 = (function () {
    var instance;

    var SingletonCarTemp = function () {
        this.name = 'benz';
    };

    return function () {
        if (!instance) {
            instance = new SingletonCarTemp();
        }
        return instance;
    }
})();

var car11 = new SingletonCar2();
var car22 = new SingletonCar2();

console.log(car11 === car22) // true


//实现一个单例，可以具体到某一个场景。

//1.管理员
// es6
class SingleManage {
    constructor({
        name,
        level
    }) {
        if (!SingleManage.instance) {
            this.name = name;
            this.level = level
            SingleManage.instance = this;
        }
        return SingleManage.instance
    }
}

let boss = new SingleManage({
    name: "Jokul",
    level: "1"
})
let boss2 = new SingleManage({
    name: "Jokul2",
    level: "2"
})
console.log(boss === boss2) //true

// es5
function SingleManage2(manage) {
    this.name = manage.name
    this.level = manage.level
    this.info = function () {
        console.warn("Boss's name is " + this.name + " and level is " + this.level)
    }
}
SingleManage2.getInstance = function (manage) {
    if (!this.instance) {
        this.instance = new SingleManage2(manage)
    }
    return this.instance
}
var boss12 = SingleManage2.getInstance({
    name: "Jokul",
    level: "1"
})
var boss22 = SingleManage2.getInstance({
    name: "Jokul2",
    level: "2"
})
boss12.info() //Boss 's name is Jokul and level is 1
boss22.info() //Boss 's name is Jokul and level is 1


//2.storage
//先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase() {}
StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}

// // 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function () {
    let instance = null
    return function () {
        // 判断自由变量是否为null
        if (!instance) {
            // 如果为null则new出唯一实例
            instance = new StorageBase()
        }
        return instance
    }
})()

// // 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果 
const storage1 = new Storage()
const storage2 = new Storage()

storage1.setItem('name', 'yd')
// yd
storage1.getItem('name')
// 也是yd
storage2.getItem('name')

// // 返回true
storage1 === storage2