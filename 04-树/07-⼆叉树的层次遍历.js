/**
 * 题目：二叉树的层次遍历 II - 自底向上（LeetCode 107）
 * 描述：从叶子节点所在层到根节点所在层，逐层从左到右遍历。
 * 示例：
 *     3
 *    / \
 *   9  20
 *      / \
 *     15  7
 * 输出：[[15,7], [9,20], [3]]
 *
 * 解法一：BFS + reverse
 * 思路：先正常从上到下 BFS 层序遍历，最后将结果数组 reverse。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：DFS（记录深度）
 * 思路：递归时传递深度参数，将节点值放入对应深度的数组中，
 *       最后将结果数组 reverse。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * levelOrderBottom - BFS 自底向上层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = function (root) {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let curr = [],
      temp = [];
    while (queue.length) {
      let node = queue.shift();
      curr.push(node.val);
      if (node.left) temp.push(node.left);
      if (node.right) temp.push(node.right);
    }
    res.push(curr);
    queue = temp;
  }
  return res.reverse();
};

/**
 * levelOrderBottom - DFS 自底向上层序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottomDFS = function (root) {
  const res = [];
  const dfs = function (node, depth) {
    if (!node) return;
    res[depth] = res[depth] || [];
    res[depth].push(node.val);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  };
  dfs(root, 0);
  return res.reverse();
};
