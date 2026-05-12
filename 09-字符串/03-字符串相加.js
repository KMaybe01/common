/**
 * 题目：字符串相加（LeetCode 415）
 * 描述：计算两个字符串形式的非负整数之和，以字符串形式返回。
 *       不能使用内置 BigInteger 库或直接转换为整数。
 * 示例："12345" + "4567" = "16912"
 *
 * 解法：竖式加法模拟
 * 思路：从两个字符串的末尾（个位）开始逐位相加，
 *       用 tempVal 记录当前位的和（含进位），
 *       当前位 = tempVal % 10，进位 = Math.floor(tempVal / 10)
 *       最后去除前导零。
 * 时间复杂度：O(max(m,n))；空间复杂度：O(max(m,n))
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function add(str1, str2) {
  let result = "";
  let tempVal = 0;
  let arr1 = str1.split("");
  let arr2 = str2.split("");
  while (arr1.length || arr2.length || tempVal) {
    tempVal += ~~arr1.pop() + ~~arr2.pop();
    result = (tempVal % 10) + result;
    tempVal = ~~(tempVal / 10);
  }
  return result.replace(/^0+/, "");
}
