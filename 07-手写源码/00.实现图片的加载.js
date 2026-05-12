/* function createImg(url) {}
createImg(url).then((value) => {
    document.body.appendChild(value);
}); */

function createImg(url) {
    return new Promise((resolve, reject) => {
        if (url) {
            let ImgEle = document.createElement("img");  //   const img = new Image();
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
    return createImg("2.jpg");
}).then(function (value) {
    document.body.appendChild(value);
    return createImg("3.jpg");
});
