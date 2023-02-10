// 归并排序
/* 将原始序列平分成两个⼩数组
判断⼩数组⻓度是否为1，不为1则继续分裂
原始数组被分称了⻓度为1的多个⼩数组，然后合并相邻⼩数组（有序合并）
不断合并⼩数组，直到合并称⼀个数组，则为排序后的数组序列 */
// 时间复杂度：O(nlog2n)
// 空间复杂度：O(n)
const insertionSort = (arr) => {
  if (arr.length > 1) {
    const len = arr.length;
    const middle = Math.floor(len / 2);
    const left = insertionSort(arr.slice(0, middle));
    const right = insertionSort(arr.slice(middle));
    arr = merge(left, right);
  }
  return arr;
};

const merge = (left, right) => {
  let i = 0;
  let j = 0;
  const res = [];
  while (i < left.length && j < right.length) {
    res.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return res.concat(i < left.length ? left.slice(i) : right.slice(j));
};

console.log(insertionSort([5, 4, 3, 2, 1]));
