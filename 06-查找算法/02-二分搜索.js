// 二分搜索
// ⼆分查找局限性：
// 仅限于查找表是 顺序储存结构 ，因为是通过下标来随机访问元素
// 元素必须有序
// 顺序储存结构太⼩不合适，直接使⽤顺序查找即可
// 顺序储存结构太⻓不合适，它要求连续的内存空间，太⻓不利于存储
// 时间复杂度： O(logn)
// 空间复杂度：O(1)
// 要求是已经排序好的数组(非递归版)==>基本二分搜索
var binarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const pivot = sortedArr[mid];
    if (pivot < value) {
      low = mid + 1;
    } else if (pivot > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

//左侧边界的二分搜索
var leftBinarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const pivot = sortedArr[mid];
    if (pivot < value) {
      low = mid + 1;
    } else if (pivot > value) {
      high = mid - 1;
    } else {
      //别返回，收缩右边界，锁定左侧边界
      high = mid - 1;
    }
  }
  //最后要检查low越界的情况
  if (low >= arr.length || arr[low] != value) return -1;
  return low;
};

//右侧边界的二分搜索
var rightBinarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const pivot = sortedArr[mid];
    if (pivot < value) {
      low = mid + 1;
    } else if (pivot > value) {
      high = mid - 1;
    } else {
      //别返回，收缩左侧边界，锁定右侧边界
      low = mid + 1;
    }
  }
  //最后要检查low越界的情况
  if (high < 0 || arr[high] != value) return -1;
  return high;
};

// 分治算法
const binarySearch = (arr, value) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const low = 0;
  const high = sortedArr.length - 1;
  return binarySearchRecursive(arr, value, low, high);
};
const binarySearchRecursive = (arr, value, low, high) => {
  if (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const pivot = arr[mid];
    if (pivot < value) {
      return binarySearchRecursive(arr, value, mid + 1, high);
    } else if (pivot > value) {
      return binarySearchRecursive(arr, value, low, mid - 1);
    } else {
      return mid;
    }
  }
  return -1;
};

//递归法
function dichotomy_search(arr, low, height, key) {
  if (low > height) {
    return -1;
  }
  var mid = parseInt((height + low) / 2);
  if (kye == arr[mid]) {
    return mid;
  } else if (key > arr[mid]) {
    low = mid + 1;
    return dichotomy_search(arr, low, height, key);
  } else if (key < arr[mid]) {
    height = mid - 1;
    return dichotomy_search(arr, low, height, key);
  }
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = dichotomy_search(arr, 0, 10, 5);
console.log(result); //返回 key在 arr的索引值
