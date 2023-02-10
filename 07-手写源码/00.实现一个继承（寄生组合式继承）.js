//寄生组合式继承:
//一般只建议写这种，因为其它方式的继承会在一次实例中调用两次父类的构造函数或有其它缺点。
//核心实现是：用一个  F 空的构造函数去取代执行了  Parent 这个构造函数。
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function () {
    console.log('parent name:', this.name);
}

function Child(name, parentName) {
    Parent.call(this, parentName);
    this.name = name;
}
//兼容处理，类似Object.create()
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

/**
1. 这一步不用Child.prototype =Parent.prototype的原因是怕共享内存，修改父类原型对象就会影
响子类
2. 不用Child.prototype = new Parent()的原因是会调用2次父类的构造方法（另一次是call），会
存在一份多余的父类实例属性
3. Object.create是创建了父类原型的副本，与父类原型完全隔离
*/
Child.prototype = create(Parent.prototype);
Child.prototype.sayName = function () {
    console.log('child name:', this.name);
}
// 注意记得把子类的构造指向子类本身
Child.prototype.constructor = Child;
var parent = new Parent('father');
parent.sayName(); // parent name: father
var child = new Child('son', 'father');
child.sayName(); //child name: son