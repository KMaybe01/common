/**
 * 题目：二叉树的前序遍历（LeetCode 144）
 * 描述：按照"根-左-右"的顺序遍历二叉树。
 *
 * 解法一：递归法
 * 思路：先访问根节点，再递归遍历左子树，最后递归遍历右子树。
 * 时间复杂度：O(n)；空间复杂度：O(n)（递归调用栈）
 *
 * 解法二：迭代法（显式栈）
 * 思路：利用栈模拟递归过程。先将右子节点入栈，访问当前节点，
 *       再转向左子树，左子树处理完毕后从栈中取出右子节点处理。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * preorderTraversal - 递归前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const res = [];
  const preorder = (root) => {
    if (!root) return;
    res.push(root.val);
    preorder(root.left);
    preorder(root.right);
  };
  preorder(root);
  return res;
};

/**
 * preorderTraversal - 迭代前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversalIterative = function (root) {
  const res = [];
  const stk = [];
  while (root || stk.length) {
    while (root) {
      stk.push(root.right);
      res.push(root.val);
      root = root.left;
    }
    root = stk.pop();
  }
  return res;
};
