// 时间复杂度：O(n)
// 空间复杂度：O(1)
function sequentialSearch(items, item) {
  for (let i = 0; i < items.length; i++) {
    if (item === items[i]) {
      return i;
    }
  }
  return -1;
}
// 测试
var items = [1, 2, 3];
console.log(sequentialSearch(items, 2));
console.log(sequentialSearch(items, 4));
