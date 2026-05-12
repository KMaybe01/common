//set ：不是一种数据类型，是一种数据结构；成员唯一

let arr = [12, 1, 12, 3, 1, 88, 66, 9, 66];

function unique(ary) {
    let s = new Set(ary);
    // Array.from : 将set数据结构转成真正的数组；
    return Array.from(s)
}
unique(arr);

//类似于方法一的set，用了剩余运算符...

let a = [...new Set(arr)];
console.log(a);


//对象属性名不能重复
function unique(ary) {
    let obj = {};
    for (let i = 0; i < ary.length; i++) {
        let cur = ary[i];
        if (obj[cur]) {
            //ary.splice(i,1);// 导致数组塌陷
            ary[i] = ary[ary.length - 1];
            ary.length--; // 删除最后一项
            i--;
            continue;
        }
        obj[cur] = cur; // 给obj新增键值对；属性名和属性值是一样的
    }
}
unique(arr);


//includes or indexOf
function unique(ary) {
    let newAry = [];
    let len = ary.length;
    for (let i = 0; i < len; i++) {
        let cur = ary[i];
        if (!newAry.includes(cur)) {  // newAry.indexOf(cur) === -1
            newAry.push(cur);
        }
    }
    return newAry;
}
console.log(unique(arr));

//sort
function unique(ary) {
    let a = ary.sort((a, b) => a - b);
    for (let i = 0; i < a.length; i++) {
        if (a[i] === a[i + 1]) {
            a.splice(i + 1, 1);
            i--;
        }
    }
    return a;
}
unique(arr)

//splice
function unique(ary) {
    for (let i = 0; i < ary.length; i++) {
        for (j = i + 1; j < ary.length; j++) {
            if (ary[i] === ary[j]) {
                ary.splice(j, 1);
                j--;
            }
        }
    }
    return ary;
}
unique(arr);

//filter+indexOf
function unique(ary) {
     return ary.filter((item,index)=> ary.indexOf(item) === index)
}
console.log(unique(arr));

