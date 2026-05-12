/**
 * 题目：回文子串（LeetCode 647）
 * 描述：计算字符串中有多少个回文子串。不同位置的相同内容视为不同子串。
 * 示例："abc" -> 3（"a","b","c"）；"aaa" -> 6
 *
 * 解法一：暴力法
 * 思路：枚举所有子串，逐个判断是否为回文
 * 时间复杂度：O(n³)；空间复杂度：O(1)
 *
 * 解法二：动态规划
 * 思路：dp[i] 表示从 i 到当前 j 是否为回文
 *       状态转移：s[i]===s[j] && (j-i<=1 || dp[i+1])
 *       注意：外层循环是 j（右边界），内层是 i（左边界）
 * 时间复杂度：O(n²)；空间复杂度：O(n)
 */

/**
 * countSubstrings - 暴力法
 * @param {string} s
 * @return {number}
 */
let countSubstrings = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s.substring(i, j + 1))) count++;
    }
  }
  return count;
};

let isPalindrome = function (s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] != s[j]) return false;
    i++;
    j--;
  }
  return true;
};

/**
 * countSubstrings2 - 动态规划
 * @param {string} s
 * @return {number}
 */
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
