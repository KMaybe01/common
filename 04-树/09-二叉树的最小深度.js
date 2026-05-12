/**
 * 题目：二叉树的最小深度（LeetCode 111）
 * 描述：给定一个二叉树，找出其最小深度。最小深度是从根节点到最近叶子节点的最短路径上的节点数。
 *       注意：叶子节点是指没有子节点的节点。
 *
 * 与最大深度的区别：当一个节点只有左子树或只有右子树时，不能简单取 min，
 *       因为缺少子树的那一侧深度为 0 不代表叶子节点。
 *       正确的做法是取左右子树中非空的深度 + 1。
 *
 * 解法一：递归（简洁版）
 * 思路：叶子节点返回 1，缺左或右子树时取较大值（跳过缺失的一侧），左右都有时取较小值。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：递归（清晰版）
 * 思路：分四种情况讨论：左右子树都存在、只有左子树、只有右子树、都没有。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * minDepth - 递归求最小深度（简洁版）
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  let lh = minDepth(root.left);
  let rh = minDepth(root.right);
  if (!root.left || !root.right) return Math.max(lh, rh) + 1;
  return Math.min(lh, rh) + 1;
};

/**
 * minDepth - 递归求最小深度（清晰版）
 * @param {TreeNode} root
 * @return {number}
 */
var minDepthDetailed = (root) => {
  if (root == null) return 0;
  if (root.left && root.right) {
    return 1 + Math.min(minDepthDetailed(root.left), minDepthDetailed(root.right));
  } else if (root.left) {
    return 1 + minDepthDetailed(root.left);
  } else if (root.right) {
    return 1 + minDepthDetailed(root.right);
  } else {
    return 1;
  }
};
