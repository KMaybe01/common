//用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可。用 map 维护字符的索引，遇到相同的字符，把左边
//界移动过去即可。挪动的过程中记录最大长度：
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let i = -1
    let res = 0
    let n = s.length
    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]))
        }
        res = Math.max(res, j - i)
        map.set(s[j], j)
    }
    return res
};

var lengthOfLongestSubstring = function (s) {
    let arr = [];
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        let index = arr.indexOf(s[i])
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(s.charAt(i));
        max = Math.max(arr.length, max);
    }
    return max;
};
console.log(lengthOfLongestSubstring("abcdefffd"))