function isEmpty(a) {
    if (a === "") return true; //检验空字符串
    if (a === "null") return true; //检验字符串类型的null
    if (a === "undefined") return true; //检验字符串类型的 undefined
    if (!a && a !== 0 && a !== "") return true; //检验 undefined 和 null           
    if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true; //检验空数组
    if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true; //检验空对象
    return false;
}

console.log(isEmpty([])) //true
console.log(isEmpty({})) //true
console.log(isEmpty(null)) //true