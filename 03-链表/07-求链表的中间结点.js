/**
 * 题目：求链表的中间结点（LeetCode 876）
 * 描述：给定一个非空单链表，返回链表的中间结点。
 *       如果有两个中间结点（偶数个节点），则返回第二个中间结点。
 * 示例：
 *   [1,2,3,4,5] -> 返回节点 3
 *   [1,2,3,4,5,6] -> 返回节点 4（有两个中间结点 3 和 4，返回第二个）
 *
 * 解法：快慢指针法
 * 思路：快指针每次走两步，慢指针每次走一步。
 *       快指针到达末尾时，慢指针恰好在中间。
 * 时间复杂度：O(n)；空间复杂度：O(1)
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
