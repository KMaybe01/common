/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList = function (head) {
  let prev = null;
  // 当 cur  是节点时，进行迭代
  let curr = head;
  let next = null;
  while (curr !== null) {
    //[curr.next,prev,curr] = [prev,curr,curr.next]
    // 先保存当前节点的下一个节点
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
