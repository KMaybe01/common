/**
 * 题目：二叉树的最大深度（LeetCode 104）
 * 描述：给定一个二叉树，找出其最大深度。最大深度是从根节点到最远叶子节点的最长路径上的节点数。
 *
 * 解法一：递归法（DFS）
 * 思路：树的深度 = max(左子树深度, 右子树深度) + 1
 * 时间复杂度：O(n)；空间复杂度：O(n)（递归调用栈）
 *
 * 解法二：层序遍历法（BFS）
 * 思路：逐层遍历二叉树，每遍历一层深度加 1，直到遍历完所有节点。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * maxDepth - 递归法求最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

/**
 * maxDepth - BFS 层序遍历求最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepthBFS = (root) => {
  if (root == null) return 0;
  const queue = [root];
  let depth = 1;
  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    if (queue.length) depth++;
  }
  return depth;
};
