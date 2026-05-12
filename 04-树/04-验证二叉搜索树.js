/**
 * 题目：验证二叉搜索树（LeetCode 98）
 * 描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树（BST）。
 * BST 定义：
 *   1. 左子树所有节点的值 < 根节点的值
 *   2. 右子树所有节点的值 > 根节点的值
 *   3. 左右子树也必须是 BST
 *
 * 解法一（注释部分）：递归边界法
 * 思路：递归时传递上下界（lower, upper），当前节点值必须在 (lower, upper) 范围内。
 *       左子树更新上界为 root.val，右子树更新下界为 root.val。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二（当前代码）：中序遍历法
 * 思路：BST 的中序遍历结果一定是严格升序的。
 *       中序遍历二叉树，依次比较每个节点值与上一个节点值。
 *       如果当前值 <= 上一个值，说明不是 BST。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * isValidBST - 中序遍历法验证
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let stk = [];
  let oldNode = -Infinity; // 记录上一个节点的值

  while (root || stk.length) {
    while (root) {
      stk.push(root);
      root = root.left;
    }
    root = stk.pop();
    if (root.val <= oldNode) {
      return false; // 中序遍历未严格递增
    }
    oldNode = root.val;
    root = root.right;
  }
  return true;
};