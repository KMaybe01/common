let arr = [];
Array.prototype.myPush = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}


arr.myPush(1)
arr.myPush(1)
arr.myPush(1)
console.log(arr)