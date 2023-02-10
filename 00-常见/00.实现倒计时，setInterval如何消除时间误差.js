//使用setTimeout递归自循环调用解决
countDown();

function addZero(i) {
    return i < 10 ? "0" + i : i + "";
}

function countDown() {
    var nowtime = new Date()
    var endtime = new Date("2021/11/05,16:16:00");
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    var d = parseInt(lefttime / (24 * 60 * 60));
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    d = addZero(d);
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    console.log(`活动倒计时 ${d} 天 ${h} 时 ${m} 分 ${s} 秒 `)

    if (lefttime <= 0) {
        console.log("活动结束")
    }
    setTimeout(countDown, 1000);
}