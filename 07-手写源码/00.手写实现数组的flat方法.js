//函数功能：将多层嵌套的数组扁平化，depth为展开的层数

//方法一 递归
function _flat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(_flat(cur, depth - 1))
        } else {
            return prev.concat(cur);
        }
    }, []);
}

function flat(arr, depth = 1) {
    return depth > 0 ?
        arr.reduce((acc, cur) => {
            if (Array.isArray(cur)) {
                return [...acc, ...flat(cur, depth - 1)]
            }
            return [...acc, cur]
        }, []) :
        arr
}
console.log(_flat([5, [2, [3, [4]]]], 5));

//方法二 递归
function flat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    const len = arr.length;
    let res = [];
    for (let i = 0; i < len; i++) {
        if (Array.isArray(arr[i])) {
            //注意concat方法是不改变原数组的，所以要重新赋值
            res = res.concat(flat(arr[i], depth - 1));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
//方法三 栈
function flattenDeep(arr, depth) {
    const result = []
    // 将数组元素拷贝至栈，直接赋值会改变原数组
    const stack = [...arr]
    // 如果栈不为空，则循环遍历
    while (stack.length !== 0) {
        const val = stack.pop()
        if (Array.isArray(val) && depth > 0) {
            // 如果是数组再次入栈，并且展开了一层
            stack.push(...val)
            depth--
        } else {
            // 如果不是数组，就用头插法插入到结果数组中
            result.unshift(val)
        }
    }
    return result
}
console.log(flattenDeep([5, [2, [3, [4]]]], 2))
//测试
console.log(_flat([5, [2, [3, [4]]]], 2));
var arr2 = [
    [1, 2, 4],
    [2, 3, 7],
    [3, 5, 7],
    [4, 5, 8]
]

console.log(_flat(arr2).sort(function (a, b) {
    return a - b
}))