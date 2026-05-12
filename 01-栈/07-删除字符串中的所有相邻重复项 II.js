/**
 * 题目：删除字符串中的所有相邻重复项 II（LeetCode 1209）
 * 描述：给定字符串 s 和整数 k，从 s 中选择 k 个相邻且相等的字母并删除它们，
 *       被删字符串的左右两侧连接在一起。重复操作直到无法继续。返回最终字符串。
 *
 * 示例：s = "deeedbbcccbdaa", k = 3
 *       删除 "eee" 和 "ccc" -> "ddbbbdaa"
 *       删除 "bbb" -> "dddaa"
 *       删除 "ddd" -> "aa"
 *
 * 解法思路：栈计数法
 * - 栈中存储字符串片段，每个片段由相同字符组成
 * - 遍历每个字符，与栈顶元素比较：
 *   - 不同字符 -> 新字符单独入栈
 *   - 相同字符 -> 追加到栈顶，直到长度达到 k 时消除
 * - 最终将栈拼接为结果
 *
 * 时间复杂度：O(n)；空间复杂度：O(n)
 */

/**
 * @param {string} s 输入字符串
 * @param {number} k 连续重复个数
 * @return {string} 消除后的结果
 */
const removeDuplicates = function (s, k) {
  let stack = [];
  for (let c of s) {
    let prev = stack.pop();
    if (!prev || prev[0] !== c) {
      // 空栈 或 不同字符 -> 重新入栈
      stack.push(prev);
      stack.push(c);
    } else if (prev.length < k - 1) {
      // 相同字符但还未达到 k 个 -> 追加
      stack.push(prev + c);
    }
    // 达到 k 个 -> 消除（不重新入栈）
  }
  return stack.join("");
};


const test = removeDuplicates("deeedbbcccbdaa",3)
console.log(test)