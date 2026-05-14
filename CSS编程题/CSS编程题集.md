# CSS/JS 编程例子集

> 包含代码示例与效果说明

---

## 目录

1. [水平居中布局](#1-水平居中布局)
2. [九宫格布局](#2-九宫格布局)
3. [实现三角形](#3-实现三角形)
4. [CSS 实现八卦图](#4-css-实现八卦图)
5. [自适应正方形](#5-自适应正方形)
6. [CSS 画圆圈](#6-css-画圆圈)
7. [三列布局-两边固定中间自适应](#7-三列布局两边固定中间自适应)
8. [上下固定中间自适应](#8-上下固定中间自适应)
9. [Flex 布局-八个元素分两行摆放](#9-flex-布局八个元素分两行摆放)
10. [品字布局](#10-品字布局)
11. [吸顶效果](#11-吸顶效果)
12. [文字逐个打印](#12-文字逐个打印)
13. [CSS 歌词逐渐高亮](#13-css-歌词逐渐高亮)
14. [防抖和节流](#14-防抖和节流)
15. [手写拖拽](#15-手写拖拽)

---

## 1. 水平居中布局

### 1.1 定宽高 - 绝对定位 + 负 margin

**原理**：先通过 `left: 50%` 和 `top: 50%` 将元素左上角移到父元素中心，再通过负 margin 将元素中心与父元素中心对齐。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .children-box {
            position: absolute;
            width: 100px;
            height: 100px;
            background: yellow;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
        }
    </style>
</head>
<body>
    <div class="children-box"></div>
</body>
</html>
```

**效果**：一个黄色正方形居中显示在页面中央。

---

### 1.2 不定宽高 - Flex 布局

```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

**效果**：子元素水平垂直居中，适用于不定宽高的场景。

---

### 1.3 其他水平居中方法

- **绝对定位 + transform**：使用 `transform: translate(-50%, -50%)` 替代负 margin
- **Grid 布局**：`place-items: center`
- **table-cell + vertical-align**：适用于 inline-block 元素

---

## 2. 九宫格布局

### 2.1 Flex 实现

**原理**：使用 `flex-wrap: wrap` 配合固定宽度实现多行布局。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>flex九宫格</title>
    <style>
        .box {
            position: relative;
            width: 100%;
            height: 600px;
        }
        .box-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
        }
        .box-inner > li {
            overflow: hidden;
            flex-grow: 1;
            background-color: darkorange;
            text-align: center;
            color: #ffffff;
            width: 33%;
            height: 200px;
            line-height: 200px;
            margin: 1px;
        }
    </style>
</head>
<body>
    <div class="box">
        <ul class="box-inner">
            <li>九宫格1</li>
            <li>九宫格2</li>
            <li>九宫格3</li>
            <li>九宫格4</li>
            <li>九宫格5</li>
            <li>九宫格6</li>
            <li>九宫格7</li>
            <li>九宫格8</li>
            <li>九宫格9</li>
        </ul>
    </div>
</body>
</html>
```

**效果**：3x3 九宫格布局，橙色背景，白色文字，每个格子等宽等高。

---

### 2.2 Float 实现

通过浮动配合百分比宽度实现九宫格。

### 2.3 Grid 实现

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}
```

---

## 3. 实现三角形

**原理**：利用 CSS 边框特性，将元素宽高设为 0，通过设置不同方向的边框颜色来实现三角形。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>三角形</title>
</head>
<body>
    <div class="triangle"></div>
    <style>
        .triangle {
            width: 0;
            height: 0;
            border-top: 50px solid red;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
        }
    </style>
</body>
</html>
```

**效果**：显示一个红色向上的三角形。

**扩展**：通过调整边框颜色和方向，可以实现任意方向的三角形：
- 向上：设置 border-bottom 为实色，其他透明
- 向下：设置 border-top 为实色，其他透明
- 向左：设置 border-right 为实色，其他透明
- 向右：设置 border-left 为实色，其他透明

---

## 4. CSS 实现八卦图

**原理**：利用 border-radius 实现圆形，通过伪元素 ::before 和 ::after 实现阴阳鱼的左右两点。

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <title>CSS实现八卦图</title>
    <style>
        #circle {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 100px;
            height: 50px;
            border-top: 2px solid red;
            border-right: 2px solid red;
            border-bottom: 50px solid red;
            border-left: 2px solid red;
            border-radius: 100px;
        }
        #circle::after {
            content: '';
            width: 10px;
            height: 10px;
            border: 20px solid red;
            position: absolute;
            left: 0;
            top: 25px;
            border-radius: 50px;
            background: #fff;
        }
        #circle::before {
            content: '';
            width: 10px;
            height: 10px;
            border: 20px solid #FFF;
            position: absolute;
            right: 0;
            top: 25px;
            border-radius: 50px;
            background: red;
        }
    </style>
</head>
<body>
    <div id="circle"></div>
</body>
</html>
```

**效果**：页面正中央显示一个八卦图案，黑白各半，带有两个小圆点。

---

## 5. 自适应正方形

**原理**：保持元素宽高比例一致的多种实现方式。

### 方法一：使用 vw 单位

**原理**：CSS3 中新增的 vw 单位，1vw = 1% 视窗宽度。

```css
.square {
    width: 50%;
    height: 50vw;
    background: red;
}
```

### 方法二：设置垂直 padding

**原理**：padding 的百分比是相对于包含块的宽度计算的。

```css
.square2 {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    background: brown;
}
```

### 方法三：伪元素 margin-top

**原理**：伪元素的 margin-top 百分比相对于父元素宽度计算，可撑开父元素高度。

```css
.square3 {
    width: 50%;
    overflow: hidden;
    background: burlywood;
}
.square3:after {
    content: "";
    display: block;
    margin-top: 100%;
}
```

**效果**：三种方法都能实现宽度自适应且保持正方形比例。

---

## 6. CSS 画圆圈

**原理**：通过 border-radius 实现圆形，有多种实现方式。

### 方法一：双层嵌套

```css
.element1 {
    width: 200px;
    height: 200px;
    background-color: lightpink;
    border-radius: 50%;
}
.child1 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #009966;
    position: relative;
    top: 50px;
    left: 50px;
}
```

### 方法二：使用伪元素

```css
.element2 {
    width: 200px;
    height: 200px;
    background-color: lightpink;
    border-radius: 50%;
}
.element2:after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #009966;
    position: relative;
    top: 50px;
    left: 50px;
}
```

### 方法三：使用 border

```css
.element3 {
    width: 100px;
    height: 100px;
    background-color: #009966;
    border-radius: 50%;
    border: 50px solid lightpink;
}
```

### 方法四：使用 box-shadow

```css
.element4 {
    width: 100px;
    height: 100px;
    background-color: #009966;
    border-radius: 50%;
    box-shadow: 0 0 0 50px lightpink;
}
```

### 方法五：使用 radial-gradient

```css
.element6 {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: -webkit-radial-gradient(circle closest-side, #009966 50%, lightpink 50%);
}
```

**效果**：展示 5 种不同的圆圈绘制方法，形成同心圆效果。

---

## 7. 三列布局-两边固定中间自适应

**原理**：左右两栏固定宽度，中间栏自适应宽度。

### 方法一：浮动布局

```css
.layout.float .left { float: left; width: 300px; background: red; }
.layout.float .center { background: yellow; }
.layout.float .right { float: right; width: 300px; background: blue; }
```

**优点**：兼容性好

**注意**：中间栏需放在最后

### 方法二：绝对定位

```css
.layout.absolute .left-center-right>div { position: absolute; }
.layout.absolute .left { left: 0; width: 300px; }
.layout.absolute .center { left: 300px; right: 300px; }
.layout.absolute .right { right: 0; width: 300px; }
```

**优点**：快捷
**缺点**：脱离文档流，可使用性差

### 方法三：Flex 布局

```css
.layout.flexbox .left-center-right { display: flex; }
.layout.flexbox .left { width: 300px; }
.layout.flexbox .center { flex: 1; }
.layout.flexbox .right { width: 300px; }
```

**优点**：比较完美，主要应用移动端，无高度也可用

### 方法四：表格布局

```css
.layout.table .left-center-right { width: 100%; display: table; }
.layout.table .left-center-right>div { display: table-cell; }
```

**优点**：兼容性好，三行不同高会被调整为一致

### 方法五：网格布局

```css
.layout.grid .left-center-right {
    display: grid;
    grid-template-columns: 300px auto 300px;
}
```

**效果**：展示 5 种实现三栏布局的方法，左红右蓝中间黄，中间自适应。

---

## 8. 上下固定中间自适应

**原理**：使用 calc() 函数计算中间高度，或使用 Flex/Grid 布局。

```css
body { margin: 0; padding: 0; }
.top { height: 100px; background: red; }
.center { height: calc(100vh - 200px); background: yellow; }
.bottom { height: 100px; background: red; }
```

```html
<body>
    <div class="top"></div>
    <div class="center"></div>
    <div class="bottom"></div>
</body>
```

**效果**：顶部和底部固定高度 100px，中间区域自动填满剩余高度。

---

## 9. Flex 布局-八个元素分两行摆放

**原理**：使用 flex-wrap: wrap 配合 flex: 0 0 25% 实现每行4个元素。

```css
.parent {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
}
.child {
    flex: 0 0 25%;
    height: 50px;
    border: 1px solid red;
}
```

```html
<div class="parent">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
```

**效果**：8 个子元素均匀分布在两行，每行 4 个，带红色边框。

---

## 10. 品字布局

### 10.1 Float 实现

**原理**：上方一个全宽块，下方两个 50% 宽度的浮动块。

```css
div {
    width: 100%;
    height: 100px;
    background: red;
    font-size: 40px;
    line-height: 100px;
    color: #fff;
    text-align: center;
}
.div1 { margin: 0 auto; }
.div2 { float: left; width: 50%; background: green; }
.div3 { float: left; width: 50%; background: blue; }
```

```html
<body>
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
</body>
```

**效果**：上方一个红色块居中，下方两个绿色和蓝色块各占 50% 宽度，形成"品"字形。

---

### 10.2 Flex 实现

```css
.parent {
    display: flex;
    flex-wrap: wrap;
}
.div1 { width: 100%; }
.div2, .div3 { width: 50%; }
```

---

## 11. 吸顶效果

**原理**：使用 CSS sticky 定位实现导航吸顶效果。

```css
.nav {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    height: 40px;
    background: chartreuse;
    text-align: center;
}
```

```html
<body>
    <div class="wrap">
        <div class="title">css吸顶效果实现</div>
        <div class="nav">导航吸顶导航吸顶导航吸顶导航吸顶</div>
        <!-- 列表内容 -->
    </div>
</body>
```

**效果**：导航栏在滚动到页面顶部时自动固定在顶部。

**兼容处理**：添加 -webkit-sticky 前缀以兼容旧版 Chrome。

---

## 12. 文字逐个打印

**原理**：通过控制容器宽度逐像素增加，实现文字逐个显示的效果。

```html
<style>
    #shi {
        font-size: 25px;
        color: #09F;
        height: 25px;
        font-weight: bold;
        width: 500px;
        text-align: center;
    }
</style>
<body>
    <div id="wai" style="width:0px; height:30px; overflow:hidden">
        <div id="shi">安得广厦千万间，大庇天下寒士俱欢颜</div>
    </div>
    <script>
        function showshi() {
            var s = document.getElementById("wai");
            if (parseInt(s.style.width) < 500) {
                var w = parseInt(s.style.width) + 1;
                s.style.width = w + "px";
                window.setTimeout("showshi()", 20);
            }
        }
        showshi();
    </script>
</body>
```

**效果**：文字从左侧逐渐向右展开显示，模拟打字机效果。

---

## 13. CSS 歌词逐渐高亮

**原理**：使用 Canvas 绘制文字，通过 clip() 方法截取区域实现文字颜色变化。

```html
<canvas id="canvas" width="400" height="300"></canvas>
<script>
    (function () {
        let curX = -400, speed = 1;
        const text = '京程一灯';
        const canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        function clearCanvas() { ctx.clearRect(0, 0, 400, 300); }

        function render() {
            clearCanvas();
            ctx.save();
            ctx.font = '50px 宋体';
            ctx.fillStyle = 'black';
            ctx.fillText(text, 80, 250);
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            curX += speed;
            ctx.rect(curX, 0, 400, 300);
            ctx.closePath();
            ctx.clip();

            ctx.font = '50px 宋体';
            ctx.fillStyle = 'red';
            ctx.fillText(text, 80, 250);
            ctx.restore();

            if (curX < 0) { requestAnimationFrame(render); }
        }
        render();
    })();
</script>
```

**效果**：Canvas 上显示文字，文字从黑色逐渐变为红色，实现歌词高亮效果。

---

## 14. 防抖和节流

**原理**：限制函数执行频率的两种不同策略。

### 防抖函数 (Debounce)

**应用场景**：按钮提交、搜索框输入

**原理**：在指定时间间隔内多次触发，只执行最后一次

```javascript
function debounce(fn, delay = 500) {
    let timer;
    return function () {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, arguments);
        }, delay;
    );
}
button.addEventListener("click", debounce(onSubmit, 1000));
```

### 节流函数 (Throttle)

**应用场景**：滚动事件、输入框实时搜索

**原理**：在指定时间间隔内只执行一次

```javascript
function throttle(fn, delay = 500) {
    let timer;
    return function () {
        if (timer) return;
        let context = this;
        timer = setTimeout(() => {
            fn.apply(context, arguments);
            timer = null;
        }, delay);
    };
}
input.addEventListener("keyup", throttle(onPut, 1000));
```

**效果**：
- 防抖：按钮在 1 秒内多次点击只执行最后一次
- 节流：输入框在 1 秒内只触发一次

---

## 15. 手写拖拽

**原理**：使用 HTML5 Drag and Drop API 实现元素拖拽。

```html
<style>
    .left { width: 300px; height: 500px; border: 1px solid red; }
    .right { width: 300px; height: 500px; border: 1px solid lightseagreen; }
    .txt { border: 1px solid gray; padding: 5px; cursor: move; }
</style>
<body>
    <div class="left" id="left">
        <div class="txt" draggable="true" id="txt1">可移动的文字一</div>
        <div class="txt" draggable="true" id="txt2">可移动的文字二</div>
    </div>
    <div class="right" id="right"></div>
    <script>
        // 拖拽实现
        txtObj[i].ondragstart = handle_start;
        target.ondrop = handle_drop;

        function handle_start(e) {
            e.dataTransfer.setData('Text', e.target.id);
        }
        function handle_drop(e) {
            e.preventDefault();
            let returnObj = e.dataTransfer.getData('Text');
            e.target.appendChild(document.getElementById(returnObj));
        }
    </script>
</body>
```

**关键事件**：
- `ondragstart`：拖拽开始，设置传输数据
- `ondragover`：拖拽经过，允许放置
- `ondrop`：拖拽放置，获取数据并移动元素

**效果**：左侧区域的可拖拽元素可以拖动到右侧区域，实现跨容器拖拽。

---

## 文件清单

| 序号 | 文件名 | 描述 |
|------|--------|------|
| 1 | 00水平居中（定宽高）01绝对定位和负magin值.html | 水平居中 - 绝对定位+负margin |
| 2 | 00水平居中（定宽高）02绝对定位和transform.html | 水平居中 - 绝对定位+transform |
| 3 | 00水平居中（定宽高）03绝对定位 + left+right+bottom+top + margin.html | 水平居中 - 四方向定位+margin |
| 4 | 00水平居中（定宽高）04flex.html | 水平居中 - flex布局 |
| 5 | 00水平居中（定宽高）05grid.html | 水平居中 - grid布局 |
| 6 | 00水平居中（定宽高）06table-cell + vertical-align + inline-block+margin.html | 水平居中 - table-cell |
| 7 | 00水平居中（不定宽高）01flex.html | 水平居中(不定宽) - flex |
| 8 | 00水平居中（不定宽高）02flex+margin.html | 水平居中(不定宽) - flex+margin |
| 9 | 00水平居中（不定宽高）03绝对定位 + transform.html | 水平居中(不定宽) - 定位+transform |
| 10 | 00水平居中（不定宽高）04table-cell.html | 水平居中(不定宽) - table-cell |
| 11 | 00水平居中（不定宽高）05grid + flex布局.html | 水平居中(不定宽) - grid+flex |
| 12 | 00水平居中（不定宽高）06grid + margin.html | 水平居中(不定宽) - grid+margin |
| 13 | 00CSS九宫格布局-flex.html | 九宫格布局 - flex |
| 14 | 00CSS九宫格布局-float.html | 九宫格布局 - float |
| 15 | 00CSS九宫格布局-grid.html | 九宫格布局 - grid |
| 16 | 00.上左固定，中间滚动.html | 上左固定中间滚动 |
| 17 | 01.防抖和节流.html | 防抖和节流函数实现 |
| 18 | 02实现鼠标点击页面中的任意标签，alert该标签的名称.html | 点击标签获取名称 |
| 19 | 03.实现三角形.html | CSS三角形实现 |
| 20 | 04.手写一个拖拽.html | HTML5拖拽实现 |
| 21 | 05.实现下拉框，使得下拉框在各个浏览器下的样式和行为完全一致.html | 下拉框兼容处理 |
| 22 | 06.JS倒计时.html | JavaScript倒计时 |
| 23 | 07.CSS实现八卦图.html | CSS八卦图 |
| 24 | 08.把真实DOM转变为虚拟DOM.html | 虚拟DOM转换 |
| 25 | 09.实现一个左右固定100px,中间自适应的三栏布局.html | 三栏布局 |
| 26 | 11.两栏布局,左侧固定大小.html | 两栏布局 |
| 27 | 12.flex两栏布局,左侧固定大小.html | flex两栏布局 |
| 28 | 14.三列布局,两边固定，中间自适应.html | 三列布局(5种方法) |
| 29 | 15.实现搜索框.html | 搜索框实现 |
| 30 | 16.实现宽高自适应正方形.html | 自适应正方形(3种方法) |
| 31 | 16.1一个自适应矩形，水平垂直居中，且宽高比为 21.html | 自适应矩形21比例 |
| 32 | 16.1CSS实现未知宽度的正方形【自适应宽度正方形】.html | 未知宽度正方形 |
| 33 | 17.事件冒泡与捕获顺序.html | 事件冒泡与捕获 |
| 34 | 18.水平居中弹框.html | 弹框居中 |
| 35 | 19.为一下每个li添加点击事件.html | li点击事件 |
| 36 | 20.吸顶.html | CSS吸顶效果 |
| 37 | 21.单行文本，多行文本省略.html | 文本省略 |
| 38 | 21.CSS画圆圈.html | CSS画圆圈(5种方法) |
| 39 | 22.float实现品字.html | 品字布局-float |
| 40 | 22.1flex实现品字.html | 品字布局-flex |
| 41 | 23.屏幕正中间有个元素A，元素A中有文字A，随着屏幕的宽度的增加.html | 屏幕居中元素 |
| 42 | 24.1上下固定中间自适应.html | 上下固定中间自适应 |
| 43 | 24.2上下固定中间自适应.html | 上下固定中间自适应 |
| 44 | 24.3上下固定中间自适应.html | 上下固定中间自适应 |
| 45 | 25.flex布局，将八个元素分两行摆放.html | 8元素两行布局 |
| 46 | 27.CSS歌词逐渐高亮.html | 歌词逐渐高亮 |
| 47 | 28.文字逐个打印.html | 文字逐个打印 |
| 48 | 100.从输入URL到页面呈现都发生了什么.html | URL到页面渲染过程 |

---

> 📁 所有文件位置：`D:\code\跳槽计划\手写算法\CSS编程题\`
>
> 📝 共整理 48 个文件，涵盖布局、图形绘制、交互效果等常用 CSS/JS 编程场景。