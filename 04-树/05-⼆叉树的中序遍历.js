// 中序遍历
//递归
const inorderTraversal = (root) => {
  let result = [];
  var inorderTraversal = (node) => {
    if (node) {
      // 先遍历左⼦树
      inorderTraversal(node.left);
      // 再根节点
      result.push(node.val);
      // 最后遍历右⼦树
      inorderTraversal(node.right);
    }
  };
  inorderTraversal(root);
  return result;
};

//迭代
// 中序遍历
const inorderTraversal = (root) => {
  let list = [];
  let stack = [];
  let node = root;
  while (node || stack.length) {
    // 遍历左⼦树
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
