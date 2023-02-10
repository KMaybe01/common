// 以下是⼀个相对准备的倒计时实现
var period = 60 * 1000 * 60 * 2
var startTime = new Date().getTime();
var count = 0
var end = new Date().getTime() + period
var interval = 1000
var currentInterval = interval

function loop() {
    count++
    var offset = new Date().getTime() - (startTime + count * interval); // 代码
    var diff = end - new Date().getTime()
    var h = Math.floor(diff / (60 * 1000 * 60))
    var hdiff = diff % (60 * 1000 * 60)
    var m = Math.floor(hdiff / (60 * 1000))
    var mdiff = hdiff % (60 * 1000)
    var s = mdiff / (1000)
    var sCeil = Math.ceil(s)
    var sFloor = Math.floor(s)
    currentInterval = interval - offset // 得到下⼀次循环所消耗的时间
    console.log('时：' + h, '分：' + m, '毫秒：' + s, '秒向上取整：' + sCeil, '代码执⾏时间：',
        setTimeout(loop, currentInterval))
    }
    setTimeout(loop, currentInterval)