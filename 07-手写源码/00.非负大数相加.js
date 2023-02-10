// 思路： 模拟加法运算，但是需要用'0'补齐长度，对于整数，向前补0。
let a = "0";
let b = "0";
// 1. 先找出最大的长度的数
// 2. 给较小的数填充向前填充0

function solve(s, t) {
  let i = s.length - 1;
  let j = t.length - 1;
  let add = 0;
  let res = [];
  while (i >= 0 || j >= 0 || add !== 0) {
    let p = i >= 0 ? s[i] - 0 : 0;
    let q = j >= 0 ? t[j] - 0 : 0;
    let sum = p + q + add;
    let cur = sum % 10;
    res.push(cur);
    add = Math.floor(sum / 10);
    j--;
    i--;
  }
  return res.reverse().join("");
}

console.log(solve(a, b)); //123456789012345679
