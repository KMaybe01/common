/**
 * 题目：有效的括号（LeetCode 20）
 * 描述：给定一个只包含 '('、')'、'{'、'}'、'['、']' 的字符串 s，判断字符串是否有效。
 * 有效规则：
 *   1. 左括号必须用相同类型的右括号闭合
 *   2. 左括号必须以正确的顺序闭合
 *   3. 每个右括号都有一个对应的相同类型的左括号
 *
 * 解法思路：栈匹配法
 * - 遇到左括号入栈
 * - 遇到右括号，与栈顶元素匹配：匹配则出栈，不匹配则无效
 * - 最终栈为空则全部匹配成功
 *
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {string} s 括号字符串
 * @return {boolean} 是否有效
 */
const isValid = function (s) {
  let map = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      // 左括号入栈
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      // 右括号与栈顶不匹配 -> 无效
      return false;
    }
  }
  // 栈为空说明全部匹配
  return stack.length === 0;
};
