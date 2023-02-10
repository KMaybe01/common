//计数排序
// 时间复杂度：O(n+k)
// 空间复杂度：O(n+k)
function countingSort(arr, maxValue) {
  // 开辟的新的数组，⽤于将输⼊的数据值转化为键存储
  var bucket = new Array(maxValue + 1),
    sortedIndex = 0,
    arrLen = arr.length,
    bucketLen = maxValue + 1;
  // 存储
  for (var i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }
  // 将数据从bucket按顺序写⼊arr中
  for (var j = 0; j < bucketLen; j++) {
    while (bucket[j]-- > 0) {
      arr[sortedIndex++] = j;
    }
  }
  return arr;
}
console.log(countingSort([5, 4, 3, 2, 1]), 5);
