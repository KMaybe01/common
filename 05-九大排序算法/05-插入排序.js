// 插入排序
// 时间复杂度：O(n * n)
//空间复杂度：O(1)
// 排序小型数组时，比选择排序和冒泡排序性能要好
//插⼊排序的⼯作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插⼊
function insertionSort(arr) {
  const len = arr.length;
  let temp;
  for (let i = 1; i < len; i++) {
    temp = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

console.log(insertionSort([5, 4, 3, 2, 1]));
