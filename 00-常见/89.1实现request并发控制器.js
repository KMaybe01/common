//写一个并发request函数，能够控制并发请求数量，并请求结束后调用回调函数，请求直接使用fetch发送。
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;
  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      console.log('当前并发： ' + requestsQueue);
      const len = results.push(res);
      if (len < urlCount && i + 1 < urlCount) {
        requestsQueue.shift();
        handleRequest(urls[++i])
      } else if (len === urlCount) {
        'function' === typeof callback && callback(results)
      }
    }).catch(e => {
      results.push(e)
    });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  };
  handleRequest(urls[i])
}

const fetch = function (idx) {
  return new Promise(resolve => {
    console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      console.log(`end request ${idx}`);
      resolve(idx)
    }, timeout)
  })
};

const max = 2;

const callback = () => {
  console.log('并发任务完成');
};

const urls = Array.from({
  length: 5
}, (v, k) => k);



handleFetchQueue(urls, max, callback);


//第二版

//   function sendRequest(urls, max, callback) {
//     const urlCount = urls.length;
//     // 存储所有正在发送中的请求
//     const requestsQueue = [];
//     const results = [];
//     let i = 0;
//     const handleRequest = (url) => {
//         const req = fetch(url).then(res => {
//             const len = results.push(res);
//             if (len < urlCount && i + 1 < urlCount) {
//                 requestsQueue.shift();
//                 handleRequest(urls[++i])
//             } else if (len === urlCount) {
//                 'function' === typeof callback && callback(results)
//             }
//         }).catch(e => {
//             results.push(e)
//         });
//         if (requestsQueue.push(req) < max) {
//             handleRequest(urls[++i])
//         }
//     };
//     handleRequest(urls[i])
// }
// const urls = Array.from({
//     length: 10
// }, (v, k) => k);
// sendRequest(urls, 3, (result) => {
//     console.log('all done!', result)
// });
//
// function fetch(url, delay = Math.random() * 4000) {
//     return new Promise(resolve => {
//         console.log(`\t\tsending request: [${url}] >> [${delay}ms]`)
//         setTimeout(() => {
//             console.log(`\t\t-------- done:[${url}] >> [${delay}ms]`)
//             resolve(url)
//         }, delay)
//     })
// }

//珠峰版

/*
        可以批量请求数据，所有的 URL 地址在 urls 参数中，
        同时可以通过 max 参数控制请求的并发度，当所有请
        求结束之后，需要执行 callback 回调函数。发请求的
        函数可以直接使用 fetch 即可
*/
// /**
//  *
//  * @param { Array } urls  请求地址数组
//  * @param { Number } max 最大并发请求数
//  * @param { Function } callback  回调地址
//  */
// function parallelFetch(urls, max, callback) {
//   // 如果当前环境不支持 fetch , 则提示程序无法正常运行
//   if (!window.fetch || "function" !== typeof window.fetch) {
//     throw Error("当前环境不支持 fetch 请求，程序终止");
//   }

//   // 如果参数有误，则提示输入正确的参数
//   if (!urls || urls.length <= 0) {
//     throw Error("urls is empty: 请传入正确的请求地址");
//   }

//   const _urlsLength = urls.length; // 请求地址数组的长度
//   const _max = max || 1; // 保证最大并发值的有效性
//   let _currentIndex = 0; // 当前请求地址的索引
//   let _maxFetch = max <= _urlsLength ? max : _urlsLength; // 当前可以正常请求的数量，保证最大并发数的安全性
//   let _finishedFetch = 0; // 当前完成请求的数量，用于判断何时调用回调

//   console.log(`开始并发请求，接口总数为 ${_urlsLength} ，最大并发数为 ${_maxFetch}`);
//   // 根据最大并发数进行循环发送，之后通过状态做递归请求
//   for (let i = 0; i < _maxFetch; i++) {
//     fetchFunc();
//   }
//   // 请求方法
//   function fetchFunc() {
//     // 如果所有请求数都完成，则执行回调方法
//     if (_finishedFetch === _urlsLength) {
//         console.log(`当前一共 ${_urlsLength} 个请求，已完成 ${_finishedFetch} 个`)
//       if ("function" === typeof callback) return callback();
//       return false;
//     }
//     // 如果当前请求的索引大于等于请求地址数组的长度，则不继续请求
//     if (_currentIndex >= _urlsLength) {
//       _maxFetch = 0;
//     }

//     //如果可请求的数量大于0，表示可以继续发起请求
//     if (_maxFetch > 0) {
//       console.log( `当前正发起第 ${_currentIndex + 1 } 次请求，当前一共 ${_urlsLength} 个请求，已完成 ${_finishedFetch} 个，请求地址为：${urls[_currentIndex]}`);
//       // 发起 fetch 请求
//       fetch(urls[_currentIndex])
//         .then((res) => {
//           // TODO 业务逻辑，正常的逻辑，异常的逻辑
//           // 当前请求结束，正常请求的数量 +1
//           _maxFetch += 1;
//           _finishedFetch += 1;
//           fetchFunc();
//         })
//         .catch((err) => {
//           // TODO 异常处理，处理异常逻辑
//           // 当前请求结束，正常请求的数量 +1
//           _maxFetch += 1;
//           _finishedFetch += 1;
//           fetchFunc();
//         });
//       // 每次请求，当前请求地址的索引  +1
//       _currentIndex += 1;
//       // 每次请求，可以正常请求的数量 -1
//       _maxFetch -= 1;
//     }
//   }
// }


  