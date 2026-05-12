/* 给定⼀个⼆叉树，返回其节点值⾃底向上的层次遍历。 （即按从叶⼦节点所在层到根节点所在的层，
逐层从左向右遍历）
例如： 给定⼆叉树 [3,9,20,null,null,15,7] ,
  3
 / \
 9 20
  /  \
 15   7
 返回其⾃底向上的层次遍历为：
 [
 [15,7],
 [9,20],
 [3]
] */

// BFS（⼴度优先遍历）
const levelOrderBottom = function (root) {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let curr = [],
      temp = [];
    while (queue.length) {
      let node = queue.shift();
      curr.push(node.val);
      if (node.left) temp.push(node.left);
      if (node.right) temp.push(node.right);
    }
    res.push(curr);
    queue = temp;
  }
  return res.reverse();
};

// DFS（深度优先遍历）

const levelOrderBottom = function (root) {
  const res = [];
  var dep = function (node, depth) {
    if (!node) return;
    res[depth] = res[depth] || [];
    res[depth].push(node.val);
    dep(node.left, depth + 1);
    dep(node.right, depth + 1);
  };
  dep(root, 0);
  return res.reverse();
};
