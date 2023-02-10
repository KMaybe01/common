/**
 * @param {number} n
 * @return {number}
 */
//1.暴力
var fib = function (n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
};

//2.递归+缓存
var fib = function (n) {
    if (n <= 1) {
        return n;
    }
    const cache = [];
    cache[0] = 0;
    cache[1] = 1;

    function memorize(number) {
        if (cache[number] !== undefined) {
            return cache[number];
        }
        cache[number] = memorize(number - 1) + memorize(number - 2);
        return cache[number];
    }
    const result = memorize(n);
    return result;
}

//3.动态规划
//时间复杂度：O(n)
//空间复杂度：O(1)
var fib = function (n) {
    if (n < 2) {
        return n;
    }
    let p = 0,
        q = 0,
        r = 1;
    for (let i = 2; i <= n; i++) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};