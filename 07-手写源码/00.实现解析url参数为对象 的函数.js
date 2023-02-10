/**
 * --- 题目描述 ---
 * 
 * 实现一个函数，可以对 url 中的 query 部分做拆解，返回一个 key: value 形式的 object  
 * 
 * --- 实例 ---
 * 
 * 输入：'http://sample.com/?a=1&e&b=2&c=xx&d#hash' 
 * 输出：{a: 1, b: 2, c: 'xx', d: ''}  
 */

function getQueryObj(url) {
  // TODO
  let arr = url.split('?')[1].split('#')[0].split('&');
  const res = {};
  arr.forEach(e => {
    const [key, value] = e.split('=');
    if (!value) {
      res[key] = '';
    } else {
      res[key] = value;
    }
  })
  return res;
}
const url1 = 'http://sample.com/?a=1&e&b=2&c=xx&d#hash'
console.log(getQueryObj(url1))



/**
 * --- 题目描述 ---
 *
 * 实现一个 parseParem 函数，将 url 转化为指定结果
 *
 * --- 测试用例 ---
 *
 * 输入：url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
 * 输出：
{
 user:'anonymous',
 id:[123,456],// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 city:'北京',// 中文需解码
 enabled: true // 未指定值的 key 与约定为 true
}
 */

const parseParem = (url) => {
  const arr = url.split('?')[1].split('&');
  const res = {};
  arr.forEach((e) => {
    let [key, value] = e.split('=')
    if (value === undefined) {
      res[key] = true;
    } else {
      if (key in res) {
        Array.isArray(res[key]) ? res[key].push(value) : res[key] = [].concat(res[key], value);
      } else {
        res[key] = decodeURI(value)
      }
    }
  })
  return res;
}

function querystring(queryStr) {
  const [, query] = queryStr.split("?");
  if (query) {
    return query.split("&").reduce((pre, cur) => {
      const [key, val] = cur.split("=");
      if (pre[key]) {
        pre[key] = [...pre[key], decodeURIComponent(val)];
      } else {
        pre[key] = [decodeURIComponent(val)];
      }
      return pre;
    }, {});
  }
  return {};
}
const url2 = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
console.log(parseParem(url2))
console.log(querystring(url2))

// function parseParam(url) {
//   const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
//   const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
//   let paramsObj = {};
//   // 将 params 存到对象中
//   paramsArr.forEach(param => {
//     if (/=/.test(param)) { // 处理有 value 的参数
//       let [key, val] = param.split('='); // 分割 key 和 value
//       val = decodeURIComponent(val); // 解码
//       val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
//       if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
//         paramsObj[key] = [].concat(paramsObj[key], val);
//       } else { // 如果对象没有这个 key，创建 key 并设置值
//         paramsObj[key] = val;
//       }
//     } else { // 处理没有 value 的参数
//       paramsObj[param] = true;
//     }
//   })
//   return paramsObj;
// }