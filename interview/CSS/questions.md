# interview

## 盒模型

- 当对一个文档进行布局的时候，浏览器的渲染引擎会根据标准之一的CSS基础盒模型，将所有元素表示为一个个矩形的盒子。

- Margin（外边距） - 清除边框区域。Margin 没有背景颜色，它是完全透明
- Border（边框） - 边框周围的填充和内容。边框是受到盒子的背景颜色影响
- Padding（内边距） - 清除内容周围的区域。会受到框中填充的背景颜色影响
- Content（内容） - 盒子的内容，显示文本和图像

## CSS 的权重和优先级

- 优先级
  - ！important 优先级最高
  - 内联样式
  - ID 选择器
  - 类选择器、属性选择器、伪类选择器
  - 标签选择器、伪元素选择器
  - 通配选择器
  - 继承
- 权重
  - 内联样式 1000
  - ID 100
  - 类、伪类、属性 10
  - 标签、伪元素 1
  - 从高到低比较权重值

## flex 布局

- flexible box 是 flex-grow、flex-shrink、flex-basis 的缩写
  - flex-grow：属性用于设置或检索弹性盒子的扩展比率
  - flex-shrink：flex-shrink 属性制定了 flex 元素的收缩规则
  - flex-basis：用于设置或检索弹性盒子伸缩基准值

### 父容器 5 大属性

- flex-direction

  - flex-direction: 决定主轴的方向 (即项目的排列方向)
  - row(默认值): 主轴为水平方向, 起点在左端;
  - row-reverse: 主轴在水平方向, 起点在右端;
  - column: 主轴为垂直方向, 起点在上沿
  - column-reverse 主轴为垂直方向, 起点在下沿; 与 column 相同, 但是以相反的顺序 。
  - initial 关键字用于设置 CSS 属性为它的默认值; initial 关键字可用于任何 HTML 元素上的任何 CSS 属性
  - inherit 从父元素继承该属性

- flex-wrap: 如果一条轴线排不下, 如何换行

  - nowrap 默认: 不换行 。 当容器宽度不够时, 每个项目会被挤压宽度 。
  - wrap 换行: 并且第一行在容器最上方
  - wrap-reverse 换行: 并且第一行在容器最下方

- justify-content: 定义了项目在主轴上的对齐方式

  - 此属性与主轴方向息息相关
  - 主轴方向为: row-起点在左边, row-reverse-起点在右边, column-起点在上边, column-reverse-起点在下边
    - flex-start (默认值): 项目位于主轴起点
    - flex-end: 项目位于主轴终点
    - center: 居中
    - space-between: 两端对齐, 项目之间的间隔都相等 (开头和最后的项目, 与父容器边缘没有间隔) 。
    - space-around: 每个项目两侧的间隔相等

- align-items: 定义项目在交叉轴上如何对齐

  - stretch 默认值: 如果项目 未设置高度 或 设为 auto, 将占满整个容器的高度。
  - flex-start: 交叉轴的起点对齐
  - flex-end: 交叉轴的终点对齐
  - center: 交叉轴的中点对齐
  - baseline: 项目的第一行文字的基线对齐 (文字的行高、字体大小会影响每行的基线)

- align-content: 定义了多根轴线的对齐方式
  - stretch(默认值): 轴线占满整个交叉轴
  - flex-start: 与交叉轴的起点对齐
  - flex-end: 与交叉轴的终点对齐
  - center: 与交叉轴的中点对齐
  - space-between: 与交叉轴两端对齐, 轴线之间的间隔平均分布 。
  - space-around: 每根轴线两侧的间隔都相等。 所以, 轴线之间的间隔比轴线与边框的间隔大一倍

### 子容器 6 大属性

- order: 定义项目的排列顺序 。 数值越小, 排列越靠前, 默认为 0 。
- flex-grow: 定义项目的放大比例, 默认为 0, 即如果存在剩余空间, 也不放大 。
- flex-shrink: 定义了项目的缩小比例, 默认为 1, 即如果空间不足, 该项目将缩小 。
- flex-basis: 定义项目占据的主轴空间 。 (如果主轴为水平, 则设置这个属性, 相当于设置项目的宽度, 原 width 将会失效)
- flex: 是 flex-grow, flex-shrink 和 flex-basis 的简写, 默认值为 0 1 auto 后两个属性可选 。
- align-self: 定义单个项目自身在交叉轴上的排列方式, 可以覆盖掉容器上的 align-items 属性 。

## CSS 实现等宽高比矩形

- 利用 vh vm

## 居中

- 水平居中
  - inline 元素：text-align：center
  - block 元素：margin：auto
  - absolute 元素：left：50% + margin-left 负值
- 垂直居中
  - inline 元素：line-height 的值等于 height
  - absolute 元素：top：50% + margin-top：负值
  - absolute 元素：top：calc(50%-50px); left: calc(50%-50px)
  - absolute 元素：transform: translate（-50%， -50%）,left: 50%, top: 50%
  - absolute 元素：top left bottom right = 0 + margin：auto
  - 父元素采用 table 布局、子元素采用 tablecell 布局
  - 转行内元素，inline-block vertical-align：middle
  - flex：父元素 display：flex；justify-content：center，align-items：center
  - flex：父元素 display：flex；justify-content：center 子元素：align-self：center
  - grid：父元素 display：grid justify-items：center align-items：center
  - grid：父元素 display：grid 子元素 justify-self：center align-self：center

## 两栏 三栏布局

## CSS 动画

- animation：用于动画属性设置，包含 6 个属性
- transition：用于设置样式过渡
- transform：用于元素进行旋转、缩放、移动或倾斜
- translate：是 transform 的一个属性

## 什么是 BFC

- 什么是 BFC？
  - Block format context，块级格式化上下文
  - 定位方案
    - 内部的 box 会在垂直方向上一个接一个放置
    - box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠
    - 每个元素的 margin box 的左边，与包含块 border box 的左边相接触
    - BFC 的区域不会与 float box 重叠
    - BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
    - 计算 BFC 的高度时，浮动元素也会参与计算
  - 一块独立渲染区域，内部元素的渲染不会影响边界以外的元素
- 形成 BFC 的常见条件
  - 根元素，即 html
  - float 不是 none
  - position 是 absolute 或 fixed
  - overflow 不是 visible
  - display 是 flex inline-block 等
- BFC 的常见作用
  - 清除浮动

## visibility 和 display 的差别

- display 为 none 时，隐藏标签对象，在文档流中不会为对象保留其空间位置
- visibility 为 hidden 时，隐藏标签对象，但是该对象在文档流中所占用的空间会被保留

## box-sizing

- content-box
  - 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。
- border-box
  - 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。

## 常见的 position

- absolute
- relative
- fixed
- sticky
- static

## 清除浮动

- 清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题

- 三种方法
  - .clear {clear: both}
  - 父级添加overflow，触发BFC清除浮动
  - after 伪元素清除浮动

    ```JS
    .clearfix:after {
      content: '';
      display: table;
      clear: both;
    }
    ```
