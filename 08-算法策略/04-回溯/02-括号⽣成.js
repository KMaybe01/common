/* 数字 n 代表⽣成括号的对数，请你设计⼀个函数，⽤于能够⽣成所有可能的并且 有效的 括号组合。
输⼊：n = 3
输出：[
 "((()))",
 "(()())",
 "(())()",
 "()(())",
 "()()()"
 ] */

const generateParenthesis = (n) => {
  const res = [];
  const dfs = (path, left, right) => {
    // 肯定不合法，提前结束
    if (left > n || left < right) return;
    // 到达结束条件
    if (left + right === 2 * n) {
      res.push(path);
      return;
    }
    // 选择
    dfs(path + "(", left + 1, right);
    dfs(path + ")", left, right + 1);
  };
  dfs("", 0, 0);
  return res;
};

console.log(generateParenthesis(3));
