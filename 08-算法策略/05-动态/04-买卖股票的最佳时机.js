/* 
给定⼀个数组，它的第 i 个元素是⼀⽀给定股票第 i 天的价格。
如果你最多只允许完成⼀笔交易（即买⼊和卖出⼀⽀股票⼀次），设计⼀个算法来计算你所能获取的最⼤利润。
注意：你不能在买⼊股票前卖出股票。

输⼊: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买⼊，在第 5 天（股票价格 = 6）的时候卖出，最⼤利
润 = 6-1 = 5 。
 注意利润不能是 7-1 = 6, 因为卖出价格需要⼤于买⼊价格；同时，你不能在买⼊前卖出股
票。

输⼊: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最⼤利润为 0。 
*/
// 时间复杂度：O(n)
// 空间复杂度：O(1)
let maxProfit = function (prices) {
  let max = 0,
    minprice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    minprice = Math.min(prices[i], minprice);
    max = Math.max(max, prices[i] - minprice);
  }
  return max;
};

console.log(maxProfit([7, 6, 4, 3, 1]));
