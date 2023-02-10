//使用ES5和ES6求函数参数的和
//ES5
function totalSum() {
    let sum = 0
    Array.prototype.forEach.call(arguments, function (item) {
        sum += item * 1
    })
    return sum
}

//ES6
function totalSum(...nums) {
    let sum = 0
    nums.forEach(function (item) {
        sum += item * 1
    })
    return sum
}