/* map做的事情很单纯，就是处理每个元素然后返回一个新的数组，下面就来看看怎样实现自己的
map函数。实现步骤如下所示：
1. 判断输入的第一个参数是不是函数
2. 获取需要处理的数组内容
3. 新建一个新数组用于装载新的内容
4. 对数组中每个值进行处理（注意改变this指向）
5. 返回结果 */

function map(arr, mapCallback) {
    // 首先，检查传递的参数是否正确。
    if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
        return [];
    } else {
        let result = [];
        // 每次调用此函数时，我们都会创建一个 result 数组
        // 因为我们不想改变原始数组。
        for (let i = 0, len = arr.length; i < len; i++) {
            result.push(mapCallback(arr[i], i, arr));
            // 将 mapCallback 返回的结果 push 到 result 数组中
        }
        return result;
    }
}