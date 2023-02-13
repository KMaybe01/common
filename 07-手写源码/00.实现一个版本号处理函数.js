//实现一个版本号处理函数
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  // TODO
}
// => ['1.5','1.45.0','3.3.3.3.3.3','6']

function sortVersion(list) {
  return list.sort((a, b) => {
    let aa = a.split('.')
    let bb = b.split('.')
    let length = aa.length > bb.length ? aa.length : bb.length
    for (var i = 0; i < length; i++) {
      let x = aa[i] || 0;
      let y = bb[i] || 0;
      if (x - y !== 0) return x - y;
    }
  });
}
const sv = sortVersion(['1.0.0', '1.2.3.4.5', '2.12.1', '0.18.1', '3.3.2', '0.18.1'])
console.log(sv) //[ '0.18.1', '0.18.1', '1.0.0', '1.2.3.4.5', '2.12.1', '3.3.2' ]
