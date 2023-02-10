//方法一：递归
const deepPath = (obj, path, defaultValue = null) => {
  const pathList = path.split(".");
  if (!path.length) {
    return obj;
  }
  if (pathList.length) {
    const key = pathList.shift();
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
console.log(value);

//方法二：堆栈

const deepPath2 = (obj, path, defaultValue = null) => {
  const pathList = path.split(".");
  let target = obj;
  while (pathList.length) {
    const key = pathList.shift();
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      target = target[key];
    } else {
      return defaultValue;
    }
  }
  return target;
};

const value2 = deepPath2(obj, "a.b.c.list", "default");
console.log(value2);
