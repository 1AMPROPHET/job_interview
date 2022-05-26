# CSS 面试题

分析知识模块

* 布局
* 定位
* 图文样式
* 响应式
* CSS3

## 布局（1）

### 1. 什么是盒子模型

* 所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。

* CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：外边距，边框，内边距、和实际内容。

* 盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

Margin（外边距） - 清除边框区域。Margin 没有背景颜色，它是完全透明
Border（边框） - 边框周围的填充和内容。边框是受到盒子的背景颜色影响
Padding（内边距） - 清除内容周围的区域。会受到框中填充的背景颜色影响
Content（内容） - 盒子的内容，显示文本和图像

* 块级盒子
  * 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
  * 每个盒子都会换行
  * width 和 height 属性可以发挥作用
  * 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

* 内联盒子
  * 盒子不会产生换行。
  * width 和 height 属性将不起作用。
  * 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
  * 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

### 2. 盒模型的宽度怎么计算

```html
<style>
  #div {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
    box-sizing: border-box;
  }
</style>
<div id="div1"></div>
```

* `div1的offsetWidth的大小`
  * offsetWidth = （`内容宽度 + 内边距 + 边距），无外边距，答案是122px`
  * 如何将offsetWidth 设置为 100？添加 `box-sizing: border-box;` 变为整个box宽度，而不是内容宽度

### 3. margin纵向重叠问题

```html
<style>
  p {
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>
<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

* AAA 和 BBB之间的距离是多少
  * 相邻元素的 margin-top 和 margin-bottom 会发生重叠
  * 空内容的p也会重叠
  * 所以答案是15px

### 4. margin负值的问题

* 对margin 的 top left right bottom 设置负值，有何效果
  * margin-top 和 margin-left 负值，元素会向上、向左移动
  * margin-right负值，右侧元素左移，自身不受影响
  * margin-bottom负值，下方元素上移，自身不受影响

## 布局（2）

### 1. BFC理解和应用

* 什么是BFC？
  * Block format context，块级格式化上下文
  * 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素
* 形成BFC的常见条件
  * float 不是 none
  * position 是 absolute 或 fixed
  * overflow 不是 visible
  * display 是 flex inline-block等
* BFC的常见作用
  * 清除浮动

### 2. float布局的问题，以及clearfix

* 如何实现圣杯布局和双飞翼布局
  * 圣杯布局和双飞翼布局的目的
    * 三栏布局，中间一栏最先加载和渲染（内容最重要）
    * 两侧内容固定，中间内容随着宽度自适应
    * 一般用于PC网页

* 圣杯布局和双飞翼布局的技术总结
  * 使用float布局
  * 两侧内容被两侧覆盖，一个用padding 一个用 margin

* 圣杯布局演示

```html
<style type="text/css">
    body {
      min-width: 550px;
    }
    #header {
      text-align: center;
      background-color: #f1f1f1;
    }

    #container {
      text-align: center;
      padding-left: 200px;
      padding-right: 150px;
    }

    #container .column {
      float: left;
    }

    #center {
      background-color: #ccc;
      width: 100%
    }
    #left {
      position: relative;
      background-color: yellow;
      width: 200px;
      margin-left: -100%;
      right: 200px;
    }
    #right {
      background-color: red;
      width: 150px;
      margin-right: -150px;
    }
    #footer {
      clear: both;
      text-align: center;
      background-color: #f1f1f1;
    }
  </style>
</head>
<body>
  <div id="header">this is header</div>
  <div id="container">
    <div id="center" class="column">this is center</div>
    <div id="left" class="column">this is left</div>
    <div id="right" class="column">this is right</div>
  </div>
  <div id="footer">this is footer</div>
</body>
```

* 双飞翼布局

```html
  <style>
    body {
      min-width: 550px;
    }
    .col {
      float: left;
    }
    #main {
      width: 100%;
      height: 200px;
      background-color: #ccc;
    }
    #main-wrap {
      padding: 0 190px 0 190px;
    }
    #left {
      width: 190px;
      height: 200px;
      background-color: #000fff;
      margin-left: -100%;
    }
    #right {
      width: 190px;
      height: 200px;
      background-color: #ff0000;
      margin-left: -190px;
      
    }
  </style>
  </head>
<body>
  <div id="main" class="col">
    <div id="main-wrap">
      this is main
    </div>
  </div>
  <div id="left" class="col">
    this is left
  </div>
  <div id="right" class="col">
    this is right
  </div>
</body>
```

* 手写 clearfix

```html
<style type="text/css">
    body {
      min-width: 550px;
    }
    #header {
      text-align: center;
      background-color: #f1f1f1;
    }

    #container {
      text-align: center;
      padding-left: 200px;
      padding-right: 150px;
    }

    #container .column {
      float: left;
    }

    #center {
      background-color: #ccc;
      width: 100%
    }
    #left {
      position: relative;
      background-color: yellow;
      width: 200px;
      margin-left: -100%;
      right: 200px;
    }
    #right {
      background-color: red;
      width: 150px;
      margin-right: -150px;
    }
    #footer {
      /* clear: both; */
      text-align: center;
      background-color: #f1f1f1;
    }

    .clearfix:after {
      content: '';
      display: table;
      clear: both;
    }
  </style>
</head>
<body>
  <div id="header">this is header</div>
  <div id="container" class="clearfix">
    <div id="center" class="column">this is center</div>
    <div id="left" class="column">this is left</div>
    <div id="right" class="column">this is right</div>
  </div>
  <div id="footer">this is footer</div>
</body>
```

### 3. flex画骰子

* 什么是flex布局
  * Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为Flex布局。
  * 采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。

* flex实现一个三色的骰子
  
```html
  <style>
    #box {
      width: 200px;
      height: 200px;
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      display: flex;  /* flex布局 */
      justify-content: space-between;  /* 两端对齐 */
    }
    .item {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #666;
    }
    .item:nth-child(2) {
      align-self: center;  /* 第二项居中对齐 */
    }
    .item:nth-child(3) {
      align-self: flex-end;  /* 第三项尾对齐 */
    }
  </style>
</head>
<body>
  <div id="box">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</body>
```

* flex常用语法回顾
  * flex-direction
    * 决定主轴的方向
  * jusitify-content
    * 表示在主轴上的对齐方式
  * align-items
    * 表示在交叉轴上的对齐方式
  * flex-wrap
    * 一行排不下，如何换行
  * align-self
  * flex-flow
    * direction 和 wrap 简写
  
## 定位

* absolute 和 relative分别依据什么定位
  * absolute：依据最近的一层定位元素定位
    * 定位元素
      * absolute reletive fixed
      * body
  * reletive: 依据自身定位

* 居中对齐有哪些方式
  * 水平居中
    * inline元素：text-align：center
    * block元素：margin：auto
    * absolute元素：left：50% + margin-left 负值
  * 垂直居中
    * inline元素：line-height的值等于height
    * absolute元素：top：50% + margin-top：负值
    * absolute元素：transform: translate（-50%， -50%）,left: 50%, top: 50%
    * absolute元素：top left bottom right = 0 + margin：auto
    * 父元素采用table布局、子元素采用tablecell布局

* line-height如何继承
  * 写具体数值，如30px，则继承该值
  * 写比例，继承该比例
  * 写百分比，如200%，则继承计算出来的值（考点）

## 图文样式

* line-height 的继承问题

## css响应式

* rem是什么
  * rem是一个长度单位
    * px，绝对长度单位，最常用
    * em，相对长度单位，相对于父元素
    * rem，相对长度单位，相对于根元素，常用于响应式布局
* 响应式布局的常用方案
  * media-query，根据不同屏幕宽度设置根元素font-size
  * rem

* 响应式 -vw/vh
  * rem的弊端
    * 阶梯性，按照设置一台阶一台阶生效
  * 网页视口尺寸
    * window.screen.height 屏幕高度
    * window.innerHeight 网页视口高度
    * document.body.clientHeight body高度
  * vw/vh
    * vh 网页视口高度的1/100
    * vw 网页视口高度的1/100
    * vmax 取两者最大值；vmin取两者最小值

  ```css
  @media only screen and  (max-width: 375px) {
    html {
      font-size: 86px;
    }
  }
  ```

  * rem，基于根元素的相对单位

## CSS3

* 关于CSS3动画
  * 并不是面试的重点，除非面试的是专门做动画的职位
