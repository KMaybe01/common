/* function createImg(url) {}
createImg(url).then((value) => {
    document.body.appendChild(value);
}); */

//方法一

function createImg(url) {
    return new Promise((resolve, reject) => {
        if (url) {
            let ImgEle = document.createElement("img");
            ImgEle.src = url;
            resolve(ImgEle);
        } else {
            reject("url is not right");
        }
    });
}

createImg(
    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3612597965,1770541226&fm=26&gp=0.jpg"
).then((value) => {
    document.body.appendChild(value);
});

//方法二
function createImg(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        setTimeout(() => {
            resolve(img);
        }, 1000);
    });
}

createImg("1.jpg")
    .then(function (value) {
        document.body.appendChild(value);
        return createImg("2.jpg");
    })
    .then(function (value) {
        document.body.appendChild(value);
        return createImg("3.jpg");
    })
    .then(function (value) {
        document.body.appendChild(value);
    });