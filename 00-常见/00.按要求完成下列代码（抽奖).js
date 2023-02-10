// function lottery(whiteList,participant){ your code}
//whiteList：类型字符串数组，意义是表示从其他系统中计算出来的活跃用户，如果这批用户参与抽奖，则必定让他中奖。长度不超过1万。
//participant：类型字符串数组，意义是表示此次活动中真正参与抽奖的用户，长度约10万。
//函数希望从participant返回2万个用户，表示中奖用户，优先选取whiteList上的用户，若不在whiteList上，对participant剩余的随机选取即可。

//方法一
/**
 * @param {*} whiteList 活跃用户
 * @param {*} participant 抽奖用户
 */
function lottery(whiteList, participant){
    const pLen = participant.length, // 抽奖用户数
        wLen = whiteList.length, // 白名单用户数
        targetNum = 20000 //； 总中奖用户
    if (pLen === 0) return [];
    // 如果参与中奖人数小于总中奖人数，那就全部中奖
    if (pLen < targetNum) return participant;
    let res = [], // 中奖名单
        i = 0;
    const map = new Map();
    // 白名单用户处理
    while (i < wLen && res.length <= targetNum) {
        //   从抽奖用户查找白名单用户
        const pIndex = participant.indexOf(whiteList[i]);
        if (pIndex !== -1) {
            map.set(pIndex, true);
            res.push(whiteList[i]);
        }
        i++;
    }
    //  普通抽奖用户处理
    while (res.length < targetNum) {
        //  随机抽取普通用户
        const index = Math.floor(Math.random() * pLen);
        // 如果是白名单用户就跳过
        if (map.has(index)) continue;
        res.push(participant[index]);
        map.set(index.true);
    }
    return res;
}

// 测试
const whiteList = Array.from({
    length: 10000
}, (v, k) => "" + k);
const participant = Array.from({
    length: 100000
}, (v, k) => "" + k);
console.log(lottery(whiteList, participant));

//方法二

function lottery(whiteList, participant) {
    //   中奖用户
    const count = 20000;
    //   中奖名单
    const res = [];
    whiteList.sort();
    participant.sort();

    //  随机获取抽奖用户
    const pickRandom = () => {
        const idx = parseInt(Math.random() * participant.length);
        res.push(participant.splice(idx, 1)[0]);
    };
    // 统计白名单人数
    let i1 = 0;
    // 统计中奖人数
    let i2 = 0;
    // 当中奖名单小于中奖人数
    while (res.length < count) {
        // 先从白名单中抽取
        if (i1 < whiteList.length && i2 < participant.length) {
            // 查找抽奖用户中的白名单用户
            if (whiteList[i1] === participant[i2]) {
                let [ele] = participant.splice(i2, 1);
                res.push(ele);
                i1++;
            } else if (whiteList[i1] > participant[i2]) {
                i2++;
            } else {
                i1++;
            }
        } else {
            // 如果白名单人数抽完了，开始从普通用户中抽取
            pickRandom();
        }
    }
    return res;
}
const whiteList2 = Array.from({
    length: 10000
}, (v, k) => "" + k);
const participant2 = Array.from({
    length: 100000
}, (v, k) => "" + k);
console.log(lottery(whiteList2, participant2));