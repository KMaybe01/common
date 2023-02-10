//能实现一维对象深拷贝
Object.myAssign = function (target, ...src) {
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== null || src[i] !== undefined) {
      // 过滤掉源对象为null和undefined的情况
      for (let key in src[i]) {
        // in运算符会查找原型对象上的可枚举属性，所以需要通过Object.prototype.hasOwnProperty方法过滤掉对象原型对象上的属性
        if (src[i].hasOwnProperty(key)) {
          target[key] = src[i][key];
        }
      }
    }
  }
  return target;
};

// 示例代码
const proto = {
  p: "proto",
};
const obj1 = {
  a: "aa",
};
const obj2 = {
  b: "bb",
};
// 以proto对象为新对象的__proto__
const obj3 = Object.create(proto, {
  c: {
    value: "cc",
    enumerable: true,
  },
});
console.log(obj3); // {c: 'cc'}
// 输出obj3的构造函数的原型对象
console.log(obj3.__proto__); // {p: 'proto'}
const t1 = Object.myAssign({}, obj1, obj2);
console.log(t1); // {a: "aa", b: "bb"}
const t2 = Object.assign({}, obj1, obj3, null, obj2, undefined); //{ a: 'aa', c: 'cc', b: 'bb' }
const t3 = Object.myAssign({}, obj1, null, obj2, undefined);
console.log(t3); // {a: "aa", b: "bb"}

//不替换已有的
function merge(target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
const t4 = Object.assign(
  {
    x: 1,
  },
  {
    x: 2,
    y: 2,
  },
  {
    y: 3,
    z: 4,
  }
);
console.log(t4);
//{ x: 2, y: 3, z: 4 }
const t5 = merge(
  {
    x: 1,
  },
  {
    x: 2,
    y: 2,
  },
  {
    y: 3,
    z: 4,
  }
);
console.log(t5);
//{ x: 1, y: 2, z: 4 }
