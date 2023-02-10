/* 给定⼀个字符串，你的任务是计算这个字符串中有多少个回⽂⼦串。
具有不同开始位置或结束位置的⼦串，即使是由相同的字符组成，也会被视作不同的⼦串。

输⼊："abc"
输出：3
解释：三个回⽂⼦串: "a", "b", "c"

输⼊："aaa"
输出：6
解释：6个回⽂⼦串: "a", "a", "a", "aa", "aa", "aaa" 
*/
//暴力法
// 时间复杂度：O(n3)
// 空间复杂度：O(1)
let countSubstrings = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s.substring(i, j + 1))) {
        count++;
      }
    }
  }
  return count;
};
let isPalindrome = function (s) {
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    if (s[i] != s[j]) return false;
    i++;
    j--;
  }
  return true;
};
console.log(countSubstrings("aaa"));

//动态规划
// 时间复杂度：O(n2)
// 空间复杂度：O(n)
let countSubstrings2 = function (s) {
  const len = s.length;
  let count = 0;
  const dp = new Array(len);
  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1])) {
        dp[i] = true;
        count++;
      } else {
        dp[i] = false;
      }
    }
  }
  return count;
};
console.log(countSubstrings2("aaa"));
