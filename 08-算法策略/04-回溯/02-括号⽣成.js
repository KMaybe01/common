/**
 * 题目：括号生成（LeetCode 22）
 * 描述：数字 n 代表生成括号的对数，生成所有可能且有效的括号组合。
 * 示例：n = 3 -> ["((()))","(()())","(())()","()(())","()()()"]
 *
 * 解法：回溯/DFS
 * 思路：使用 DFS 递归构建括号字符串。
 * - left：已使用的左括号数，right：已使用的右括号数
 * - 剪枝条件：left > n（左括号超了）或 left < right（右括号多了）
 * - 当 left + right === 2*n 时找到一个有效组合
 * 时间复杂度：O(4^n / sqrt(n))；空间复杂度：O(n)
 */

/**
 * @param {number} n 括号对数
 * @return {string[]}
 */
const generateParenthesis = (n) => {
  const res = [];
  const dfs = (path, left, right) => {
    if (left > n || left < right) return;
    if (left + right === 2 * n) {
      res.push(path);
      return;
    }
    dfs(path + "(", left + 1, right);
    dfs(path + ")", left, right + 1);
  };
  dfs("", 0, 0);
  return res;
};
