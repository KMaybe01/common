/* 
取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与
该索引值对应的元素进行交换
按照上面的规律执行，直到遍历完成 
*/

//1.改变原数组
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = arr.length - 1; i > 0; i--) {
  const randomIndex = Math.round(Math.random() * (i + 1));
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log("方法一:" + arr);
//正序输出
const arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
};
//2.倒序输出
var arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let length = arr3.length,
  randomIndex,
  temp;
while (length) {
  randomIndex = Math.floor(Math.random() * length--);
  temp = arr3[length];
  arr3[length] = arr3[randomIndex];
  arr3[randomIndex] = temp;
}
console.log("方法二" + arr3); //随机

//3.返回新数组
var arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function disorder(arr) {
  return Array.from(arr).sort(() => Math.random() - 0.5);
}
var arr2 = disorder(arr3);
console.log("方法三" + arr2); //随机
console.log(arr3); //[ 1, 2, 3, 4, 5 ]
console.log(arr3 === arr2); //false
