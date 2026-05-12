/**
 * 题目：每日温度（LeetCode 739）
 * 描述：给定每日温度的数组 T，返回一个等长数组，每个位置表示需要等待多少天才能等到
 *       一个更高的温度。如果之后没有更高的温度，用 0 填充。
 * 示例：T = [73, 74, 75, 71, 69, 72, 76, 73]
 *       返回 [1, 1, 4, 2, 1, 1, 0, 0]
 *
 * 解法一：单调栈（正向遍历）
 * 思路：维护一个单调递减栈（存储温度索引），栈中元素对应的温度保持递减。
 *       遍历每日温度，若当前温度 > 栈顶索引对应的温度，则说明栈顶元素遇到了
 *       第一个更高的温度，计算天数差并出栈。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {number[]} T 每日温度数组
 * @return {number[]} 等待天数列表
 */
var dailyTemperatures = function (T) {
  const stack = [0];
  let count = 1;
  const len = T.length;
  const arr = new Array(len).fill(0);

  for (let i = 1; i < len; i++) {
    let temp = T[i];
    // 当前温度比栈顶温度高 -> 出栈并计算结果
    while (count && temp > T[stack[count - 1]]) {
      let index = stack.pop();
      count--;
      arr[index] = i - index;
    }
    stack.push(i);
    count++;
  }
  return arr;
};

/**
 * 解法二：单调栈（反向遍历）
 * 思路：从右向左遍历，维护一个单调递减栈。
 *       栈中存储"右边第一个更大温度"的索引，当前元素与栈顶比较来确定天数。
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */
const dailyTemperatures2 = (T) => {
  const res = new Array(T.length).fill(0);
  const stack = [];
  for (let i = T.length - 1; i >= 0; i--) {
    while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      res[i] = stack[stack.length - 1] - i;
    }
    stack.push(i);
  }
  return res;
};
