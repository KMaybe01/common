/* 
⾃下⽽上式堆化 ：将节点与其⽗节点⽐较，如果节点⼤于⽗节点（⼤顶堆）或节点⼩于⽗节点（⼩顶堆），则节点与⽗节点调整位置
⾃上往下式堆化 ：将节点与其左右⼦节点⽐较，如果存在左右⼦节点⼤于该节点（⼤顶堆）或⼩于该节点（⼩顶堆），则将⼦节点的最⼤值（⼤顶堆）或最⼩值（⼩顶堆）与之交换
所以，⾃下⽽上式堆是调整节点与⽗节点（往上⾛），⾃上往下式堆化是调整节点与其左右⼦节点（往下⾛）。
时间复杂度：建堆过程的时间复杂度是 O(n) ，排序过程的时间复杂度是 O(nlogn) ，
整体时间复杂度是 O(nlogn)
空间复杂度：O(1) 
*/
/* 
将原序列（n个）转化成⼀个⼤顶堆
设置堆的有效序列⻓度为 n
将堆顶元素（第⼀个有效序列）与最后⼀个⼦元素（最后⼀个有效序列）交换，并有效序列⻓度减1
堆化有效序列，使有效序列᯿新称为⼀个⼤顶堆
᯿复以上2步，直到有效序列的⻓度为 1，排序完成 */
function heapSort(items) {
  // 构建⼤顶堆
  buildHeap(items, items.length - 1);
  // 设置堆的初始有效序列⻓度为 items.length - 1
  let heapSize = items.length - 1;
  for (var i = items.length - 1; i > 1; i--) {
    // 交换堆顶元素与最后⼀个有效⼦元素
    swap(items, 1, i);
    // 有效序列⻓度减 1
    heapSize--;
    // 堆化有效序列(有效序列⻓度为 currentHeapSize，抛除了最后⼀个元素)
    heapify(items, heapSize, 1);
  }
  return items;
}
// 原地建堆
// items: 原始序列
// heapSize: 有效序列⻓度
function buildHeap(items, heapSize) {
  // 从最后⼀个⾮叶⼦节点开始，⾃上⽽下式堆化
  for (let i = Math.floor(heapSize / 2); i >= 1; --i) {
    heapify(items, heapSize, i);
  }
}
function heapify(items, heapSize, i) {
  // ⾃上⽽下式堆化
  while (true) {
    var maxIndex = i;
    if (2 * i <= heapSize && items[i] < items[i * 2]) {
      maxIndex = i * 2;
    }
    if (2 * i + 1 <= heapSize && items[maxIndex] < items[i * 2 + 1]) {
      maxIndex = i * 2 + 1;
    }
    if (maxIndex === i) break;
    swap(items, i, maxIndex); // 交换
    i = maxIndex;
  }
}
function swap(items, i, j) {
  let temp = items[i];
  items[i] = items[j];
  items[j] = temp;
}
// 测试
var items = [1, 9, 2, 8, 3, 7, 4, 6, 5];
console.log(heapSort(items));
// [empty, 1, 2, 3, 4, 5, 6, 7, 8, 9]
