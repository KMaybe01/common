// 快速排序
// 时间复杂度; O(n*logn)
// 空间复杂度：O(n*logn)
// 步骤：
// 1，创建两个指针分别指向数组的最左端以及最右端
// 2，在数组中任意取出⼀个元素作为基准
// 3，左指针开始向右移动，遇到⽐基准⼤的停⽌
// 4，右指针开始向左移动，遇到⽐基准⼩的元素停⽌，交换左右指针所指向的元素
// 5，᯿复3，4，直到左指针超过右指针，此时，⽐基准⼩的值就都会放在基准的左边，⽐基准⼤
// 的值会出现在基准的右边
// 6，然后分别对基准的左右两边᯿复以上的操作，直到数组完全排序
function quickSort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;
}
function quick(arr, start, end) {
  if (arr.length > 1) {
    const index = partition(arr, start, end);
    if (start < index - 1) {
      quick(arr, start, index - 1);
    }
    if (index < end) {
      quick(arr, index, end);
    }
  }
}
// 该方法的实现目的是: 在数组arr中从start到end中选择中间一项为主元，比主元小的排到主元左边，比主元大的排到主元右边
function partition(arr, start, end) {
  const pivot = arr[Math.floor((start + end) / 2)];
  let i = start;
  let j = end;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}

// 先选一个数当作基点，一般选择最后一个数
// 然后遍历arr， 找出这个基点数的比它大的数组集合和比它小的数组集合
// 递归此步骤
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const cur = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= cur) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), cur, ...quickSort(right)];
}
console.log(quickSort([1, 3, 3, 6, 2, 4, 1]));
