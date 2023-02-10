// 后序遍历
//递归
const postorderTraversal = function (root) {
  let result = [];
  var postorderTraversalNode = (node) => {
    if (node) {
      // 先遍历左⼦树
      postorderTraversalNode(node.left);
      // 再遍历右⼦树
      postorderTraversalNode(node.right);
      // 最后根节点
      result.push(node.val);
    }
  };
  postorderTraversalNode(root);
  return result;
};

//迭代
// 后序遍历
const postorderTraversal = (root) => {
  const list = [];
  const stack = [];
  // 当根节点不为空的时候，将根节点⼊栈
  if (root) stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop();
    // 根左右=>右左根
    list.unshift(node.val);
    // 先进栈左⼦树后右⼦树
    // 出栈的顺序就变更为先右后左
    // 右先头插法⼊list
    // 左再头插法⼊list
    // 实现右左根=>左右根
    if (node.left !== null) {
      stack.push(node.left);
    }
    if (node.right !== null) {
      stack.push(node.right);
    }
  }
  return list;
};
