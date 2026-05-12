/**
 * 题目：对称二叉树（LeetCode 101）
 * 描述：给定一个二叉树，检查它是否是镜像对称的。
 * 示例：二叉树 [1,2,2,3,4,4,3] 是对称的
 *       1
 *      / \
 *     2   2
 *    / \ / \
 *   3  4 4  3
 *
 * 解法：递归比较
 * 思路：一棵树对称等价于左子树和右子树镜像对称。
 *       比较两个节点是否对称：
 *       - 两个节点值相等
 *       - 左节点的左子树与右节点的右子树对称
 *       - 左节点的右子树与右节点的左子树对称
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = function (root) {
  if (!root) return true;

  const isEqual = function (left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      isEqual(left.left, right.right) &&
      isEqual(left.right, right.left)
    );
  };

  return isEqual(root.left, root.right);
};