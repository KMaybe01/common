/* let setter = function (conten, key, value) {
    // your code
};
let n = {
    a: {
        b: {
            c: {
                d: 1
            },
            bx: {
                y: 1
            },
        },
        ax: {
            y: 1
        },
    },
};
// 修改值
setter(n, "a.b.c.d", 3);
console.log(n.a.b.c.d); //3
setter(n, "a.b.bx", 1);
console.log(n.b.bx); //1 */

//方法一
let setter = function (conten, key, value) {
    let argArr = key.split('.');
    let i = argArr.shift();
    if (argArr.length == 0) {
        conten[i] = value;
    } else {
        conten[i] = setter(conten[i], argArr.join('.'), value);
    }
    return conten;
};
let n = {
    a: {
        b: {
            c: {
                d: 1
            },
            bx: {
                y: 1
            },
        },
        ax: {
            y: 1
        },
    },
};
// 修改值
setter(n, "a.b.c.d", 3);
console.log(n.a.b.c.d); //3
setter(n, "a.b.bx", 1);
console.log(n.a.b.bx); //1 