/* 
在未排序的数组中找到第 k 个最⼤的元素。请注意，你需要找的是数组排序后的第 k 个最⼤的元素。
输⼊: [4,5,1,6,2,7,3,8] 和 k = 4
输出: 5 
*/
//1.暴力法
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
let findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
};

console.log(findKthLargest([4, 5, 1, 6, 2, 7, 3, 8], 4));

//2.局部排序，冒泡
// 时间复杂度：最好时间复杂度 O(n)，平均时间复杂度 O(n*k)
// 空间复杂度：O(1)
let findKthLargest2 = function (nums, k) {
  // 进⾏k轮冒泡排序
  bubbleSort(nums, k);
  return nums[nums.length - k];
};
let bubbleSort = function (arr, k) {
  for (let i = 0; i < k; i++) {
    // 提前退出冒泡循环的标识位
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        flag = true;
        // 表示发⽣了数据交换
      }
    }
    // 没有数据交换
    if (!flag) break;
  }
};

console.log(findKthLargest2([4, 5, 1, 6, 2, 7, 3, 8], 4));

//3.构造前 k 个最⼤元素⼩顶堆，取堆顶
// 时间复杂度：遍历数组需要 O(n) 的时间复杂度，⼀次堆化需要 O(logk) 时间复杂度，所以利⽤堆求 Top k 问题的时间复杂度为 O(nlogk)
// 空间复杂度：O(k)
/* 
从数组中取前 k 个数（ 0 到 k-1 位），构造⼀个⼩顶堆
从 k 位开始遍历数组，每⼀个数据都和⼩顶堆的堆顶元素进⾏⽐较，如果⼩于堆顶元素，则不
做任何处理，继续遍历下⼀元素；如果⼤于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成⼀个⼩顶堆。
遍历完成后，堆顶的数据就是第 K ⼤的数据 
*/
let findKthLargest3 = function (nums, k) {
  // 从 nums 中取出前 k 个数，构建⼀个⼩顶堆
  let heap = [,],
    i = 0;
  while (i < k) {
    heap.push(nums[i++]);
  }
  buildHeap(heap, k);

  // 从 k 位开始遍历数组
  for (let i = k; i < nums.length; i++) {
    if (heap[1] < nums[i]) {
      // 替换并堆化
      heap[1] = nums[i];
      heapify(heap, k, 1);
    }
  }

  // 返回堆顶元素
  return heap[1];
};
// 原地建堆，从后往前，⾃上⽽下式建⼩顶堆
let buildHeap = (arr, k) => {
  if (k === 1) return;
  // 从最后⼀个⾮叶⼦节点开始，⾃上⽽下式堆化
  for (let i = Math.floor(k / 2); i >= 1; i--) {
    heapify(arr, k, i);
  }
};
// 堆化
let heapify = (arr, k, i) => {
  // ⾃上⽽下式堆化
  while (true) {
    let minIndex = i;
    if (2 * i <= k && arr[2 * i] < arr[i]) {
      minIndex = 2 * i;
    }
    if (2 * i + 1 <= k && arr[2 * i + 1] < arr[minIndex]) {
      minIndex = 2 * i + 1;
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      i = minIndex;
    } else {
      break;
    }
  }
};
console.log(findKthLargest3([4, 5, 1, 6, 2, 7, 3, 8], 4));

//4.快排
// 时间复杂度：平均时间复杂度O(n)，最坏情况时间复杂度为O(n2)
// 空间复杂度：O(1)
/* 
如果⼩于 n-k ，则第 k 个最⼤值在基准值的右边，我们只需递归快排基准值右边的⼦序列即可；
如果⼤于 n-k ，则第 k 个最⼤值在基准值的做边，我们只需递归快排基准值左边的⼦序列即可；
如果等于 n-k ，则第 k 个最⼤值就是基准值 
*/
let findKthLargest4 = function (nums, k) {
  return quickSelect(nums, nums.length - k);
};
let quickSelect = (arr, k) => {
  return quick(arr, 0, arr.length - 1, k);
};
let quick = (arr, left, right, k) => {
  let index;
  if (left < right) {
    // 划分数组
    index = partition(arr, left, right);
    // Top k
    if (k === index) {
      return arr[index];
    } else if (k < index) {
      // Top k 在左边
      return quick(arr, left, index - 1, k);
    } else {
      // Top k 在右边
      return quick(arr, index + 1, right, k);
    }
  }
  return arr[left];
};
let partition = (arr, left, right) => {
  // 取中间项为基准
  var datum = arr[Math.floor(Math.random() * (right - left + 1)) + left],
    i = left,
    j = right;
  // 开始调整
  while (i < j) {
    // 左指针右移
    while (arr[i] < datum) {
      i++;
    }
    // 右指针左移
    while (arr[j] > datum) {
      j--;
    }
    // 交换
    if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
    // 当数组中存在᯿复数据时，即都为datum，但位置不同
    // 继续递增i，防⽌死循环
    if (arr[i] === arr[j] && i !== j) {
      i++;
    }
  }
  return i;
};
console.log(findKthLargest4([4, 5, 1, 6, 2, 7, 3, 8], 4));
