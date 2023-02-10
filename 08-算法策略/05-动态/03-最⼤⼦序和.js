/*
 给定⼀个整数数组 nums ，找到⼀个具有最⼤和的连续⼦数组（⼦数组最少包含⼀个元素），返回其最⼤和。
输⼊: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续⼦数组 [4,-1,2,1] 的和最⼤，为 6。
 */
// 时间复杂度：O(n)
// 空间复杂度：O(1)
let maxSubArray = function (nums) {
  let max = nums[0],
    pre = 0;
  for (const num of nums) {
    if (pre > 0) {
      pre += num;
    } else {
      pre = num;
    }
    max = Math.max(max, pre);
  }
  return max;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
