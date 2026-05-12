//"111" + ”2222“ = ”2333“
//num1 和 num2 的⻓度都⼩于 5100
// num1 和 num2 都只包含数字 0-9
// num1 和 num2 都不包含任何前导零
// 你不能使⽤任何內建 BigInteger 库， 也不能直接将输⼊的字符串转换为整数形式
function add(str1, str2) {
  let result = "";
  let tempVal = 0;
  let arr1 = str1.split("");
  let arr2 = str2.split("");
  while (arr1.length || arr2.length || tempVal) {
    tempVal += ~~arr1.pop() + ~~arr2.pop();
    result = (tempVal % 10) + result;
    tempVal = ~~(tempVal / 10);
  }
  return result.replace(/^0+/, "");
}
console.log(add("12345", "4567"));
