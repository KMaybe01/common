/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var minDepth = function (root) {
  if (!root) return 0;
  // 1. 叶子节点的时候
  if (!root.left && !root.right) return 1;
  // 2. 某节点 缺少左子树或者右子树 返回较大那个
  let lh = minDepth(root.left);
  let rh = minDepth(root.right);
  if (!root.left || !root.right) return Math.max(lh, rh) + 1;
  // 左右子树都不为空 较小那个
  return Math.min(lh, rh) + 1;
};

var minDepth = (root) => {
  if (root == null) {
    // 递归到null节点，返回高度0
    return 0;
  }
  if (root.left && root.right) {
    // 左右子树都存在，当前节点的高度1+左右子树递归结果的较小值
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
  } else if (root.left) {
    // 左子树存在，右子树不存在
    return 1 + minDepth(root.left);
  } else if (root.right) {
    // 右子树存在，左子树不存在
    return 1 + minDepth(root.right);
  } else {
    // 左右子树都不存在，光是当前节点的高度1
    return 1;
  }
};
