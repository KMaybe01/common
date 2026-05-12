const maxDiff = arr => {
    // solution 1
    // arr = arr.flat().sort((a, b) => a - b);
    // return arr[arr.length - 1] - arr[0];

    // solution 2
    let max = 0;
    let min = 0;
    for (let i = 0; i < arr.length; i++) {
        let tempArr = arr.sort((a, b) => a - b);
        min = tempArr[0];
        max = tempArr[tempArr.length - 1] > max ? tempArr[tempArr.length - 1] : max;

    }

    return max - min;
};

let arr2 = [1, 13, 4, 22, 5, 9, 6, 20];
console.log(maxDiff(arr2))