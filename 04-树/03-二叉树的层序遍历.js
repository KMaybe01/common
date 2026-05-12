/**
 * 题目：二叉树的层序遍历（LeetCode 102）
 * 描述：从上到下、从左到右逐层遍历二叉树，返回按层分组的结果数组。
 * 示例：
 *     3
 *    / \
 *   9  20
 *      / \
 *     15  7
 * 输出：[[3], [9,20], [15,7]]
 *
 * 解法：BFS（广度优先遍历）
 * 思路：使用队列存储节点。每轮循环处理一层的所有节点：
 *       1. 记录当前队列长度（当前层的节点数）
 *       2. 依次出队当前层所有节点，将值加入当前层结果数组
 *       3. 将左右子节点入队，供下一层处理
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) return res;
  const q = [root];

  while (q.length !== 0) {
    res.push([]);
    let len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      res[res.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
};