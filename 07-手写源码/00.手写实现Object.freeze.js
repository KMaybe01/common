//Object.freeze是浅冻结
/* const obj = {
    name: "yd",
    info: {
        address: "beijing",
    },
};
const freezeObj = Object.freeze(obj);
freezeObj.name = "new name";
console.log(freezeObj.name); // 仍然是yd
// 严格模式会报错
("use strict");
freezeObj.name = "new name"; // TypeError
//Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// 但是info 是没有被冻结的
freezeObj.info.newName = "ydshenzhen";
console.log(freezeObj.info.newName); // ydshenzhen */

function myFreeze(obj) {
    // 判断参数是否为Object类型
    if (obj instanceof Object) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                Object.defineProperty(obj, key, {
                    writable: false, // 设置只读
                });
                Object.seal(obj); // 封闭对象
            }
        }
    }
    return obj;
}

const obj = {
    name: "yd",
    info: {
        address: "beijing",
    },
};
const freezeObj = myFreeze(obj);
freezeObj.name = "new name";
console.log(freezeObj.name); // 仍然是yd