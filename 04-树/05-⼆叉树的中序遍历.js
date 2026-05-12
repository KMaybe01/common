/**
 * 题目：二叉树的中序遍历（LeetCode 94）
 * 描述：按照"左-根-右"的顺序遍历二叉树。
 *
 * 解法一：递归法
 * 思路：递归遍历左子树 -> 访问根节点 -> 递归遍历右子树
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法二：迭代法（栈）
 * 思路：使用栈模拟递归。先将左子节点全部入栈，
 *       然后出栈访问节点，再转向右子节点。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * inorderTraversal - 递归中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = (root) => {
  let result = [];
  const inorder = (node) => {
    if (node) {
      inorder(node.left);
      result.push(node.val);
      inorder(node.right);
    }
  };
  inorder(root);
  return result;
};

/**
 * inorderTraversal - 迭代中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversalIterative = (root) => {
  let list = [];
  let stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    list.push(node.val);
    node = node.right;
  }
  return list;
};
