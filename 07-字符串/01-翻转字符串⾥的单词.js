/**
 * 题目：翻转字符串里的单词（LeetCode 151）
 * 描述：将字符串中的单词顺序反转，单词内部字符顺序不变。
 *       去除多余空格（首尾空格、单词间多个空格）。
 * 示例："the sky is blue" -> "blue is sky the"
 *
 * 解法一：正则法（API 一行搞定）
 * 思路：trim 去首尾空格 -> 正则合并多个空格为 1 个 -> split 拆成数组 -> reverse 反转 -> join 合并
 *
 * 解法二：单词内部翻转（reverseWords3）
 * 思路：split 空格 -> 每个单词内部字符翻转 -> join 合并
 *
 * 解法三：双端队列（reverseWords2）
 * 思路：双指针去掉首尾空格，遍历字符拼成单词，用 unshift 头插法实现翻转
 */

/**
 * reverseWords - 正则法翻转单词顺序
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s.trim().replace(/\s+/g, " ").split(" ").reverse().join(" ");
};

/**
 * reverseWords3 - 翻转每个单词内部字符
 * @param {string} s
 * @return {string}
 */
const reverseWords3 = (s) => {
  const arr = s.split(" ");
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i].split("").reverse().join(""));
  }
  return res.join(" ");
};

/**
 * reverseWords2 - 双端队列法翻转单词顺序
 * @param {string} s
 * @return {string}
 */
var reverseWords2 = function (s) {
  let left = 0, right = s.length - 1, queue = [], word = "";
  while (s.charAt(left) === " ") left++;
  while (s.charAt(right) === " ") right--;
  while (left <= right) {
    let char = s.charAt(left);
    if (char === " " && word) {
      queue.unshift(word);
      word = "";
    } else if (char !== " ") {
      word += char;
    }
    left++;
  }
  queue.unshift(word);
  return queue.join(" ");
};
