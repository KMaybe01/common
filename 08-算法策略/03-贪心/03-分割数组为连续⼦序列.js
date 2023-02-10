/* 给你⼀个按升序排序的整数数组 num （可能包含᯿复数字），请你将它们分割成⼀个或多个⼦序
列，其中每个⼦序列都由连续整数组成且⻓度⾄少为 3 。
如果可以完成上述分割，则返回 true ；否则，返回 false 。

输⼊: [1,2,3,3,4,5]
输出: True
解释:
你可以分割出这样两个连续⼦序列 : 
1, 2, 3
3, 4, 5

输⼊: [1,2,3,3,4,4,5,5]
输出: True
解释:
你可以分割出这样两个连续⼦序列 : 
1, 2, 3, 4, 5
3, 4, 5

输⼊: [1,2,3,4,4,5]
输出: False 
*/
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const isPossible = function (nums) {
  let max = nums[nums.length - 1];
  // arr：存储原数组中数字每个数字出现的次数
  // tail：存储以数字num结尾的且符合题意的连续⼦序列个数
  let arr = new Array(max + 2).fill(0),
    tail = new Array(max + 2).fill(0);
  for (let num of nums) {
    arr[num]++;
  }
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
console.log(isPossible([1, 2, 3, 4, 4, 5]));
