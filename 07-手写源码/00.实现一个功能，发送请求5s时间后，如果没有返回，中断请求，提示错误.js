//实现一个功能，发送请求5s时间后，如果没有返回，中断请求，提示错误

const request = (params) => {
  const option = {
    timeOut: 5000,
    ...params
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let isTimeOut = false
    const timer = setTimeout(function () {
      isTimeOut = true;
      xhr.abort();
      reject('request is timeout ！！！')
    }, option.timeOut)
    xhr.open("GET", option.url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (isTimeOut) return; //忽略中止请求
        clearTimeout(timer); //取消等待的超时
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject(`Request was unsuccessful ！！！ ${xhr.status}`)
        }
      }
    }
    // 可以根据不同的请求方法发送数据
    xhr.send(null);
  })
}