/**
 * 题目：反转链表（LeetCode 206）
 * 描述：反转一个单链表。
 * 示例：输入 1->2->3->4->5，输出 5->4->3->2->1
 *
 * 解法：迭代法（三指针）
 * 思路：遍历链表，逐个改变节点的 next 指向。
 *       使用三个指针：prev（前驱）、curr（当前）、next（后继）
 *       每次将 curr.next 指向 prev，然后三个指针整体后移。
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  let next = null;
  while (curr !== null) {
    next = curr.next; // 保存下一个节点
    curr.next = prev; // 反转指针
    prev = curr; // prev 前移
    curr = next; // curr 前移
  }
  return prev; // prev 即为新头节点
};
