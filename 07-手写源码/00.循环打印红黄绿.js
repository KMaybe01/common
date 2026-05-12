//红灯 3 s 亮一次， 绿灯 1 s 亮一次， 黄灯 2 s亮一次； 如何让三个灯不断交替重复亮灯？
//三个亮灯函数
function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}
//用 callback 实现
const task = (timer, light, callback) => {
  setTimeout(() => {
    if (light === 'red') {
      red()
    } else if (light === 'green') {
      green()
    } else if (light === 'yellow') {
      yellow()
    }
    callback()
  }, timer)
}
const step = () => {
  task(3000, 'red', () => {
    task(2000, 'green', () => {
      task(1000, 'yellow', step)
    })
  })
}
step()

//用 promise 实现
const task = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })
const step = () => {
  task(3000, 'red')
    .then(() => task(2000, 'green'))
    .then(() => task(2100, 'yellow'))
    .then(step)
}
step()

//用 async/await 实现
const task = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })

const taskRunner = async () => {
  await task(3000, 'red')
  await task(2000, 'green')
  await task(2100, 'yellow')
  taskRunner()
}
taskRunner()




//红绿灯
let asyncCatch = (promise) => {
  return promise
    .then((res) => {
      return {
        res,
        err: null
      };
    })
    .catch((err) => {
      return {
        res: null,
        err,
      };
    });
};
let setColor = function (color, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(color);
      resolve();
    }, delay);
  });
};

async function sett() {
  await asyncCatch(setColor("red", 3000));
  await asyncCatch(setColor("green", 2000));
  await asyncCatch(setColor("yellow", 1000));
  await asyncCatch(sett());
}

sett();