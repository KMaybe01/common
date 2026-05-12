/**
 * 题目：买卖股票的最佳时机 I（LeetCode 121）
 * 描述：只允许完成一笔交易（买入 + 卖出一次），求最大利润。
 * 示例：[7,1,5,3,6,4] -> 5（第2天1元买入，第5天6元卖出）
 *
 * 解法：贪心 / DP
 * 思路：遍历价格，记录历史最低点 minprice。
 *       当天卖出可获得 prices[i] - minprice 的利润，
 *       取历史最大利润。
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
  let max = 0, minprice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    minprice = Math.min(prices[i], minprice);
    max = Math.max(max, prices[i] - minprice);
  }
  return max;
};
