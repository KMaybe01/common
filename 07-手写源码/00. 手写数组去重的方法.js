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


//indexOf
function unique(ary) {
    let newAry = [];
    for (let i = 0; i < ary.length; i++) {
        let cur = ary[i];
        if (newAry.indexOf(cur) === -1) {
            newAry.push(cur);
        }
    }
    return newAry;
}
unique(arr)


//includes :包含；如果数组包含那一项，返回true；不包含返回false；

function unique(ary) {
    let newAry = [];
    let len = ary.length;
    for (let i = 0; i < len; i++) {
        let cur = ary[i];
        if (!newAry.includes(cur)) {
            newAry.push(cur);
        }
    }
    return newAry;
}
console.log(unique(arr));

//sort
function unique(ary) {
    let a = ary.sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i < a.length; i++) {
        if (a[i] === a[i + 1]) {
            a.splice(i + 1, 1);
            i--;
        }
    }
    return a;
}
unique(arr)

//递归

function unique(ary) {
    let len = ary.length;
    ary = ary.sort(function (a, b) {
        return a - b;
    });

    function loop(index) {
        if (index >= 1) {
            if (ary[index] === ary[index - 1]) {
                ary.splice(index, 1);
            }
            loop(index - 1)
        }
    }
    loop(len - 1);
    return ary;
}
console.log(unique(arr));
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

//filter+indexOf
function unique(ary) {
    return ary.filter(function (item, index, a) {
        return ary.indexOf(item) === index;
    })
}
console.log(unique(arr));