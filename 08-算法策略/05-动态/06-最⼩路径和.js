/**
 * 题目：最小路径和（LeetCode 64）
 * 描述：给定 m x n 网格 grid，从左上角走到右下角，每次只能向下或向右移动一步。
 *       找出一条路径使得路径上的数字总和最小。
 * 示例：[[1,3,1],[1,5,1],[4,2,1]] -> 7（路径 1→3→1→1→1）
 *
 * 解法：动态规划（原地修改）
 * 思路：grid[i][j] 表示到达 (i,j) 的最小路径和。
 *       - 第一行：只能从左边来，grid[0][j] += grid[0][j-1]
 *       - 第一列：只能从上面来，grid[i][0] += grid[i-1][0]
 *       - 其他：grid[i][j] += Math.min(上, 左)
 * 时间复杂度：O(m*n)；空间复杂度：O(1)（原地修改）
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let row = grid.length, col = grid[0].length;
  for (let i = 1; i < row; i++) grid[i][0] += grid[i - 1][0];
  for (let j = 1; j < col; j++) grid[0][j] += grid[0][j - 1];
  for (let i = 1; i < row; i++)
    for (let j = 1; j < col; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
  return grid[row - 1][col - 1];
};
