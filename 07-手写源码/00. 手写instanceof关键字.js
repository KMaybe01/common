// 模拟 instanceof
// 实例.__proto__===类.prototype
function instance_of(L, R) {
    //L 表示左表达式，R 表示右表达式
    var O = R.prototype; // 取 R 的显示原型
    L = L.__proto__; // 取 L 的隐式原型  或者 Object.getPrototypeOf(L)
    while (true) {
        if (L === null) return false;
        if (O === L){ // 这里重点：当 O 严格等于 L 时，返回 true
         return true;   
        }
        L = L.__proto__;
    }
}

let arr = [];
console.log(instance_of(arr, Array)); //=>true 
console.log(instance_of(arr, RegExp)); //=>false
console.log(instance_of(arr, Object));  //=>true 

console.log(arr instanceof Array); //=>true 
console.log(arr instanceof RegExp); //=>false
console.log(arr instanceof Object); //=>true 

function Fn() {
    this.x = 100;
}
Fn.prototype = Object.create(Array.prototype);
let f = new Fn;
console.log(f, f instanceof Array); //Array { x: 100 } true

console.log(1 instanceof Number); // false