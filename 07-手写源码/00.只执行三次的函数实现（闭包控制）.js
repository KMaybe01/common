function getName(value) {
    console.log(value);
}

function setFn(fn) {
    let times = 0;
    return () => {
        if (times++ < 3) {
            fn(times);
        }
    };
}

const newFn = setFn(getName);
newFn(); // 1
newFn(); // 2
newFn(); // 3
newFn(); // 无效
newFn(); // 无效