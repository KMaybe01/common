/**
 * 题目：使用最小花费爬楼梯（LeetCode 746）
 * 描述：每个阶梯 i 有体力花费 cost[i]，每爬上一个阶梯要花费对应体力，
 *       然后可以选择爬 1 或 2 个阶梯。求到达顶层的最小花费。
 *       可以从索引 0 或 1 开始。
 *
 * 解法一：动态规划（数组）
 * 思路：dp[i] = Math.min(dp[i-2], dp[i-1]) + cost[i]
 *       cost 最后补 0 表示顶层
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：滚动变量优化
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * minCostClimbingStairs - DP 数组版
 * @param {number[]} cost
 * @return {number}
 */
let minCostClimbingStairs = function (cost) {
  cost.push(0);
  let dp = [], n = cost.length;
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i];
  }
  return dp[n - 1];
};

/**
 * minCostClimbingStairs2 - 滚动变量优化版
 * @param {number[]} cost
 * @return {number}
 */
let minCostClimbingStairs2 = function (cost) {
  let n = cost.length, n1 = cost[0], n2 = cost[1];
  for (let i = 2; i < n; i++) {
    let tmp = n2;
    n2 = Math.min(n1, n2) + cost[i];
    n1 = tmp;
  }
  return Math.min(n1, n2);
};
