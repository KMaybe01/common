/**
 * 题目：环路检测（LeetCode 142 / 剑指 Offer II 022）
 * 描述：给定一个链表，返回链表开始入环的第一个节点。如果链表无环，返回 null。
 *
 * 解法一：快慢指针法（Floyd 判圈算法）
 * 思路：
 * 1. 快指针每次走两步，慢指针每次走一步，若相遇则有环
 * 2. 相遇后，将其中一个指针重置到 head，两指针同速前进
 * 3. 再次相遇的节点即为环的起始节点
 *
 * 数学原理：设 head 到环起点距离为 a，环起点到相遇点距离为 b
 *           慢指针走了 a+b，快指针走了 a+b+圈数，快指针路程是慢指针的 2 倍
 *           可推导出从 head 到环起点的距离 == 从相遇点到环起点的距离
 * 时间复杂度：O(n)；空间复杂度：O(1)
 *
 * 解法二：标记法
 * 思路：遍历链表，给每个节点添加 flag 标记。如果遇到已标记的节点则有环。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 *
 * 解法三：JSON.stringify 法（奇技淫巧）
 * 思路：JSON.stringify 无法序列化循环引用的结构，会抛出异常。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * detectCycle - 检测链表环并返回环的起始节点（快慢指针法）
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null;
  }
  let slow = head;
  let fast = head;

  while (fast !== null) {
    slow = slow.next;
    if (fast.next === null) {
      return null; // 无环
    }
    fast = fast.next.next;

    if (fast === slow) {
      // 有环，找环起点
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
};

/**
 * hasCycle - 标记法判断是否有环
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycleMark = function (head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};

/**
 * hasCycle - 利用 JSON.stringify 检测环
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycleJSON = function (head) {
  try {
    JSON.stringify(head);
    return false;
  } catch (err) {
    return true;
  }
};
