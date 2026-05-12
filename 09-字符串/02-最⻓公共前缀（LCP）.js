/**
 * 题目：最长公共前缀 LCP（LeetCode 14）
 * 描述：从字符串数组中找到所有字符串共有的最长前缀。
 * 示例：["flower","flow","flight"] -> "fl"
 *       ["dog","racecar","car"] -> ""
 *
 * 解法一：逐个比较（暴力法）
 * 思路：取第一个字符串为基准，依次与每个字符串比较，逐步缩小前缀。
 * 时间复杂度：O(s)（s 为所有字符总数）；空间复杂度：O(1)
 *
 * 解法二：分治法
 * 思路：将数组递归分成两半，分别求 LCP 再合并。
 * 时间复杂度：O(s)；空间复杂度：O(m*log n)
 *
 * 解法三：Trie 树（字典树）
 * 思路：构建 Trie 树存储所有字符串，遍历只有一个子节点的路径。
 * 时间复杂度：O(s+m)；空间复杂度：O(s)
 * 应用场景：输入框自动补全（如搜索提示）
 */

/**
 * longestCommonPrefix - 逐个比较法
 * @param {string[]} strs
 * @return {string}
 */
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

/**
 * longestCommonPrefix2 - 分治法
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix2(strs) {
  if (strs === null || strs.length === 0) return "";
  return lCPrefixRec(strs);
}

function lCPrefixRec(arr) {
  let length = arr.length;
  if (length === 1) return arr[0];
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length);
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right));
}

function lCPrefixTwo(str1, str2) {
  let j = 0;
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) break;
  }
  return str1.substring(0, j);
}

/**
 * longestCommonPrefix3 - Trie 树法
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix3 = function (strs) {
  if (strs === null || strs.length === 0) return "";
  let trie = new Trie();
  for (let i = 0; i < strs.length; i++) {
    if (!trie.insert(strs[i])) return "";
  }
  return trie.searchLongestPrefix();
};

/** TrieNode - 字典树节点 */
var TrieNode = function () {
  this.next = {};
  this.isEnd = false;
};

/** Trie - 字典树 */
var Trie = function () {
  this.root = new TrieNode();
};

Trie.prototype.insert = function (word) {
  if (!word) return false;
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.next[word[i]]) node.next[word[i]] = new TrieNode();
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
