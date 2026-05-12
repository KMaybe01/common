/**
 * 题目：买卖股票的最佳时机 II（LeetCode 122）
 * 描述：给定股票价格数组，可以多次买卖（但每天只能持有一股），
 *       求最大利润。每次卖出后可以立即买入。
 * 示例：[7,1,5,3,6,4] -> 7（1买5卖 + 3买6卖）
 *
 * 解法：贪心算法
 * 思路：只要今天的价格 > 昨天的价格，就在昨天买入今天卖出。
 *       将所有的正收益累加即为最大利润。
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
  let profit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i];
    }
  }
  return profit;
};

