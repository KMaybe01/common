//方法一 简单粗暴
function create(proto) {
    function F() {}
    F.prototype = proto;

    return new F();
}

let o2 = create({
    x: 1,
    y: 2
});
console.log(o2.x + o2.y)

//方法二 完整版
Object.create = function (prototype, properties) {
    if (typeof prototype !== "object") {
        throw TypeError();
    }

    function Ctor() {}
    Ctor.prototype = prototype;
    var o = new Ctor();
    if (prototype) {
        o.constructor = Ctor;
    }
    if (properties !== undefined) {
        if (properties !== Object(properties)) {
            throw TypeError();
        }
        Object.defineProperties(o, properties);
    }
    return o;
};


let o1 = Object.create({
    x: 1,
    y: 0
});
console.log(o1.x + o1.y)