/* 给定⼀个包含⾮负整数的 m x n ⽹格 grid ，请找出⼀条从左上⻆到右下⻆的路径，使得路径上的数字总和为最⼩。
说明：每次只能向下或者向右移动⼀步。

输⼊：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最⼩。

输⼊：grid = [[1,2,3],[4,5,6]]
输出：12 
*/

var minPathSum = function (grid) {
  let row = grid.length,
    col = grid[0].length;
  // calc boundary
  for (let i = 1; i < row; i++)
    // calc first col
    grid[i][0] += grid[i - 1][0];
  for (let j = 1; j < col; j++)
    // calc first row
    grid[0][j] += grid[0][j - 1];
  for (let i = 1; i < row; i++)
    for (let j = 1; j < col; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);

  return grid[row - 1][col - 1];
};
console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
);
