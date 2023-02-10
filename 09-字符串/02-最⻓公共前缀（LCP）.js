/*
 输⼊: ["flower","flow","flight"]
输出: "fl" 

输⼊: ["dog","racecar","car"]
输出: ""
解释: 输⼊不存在公共前缀。
场景案例【⽹易】： 有⼀个场景，在⼀个输⼊框输⼊内容，怎么更加⾼效的去提示⽤户你输⼊的信
息，举个例⼦，你输⼊天猫，那么对应的提示信息是天猫商城，天猫集团，这个信息如何最快的获
取，有没有不需要发请求的⽅式来实现？
提示：
数据请求：防抖、节流
数据存储处理：Trie树
*/

//1.逐个比较，暴力法
function longestCommonPrefix(strs) {
  if (strs === null || strs.length === 0) return "";
  let prevs = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < prevs.length && j < strs[i].length; j++) {
      if (prevs.charAt(j) !== strs[i].charAt(j)) break;
    }
    prevs = prevs.substring(0, j);
    if (prevs === "") return "";
  }
  return prevs;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));

//2.分治
// 时间复杂度：O(s)，s 是所有字符串中字符数量的总和
// 空间复杂度：O(m*logn)，n是数组的⻓度，m为字符串数组中最⻓字符的⻓度
function longestCommonPrefix2(strs) {
  if (strs === null || strs.length === 0) return "";
  return lCPrefixRec(strs);
}
// 若分裂后的两个数组⻓度不为 1，则继续分裂
// 直到分裂后的数组⻓度都为 1，
// 然后⽐较获取最⻓公共前缀
function lCPrefixRec(arr) {
  let length = arr.length;
  if (length === 1) {
    return arr[0];
  }
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length);
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right));
}
// 求 str1 与 str2 的最⻓公共前缀
function lCPrefixTwo(str1, str2) {
  let j = 0;
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) {
      break;
    }
  }
  return str1.substring(0, j);
}
console.log(longestCommonPrefix2(["flower", "flow", "flight"]));
console.log(longestCommonPrefix2(["dog", "racecar", "car"]));

//3.Trie 树（字典树）
// 时间复杂度：O(s+m)，s 是所有字符串中字符数量的总和，m为字符串数组中最⻓字符的⻓度，构建
// Trie 树需要 O(s) ，最⻓公共前缀查询操作的复杂度为 O(m)
// 空间复杂度：O(s)，⽤于构建 Trie 树
var longestCommonPrefix3 = function (strs) {
  if (strs === null || strs.length === 0) return "";
  // 初始化 Trie 树
  let trie = new Trie();
  // 构建 Trie 树
  for (let i = 0; i < strs.length; i++) {
    if (!trie.insert(strs[i])) return "";
  }
  // 返回最⻓公共前缀
  return trie.searchLongestPrefix();
};
// Trie 树
var Trie = function () {
  this.root = new TrieNode();
};
var TrieNode = function () {
  // next 放⼊当前节点的⼦节点
  this.next = {};
  // 当前是否是结束节点
  this.isEnd = false;
};
Trie.prototype.insert = function (word) {
  if (!word) return false;
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.next[word[i]]) {
      node.next[word[i]] = new TrieNode();
    }
    node = node.next[word[i]];
  }
  node.isEnd = true;
  return true;
};
Trie.prototype.searchLongestPrefix = function () {
  let node = this.root;
  let prevs = "";
  while (node.next) {
    let keys = Object.keys(node.next);
    if (keys.length !== 1) break;
    if (node.next[keys[0]].isEnd) {
      prevs += keys[0];
      break;
    }
    prevs += keys[0];
    node = node.next[keys[0]];
  }
  return prevs;
};

console.log(longestCommonPrefix3(["flower", "flow", "flight"]));
console.log(longestCommonPrefix3(["dog", "racecar", "car"]));
