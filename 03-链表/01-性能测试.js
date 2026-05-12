/**
 * 题目：数组 push vs unshift 性能测试
 * 描述：对比 push（尾部添加）和 unshift（头部添加）在大量数据下的性能差异。
 *       unshift 每次操作需要将数组所有元素后移，时间复杂度 O(n)，
 *       push 是 O(1)，因此大数据量下 unshift 远慢于 push。
 * 结论：在需要频繁头部操作时，应使用链表或倒序处理代替数组 unshift。
 */
const arr = [];
console.time('perfTest');
for (let i = 0; i < 100000; i++) {
  arr.unshift(i); // 每次插入都要移动所有元素，性能极差
}
console.timeEnd('perfTest');