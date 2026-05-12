/**
 * 题目：合并两个有序链表（LeetCode 21）
 * 描述：将两个升序链表合并为一个新的升序链表并返回。
 *       新链表是通过拼接给定的两个链表的所有节点组成的。
 * 示例：输入 1->2->4, 1->3->4，输出 1->1->2->3->4->4
 *
 * 解法一：递归法
 * 思路：比较两个链表头节点，将较小者作为结果头节点，
 *       其 next 指向剩余部分合并的结果。
 * 时间复杂度：O(m+n)；空间复杂度：O(m+n)（递归调用栈）
 *
 * 解法二：迭代法（哑节点 + 双指针）
 * 思路：使用哑节点作为合并后链表的起始，
 *       双指针遍历两个链表，每次取较小值接入，
 *       最后将剩余部分直接拼接。
 * 时间复杂度：O(m+n)；空间复杂度：O(1)
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * mergeTwoLists - 递归法合并
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoListsRecursive = function (l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoListsRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoListsRecursive(l1, l2.next);
    return l2;
  }
};

/**
 * mergeTwoLists - 迭代法合并
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const prehead = new ListNode();
  let prev = prehead;
  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }
  prev.next = l1 === null ? l2 : l1;
  return prehead.next;
};
