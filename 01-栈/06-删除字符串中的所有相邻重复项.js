/* 给出由⼩写字⺟组成的字符串 S ，重复项删除操作 会选择两个相邻且相同的字⺟，并删除它们。
在 S 上反复执⾏᯿复项删除操作，直到⽆法继续删除。
在完成所有᯿复项删除操作后返回最终的字符串。答案保证唯⼀。

输⼊："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字⺟相邻且相同，这是此时唯⼀可以执⾏删除
操作的᯿复项。之后我们得到字符串 "aaca"，其中⼜只有 "aa" 可以执⾏᯿复项删除操作，所以最
后的字符串为 "ca"。 */
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const removeDuplicates = function (S) {
  let stack = [];
  for (c of S) {
    let prev = stack.pop();
    if (prev !== c) {
      stack.push(prev);
      stack.push(c);
    }
  }
  return stack.join("");
};
