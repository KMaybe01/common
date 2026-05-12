//原生

function ajax_post(url, data) {
    // 1. 异步对象 ajax
    var ajax = new XMLHttpRequest();

    // 2. url 方法
    ajax.open('post', url);

    // 3. 设置请求报文
    ajax.setRequestHeader('Content-type', 'text/plain');

    // 4. 发送
    if (data) {
        ajax.send(data);
    } else {
        ajax.send();
    }

    // 5. 注册事件
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log(ajax.respenseText);
        }
    }
}


// promise 封装实现：
function getJSON(url) {
    // 创建一个 promise 对象
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        // 新建一个 http 请求
        xhr.open("GET", url, true);
        // 设置状态的监听函数
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            // 当请求成功或失败时，改变 promise 的状态
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        // 设置错误监听函数
        xhr.onerror = function () {
            reject(new Error(this.statusText));
        };
        // 设置响应的数据类型
        xhr.responseType = "json";
        // 设置请求头信息
        xhr.setRequestHeader("Accept", "application/json");
        // 发送 http 请求
        xhr.send(null);
    });
    return promise;
}

//用Promise 封装一个ajax
const promiseAjax = function (data) {
    function formatParams(param) {
        var arr = [];
        for (var name in param) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(param[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
    if (!data) data = {}
    data.params = data.params || {}

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        if (data.type === 'get') {
            data.params = formatParams(data.params); //options.data请求的数据

            xhr.open("GET", data.url + "?" + data.params, true);
            xhr.send(null);
        } else if (options.type == "post") {
            xhr.open("POST", data.url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data.params);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.responseText);
                }
            }
        }
    })
}

/*
xhr + promise 封装一个异步ajax请求的通用函数 简洁版
*/
function ajax(url) {
    return new Promise((resolve, reject) => {
        // 创建一个XHR对象
        const xhr = new XMLHttpRequest()
        // 初始化一个异步请求(还没发请求)
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            /*
            ajax引擎得到响应数据后
            将xhr的readyState属性指定为4
            将响应数据保存在response / responseText属性上
            调用此回调函数
            */
            // 如果状态值不为4, 直接结束(请求还没有结束)
            if (xhr.readyState !== 4) {
                return
            }
            // 如果响应码在200~~299之间, 说明请求都是成功的
            if (xhr.status >= 200 && xhr.status < 300) {
                // 指定promise成功及结果值
                resolve(JSON.parse(xhr.responseText))
            } else { // 请求失败了
                // 指定promise失败及结果值
                reject(new Error('request error staus ' + request.status))
            }
        }
        xhr.send(null)
    })
}
/*
xhr + promise 封装一个异步ajax请求的通用函数 加强版
返回值: promise
参数为配置对象
url: 请求地址
params: 包含所有query请求参数的对象
data: 包含所有请求体参数数据的对象
method: 为请求方式
*/
function axios({
    url,
    params = {},
    data = {},
    method = 'GET'
}) {
    // 返回一个promise对象
    return new Promise((resolve, reject) => {
        // 创建一个XHR对象
        const request = new XMLHttpRequest()
        // 根据params拼接query参数
        let queryStr = Object.keys(params).reduce((pre, key) => {
            pre += `&${key}=${params[key]}`
            return pre
        }, '')
        if (queryStr.length > 0) {
            queryStr = queryStr.substring(1)
            url += '?' + queryStr
        }
        // 请求方式转换为大写
        method = method.toUpperCase()
        // 初始化一个异步请求(还没发请求)
        request.open(method, url, true)
        // 绑定请求状态改变的监听
        request.onreadystatechange = function () {
            // 如果状态值不为4, 直接结束(请求还没有结束)
            if (request.readyState !== 4) {
                return
            }
            // 如果响应码在200~~299之间, 说明请求都是成功的
            if (request.status >= 200 && request.status < 300) {
                // 准备响应数据对象
                const responseData = {
                    data: JSON.parse(request.response),
                    status: request.status,
                    statusText: request.statusText
                }
                // 指定promise成功及结果值
                resolve(responseData)
            } else { // 请求失败了
                // 指定promise失败及结果值
                const error = new Error('request error staus ' + request.status)
                reject(error)
            }
        }
        // 如果是post/put请求
        if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            // 设置请求头: 使请求体参数以json形式传递
            request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
            // 包含所有请求参数的对象转换为json格式
            const dataJson = JSON.stringify(data)
            // 发送请求, 指定请求体数据
            request.send(dataJson)
        } else { // GET请求
            // 发送请求
            request.send(null)
        }
    })
}