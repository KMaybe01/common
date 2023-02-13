let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let sum = arr.reduce((total, i) => total += i, 0);
console.log(sum);

function add(arr) {
    if (arr.length == 1) return arr[0]
    return arr[0] + add(arr.slice(1))
}
console.log(add(arr)) // 21

let arr2 = [1, 2, 3, [
    [4, [10],5], 6
], 7, 8, 9]
// reduce((accumulator, currentValue, currentIndex, array) => { /* … */ }, initialValue)
//arr2 = arr2.toString().split(',').reduce((total, i) => total += Number(i), 0);  // arr2.toString() 1,2,3,4,10,5,6,7,8,9
arr2 =  arr2.flat(2).reduce((total, i) => total += i, 0);
console.log( arr2.toString());
