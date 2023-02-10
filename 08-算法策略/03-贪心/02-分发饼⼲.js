/* 假设你是⼀位很棒的家⻓，想要给你的孩⼦们⼀些⼩饼⼲。但是，每个孩⼦最多只能给⼀块饼⼲。对
每个孩⼦ i ，都有⼀个胃⼝值 gi ，这是能让孩⼦们满⾜胃⼝的饼⼲的最⼩尺⼨；并且每块饼⼲ j ，都有⼀个尺⼨ sj。如果 sj
 >= gi ，我们可以将这个饼⼲ j 分配给孩⼦ i ，这个孩⼦会得到满⾜。你的⽬标是尽可能满⾜越多数ᰁ的孩⼦，并输出这个最⼤数值。
 你可以假设胃⼝值为正。 ⼀个⼩朋友最多只能拥有⼀块饼⼲。
输⼊: [1,2,3], [1,1]
输出: 1
解释: 
你有三个孩⼦和两块⼩饼⼲，3个孩⼦的胃⼝值分别是：1,2,3。
虽然你有两块⼩饼⼲，由于他们的尺⼨都是1，你只能让胃⼝值是1的孩⼦满⾜。
所以你应该输出1。

输⼊: [1,2], [1,2,3]
输出: 2
解释: 
你有两个孩⼦和三块⼩饼⼲，2个孩⼦的胃⼝值分别是1,2。
你拥有的饼⼲数ᰁ和尺⼨都⾜以让所有孩⼦满⾜。
所以你应该输出2. */
var findContentChildren = function (g, s) {
  const sortFunc = (a, b) => {
    return a - b;
  };
  g.sort(sortFunc);
  s.sort(sortFunc);
  let i = 0;
  s.forEach((n) => {
    if (n >= g[i]) {
      i++;
    }
  });
  return i;
};

//排序+贪心
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  let gi = 0; // 胃口值
  let sj = 0; // 饼干尺寸
  let res = 0;
  while (gi < g.length && sj < s.length) {
    // 当饼干 sj >= 胃口 gi 时，饼干满足胃口，更新满足的孩子数并移动指针
    if (s[sj] >= g[gi]) {
      gi++;
      sj++;
      res++;
    } else {
      // 当饼干 sj < 胃口 gi 时，饼干不能满足胃口，需要换大的
      sj++;
    }
  }
  return res;
};
