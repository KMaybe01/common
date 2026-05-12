/**
 * 题目：爬楼梯（LeetCode 70）
 * 描述：每次可以爬 1 或 2 个台阶，求爬到 n 阶楼顶有多少种方法。
 * 本质：斐波那契数列问题 f(n) = f(n-1) + f(n-2)
 *
 * 解法一：动态规划（数组）
 * 思路：dp[i] = dp[i-1] + dp[i-2]，dp[0]=1, dp[1]=1
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：动态规划（滚动变量优化）
 * 思路：用三个变量滚动计算，节省空间
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * climbStairs - DP 数组版
 * @param {number} n
 * @return {number}
 */
let climbStairs = function (n) {
  let dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

/**
 * climbStairs2 - 滚动变量优化版
 * @param {number} n
 * @return {number}
 */
let climbStairs2 = function (n) {
  let res = 1, n1 = 1, n2 = 1;
  for (let i = 2; i <= n; i++) {
    res = n1 + n2;
    n1 = n2;
    n2 = res;
  }
  return res;
};
