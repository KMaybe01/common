/**
 * 题目：桶排序
 * 描述：将数据分到有限数量的桶里，每个桶再分别排序。
 *       是计数排序的升级版，利用函数的映射关系。
 *       注意：此处实现将元素值作为桶下标，适用于特定场景。
 * 特性：稳定排序取决于桶内排序算法
 * 时间复杂度：O(n + k)（数据均匀分布）
 * 空间复杂度：O(n + k)
 */

/**
 * @param {number[]} arr
 * @returns {number[]}
 */
let bucketSort = (arr) => {
  let bucket = [],
    res = [];
  arr.forEach((value, key) => {
    if (!bucket[value]) {
      bucket[value] = [key];
    } else {
      bucket[value].push(key);
    }
  });
  for (let i = bucket.length - 1; i > 0; i--) {
    if (bucket[i]) {
      res.push(...bucket[i]);
    }
  }
  return res;
};
