// 桶排序
// 时间复杂度：O(n)
// 空间复杂度：O(n)
/* 
桶排序是计数排序的升级版。它也是利⽤函数的映射关系。
桶排序 (Bucket sort)的⼯作的原理：假设输⼊数据服从均匀分布，将数据分到有限数ᰁ的桶⾥，每个
桶再分别排序（有可能再使⽤别的排序算法或是以递归⽅式继续使⽤桶排序进⾏排）。
完整步骤：
⾸先使⽤ arr 来存储频率
然后创建⼀个数组（有数ᰁ的桶），将频率作为数组下标，对于出现频率不同的数字集合，存⼊
对应的数组下标（桶内）即可。
 */
let bucketSort = (arr) => {
  let bucket = [],
    res = [];
  arr.forEach((value, key) => {
    // 利⽤映射关系（出现频率作为下标）将数据分配到各个桶中
    if (!bucket[value]) {
      bucket[value] = [key];
    } else {
      bucket[value].push(key);
    }
  });
  // 遍历获取出现频率
  for (let i = bucket.length - 1; i > 0; i--) {
    if (bucket[i]) {
      res.push(...bucket[i]);
    }
  }
  return res;
};
console.log(bucketSort([5, 4, 3, 2, 1]));
