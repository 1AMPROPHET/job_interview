# interview

## HTML5

### HTML5 的新特性

- 语义特性，添加 header、、section、footer、nav等标签
- 多媒体，英语媒介回放的video、track 和 audio元素
- 图像效果，用于绘画的canvas（画布）元素，svg元素等
- 表单控件，数字、日期、时间
- 离线 & 存储，对本地离线存储的更好的支持，localstorage，Cookies
- 设备兼容特性

### input的新特性

- color，选择颜色
- date，选择日期
- email，检测输入格式是否为email
- month
- range，用于定义一个滑动条，表示范围
- search 用于搜索，比如站点搜索或 Google 搜索

### 浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据

- 共同点：sessionStorage、localStorage和cookie都由浏览器存储在本地的数据。
- 区别
  - cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，localStorage不会自动把数据发给服务器，仅在本地保存，存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。localStorage不会自动把数据发给服务器

## 如何实现浏览器内多个标签页之间的通信

- localStorage实现通信
  - 特点
    - 同域共享存储空间
    - 持久化存储
    - 提供事件监听localStorage变化

      ```js
      window.addEventListener('storage', () => {})
      ```

- 使用websocket
  - 特点
    - 保持连接
    - 全双工
    - TCP协议
    - 跨域

- ShareWorker
  - 特点
    - 跨域不共享

- cookie + setInterval
  - cookie特点
    - 跨域不共享
    - 大小有限制
    - http请求会自带cookie

## 行内元素、块级元素，空元素，区别

- 行内元素
  - a span img input select
- 块级元素
  - div ul li dt dd h1 h2 p
- 空元素
  - br hr meta
- 区别
  - 行内元素不可以设置宽高，padding-left、right，margin-left、right正常使用，而top、bottom无效、不能独占一行
  - 块级元素可以设置宽高，独占一行

## src 与 href 的区别

- src 用于替换当前元素，href是链接
- 当浏览器解析到 script src 时，会暂停其他资源的下载和处理

## 浏览器离线存储的使用和原理

- localStorage长期存储，浏览器关闭后不丢失，sessionStorage数据在浏览器关闭后自动删除

## 浏览器怎么渲染页面的

- DOM树
  - 解析HTML，形成 DOM tree
  - 解析CSS，形成 CSSOM tree
  - 解析js，暂停工作，先处理js
- 渲染树
  - DOM tree 和 CSSOM tree 合并为 render tree
- 布局绘制

### 脚本和样式文件对页面渲染的影响

- 解析html文档，遇到HTML标签时，构建DOM树
- 在构建DOM的过程中，如果遇到外联的样式声明或脚本声明，则暂停文档解析，创建新的网络连接，开始下载样式文件和脚本文件
- 样式文件下载完成后，构建CSS Rule DOM，脚本文件下载完成后，解释并立即执行。
- 构建DOM的同时，结合CSS规则树完成页面渲染。
- 如果DOM树先于CSS规则树构建完成，则在CSS规则树构建完成后，页面会发生一次重绘，将新构建的CSS规则应用于渲染树。

## 重绘和回流（重排）

- 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流。每个页面至少需要一次回流，就是在页面第一次加载的时候。
- 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。

## 减少重绘重排

- 使用class替换行内样式
