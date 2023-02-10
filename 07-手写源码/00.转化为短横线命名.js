//方法1： 正则表达式

var getCamelCase1 = (str) => {
  return str.replace(/[A-Z]/g, (item) => "-" + item.toLowerCase());
};

console.log(getCamelCase1("getElementById"));

//方法2：数组的方法
function getKebabCase(str) {
  var arr = str.split("");
  str = arr
    .map(function (item) {
      if (item.toUpperCase() === item) {
        return "-" + item.toLowerCase();
      } else {
        return item;
      }
    })
    .join("");
  return str;
}
console.log(getKebabCase("getElementById")); //get-element-by-id
