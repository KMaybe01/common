/* 给定⼀个 没有重复 数字的序列，返回其所有可能的全排列。
输⼊: [1,2,3]
输出:
[
 [1,2,3],
 [1,3,2],
 [2,1,3],
 [2,3,1],
 [3,1,2],
 [3,2,1]
] */

let permute = function (nums) {
  // 使⽤⼀个数组保存所有可能的全排列
  let res = [];
  if (nums.length === 0) {
    return res;
  }
  let used = {},
    path = [];
  dfs(nums, nums.length, 0, path, used, res);
  return res;
};
let dfs = function (nums, len, depth, path, used, res) {
  // 所有数都填完了
  if (depth === len) {
    res.push([...path]);
    return;
  }
  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      // 动态维护数组
      path.push(nums[i]);
      used[i] = true;

      // 继续递归填下⼀个数
      dfs(nums, len, depth + 1, path, used, res);
      // 撤销操作
      used[i] = false;
      path.pop();
    }
  }
};
