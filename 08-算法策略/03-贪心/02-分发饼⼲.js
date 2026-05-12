/**
 * 题目：分发饼干（LeetCode 455）
 * 描述：每个孩子有胃口值 g[i]，饼干有尺寸 s[j]。
 *       每个孩子最多给一块饼干，当 s[j] >= g[i] 时孩子满足。
 *       求最多能满足多少个孩子。
 *
 * 解法：贪心 + 双指针
 * 思路：将胃口和饼干都排序，用最小的饼干满足最小的胃口。
 *       如果当前饼干满足不了当前孩子，换更大的饼干。
 * 时间复杂度：O(n log n)；空间复杂度：O(1)
 *
 * 两个版本实现思路相同，细节略有差异。
 */

/**
 * @param {number[]} g 孩子胃口
 * @param {number[]} s 饼干尺寸
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0;
  s.forEach((n) => {
    if (n >= g[i]) i++;
  });
  return i;
};

/**
 * findContentChildren - 双指针版本
 */
var findContentChildren2 = function (g, s) {
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  let gi = 0, sj = 0, res = 0;
  while (gi < g.length && sj < s.length) {
    if (s[sj] >= g[gi]) {
      gi++;
      sj++;
      res++;
    } else {
      sj++;
    }
  }
  return res;
};
