# webpack

## webpack 编译过程

- 参数初始化、从 shell、配置文件确定所有参数
- 开始编译，从上一步得到的 compiler 对象、加载配置的插件、执行对象 run 方法
- 确定项目的所有入口文件
- 对入口文件调用所有 loader 模块进行翻译，在找出依赖文件，递归本步骤对所有依赖文件
- 完成模块编译，经过 loader 翻译后，得到每个模块被翻译后的内容和之间的依赖关系
- 输出资源、根据入口和模块之间的关系，组成一个包含多个模块的 Chunk，再把每个 chunk 转换成单独文件加入到输出列表
- 输出完成、确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写到文件系统

## loader 与 plugin 的区别

- loader 是文件加载器，能够加载资源文件，并对这写文件进行一些处理，诸如编译，压缩等，最终一起打包到指定的文件中
- plugin 赋予了 webpack 各种灵活的功能，例如打包优化，资源管理，环境变量注入等，目的是解决 loader 无法实现的其他事
- 两者在运行时机上的区别
  - loader 运行在打包文件之前
  - plugin 在整个编译周期都起作用
- 在 webpack 运行的生命周期会广播出许多时间，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果
- 对于 loader ，实质上是一个转换器，将 A 文件进行编译形成 B 文件，操作的是文件，比如将 A.scss 或 A.less 转换为 B.css，单纯的文件转换过程

## 编写 loader

- 本质为函数，不能为箭头函数
- 函数接收一个参数，为 webpack 提供的对象，能够获取当前 loader 所需要的各种信息
- 函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer

## 编写 plugin

- 由于 webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务
- 包含两个核心对象
  - compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子
  - compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建
- 如果自己要实现 plugin，也需要遵循一定的规范
  - 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例
  - 传给每个插件的 compiler 和 compilation 对象都是同一个引用，因此不建议修改
  - 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

## webpack proxy 工作原理，解决跨域

- 即 webpack 提供的代理服务，基本行为就是接收客户端发送的请求后转发给其他服务器，其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制），想要实现代理首先需要一个中间服务器，webpack 中提供服务器的工具为 webpack-dev-server

- webpack-dev-server 是 webpack 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起，目的是为了提高开发者日常的开发效率，只适用在开发阶段

```js
const path = require("path");

module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      "/api": {
        target: "https://api.github.com",
      },
    },
    // ...
  },
};
```

- devServer 里面 proxy 则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配

- 属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为 /api，值为对应的代理匹配规则，对应如下：

  - target：表示的是代理到的目标地址
  - pathRewrite：默认情况下，我们的 /api-hy 也会被写入到 URL 中，如果希望删除，可以使用 pathRewrite
  - secure：默认情况下不接收转发到 https 的服务器上，如果希望支持，可以设置为 false
  - changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址

- 工作原理
  - proxy 工作原理实质上是利用 `http-proxy-middleware` 这个 http 代理中间件，实现请求转发给其他服务器，服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制

## 优化手段

- JS 代码压缩
- CSS 代码压缩
- Html 文件代码压缩
- 文件大小压缩
- 图片压缩
- Tree Shaking
- 代码分离
- 内联 chunk

## 热更新

- 通过 webpack-dev-server 创建两个服务器：提供静态资源的服务（express）和 Socket 服务
- express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
- socket server 是一个 websocket 的长连接，双方可以通信
- 当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest 文件）和.js 文件（update chunk）
- 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
- 浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新

## vite 特点

- 快速的冷启动
- 及时的模块热更新
- 真正的按需编译
- 将源码直接交给浏览器，通过浏览器的 ESM 模块化编译能力，省略了费事的编译过程
- 只有在浏览器执行 ESM 的 import 时，会向 dev server 发起模块的 ajax 请求，实现真正的按需编译
- HMR vite 使已编辑的模块失活
- 使用 esbuild 处理项目依赖，esbuild 使用 go 编写，比一般的 node.js 编写的编译器快几个数量级
- 优势
  - 快
  - 高集成度
  - 基于 ESM 的热更新
  - 基于 esbuild 的依赖预处理
  - 不与 vue 绑定，支持 react
  - 内置 ssr 支持
  - 天然支持 TS
- 不足
  - Vue 仍作为第一支持
  - 市场实践少
  - 生产环境集成 Rollup 打包，与开发环境最终执行的代码不一致。

## tree Shaking

- ES6 Module import 引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
- 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码
