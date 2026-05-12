/* 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的⽅法可以爬到楼顶呢？ 
注意： 给定 n 是⼀个正整数。

输⼊： 2
输出： 2
解释： 有两种⽅法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

输⼊： 3
输出： 3
解释： 有三种⽅法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
*/
// 时间复杂度：O(n)
// 空间复杂度：O(n)
let climbStairs = function (n) {
  let dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

console.log(climbStairs(3));
console.log(climbStairs(4));

//空间复杂度：O(1)
let climbStairs2 = function (n) {
  let res = 1,
    n1 = 1,
    n2 = 1;
  for (let i = 2; i <= n; i++) {
    res = n1 + n2;
    n1 = n2;
    n2 = res;
  }
  return res;
};
console.log(climbStairs2(3));
console.log(climbStairs2(4));
