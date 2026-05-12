/**
 * 题目：删除字符串中的所有相邻重复项（LeetCode 1047）
 * 描述：给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母并删除它们。
 *       在 S 上反复执行重复项删除操作，直到无法继续删除。返回最终字符串。
 *
 * 示例：输入 "abbaca" -> 删除 "bb" -> "aaca" -> 删除 "aa" -> 输出 "ca"
 *
 * 解法思路：栈消除法
 * - 遍历字符串中的每个字符
 * - 与栈顶元素比较：相同则抵消（出栈），不同则入栈
 * - 最终栈中元素即为结果
 *
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {string} S 输入字符串
 * @return {string} 消除相邻重复后的结果
 */
const removeDuplicates = function (S) {
  let stack = [];
  for (c of S) {
    let prev = stack.pop();
    if (prev !== c) {
      // 不重复，将弹出的元素和当前元素都放回
      stack.push(prev);
      stack.push(c);
    }
    // 如果重复，prev 被丢弃，c 也不入栈，自然消除
  }
  return stack.join("");
};
