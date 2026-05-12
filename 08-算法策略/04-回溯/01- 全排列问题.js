/**
 * 题目：全排列问题（LeetCode 46）
 * 描述：给定一个没有重复数字的序列，返回所有可能的全排列。
 * 示例：[1,2,3] -> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * 解法：回溯算法
 * 思路：使用 DFS 深度优先遍历所有可能的选择。
 * - used 数组标记已使用的数字
 * - path 记录当前路径
 * - 当 path 长度等于 nums 长度时，找到一个排列
 * - 回溯时撤销选择（used[i]=false, path.pop()）
 * 时间复杂度：O(n! * n)；空间复杂度：O(n)
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function (nums) {
  let res = [];
  if (nums.length === 0) return res;
  let used = {}, path = [];
  const dfs = function (nums, len, depth, path, used, res) {
    if (depth === len) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (!used[i]) {
        path.push(nums[i]);
        used[i] = true;
        dfs(nums, len, depth + 1, path, used, res);
        used[i] = false;
        path.pop();
      }
    }
  };
  dfs(nums, nums.length, 0, path, used, res);
  return res;
};
