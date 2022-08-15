# Vue

## Vue 的理解

- 是一个用于创建用户界面的开源JavaScript 框架，也是一个创建单页应用的Web应用框架
- 是一套用于构建用户界面的渐进式MVVM框架。
- 包含
  - 声明式渲染
  - 组件化系统
  - 客户端路由
  - 大规模状态管理
  - 构建工具
  - 数据持久化
  - 跨平台支持等

## Vue 中的双向绑定

### 什么是双向绑定

- 将model 绑定到view，当js更新model时，View会自动更新。

### 双向绑定的原理
  
- 双向绑定由三个重要的部分构成
  - 数据层：应用的数据和业务逻辑
  - 视图层：应用的展示效果，各类UI组件
  - 业务逻辑层：框架封装的核心，它负责将数据与视图关联起来

- ViewModel 
  - 主要职责是
    - 数据变化后的更新视图
    - 视图变化后更新数据
  
  - 两个组成部分
    - 监听器（Observer）：对所有的数据的属性进行监听
    - 解析器（Compiler）：对每个元素几点的指令进行扫描跟解析，根据指令替换模板数据，以及绑定相应的更新函数

## v-if & v-show

### 相同点

- 控制元素在页面是否显示

### 不同点

- 控制手段不同
- 编译过程不同
- 编译条件不同

### 控制手段

- v-show 隐藏是为元素添加 display：none，dom元素依旧还在
- v-if 显示隐藏是将dom元素整个添加或者删除

### 编译过程

- v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换

### 编译条件

- v-if是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染
  - v-show 由false变为true的时候不会触发组件的生命周期
  
  - v-if由false变为true的时候，触发组件的beforeCreate、create、beforeMount、mounted钩子，由true变为false的时候触发组件的beforeDestory、destoryed方法

### 性能消耗

- v-if 有更高的切换消耗，v-show有更高的初始渲染消耗

- 如果需要非常频繁的切换，则使用v-show 较好
- 如果在运行时条件很少改变，则使用v-if 较好

## Vue实例挂载的过程中发生了什么

- new Vue 的时候会调用_init方法

  - 定义 $set $get $delete $watch 等方法
  - 定义 $on、$off、$emit、$off 等事件
  - 定义 _update、$forceUpdate、$destroy生命周期

- 调用 $mount 进行页面的挂载

- 挂载的时候主要是通过mountComponent 方法
- 定义 updateComponent 更新函数
- 执行render 生成虚拟DOM
- _update 将虚拟DOM 生成真实DOM结构，并且渲染到页面中

## Vue 生命周期

### 什么是生命周期

- Vue中实例从创建到销毁的过程就是生命周期

### 生命周期有哪些

|生命周期|描述|
|-----|------|
|beforeCreate|   组件实例被创建之初|
|created     | 组件实例已经完全创建|
|beforeMount | 组件挂载之前|
|mounted     | 组件挂载到实例上去之后|
|beforeUpdate| 组件数据发生变化、更新之前|
|updated| 组件数据更新之后|
|beforeDestory| 组件实例销毁之前|
|destroyed| 组件实例销毁之后|
|activated| keep-alive 缓存的组件激活时|
|deactivated| keep-alive 缓存的组件停用时调用|
|errorCaptured | 捕获一个来自孙组件的错误时被调用|

### 具体分析

|生命周期|分析|
|----|------|
|beforeCreate -> created| 初始化Vue实例，进行数据观测|
|created|1. 完成数据观测，属性与方法的运算，watch、event事件回调的配置 2. 可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算 3. 此时vm.$el 并没有被创建|
|beforeMount -> mounted|此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM|
|mounted|vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM|
|beforeUpdate|1. 更新的数据必须是被渲染在模板上的（el、template、render之一） 2. 此时view层还未更新 3. 若在beforeUpdate中再次修改数据，不会再次触发更新方法|
|updated|1. 完成view层的更新 2. 若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）|
|beforeDestroy|实例被销毁前调用，此时实例属性与方法仍可访问|
|destroyed|1. 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器 2. 并不能清除DOM，仅仅销毁实例|


### 使用场景分析

|生命周期|描述|
|----|-----|
|beforeCreate|执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务|
|created|组件初始化完毕，各种数据可以使用，常用于异步数据获取|
|beforeMount|未执行渲染、更新，dom未创建|
|mounted|初始化结束，dom已创建，可用于获取访问数据和dom元素|
|beforeUpdate|更新前，可用于获取更新前各种状态|
|updated|更新后，所有状态已是最新|
|beforeDestroy|销毁前，可用于一些定时器或订阅的取消|
|destroyed|组件已销毁，作用同上|

### 数据请求在created和mouted的区别

- created是在组件实例一旦创建完成的时候立刻调用，这时候页面dom节点并未生成mounted是在页面dom节点渲染完毕之后就立刻执行的触发时机上created是比mounted要更早的两者相同点：都能拿到实例对象的属性和方法讨论这个问题本质就是触发的时机，放在mounted请求有可能导致页面闪动（页面dom结构已经生成），但如果在页面加载前完成则不会出现此情况建议：放在create生命周期当中

## v-if 与 v-for

- 永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
- 避免出现这种情况，则在外层嵌套template（页面渲染不生成dom节点），在这一层进行v-if判断，然后在内部进行v-for循环

## SPA 首屏加载

### 什么是首屏加载

- 首屏时间（First Contentful Paint），指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容

- 首屏加载可以说是用户体验中最重要的环节

### 加载慢的原因

- 网络延迟大
- 资源文件体积过大
- 资源是否重复发送请求
- 加载脚本时，渲染内容阻塞

### 解决方案

- 减小入口文件体积
- 静态资源本地缓存
- UI框架按需加载
- 图片资源的压缩
- 组件重复打包
- 开启Gzip压缩
- 使用SSR（服务端渲染）

### 为什么data 属性是一个函数

- 根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染的情况
- 组件实例data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象

### Vue 添加新属性页面不刷新的解决

- Vue.set()
  - 使用了defineReactive方法，实现新增属性的响应式，关于defineReactive 方法，内部还是通过 defineProperty实现属性的拦截
- Object.assign()
  - 直接使用添加到对象的新属性并不会触发更新，应创建一个新的对象，合并元对象和混入对象的属性
- $forceUpdate
  - 强制刷新，不建议使用
- Vue3 是通过proxy实现数据响应式的，直接动态添加新的属性仍可以实现响应式