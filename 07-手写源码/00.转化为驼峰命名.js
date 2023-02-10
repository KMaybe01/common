//方式一：正则
var s1 = "get-element-by-id";
// 转化为 getElementById
function MyFormat(s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}

const f1 = MyFormat(s1);
console.log(f1); //getElementById

var getCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};
console.log(getCamelCase(s1));

//方式二
/* 
1. 按照'-'进行分割；
2. 从第二个元素开始进行遍历，将每个元素的首字母变为大写的；
3. 将数组中的元素进行连接 
*/

function transformStr2CamelCase1(str) {
  if (typeof str !== "string") {
    return "";
  }
  const strArr = str.split("-");
  for (let i = 1; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
  }
  return strArr.join("");
}
console.log(transformStr2CamelCase1("hello-world")); // helloWorld

//方式三：
/* 
1. 首先将字符串分割成字符数组；
2. 遍历该数组，当遇到'-'元素，删除该元素；
3. 将后慢的字符元素变为大写；
4. 连接数组，返回结果。
 */

// 操作字符数组
function transformStr2CamelCase2(str) {
  if (typeof str !== "string") {
    return "";
  }
  const strArr = str.split("");
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === "-") {
      // 删除-
      strArr.splice(i, 1); // 将此处改为大写
      if (i < strArr.length) {
        strArr[i] = strArr[i].toUpperCase();
      }
    }
  }
  return strArr.join("");
}
console.log(transformStr2CamelCase2("hello-world")); // helloWorld
