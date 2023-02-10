//已知函数A，要求构造函数B继承A。
/* function A(name) {
    this.name = name;
  }
  A.prototype.getName = function () {
    console.log(this.name);
  }; */
//1.组合继承

function A(name) {
  this.name = name;
}

A.prototype.getName = function () {
  console.log(this.name)
}

function B(name, age) {
  // 第一次调用 A
  A.call(this, name);
  this.age = age;
  this.firends = ['前端', '资深'];
}

// 第二次调用 A
B.prototype = new A();
B.prototype.constructor = B;
// 给子类添加特有的方法，需要在继承之后
B.prototype.getFirends = function () {
  console.log(this.firends);
}


const instance1 = new B('jingcheng', 3);
instance1.getName(); // jingcheng
instance1.firends.push('React')
const instance2 = new B('yideng', 4);
instance2.getName(); // yideng

console.log(instance1, instance2)

//2.寄生组合继承
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}


function A(name) {
  this.name = name;
}

A.prototype.getName = function () {
  console.log(this.name)
}

function B(name, age) {
  A.call(this, name);
  this.age = age;
  this.firends = ['前端', '资深'];
}

inheritPrototype(B, A)
B.prototype.getFirends = function () {
  console.log(this.firends);
}

const instance1 = new B('jingcheng', 3);
instance1.getName(); // jingcheng
instance1.firends.push('React')
const instance2 = new B('yideng', 4);
instance2.getName(); // yideng

console.log(instance1, instance2)


//3.class方式实现继承
class A {
  constructor(name) {
    this.name = name;
  }

  getName = () => {
    console.log('我是Public', this.name)
  }
}


class B extends A {
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
    this.firends = ['前端', '资深'];
  }

  getFirends = () => {
    console.log(this.firends)
  }

  // 对于继承的方法进行重写
  getName = () => {
    console.log('我是子类的getName', this.name)
  }

}

const instance1 = new B('jingcheng', 3);
instance1.getName();
instance1.firends.push('React')
const instance2 = new B('yideng', 4);
instance2.getName();
const instance3 = new A('laowang')
instance3.getName();

console.log(instance1, instance2)