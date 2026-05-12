//实现一个cacheRequest 方法，保证发出多次同一个ajax请求时都能拿到数据，而实际上只发出一次请求。
const request = (url,option)=>new Promise((res)=>{
    setTimeout(()=>{
      res({data:option})
    },2000)
  })
  const cache = new Map();
  const cacheRequest = (url,option) => {
    let key = `${url}:${option.method}`;
    if (cache.has(key)) {
      if(cache.get(key).status === 'pending'){
        return cache.get(key).myWait;
      }
      return Promise.resolve(cache.get(key).data)
    } else {
      // 无缓存，发起真实请求
      let requestApi = request(url,option);
      cache.set(key, {status: 'pending',myWait: requestApi})
      return requestApi.then(res => {
        // console.log(cache)
        cache.set(key, {status: 'success',data:res})
        // console.log(cache)
        return Promise.resolve(res)
      }).catch(err => {
        cache.set(key, {status: 'fail',data:err})
        Promise.reject(err)
      })
    }
  }

  //测试
cacheRequest('url1')
.then(res => console.log(res))
cacheRequest('url1')
.then(res => console.log(res))

setTimeout(()=>{
  cacheRequest('url1')
  .then(res => console.log(res))
},4000)




/*
请实现一个cacheRequest(url,callback)请求缓存方法，保证当使用ajax时，对于同一个API实际在
网络层只发出一次请求以节省网络流量（假设已存在request底层方法用户封装ajax请求，调用格式为：
request（url,data =>{}））
*/

// a.js
cacheRequest('/user', data => {
  console.log('我是从A中请求的user，数据为' + data);
})
// b.js
cacheRequest('/user', data => {
  console.log('我是从B中请求的user，数据为' + data);
})

//方法一
/**
* @request, 模拟返回一个随机字符串,
* @cacheRequestFn 就是用了一个闭包, 缓存已请求的 url 和结果
* 当后面有相同 url 时将不执行 request 方法, 返回上一次请求时产生的随机字符串
*/
const request = (url) => url + ":" + Math.random();
const cacheRequestFn = () => {
  const urls = {};
  return (url, callback) => {
      callback(urls[url] ? urls[url] : (urls[url] = request(url)));
  };
};
const cacheRequest = cacheRequestFn();

//方法二

const pool = new Map();

function Cache(url, pending = true) {
  this.url = url;
  this.pending = pending;
  this.data = undefined;
  this.cbs = [];
}

function cacheRequest(url, cb) {
  if (pool.has(url)) {
      const {
          pending,
          cbs,
          data
      } = pool.get(url);
      if (pending) {
          cbs.push(cb);
      } else {
          setTimeout(() => {
              cb(data);
          });
      }
  } else {
      const cache = new Cache(url);
      cache.cbs.push(cb);
      pool.set(url, cache);
      request(url, (data) => {
          cache.pending = false;
          cache.data = data;
          if (cache.cbs.length) {
              cache.cbs.forEach((cb) => cb(data));
          }
      });
  }
}