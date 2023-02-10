function getName() {
    console.log("yd");
}

function setFn(fn) {
    let times = 0;
    return () => {
        if (times++ < 3) {
            fn();
        }
    };
}

const newFn = setFn(getName);
newFn(); // yd
newFn(); // yd
newFn(); // yd
newFn(); // 无效
newFn(); // 无效