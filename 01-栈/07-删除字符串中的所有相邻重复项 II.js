/* 给你⼀个字符串 s，「 k 倍᯿复项删除操作」将会从 s 中选择 k 个相邻且相等的字⺟，并删除它
们，使被删去的字符串的左侧和右侧连在⼀起。
你需要对 s 重复进⾏⽆限次这样的删除操作，直到⽆法继续为⽌。
在执⾏完所有删除操作后，返回最终得到的字符串。
本题答案保证唯⼀。 */
/* 输⼊：s = "abcd", k = 2
输出："abcd"
解释：没有要删除的内容。

输⼊：s = "deeedbbcccbdaa", k = 3
输出："aa"
解释：
先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
再删除 "bbb"，得到 "dddaa"
最后删除 "ddd"，得到 "aa"
//  */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const removeDuplicates = function (s, k) {
  let stack = [];
  for (let c of s) {
    let prev = stack.pop();
    if (!prev || prev[0] !== c) {
      stack.push(prev);
      stack.push(c);
    } else if (prev.length < k - 1) {
      stack.push(prev + c);
    }
  }
  return stack.join("");
};


const test = removeDuplicates("deeedbbcccbdaa",3)
console.log(test)