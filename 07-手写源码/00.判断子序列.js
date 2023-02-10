// 判断b是否为a的子序列
//子序列就是B中的元素以原始相对位置、有序的分布于A数组中，并不一定相邻。字串，子数组一般要求连续。
const isSubsequence = (b, a) => {
    let bi = 0,
        ai = 0;
    while (bi < b.length) {
        if (a[ai] === b[bi]) bi++;
        ai++;
        if (ai > a.length) return false;
    }
    return true;
};
const arr = [1, 3, 5, 7, 11];
const arrChild = [1, 5, 11];
const t1 = isSubsequence(arrChild, arr);
console.log(t1)