function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};

function getName() {
    console.log(5);
}
// 请写出以下输出结果：
Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3

/* 
Foo.getName() ；这个没什么好说的，输出2
getName() ；考察var和函数提升，函数优先级大于var，所以输出4
Foo().getName() ；Foo()返回this，此时this指向window，Foo().getName相当于
window.getName。但是Foo()内部又对window上的getName重新赋值了，所以输出1
getName() ；同上，输出1
new Foo.getName() ；考察运算符优先级，new 无参数列表，对应的优先级是19；成员访问操作
符  . , 对应的优先级是 20。因此相当于是  new (Foo.getName)() ;new操作符会执行构造函数中
的方法，因此此处输出为 2。
new Foo().getName() ；new 带参数列表，对应的优先级是20，和成员访问操作符 . 优先级相
同。同级运算符，按照从左到右的顺序依次计算。 new Foo() 先初始化 Foo 的实例化对象，实例
上没有getName方法，因此需要原型上去找，即找到了  Foo.prototype.getName ，输出3 
*/

console.log(t1)
var b = 10;
(function b() {
    b = 20;
    console.log(b);

})();

console.log(b);