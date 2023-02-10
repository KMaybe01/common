//取整
Number.isInteger = function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
//异或运算
function isInteger(x) {
    return typeof value === "number" &&
        isFinite(value) && x ^ 0 === x
}

//取余
function isInteger(x) {
    return typeof value === "number" &&
        isFinite(value) && (x % 1 === 0)
}