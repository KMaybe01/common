/**
 * 函数防抖，一定时间内连续触发事件只执行一次
 * @param {*} func 需要防抖的函数
 * @param {*} delay 防抖延迟
 * @param {*} immediate 是否立即执行，为true表示连续触发时立即执行，即执行第一次，为false表示连续触发后delay ms后执行一次
 */
let debounce = function (func, delay = 100, immediate = false) {
    let timeoutId, last, context, args, result

    function later() {
        const interval = Date.now() - last
        if (interval < delay && interval >= 0) {
            timeoutId = setTimeout(later, delay - interval)
        } else {
            timeoutId = null
            if (!immediate) {
                result = func.apply(context, args)
                context = args = null
            }
        }
    }

    return function () {
        context = this
        args = arguments
        last = Date.now()

        if (immediate && !timeoutId) {
            result = func.apply(context, args)
            context = args = null // 解除引用
        }

        if (!timeoutId) {
            timeoutId = setTimeout(later, delay)
        }

        return result
    }
}


let flag = false // 标志位，表示当前是否正在请求数据
let xhr = null

let request = (i) => {
    if (flag) {
        clearTimeout(xhr)
        console.log(`取消第${i - 1}次请求`)
    }
    flag = true
    console.log(`开始第${i}次请求`)
    xhr = setTimeout(() => {
        console.log(`请求${i}响应成功`)
        flag = false
    }, Math.random() * 200)
}

let fetchData = debounce(request, 50) // 防抖

// 模拟连续触发的请求
let count = 1
let getData = () => {
    setTimeout(() => {
        fetchData(count)
        count++
        if (count < 11) {
            getData()
        }
    }, Math.random() * 200)
}
getData()

/* 某次测试输出：
开始第1次请求
请求1响应成功
开始第2次请求
取消第3次请求
开始第4次请求
请求4响应成功
开始第5次请求
取消第5次请求
开始第6次请求
请求6响应成功
开始第7次请求
请求7响应成功
开始第8次请求
请求8响应成功
开始第10次请求
请求10响应成功
*/