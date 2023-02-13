/*
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */

const deepEqual = function (x, y) {
    // 指向同一内存时
    if (x === y) {
        return true;
    } else if ((typeof x === 'object' && x != null) && (typeof y === 'object' && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length) {
            return false;
        }
        for (let prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    return false;
}

//false
console.log(deepEqual({}, {
    m: 1,
    a: 1
}))

//true
console.log(deepEqual( 
    {
    m: 1,
    a: 1
    }, 
    {
    m: 1,
    a: 1
    }
))