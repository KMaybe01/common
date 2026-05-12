//获取所有属性
var obj = {
  a: "12",
  first: {
    c: "34",
    d: "45",
    second: {
      3: "56",
      f: "67",
      three: {
        g: "78",
        h: "89",
        i: "90",
      },
    },
  },
};

function getAllKey(obj) {
  if (typeof obj !== "object") {
    return;
  }
  let keys = [];
  for (let index in obj) {
    if (obj[index] instanceof Object && !Array.isArray(obj[index])) {
      keys = keys.concat(getAllKey(obj[index]));
    } else {
      keys.push(index);
    }
  }
  return keys;
}
console.log(getAllKey(obj));

// => [a,c,d,e,f,g,h,i]
