// 时间复杂度：O(n)
// 空间复杂度：O(1)
const getIntersectionNode = function (headA, headB) {
  // 清除⾼度差
  let pA = headA,
    pB = headB;
  while (pA || pB) {
    if (pA === pB) return pA;
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return null;
};
