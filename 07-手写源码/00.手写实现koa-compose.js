//compose源码 
function compose(middleware) {
  // 类型判断 middleware必需是一个函数数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  // 返回一个函数，接受context和next参数，koa在调用koa-compose时只传入context，所以此处next为undefined
  return function (context, next) {
    // last called middleware #
    // 初始化index
    let index = -1;
    // 从第一个中间件开始执行
    return dispatch(0);

    function dispatch(i) {
      // 在一个中间件出现两次next函数时，抛出异常
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      // 设置index，作用是判断在同一个中间件中是否调用多次next函数
      index = i;
      // 中间件函数
      let fn = middleware[i]
      // 跑完所有中间件时，fn=next，即fn=undefined，可以理解为终止条件
      if (i === middleware.length) fn = next
      // fn为空时，返回一个空值的promise对象
      if (!fn) return Promise.resolve();
      try {
        // 返回一个定值的promise对象，值为下一个中间件的返回值
        // 这里时最核心的逻辑，递归调用下一个中间件，并将返回值返回给上一个中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

const app = {
  middlewares: []
};
app.use = (fn) => {
  app.middlewares.push(fn);
};

//递归法
// app.compose = function () {
//   // Your Code Here
//   return dispatch(0)

//   function dispatch(i) {
//     let fn = app.middlewares[i]
//     if (i === app.middlewares.length) {
//       fn = () => {}
//     }
//     return fn(dispatch.bind(null, i + 1))
//   }
// }


//reduce
app.compose = function () {
  // Your Code Here
  const dispatch = [...app.middlewares]
    .reverse()
    .reduce((pre, cur) => {
      return cur.bind(null, pre)
    }, () => {})
  return dispatch()
}

//测试
app.use(next => {
  console.log(1);
  next();
  console.log(2);
});
app.use(next => {
  console.log(3);
  next();
  console.log(4);
});
app.use(next => {
  console.log(5);
  next();
  console.log(6);
});
app.compose();
/*
1
3
5
6
4
2 
*/