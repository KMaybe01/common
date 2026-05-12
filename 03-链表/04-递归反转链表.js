/**
 * 题目：反转链表 - 递归法
 * 描述：使用递归方式反转单链表。
 *
 * 解法思路：
 * - 递归到链表的最后一个节点（newHead）
 * - 回溯时，将当前节点的下一个节点的 next 指向当前节点（head.next.next = head）
 * - 将当前节点的 next 设为 null
 * - 每次递归返回 newHead（原链表的尾节点）
 *
 * 关键理解：head.next.next = head 实现了指针反向，
 *           将 head 的下一个节点指向 head 自己。
 * 时间复杂度：O(n)；空间复杂度：O(n)（递归调用栈）
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head; // 递归终止条件：空链表或只有一个节点
  }
  const newHead = reverseList(head.next);
  // 将当前节点的下一个节点指向自己（反转）
  head.next.next = head;
  head.next = null; // 断开原方向的指向
  return newHead;
};