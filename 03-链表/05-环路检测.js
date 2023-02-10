/**
 * @param {ListNode} head
 * @return {ListNode}
 */

//快慢指针
// 时间复杂度：O(n)
// 空间复杂度：O(1)
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null;
  }
  // 声明快慢指针
  let slow = head;
  let fast = head;

  while (fast !== null) {
    // 慢每次指针移动一位
    slow = slow.next;
    // 如果满足条件，说明 fast 为尾部结点，不存在环
    if (fast.next === null) {
      return null;
    }
    // 快指针每次移动两位
    fast = fast.next.next;

    // 检测是否有环
    if (fast === slow) {
      // 找到环的起点位置
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      // ptr 和 slow 的交点就是环的起始节点
      return ptr;
    }
  }
  // while 结束，说明 fast 为 null，说明链表没有环
  return null;
};
//标记法
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const hasCycle = function (head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};

// 利⽤ JSON.stringify() 不能序列化含有循环引⽤的结构
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const hasCycle = function (head) {
  try {
    JSON.stringify(head);
    return false;
  } catch (err) {
    return true;
  }
};
