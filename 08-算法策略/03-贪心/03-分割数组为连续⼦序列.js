/**
 * 题目：分割数组为连续子序列（LeetCode 659）
 * 描述：将升序数组分割成一个或多个子序列，每个子序列由连续整数组成且长度至少为 3。
 *       判断是否能完成分割。
 * 示例：[1,2,3,3,4,5] -> true（可分割为 [1,2,3] 和 [3,4,5]）
 *
 * 解法：贪心 + 哈希计数
 * 思路：
 * - arr[num] 记录数字 num 的剩余出现次数
 * - tail[num] 记录以 num 结尾的有效子序列数量
 * - 遍历每个数字，优先追加到已有子序列（tail[num-1] > 0）
 * - 否则尝试创建新子序列（检查 num+1 和 num+2 是否存在）
 * - 都不行则返回 false
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isPossible = function (nums) {
  let max = nums[nums.length - 1];
  let arr = new Array(max + 2).fill(0);
  let tail = new Array(max + 2).fill(0);
  for (let num of nums) arr[num]++;
  for (let num of nums) {
    if (arr[num] === 0) continue;
    else if (tail[num - 1] > 0) {
      tail[num - 1]--;
      tail[num]++;
    } else if (arr[num + 1] > 0 && arr[num + 2] > 0) {
      arr[num + 1]--;
      arr[num + 2]--;
      tail[num + 2]++;
    } else {
      return false;
    }
    arr[num]--;
  }
  return true;
};
