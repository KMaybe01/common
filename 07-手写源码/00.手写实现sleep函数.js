//手写实现sleep函数

//1.Promise
const sleep = time => {
    return new Promise(resolve => setTimeout(resolve,time))
  }
  sleep(1000).then(()=>{
    console.log(1)
  })
//2.Generator
function* sleepGenerator(time) {
    yield new Promise(function(resolve,reject){
      setTimeout(resolve,time);
    })
  }
  sleepGenerator(1000).next().value.then(()=>{console.log(1)})
  //async
  function sleep2(time) {
    return new Promise(resolve => setTimeout(resolve,time))
  }
  async function output() {
    let out = await sleep2(1000);
    console.log(1);
    return out;
  }
  output();
  output();
//ES5
function sleep3(callback,time) {
    if(typeof callback === 'function'){
      setTimeout(callback,time)
    }
  }
  
  function output(){
    console.log(1);
  }
  sleep3(output,1000);

  
  