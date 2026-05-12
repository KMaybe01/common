/**
 * 题目：二叉树的后序遍历（LeetCode 145）
 * 描述：按照"左-右-根"的顺序遍历二叉树。
 *
 * 解法一：递归法
 * 思路：递归遍历左子树 -> 递归遍历右子树 -> 访问根节点
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：迭代法（头插法技巧）
 * 思路：前序遍历是"根-左-右"，调整为"根-右-左"后 reverse 即为"左-右-根"。
 *       利用 unshift（头插法）将访问顺序变为"根-右-左"，再出栈时自然变为后序。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * postorderTraversal - 递归后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function (root) {
  let result = [];
  const postorder = (node) => {
    if (node) {
      postorder(node.left);
      postorder(node.right);
      result.push(node.val);
    }
  };
  postorder(root);
  return result;
};

/**
 * postorderTraversal - 迭代后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversalIterative = (root) => {
  const list = [];
  const stack = [];
  if (root) stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop();
    list.unshift(node.val); // 头插法：将根放在最后
    if (node.left !== null) stack.push(node.left);
    if (node.right !== null) stack.push(node.right);
  }
  return list;
};
