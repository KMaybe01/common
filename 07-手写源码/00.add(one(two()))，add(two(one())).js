//实现以下代码
/* function add() {
    // your code
  }
  function one() {
    // your code
  }
  function two() {
    // your code
  }
  console.log(add(one(two()))); //3
  console.log(add(two(one()))); //3 
  */

  function add() {
    return arguments[0].reduce((a,b)=>a+b)
}

function one() {  
    if(arguments.length==0){
        return 1
    } else {
        return [arguments[0],1]
    }

}
function two() {
    if(arguments.length==0){
        return 2
    } else {
        return [arguments[0],2]
    }
}

console.log(add(one(two())));  //3
console.log(add(two(one())));  //3