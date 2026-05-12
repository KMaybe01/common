/**
 * 题目：相交链表（LeetCode 160）
 * 描述：找到两个单链表相交的起始节点。如果两个链表没有交点，返回 null。
 *
 * 解法思路：双指针消除长度差法
 * - 两个指针 pA、pB 分别从 headA、headB 出发
 * - 当 pA 到达尾部时，重定向到 headB；pB 同理
 * - 这样两个指针走过的路程相同，消除了长度差
 * - 当 pA === pB 时即为相交节点
 *
 * 数学原理：pA 走过的路程 = headA 独有部分 + 公共部分 + headB 独有部分
 *           pB 走过的路程 = headB 独有部分 + 公共部分 + headA 独有部分
 *           两者相等，必然在公共部分相遇
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode|null}
 */
const getIntersectionNode = function (headA, headB) {
  let pA = headA,
    pB = headB;
  while (pA || pB) {
    if (pA === pB) return pA;
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return null;
};
