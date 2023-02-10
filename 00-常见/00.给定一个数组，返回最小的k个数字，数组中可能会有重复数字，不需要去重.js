/**
 * 快排的核心函数，partition分区
 * @param {*} arr  数组
 * @param {*} start  起始下标
 * @param {*} end  结束下标
 */
function partition(arr, start, end) {
    //选最右的数作为pivot
    const pivot = arr[end];
    //指针i初始化为起始下标-1
    let i = start - 1;
    //指针j是从头到倒数第二个数都走一遍
    for (let j = start; j < end; j++) {
        //如果arr[j]比pivot小，就交换arr[i]和arr[j]（把小的移到前面去），且i指针前移
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    //最后把pivot换到中间
    swap(arr, i + 1, end);
    //返回pivot的下标
    return i + 1;
}
//交换数组中的两个数
function swap(arr, i, j) {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
//找出最小的k个数，返回的k个数不一定是有序的
function getLeastNumbers(arr, k) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;
    let index = partition(arr, start, end);
    while (index !== k) {
        if (index > k) {
            end = index - 1;
            index = partition(arr, start, end);
        } else {
            start = index + 1;
            index = partition(arr, start, end);
        }
    }
    return arr.slice(0, index);
}
//测试用例
const arr = [4, 2, 9, 99, 0, 199, 100, 22, 1, 8, 96, 92, 98];
console.log(getLeastNumbers(arr, 3));