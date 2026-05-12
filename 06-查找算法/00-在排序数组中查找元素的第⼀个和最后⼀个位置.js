/* 
给定⼀个按照升序排列的整数数组 nums ，和⼀个⽬标值 target 。找出给定⽬标值在数组中的开
始位置和结束位置。
你的算法时间复杂度必须是 O(logn) 级别。
如果数组中不存在⽬标值，返回 [-1, -1] 。 

输⼊: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]

输⼊: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
*/
let searchRange = function (nums, target) {
  return [leftSearch(nums, target), rightSearch(nums, target)];
};
let leftSearch = function (nums, target) {
  let low = 0,
    high = nums.length - 1,
    mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else if (nums[mid] === target) {
      // 这⾥不返回，继续收缩左侧边界
      high = mid - 1;
    }
  }
  // 最后检查 low 是否越界或命中
  if (low >= nums.length || nums[low] != target) return -1;
  return low;
};
let rightSearch = function (nums, target) {
  let low = 0,
    high = nums.length - 1,
    mid;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else if (nums[mid] === target) {
      // 这⾥不返回，继续收缩右侧边界
      low = mid + 1;
    }
  }
  // 最后检查 high 是否越界或命中
  if (high < 0 || nums[high] != target) return -1;
  return high;
};
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
