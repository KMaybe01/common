/**
 * 题目：字符串转换为整数 - atoi（LeetCode 8）
 * 描述：实现将字符串转换为 32 位有符号整数的 atoi 函数。
 * 规则：
 * 1. 去除前导空格
 * 2. 处理正负号（+/-）
 * 3. 读取连续数字直到非数字字符
 * 4. 超出 32 位范围则返回 INT_MIN / INT_MAX
 * 5. 无效转换返回 0
 *
 * 解法：利用 parseInt API
 * 思路：parseInt 自动处理空格和正负号，只需处理 NaN 和溢出。
 * 注意：实际面试中推荐手写状态机或逐字符遍历。
 *
 * @param {string} s
 * @return {number}
 */
const myAtoi = function (s) {
  const number = parseInt(s);
  if (isNaN(number)) return 0;
  const INT_MIN = Math.pow(-2, 31);
  const INT_MAX = Math.pow(2, 31) - 1;
  if (number < INT_MIN || number > INT_MAX) {
    return number < INT_MIN ? INT_MIN : INT_MAX;
  }
  return number;
};

