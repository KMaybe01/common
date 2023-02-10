/* 数组的每个索引作为⼀个阶梯，第 i 个阶梯对应着⼀个⾮负数的体⼒花费值 cost[i] (索引从0开始)。
每当你爬上⼀个阶梯你都要花费对应的体⼒花费值，然后你可以选择继续爬⼀个阶梯或者爬两个阶梯。
您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。

输⼊: cost = [10, 15, 20]
输出: 15
解释: 最低花费是从cost[1]开始，然后⾛两步即可到阶梯顶，⼀共花费15。

输⼊: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
输出: 6
解释: 最低花费⽅式是从cost[0]开始，逐个经过那些1，跳过cost[3]，⼀共花费6。
 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
let minCostClimbingStairs = function (cost) {
  cost.push(0);
  let dp = [],
    n = cost.length;
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i];
  }
  return dp[n - 1];
};
cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.log(minCostClimbingStairs(cost));

//优化，时间复杂度：O(n)空间复杂度：O(1)
let minCostClimbingStairs2 = function (cost) {
  let n = cost.length,
    n1 = cost[0],
    n2 = cost[1];
  for (let i = 2; i < n; i++) {
    let tmp = n2;
    n2 = Math.min(n1, n2) + cost[i];
    n1 = tmp;
  }
  return Math.min(n1, n2);
};
console.log(minCostClimbingStairs2(cost));
