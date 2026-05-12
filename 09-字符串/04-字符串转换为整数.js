/*
 输⼊: "42"
输出: 42 

输⼊: " -42"
输出: -42
解释: 第⼀个⾮空⽩字符为 '-', 它是⼀个负号。
 我们尽可能将负号与后⾯所有连续出现的数字组合起来，最后得到 -42 。

 输⼊: "4193 with words"
输出: 4193
解释: 转换截⽌于数字 '3' ，因为它的下⼀个字符不为数字。

输⼊: "words and 987"
输出: 0
解释: 第⼀个⾮空字符是 'w', 但它不是数字或正、负号。
 因此⽆法执⾏有效的转换。

 输⼊: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。
 因此返回 INT_MIN (−231) 。
*/
const myAtoi = function (s) {
  // parseInt
  const number = parseInt(s);
  // 判断 parseInt 的结果是否为 NaN，是则返回 0
  if (isNaN(number)) {
    return 0;
  } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
    // 超出
    return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  } else {
    return number;
  }
};

console.log(myAtoi("4193 with words"));

