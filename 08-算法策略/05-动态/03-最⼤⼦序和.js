/**
 * 题目：最大子序和（LeetCode 53）
 * 描述：找到具有最大和的连续子数组（至少包含一个元素），返回其最大和。
 * 示例：[-2,1,-3,4,-1,2,1,-5,4] -> 6（子数组 [4,-1,2,1]）
 *
 * 解法：动态规划（Kadane 算法）
 * 思路：遍历数组，pre 记录以当前元素结尾的最大子数组和。
 *       如果 pre > 0，则 pre + num 肯定更大；否则从 num 重新开始。
 *       max 记录全局最大值。
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let maxSubArray = function (nums) {
  let max = nums[0], pre = 0;
  for (const num of nums) {
    if (pre > 0) pre += num;
    else pre = num;
    max = Math.max(max, pre);
  }
  return max;
};
