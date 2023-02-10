/* 
根据以上对浅拷贝的理解，实现一个浅拷贝的大致思路分为两点：
● 对基础类型做一个最基本的一个拷贝；
● 对引用类型开辟一个新的存储，并且拷贝一层对象属性。
实现浅拷贝
    方法一: 利用ES6语法
    方法二: 利用ES5语法: for...in
*/
/* 方法一: 利用ES6语法*/
function clone1(target) {
  if (target instanceof Array) {
    // return target.slice()
    // return target.filter(() => true)
    // return target.map(item => item)
    return [...target];
  } else if (target instanceof Object) {
    // return Object.assign({}, target)
    return {
      ...target,
    };
  } else {
    return target;
  }
}

/* 方法二: 利用ES5语法: for...in */
function clone2(target) {
  if (target != null && typeof target === "object") {
    // 根据 object 的类型判断是新建一个数组还是对象
    const cloneTarget = Array.isArray(target) ? [] : {};
    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/* 
深度克隆
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
2). 面试基础版本
    解决问题1: 函数属性还没丢失
3). 面试加强版本
    解决问题2: 循环引用正常
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/
/* 
1). 大众乞丐版
  问题1: 函数属性会丢失
  问题2: 循环引用会出错
*/
function deepClone1(target) {
  return JSON.parse(JSON.stringify(target));
}

/* 
获取数据的类型字符串名
*/
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

/*
2). 面试基础版本
  解决问题1: 函数属性还没丢失
*/
function deepClone2(target) {
  const type = getType(target);

  if (type === "Object" || type === "Array") {
    const cloneTarget = type === "Array" ? [] : {};
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone2(target[key]);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/* 
3). 面试加强版本
  解决问题2: 循环引用正常
*/
function deepClone3(target, map = new Map()) {
  const type = getType(target);
  if (type === "Object" || type === "Array") {
    let cloneTarget = map.get(target);
    if (cloneTarget) {
      return cloneTarget;
    }
    cloneTarget = type === "Array" ? [] : {};
    map.set(target, cloneTarget);
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone3(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/* 
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/
function deepClone4(target, map = new Map()) {
  const type = getType(target);
  if (type === "Object" || type === "Array") {
    let cloneTarget = map.get(target);
    if (cloneTarget) {
      return cloneTarget;
    }

    if (type === "Array") {
      cloneTarget = [];
      map.set(target, cloneTarget);
      target.forEach((item, index) => {
        cloneTarget[index] = deepClone4(item, map);
      });
    } else {
      cloneTarget = {};
      map.set(target, cloneTarget);
      Object.keys(target).forEach((key) => {
        cloneTarget[key] = deepClone4(target[key], map);
      });
    }

    return cloneTarget;
  } else {
    return target;
  }
}
