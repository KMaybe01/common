// 相同:在不影响客户体验的前提下,将频繁的回调函数,进行次数缩减.避免大量计算导致的页面卡顿.
// 不同:防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次.

// 函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点
// 击请求的事件上，避免因为用户的多次点击向后端发送多次请求。


//1.简易版

function handle2(){
    console.log("debounce"+Math.random())
}

function debounce1(fn, wait) {
    let timer = null;
    return function () {
        let context = this,
            args = arguments;
        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}
const debounce1Handler= debounce1(handle2,1000);
debounce1Handler()
debounce1Handler()
debounce1Handler()

//2.立即执行版
// 有时希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function debounce2(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

const debounce2Handler= debounce2(handle2,1000,true);
debounce2Handler()
debounce2Handler()
debounce2Handler()


//3.返回值版实现
// 有时希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function debounce3(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

const debounce3Handler= debounce3(handle2,1000,true);
debounce3Handler()
debounce3Handler()
debounce3Handler()


// 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时
// 间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

//节流原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
//适用场景：固定时间内只执行一次，防止超高频次触发位置变动。缩放场景：监控浏览器resize。


function handle(){
    console.log("throttle"+Math.random())
}
//1.时间戳(第一次立即执行)
function throttle1(fn, interval) {
    let curTime = 0;
    return function () {
        let context = this,
            nowTime = Date.now();
        // 如果两次时间间隔超过了指定时间，则执行函数。
        if (nowTime - curTime >= interval) {
            curTime = nowTime;
            return fn.apply(context, arguments);
        }
    };
}

const throttleHandler1= throttle1(handle,1000);
throttleHandler1()
throttleHandler1()
throttleHandler1()
throttleHandler1()

//2.使用定时器(最后一次不会立即执行)
function throttle2(func, interval) {
    let timeout = null;
    return function () {
        const context = this;
        const args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args)
            }, interval)
        }

    }
}

const throttleHandler2= throttle2(handle,1000);
throttleHandler2()
throttleHandler2()
throttleHandler2()


//3.定时器+时间戳  （开始不立即执行，最后立即执行）
function throttle3(func, delay) {
    let timer = null;
    let starTime = Date.now();
    return function(){
        let curTime = Date.now();
        let remainning = delay - (curTime - starTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        if(remainning){
            fn.apply(context,args);
            starTime = Date.now();
        }else{
            timer = setTimeout(fn,remainning);
        }
    }
}


const throttleHandler3= throttle1(handle,1000);
throttleHandler3()
throttleHandler3()
throttleHandler3()


