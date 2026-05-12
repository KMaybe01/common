//实现格式化输出，比如输入999999999999，输出999，999，999，999
//1.进阶版  无法格式化小数
function formatNumber(num) {
  //str.split('').reverse() => ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
  return num.toString().split('').reverse().reduce((prev, next, index) => {

    return ((index % 3) ? next : (next + ',')) + prev
  })
}


console.log(formatNumber(1234567890)); //1,234,567,890
console.log(formatNumber(-1234567890)); //-1,234,567,890


//2.API 无法格式化带小数
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

// console.log(formatNumber(1234567890)); //1,234,567,890
// console.log(formatNumber(-1234567890)); //-1,234,567,890




//数字有小数点
let format = n => {
  let num = n.toString() // 转成字符串
  let decimals = ''
  // 判断是否有小数
  num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
  let len = num.length
  if (len <= 3) {
    return num
  } else {
    let temp = ''
    let remainder = len % 3
    decimals ? temp = '.' + decimals : temp
    if (remainder > 0) { // 不是3的整数倍
      return num.slice(0, remainder) + ',' + num.slice(remainder,
        len).match(/\d{3}/g).join(',') + temp
    } else { // 是3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp
    }
  }
}
console.log(format(1232323.1234545)); //1,232,323
console.log(format(-1232323.123)); //-1,232,323
console.log(format(1232323)); //1,232,323
console.log(format(-1232323)); //-1,232,323