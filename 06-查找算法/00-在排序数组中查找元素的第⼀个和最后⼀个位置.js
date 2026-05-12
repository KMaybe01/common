/**
 * 题目：在排序数组中查找元素的第一个和最后一个位置（LeetCode 34）
 * 描述：给定一个按升序排列的整数数组 nums 和目标值 target，
 *       找出 target 在数组中的开始位置和结束位置。要求 O(log n) 时间复杂度。
 * 示例：nums = [5,7,7,8,8,10], target = 8 -> [3,4]
 *       nums = [5,7,7,8,8,10], target = 6 -> [-1,-1]
 *
 * 解法：两次二分查找（左边界 + 右边界）
 * 思路：
 * - leftSearch：二分查找左侧边界，找到目标值时收缩右边界（high = mid - 1）
 * - rightSearch：二分查找右侧边界，找到目标值时收缩左边界（low = mid + 1）
 * - 最后检查越界和命中情况
 * 时间复杂度：O(log n)；空间复杂度：O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let searchRange = function (nums, target) {
  return [leftSearch(nums, target), rightSearch(nums, target)];
};

/** 二分查找左侧边界 */
let leftSearch = function (nums, target) {
  let low = 0, high = nums.length - 1, mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      high = mid - 1; // 收缩右边界，继续向左找
    }
  }
  if (low >= nums.length || nums[low] != target) return -1;
  return low;
};

/** 二分查找右侧边界 */
let rightSearch = function (nums, target) {
  let low = 0, high = nums.length - 1, mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1; // 收缩左边界，继续向右找
    }
  }
  if (high < 0 || nums[high] != target) return -1;
  return high;
};
