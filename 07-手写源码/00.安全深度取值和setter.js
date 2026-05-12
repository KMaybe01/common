//方法一：递归
const deepPath = (obj, path, defaultValue = null) => {
  const pathList = path.split(".");
  if (!path.length) {
    return obj;
  }
  if (pathList.length) {
    const key = pathList.shift();
    if (obj.hasOwnProperty(key)) {
      return deepPath(obj[key], pathList.join("."), defaultValue);
    } else {
      return defaultValue;
    }
  }
  return obj[path];
};
const obj = {
  a: {
    b: {
      c: {
        list: [1, 2, 3, 4, 5],
      },
    },
  },
};
const value = deepPath(obj, "a.b.c.list", "default");
console.log(value); // [ 1, 2, 3, 4, 5 ]


//方法二：堆栈
const deepPath2 = (obj, path, defaultValue = null) => {
  if (!path.length) {
    return obj;
  }
  const pathList = path.split(".");
  while (pathList.length) {
    const key = pathList.shift();
    if (obj.hasOwnProperty(key)) {
      obj = obj[key];
    } else {
      return defaultValue;
    }
  }
  return obj;
};

const value2 = deepPath2(obj, "a.b.c.list.k", "default");
console.log(value2); //default


// 实现属性设置值
/* let setter = function (conten, key, value) {
    // your code
};
let n = {
    a: {
        b: {
            c: {
                d: 1
            },
            bx: {
                y: 1
            },
        },
        ax: {
            y: 1
        },
    },
};
// 修改值
setter(n, "a.b.c.d", 3);
console.log(n.a.b.c.d); //3
setter(n, "a.b.bx", 1);
console.log(n.b.bx); //1 */

//方法一
let setter = function (conten, key, value) {
  let argArr = key.split('.');
  let i = argArr.shift();
  if (argArr.length == 0) {
      conten[i] = value;
  } else {
      conten[i] = setter(conten[i], argArr.join('.'), value);
  }
  return conten;
};
let n = {
  a: {
      b: {
          c: {
              d: 1
          },
          bx: {
              y: 1
          },
      },
      ax: {
          y: 1
      },
  },
};
// 修改值
setter(n, "a.b.c.d", 3);
console.log(n.a.b.c.d); //3
setter(n, "a.b.bx", 1);
console.log(n.a.b.bx); //1 