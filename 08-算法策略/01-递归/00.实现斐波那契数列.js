/**
 * 题目：斐波那契数列
 * 描述：斐波那契数列定义为 F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2) (n>=2)
 *       使用三种方式实现：暴力递归、递归+缓存、动态规划
 *
 * 解法一：暴力递归
 * 思路：直接递归调用 fib(n-1) + fib(n-2)
 * 时间复杂度：O(2^n)；空间复杂度：O(n)
 *
 * 解法二：递归 + 缓存（记忆化搜索）
 * 思路：缓存已计算的值，避免重复计算
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法三：动态规划（滚动变量）
 * 思路：用三个变量滚动计算，不需要数组
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * fib - 暴力递归
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
};

/**
 * fib - 递归 + 缓存
 * @param {number} n
 * @return {number}
 */
var fibWithCache = function (n) {
  if (n <= 1) return n;
  const cache = [];
  cache[0] = 0;
  cache[1] = 1;
  function memorize(number) {
    if (cache[number] !== undefined) return cache[number];
    cache[number] = memorize(number - 1) + memorize(number - 2);
    return cache[number];
  }
  return memorize(n);
};

/**
 * fib - 动态规划（滚动变量）
 * @param {number} n
 * @return {number}
 */
var fibDP = function (n) {
  if (n < 2) return n;
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};