# Vue

## 1. Vue 的理解

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

## 2. Vue 中的双向绑定

### 什么是双向绑定

- 将model 绑定到view，当js更新model时，View会自动更新。

### 双向绑定的原理
  
- 双向绑定由三个重要的部分构成
  - 数据层（Model）：应用的数据和业务逻辑
  - 视图层（View）：应用的展示效果，各类UI组件
  - 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

- ViewModel
  - 主要职责是
    - 数据变化后的更新视图
    - 视图变化后更新数据
  
  - 两个组成部分
    - 监听器（Observer）：对所有的数据的属性进行监听
    - 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析，根据指令替换模板数据，以及绑定相应的更新函数

- 实现双向绑定
  - new Vue() 首先执行初始化，对data执行响应化处理，这个过程发生Observe中
  - 同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compile 中
  - 同时定义一个更新函数和 watcher，将来对应数据变化时 watcher 会调用更新函数
  - 由于 data 的某个 key 在一个视图中可能出现多次，所以每个key 都需要一个管家 Dep 来管理多个 watcher
  - 将来 data 中数据一旦发生变化，会首先找到对应的 Dep，通知所有 watcher 执行更新函数

## 3. v-if & v-show

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

## 4. Vue实例挂载的过程中发生了什么

- new Vue 的时候会调用_init方法

  - 定义 $set $get $delete $watch 等方法
  - 定义 $on $off $emit $off 等事件
  - 定义 _update $forceUpdate $destroy生命周期

- 调用 $mount 进行页面的挂载

- 挂载的时候主要是通过mountComponent 方法
- 定义 updateComponent 更新函数
- 执行render 生成虚拟DOM
- _update 将虚拟DOM 生成真实DOM结构，并且渲染到页面中

## 5. Vue 生命周期

### 什么是生命周期

- Vue中实例从创建到销毁的过程就是生命周期

### Vue 2 生命周期有哪些

| 生命周期      | 描述                             |
| ------------- | ------------------------------ |
| beforeCreate(创建前)  | 实例初始化之后，数据观测和事件配置之前被调用，此时组建的选项对象还未创建，el和data并未初始化，无法访问methods、data、computed等方法和数据 |
| created (创建后) | 实例已经创建完成之后被调用，在这一步，实例已完成以下配置：数据观测、属性和方法的运算，watch/event事件回调，完成了data 数据的初始化，el没有。 然而，挂载阶段还没有开始, $el属性目前不可见，这是一个常用的生命周期，因为你可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，获取computed中的计算属性等|
| beforeMount   | 挂载开始之前被调用，相关的render函数首次被调用（虚拟DOM），实例已完成以下的配置： 编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时还没有挂载html到页面上。 |
| mounted       | 挂载完成，即将模板中的HTML渲染到HTML页面中 |
| beforeUpdate(更新前)  | 组件数据发生变化、更新之前，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步更改状态，不会触发重渲染过程 |
| updated(更新后)  | 组件数据更新之后，由于数据更改导致虚拟DOM重新渲染和打补丁之后调用，组件DOM已经更新，所以可以执行依赖DOM的工作，避免在此期间更改状态，会导致无限循环|
| beforeDestory(销毁前) | 组件实例销毁之前，实例仍完全可用，这一步还可以用this来获取实例，一般做一些重置工作，比如清除组件中的定时器和DOM监听事件  |
| destroyed(销毁后)  | 组件实例销毁之后，所有的事件监听器会被移除，子实例也会被销毁，该钩子在服务端渲染期间不可用  |
| activated     | keep-alive 缓存的组件激活时      |
| deactivated   | keep-alive 缓存的组件停用时调用  |
| errorCaptured | 捕获一个来自孙组件的错误时被调用 |

### 具体分析

| 生命周期 | 分析 |
| ----------- | ------------ |
| beforeCreate -> created | 初始化Vue实例，进行数据观测 |
| created                 | 1. 完成数据观测，属性与方法的运算，watch、event事件回调的配置 2. 可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算 3. 此时vm.$el 并没有被创建 |
| beforeMount -> mounted  | 此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM |
| mounted                 | vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM|
| beforeUpdate            | 1. 更新的数据必须是被渲染在模板上的（el、template、render之一） 2. 此时view层还未更新 3. 若在beforeUpdate中再次修改数据，不会再次触发更新方法|
| updated                 | 1. 完成view层的更新 2. 若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）|
| beforeDestroy           | 实例被销毁前调用，此时实例属性与方法仍可访问  |
| destroyed               | 1. 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器 2. 并不能清除DOM，仅仅销毁实例  |

### 使用场景分析

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| created       | 组件初始化完毕，各种数据可以使用，常用于异步数据获取         |
| beforeMount   | 未执行渲染、更新，dom未创建                                  |
| mounted       | 初始化结束，dom已创建，可用于获取访问数据和dom元素           |
| beforeUpdate  | 更新前，可用于获取更新前各种状态                             |
| updated       | 更新后，所有状态已是最新                                     |
| beforeDestroy | 销毁前，可用于一些定时器或订阅的取消                         |
| destroyed     | 组件已销毁，作用同上                                         |

### Vue 2 生命周期图解

<div align=center><img src="./img/Vue-life-circle.jpg" width="60%"/></div>

### 数据请求在created和mouted的区别

- created是在组件实例一旦创建完成的时候立刻调用，这时候页面dom节点并未生成mounted是在页面dom节点渲染完毕之后就立刻执行的触发时机上created是比mounted要更早的两者相同点：都能拿到实例对象的属性和方法讨论这个问题本质就是触发的时机，放在mounted请求有可能导致页面闪动（页面dom结构已经生成），但如果在页面加载前完成则不会出现此情况建议：放在create生命周期当中

### Vue 3 生命周期图解

<div align=center><img src="./img/Vue3-lifeCircle.webp" width="70%"/></div>

### Vue 3 生命周期钩子

- beforeCreate 和 created 被 setup 方法本身所代替，我们在setup中将会访问到9个生命周期
  - onBeforeMount：在挂载之前被调用，渲染函数render首次被调用
  - onMounted：组件挂载完成时调用
  - onBeforeUpdate：数据更新时调用
  - onUpdated：因数据更新导致的虚拟DOM重新渲染和打补丁时调用
  - onBeforeUnmount：在卸载组件实例之前调用
  - onUnmounted：组件卸载后调用
  - onActivated：keep-alive 缓存激活时调用
  - onDeactivated：被keep-alive 缓存的组件停用时调用
  - onErrorCaptured：当捕获一个来自子孙组件的错误时被调用

### Vue 3 生命周期钩子详解

<table>
<tr>
<th>生命周期钩子</th>
<th>类型</th>
<th>详细信息</th>
</tr>
<tr>
<td>onBeforeMount()</td>
<td>

```TS
function onBeforeMount(callback: () => void): void
```

</td>
<td>在组件被挂载之前被调用，当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。</td>
</tr>

<tr>
<td>onMounted()</td>
<td>

```TS
function onMounted(callback: () => void): void
```

</td>
<td>
在组件挂载完成后执行，组件在以下情况下被视为已挂载

- 其所有的同步子组件都已经被挂载（不包括异步组件或 `<Suspend>` 树内的组件）
- 其自身的DOM树已经创建完成并插入了父容器中。

这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用
</td>
</tr>

<tr>
<td>onBeforeUpdate()</td>
<td>

```TS
function onBeforeUpdate(callback: () => void): void
```

</td>
<td>
在组件即将因为响应式状态变更而更新其 DOM 树之前调用，这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
</td>
</tr>

<tr>
<td>onUpdated()</td>
<td>

```TS
function onUpdated(callback: () => void): void
```

</td>
<td>
在组件因为响应式状态变更而更新其 DOM 树之后调用。父组件的更新钩子将在其子组件的更新钩子之后调用。

这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。
</td>
</tr>

<tr>
<td>onBeforeUnmount()</td>
<td>

```TS
function onBeforeUnmount(callback: () => void): void
```

</td>
<td>
在组件实例被卸载之前调用，这个钩子被调用时，组件实例依然还保有全部功能
</td>
</tr>

<tr>
<td>onUnmounted()</td>
<td>

```TS
function onUnmounted(callback: () => void): void
```

</td>
<td>
在组件实例被卸载之后调用，一个组件在以下情况下被视为已卸载

- 其所有子组件都已经被卸载
- 所有相关的响应式作用（渲染作用以及 `setup()` 时创建的计算属性和侦听器）都已经停止
 
可以在这个钩子手动清理一些副作用，如计时器、DOM事件监听器或与服务器的连接
</td>
</tr>

<tr>
<td>onActivated()</td>
<td>

```TS
function onActivated(callback: () => void): void
```

</td>
<td>

若组件实例是`<keepAlive>`缓存树的一部分，当组件被插入到DOM中时调用。
</td>
</tr>

<tr>
<td>onDeactivated()</td>
<td>

```TS
function onDeactivated(callback: () => void): void
```

</td>
<td>

若组件实例是`<keepAlive>`缓存树的一部分，当组件被被从DOM中移除时调用。
</td>
</tr>

<tr>
<td>onErrorCaptured()</td>
<td>

```TS
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

</td>
<td>
错误可以从以下几个来源中捕获：

- 组件渲染
- 事件处理器
- 生命周期钩子
- `setup()` 函数
- 侦听器
- 自定义指令钩子
- 过度钩子
</td>
</tr>
</table>

## 6. v-if 与 v-for

- 永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
- 避免出现这种情况，则在外层嵌套template（页面渲染不生成dom节点），在这一层进行v-if判断，然后在内部进行v-for循环

## 7. SPA 首屏加载

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

- 根实例对象data可以是对象也可以是函数（根实例是单例, 单例：保证一个类仅有一个实例，并提供一个访问它的全局访问点），不会产生数据污染的情况
- 组件实例data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象

### Vue 添加新属性页面不刷新的解决

- Vue.set()
  - 使用了defineReactive方法，实现新增属性的响应式，关于defineReactive 方法，内部还是通过 defineProperty实现属性的拦截
- Object.assign()
  - 直接使用添加到对象的新属性并不会触发更新，应创建一个新的对象，合并原对象和混入对象的属性
  - MDN的解释：Object.assign 使用了`源对象的 GET` 和 `目标对象的 SET`，所以它会调用相关 getter 和 setter。
  - 对于 Object.assign，如果对象的属性值为值类型，通过函数得到的新对象为深拷贝，如果对象的属性为引用类型，则对于这个对象是浅拷贝 
- $forceUpdate
  - 强制刷新，不建议使用

- Vue2对数组方法进行了重写和包裹，将一些数组方法变更为了响应式，包括
  - push
  - pop
  - shift
  - unshift
  - splice
  - sort
  - reverse

- Vue3 是通过proxy实现数据响应式的，直接动态添加新的属性仍可以实现响应式

## 8. Vue 组件通信

### 组件通信概念

- 广义上，任何信息的交通都是通信，组件通信即指组件通过某种方法来传递信息以达到某个目的。

### 组件通信解决了什么

- 数据共享

### 组件通信的分类

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙组件之间的通信
- 非关系组件之间的通信

### 通信方案

- 通过props传递
- 通过 $emit 触发自定义事件
- 使用ref
- EventBus
- $parent 或 $root
- attrs 与 listeners
- Provide 与 Inject
- Vuex

## 9. $nextTick

### 什么是nextTick

- 我们可以理解成，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新

### 原理

- 将回调函数放到callbacks等待执行
- 将执行函数放到微任务或宏任务中
- 事件循环到了微任务或者宏任务，执行函数依次执行callback是中的回调

## 10. mixin

- 替换型策略有props、methods、inject、computed，就是将新的同名参数替代旧的参数
- 合并型策略是data，通过set方法进行合并和重新赋值
- 队列型策略有生命周期函数和watch，原理是将函数存入一个数组，然后正序遍历依次执行
- 叠加型有component、directives、filters，通过原型链进行层层的叠加

## 11. Vue 中的 key

### 什么是key

- key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点

## 12. keep-alive

### 什么是keep-alive

- keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM

- keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

## 13. Vue中的修饰符

### 修饰符是什么

- 在程序世界里，修饰符是用于限定类型以及类型成员的声明的一种符号
- 在Vue中，修饰符处理了许多DOM事件的细节，让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理
- Vue中的修饰符分为五类
  - 表单修饰符
  - 事件修饰符
  - 鼠标按键修饰符
  - 键值修饰符
  - v-bind修饰符

### 修饰符的作用

- 表单修饰符
  - lazy
    - 填完信息，光标离开标签的时候，才会将值赋予给value，也就是change事件之后再进行信息同步
  - trim
    - 自动过滤用户输入的首空格字符，不过滤中间空格
  - number
    - 自动转为数值类型

- 事件修饰符
  - stop
    - 阻止了事件冒泡
  - prevent
    - 阻止了事件的默认行为
  - self
    - 只当在 event.target 是当前元素自身时触发处理函数
  - once
    - 绑定了事件以后只能触发一次，第二次就不会触发
  - capture
    - 使事件触发从包含这个元素的顶层开始往下触发
  - passive
    - 在移动端，当我们在监听元素滚动事件的时候，会一直触发onscroll事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给onscroll事件整了一个.lazy修饰符
  - native
    - 让组件变成像html内置标签那样监听根元素的原生事件

- 鼠标按钮修饰符
  - left
  - right
  - middle

- 键盘修饰符
- v-bind修饰符
  - async
    - 能对props进行一个双向绑定
  - props
    - 设置自定义标签属性，避免暴露数据，防止污染HTML结构
  - camel
    - 将命名法变为驼峰命名

## 14. 虚拟DOM

### 什么是虚拟DOM

- 实际上它只是一层对真实DOM的抽象，以JavaScript 对象 (VNode 节点) 作为基础的树，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实环境上
- 在Javascript对象中，虚拟DOM 表现为一个 Object 对象。并且最少包含标签名 (tag)、属性 (attrs) 和子元素对象 (children) 三个属性，不同框架对这三个属性的名命可能会有差别
- 创建虚拟DOM就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟DOM对象的节点与真实DOM的属性一一照应

### 为什么需要虚拟DOM

- DOM是很慢的，其元素非常庞大，页面的性能问题，大部分都是由DOM操作引起的
- 操作DOM的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户的体验

### 虚拟DOM为什么能提升性能

- 如果没有虚拟DOM，要直接比较两个页面的差异，需要对真实DOM进行对比。真实DOM节点是非常复杂的，会有绑定事件，会有各种属性，频繁会触发重排与重绘，非常消耗性能
- 虚拟DOM相当于在js和真实DOM 中间添加了一层缓存，利用DOM diff 算法，避免了没有必要的DOM操作，从而提升性能

### 小结

- createElement 创建 VNode 的过程，每个 VNode 有 children，children 每个元素也是一个VNode，这样就形成了一个虚拟树结构，用于描述真实的DOM树结构


## 15. Vue 项目结构

### 为什么划分

- 使用vue构建项目，项目结构清晰会提高开发效率，熟悉项目的各种配置同样会让开发效率更高
- 在划分项目结构的时候，需要遵循一些基本的原则
  - 文件夹和文件夹内部文件的语义一致性
  - 单一入口/出口
  - 就近原则，紧耦合的文件应该放到一起，且应以相对路径引用
  - 公共的文件应该以绝对路径的方式从根目录引用
  - /src外的文件不应该被引入

## 16. Vue 权限管理

### 什么是权限管理

- 权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问到被分配的资源
- 最终要实现的目标是：
  - 路由方面，用户登录后只能看到自己有权访问的导航菜单，也只能访问自己有权访问的路由地址，否则将跳转 4xx 提示页
  - 视图方面，用户只能看到自己有权浏览的内容和有权操作的控件
  - 最后再加上请求控制作为最后一道防线，路由可能配置失误，按钮可能忘了加权限，这种时候请求控制可以用来兜底，越权请求将在前端被拦截

### 怎么做

- 前端权限控制可以分为四个方面
  - 接口权限
  - 按钮权限
  - 菜单权限
  - 路由权限

## 17. Vue 如何解决跨域问题

### CORS

- 只要后端实现了CORS，就实现了跨域，通过添加中间件，设置Access-Control-Origin 请求头

### proxy

- 代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。

### Nginx反向代理

## 18. Vue3

### 简介

- 利用新的语言特性（es6）
- 解决架构问题

### 新变化

- 速度更快
  - 重写了虚拟DOM实现
  - 编译模板的优化
  - 更高效的组件初始化
  - undate性能提高了1.3~2倍
  - SSR 速度提高了2~3倍
- 体积减小
  - 通过webpack的tree shaking功能，仅打包需要的
- 更易维护
  - composition API
    - 可与现有的Options API 一起使用
    - 灵活的逻辑组合与复用
    - Vue3模块可以和其他框架搭配使用
    - 更好的TypeScript支持
- 更接近原生
  - 可自定义渲染API
- 更易使用
  - 响应式 Api 暴露出来

### 新增特性

- fragments
  - 支持多个根节点
- Teleport
  - Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术，就有点像哆啦A梦的“任意门”
- createRenderer
  - 构建自定义渲染器
- composition API
  - 组合式api，通过这种形式，能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理

### 非兼容变更

- Global API
  - 全局 Vue API 已经改为使用应用程序实例
  - 全局和内部 API 已经被重构为可 tree-shaking

- 模板指令
  - v-model用法已经更改
  - v-for 与 key用法修改
  - 在同一元素上 v-if 与 v-for 优先级已经修改
  - v-for 中的ref 不再注册 ref数组

### 移除 API

- keyCode 支持作为 v-on 的修饰符
- $on $off 和 $once 实例方法
- 过滤filter
- 内联模板 attribute
- $destroy 实例方法。用户不应再手动管理单个 Vue 组件的生命周期。

## 19. Vue3 性能提升

### 编译阶段

- Vue3在编译阶段，做了进一步优化，主要有
  - diff 算法优化
    - 相比Vue2增加了静态标记，作用是为了会发生变化的地方添加一个flag标记，下次发生变化的时候直接找该地方进行比较
  - 静态提升
    - Vue3中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用，这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用
  - 事件监听缓存
    - 默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化
  - SSR优化
    - 当静态内容大到一定量级时候，会用createStaticVNode方法在客户端去生成一个static node，这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染

### 源码体积

- 相比Vue2，Vue3整体体积变小了，除了移除一些不常用的API，再重要的是Tree shanking，任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小

### 响应式系统

- vue2中采用 defineProperty来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式

- vue3采用proxy重写了响应式系统，因为proxy可以对整个对象进行监听，所以不需要深度遍历

  - 可以监听动态属性的添加
  - 可以监听到数组的索引和数组length属性
  - 可以监听删除属性

## 20. proxy 代替 defineProperty

### defineProperty

- Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
- 通过defineProperty 两个属性，get及set
  - 属性的 getter 函数，当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值
  - 属性的 setter 函数，当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined

- 小结
  - 检测不到对象属性的添加和删除
  - 数组API方法无法监听，增加了set、delete API，并对数组API方法进行了一个重写
  - 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

### 什么是 proxy

- Proxy的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了

- 总结
  - 直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式的目的
  - 可以直接监听数组的变化

## 21. Composition API 与 Options API 有什么不同

- Vue2 项目的问题
  - 代码的可读性随着组件的变大而变差
  - 每一种代码复用的方式，都存在缺点
  - TypeScript支持有限

### Options API

- Options API，即大家常说的选项API，即以vue为后缀的文件，通过定义methods，computed，watch，data等属性与方法，共同处理页面逻辑
- 用组件的选项 (data、computed、methods、watch) 组织逻辑在大多数情况下都有效

- 然而，当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解

### Composition API

- 在 Vue3 Composition API 中，组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）
- 逻辑复用
  - 在Vue2中，使用mixin混入来进行代码复用，单个mixin问题不大，但一个组件混入大量不同mixin 的时候，存在两个明显问题
    - 命名冲突
    - 数据来源不清晰
  - Vue3 中使用 Composition API 编写hook 函数

### 总结

- 在逻辑组织和逻辑服用方面，Composition API 是优于Options API
- 因为 Composition API几乎是函数，会有更好的类型推断
- Composition API 对 tree shaking 友好，代码也更容易压缩
- Composition API 中见不到this 的使用，减少了this指向不明的情况
- 如果是小型组件，可以继续使用Options API，也是十分友好地

## 22. Vue3 中的tree shaking

### 什么是 tree shaking

- Tree shaking 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 Dead code elimination

### 如何做 tree shaking

- Tree shaking是基于ES6模板语法（import与exports），主要是借助ES6模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量
- 主要做了两件事
  - 编译阶段利用ES6 Module 判断哪些模块已经加载
  - 判断哪些模块和变量未被使用或者引用，进而进行删除对应代码

### 作用

- 通过 tree shaking，Vue3带来的好处是
  - 减小程序体积
  - 减小程序执行时间
  - 便于将来对程序架构进行优化

## 23. Vue 中的 SSR

### 什么是SSR

- Server-Side Rendering 我们称其为SSR，意为服务端渲染

- 指由服务侧完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

- Vue中的SSR
  - Vue SSR 是在一个SPA上进行改良的服务端渲染
  - 通过Vue SSR 渲染的页面，需要在客户端激活才能实现交互
  - Vue SSR 将包含两部分：服务端渲染的首屏，包含交互的SPA

- 不适用场景
  - 同构资源的处理：劣势子啊与程序需要具有通用性。结合 Vue 的钩子来说，能在 SSR 中调用的生命周期只有 beforeCreate 和 created，这就导致在使用第三方API时必须保证运行不出错。在第三方库的引用时需要特殊处理使其支持服务端和客户端都可运行
  - 部署构建配置资源的支持：劣势在于运行环境单一，程序需处于 node.js server运行环境
  - 服务器更多的缓存准备：劣势在于高流量场景需采用缓存策略，应用代码需在双端运行解析，cpu 性能消耗更大，负载均衡和更多场景缓存处理比 SPA 做更多准备

- Vue 实现 SSR 原理
  - 组件基于VNode 来实现渲染：VNode 本身是 js 对象，兼容性强，不依赖当前的执行环境，从而可以在服务端渲染及原生渲染，虚拟DOM频繁修改，最后比较真实DOM需要修改的地方，可以达到局部渲染的目的，减少性能损耗。
  - Vue-server-renderer：是一个具有独立渲染应用程序能力的包，是 Vue 服务端渲染的核心代码

### 解决了什么问题

- SSR 主要解决了以下两种问题
  - seo：搜索引擎优先爬取页面HTML结构，使用SSR时，服务端已经生成了和业务相关练的HTML，有利于seo
  - 首屏呈现渲染：用户无需等待页面所有js加载完就可以看到页面视图，（压力来到了服务器，所以需要平衡哪些用服务端喧染，哪些用客户端
  
### 小结

- 使用SSR不存在单例模式，每次用户请求都会创建一个新的Vue实例
- 实现SSR需要实现服务端首屏渲染和客户端激活
- 服务端异步获取数据可以分为首屏异步获取和切换组件获取
  - 首屏异步获取数据，在服务端预渲染的时候就应该已经完成
  - 切换组件通过mixin混入，在beforeMount钩子完成数据获取

## 24. Vue 中的 keep alive

- keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染，也就是所谓的组件缓存。

### include 和 exclude 指定是否缓存某些组件

- include：值为字符串或正则表达式或数组，组件名称与include 值相同才会被缓存
- exclude：用法同include，指定哪些组件不被缓存

### keep-alive 生命周期钩子函数执行顺序

- 使用 keep-alive 组件后，组件会自动加上 activated 钩子和 deactivated 钩子
  - activated：当组件被激活时触发，可以简单理解为进入这个页面的时候触发
  - deactivated：当组件不被使用的时候触发，可以简单理解为离开这个页面的时候触发

- 初始进入和离开：created、mounted、activated
- 后续进入和离开：activated、deactivated

## 25. Vue 中 computed 和 watch

### computed 计算属性

- 计算属性基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的一个新值，这个新值只会根据已知值的变化而变化，简言之：这个属性依赖其他属性，由其他属性计算而来的

- computed 内定义的 function 只执行一次，仅当初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；
而 computed 属性值默认会缓存计算结果，计算属性是基于它们的响应式依赖进行缓存
- 只有当 computed 属性被使用后，才会执行 computed 的代码，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果。只有依赖型数据发生改变，computed 才会重新计算。

### watch 监听属性

- 通过 vm 对象的 $watch() 或 watch 配置来监听 Vue 实例上的属性变化，或某些特定数据的变化，然后执行某些具体的业务逻辑操作。当属性变化时，回调函数自动调用，在函数内部进行计算。其可以监听的数据来源：data，props，computed 内的数据。

- 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值，如果只写一个参数，那就是最新属性值。

- 在使用时选择 watch 还是 computed，还有一个参考点就是官网说的：当需要在数据变化时执行异步或开销较大的操作时，watch方式是最有用的。所以 watch 一定是支持异步的。

### 总结

- watch和computed都是以Vue的依赖追踪机制为基础的，当某一个依赖型数据（依赖型数据：简单理解即放在 data 等对象下的实例数据）发生变化的时候，所有依赖这个数据的相关数据会自动发生变化，即自动调用相关的函数，来实现数据的变动。

- 当依赖的值变化时，在watch中，是可以做一些复杂的操作的，而computed中的依赖，仅仅是一个值依赖于另一个值，是值上的依赖。
- 应用场景
  - computed：用于处理复杂的逻辑运算；一个数据受一个或多个数据影响；用来处理watch和methods无法处理的，或处理起来不方便的情况。例如处理模板中的复杂表达式、购物车里面的商品数量和总金额之间的变化关系等。
  - watch：用来处理当一个属性发生变化时，需要执行某些具体的业务逻辑操作，或要在数据变化时执行异步或开销较大的操作；一个数据改变影响多个数据。例如用来监控路由、inpurt 输入框值的特殊处理等。

- 区别
  - computed
    - 初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；
    - 计算属性不在 data 中，它是基于data 或 props 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；
    - 在 computed 属性对象中定义计算属性的方法，和取data对象里的数据属性一样，以属性访问的形式调用；
    - 如果 computed 属性值是函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值；
    - computed 属性值默认会缓存计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有依赖型数据发生改变，computed 才会重新计算；
    - 在computed中的，属性都有一个 get 和一个 set 方法，当数据变化时，调用 set 方法。
  - watch
    - 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
    - 可以监听的数据来源：data，props，computed内的数据；
    - watch 支持异步
    - 不支持缓存，监听数据改变，直接会触发相应的操作
    - 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值、旧值

## 26. react 和 vue 有什么区别

### 共同点

- 数据驱动视图
- 组件化
- 都使用VDOM

### 区别

- 核心思想不同
  - Vue：灵活易用的渐进式框架，进行数据拦截/代理，它对侦测数据的变化更敏感、更精确
  - React：React 推崇函数式编程（纯组件），数据不可变以及单向数据流，当然需要双向的地方可以手动实现，借助onChange和setState来实现
- 数据流不同
  - Vue 中实现双向绑定
  - React 是单向数据流，称之为onChange/setState 模式
- 监听数据变化的实现原理不同
  - Vue 通过 getter/setter 以及一些函数的劫持，能够精确知道数据变化
  - React 默认是通过比较引用的方式（diff）进行的，如果不优化可能导致大量不必要的VDOM的重新渲染。
  - Vue 使用的是可变数据，而 React 强调数据的不可变
- diff 算法不同
- 组件通信的区别
  - Vue 中有三种实现组件通信的方式
    - 父组件通过 props 向子组件传递数据或者回调函数
    - 子组件通过事件向父组件发送消息
    - provide/inject 跨层级
  - React 也有三种
    - 父组件通过props
    - context进行跨级通信
    - 回调函数
- 模板渲染方式的不同
  - 表层上，React 通过JSX渲染模板，all in JavaScript，而Vue 通过一种拓展的HTML语法进行渲染
  - 深层上，模板原理不同
    - React 是在组件js代码中，通过原生js实现模板中的常见语法，比如插值，条件，循环等
    - 而 Vue实在和组件js代码分离的单独模板中，通过指令来实现的
- 渲染过程不同
  - Vue 可以更快的计算出 VDOM 的差异，这是因为在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树
  - React 在应用的状态被改变时，全部子组件都会重新渲染。通过shouldComponentUpdate这个生命周期方法可以进行控制，但Vue将此视为默认的优化。
- Vuex 和 Redux 区别
  - 从实现原理上来说，最大的区别是两点：Redux使用的是不可变数据，而Vuex的数据是可变的，因此，Redux每次都是用新state替换旧state，而Vuex是直接修改。Redux在检测数据变化的时候，是通过diff的方式比较差异的，而Vuex其实和Vue的原理一样，是通过getter/setter来比较的，这两点的区别，也是因为React和Vue的设计理念不同。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用Vue的感觉。

- 响应式原理不同
  - Vue
    - Vue 依赖收集，自动优化，数据可变
    - Vue 递归监听data 所有属性，直接修改
    - 当数据改变时，自动找到引用组件重新渲染
  - React
    - 基于状态机，手动优化，数据不可变，需要使用setState 驱动新的state替换老的state

### 优势

- React
  - 灵活性和响应性：它提供最大的灵活性和响应能力
  - 丰富的JS 库：来自世界各地的贡献者正在努力添加更多功能
  - 可扩展性：由于其灵活的架构和可扩展性，React 已被证明对大型应用程序更好
  - 不断发展：React 得到了facebook 专业开发人员的支持，不断改进
  - Web 或者移动平台：React 提供 React Native 平台

- Vue
  - 易于使用：包含基础HTML模板，可以更轻松的使用
  - 更流畅的集成：无论是单页面应用程序还是复杂的Web 既然面，Vue 都可以更平滑的集成更小的部件，而不会对整个系统产生任何影响
  - 更好的性能，更小的尺寸：占用更小的空间
  - 无障碍地迁移

## 27. Vue 渲染过程

### 挂载组件（$mount）

- Vue 是一个构造函数，通过 new 关键字进行实例化
- 在实例化时，会调用 _init 进行初始化
- _init内会调用 $mount 来挂载组件，而 $mount 方法实际调用的是 mountComponent
- mountComponent 除了调用一些生命周期的钩子函数外，最主要是 updateComponent，它就是负责渲染视图的核心方法
- vm._render 创建并返回 VNode，vm._update 接受 VNode 将其转为真实节点。
- updateComponent 会被传入 渲染Watcher，每当数据变化触发 Watcher 更新就会执行该函数，重新渲染视图。updateComponent 在传入 渲染Watcher 后会被执行一次进行初始化页面渲染。

### 总结

- 初始化调用 $mount 挂载组件
- _render 开始构建VNode，核心方法为 createElement，一般会创建普通的 VNode，遇到组件就创建组件类型的VNode，否则就是未知标签的 VNode，构建完成传递给 _update
- patch 阶段根据 VNode 创建真实节点树，核心方法为 createElm，首先遇到组件类型的 VNode 创建真实节点树，内部会执行 $mount，再走一遍相同的流程。普通节点类型则创建一个真实节点，如果它有子节点开始递归调用 createElm，使用 insert 插入子节点，直到没有子节点就填充内容节点。最后递归完成后，同样也是使用 insert 将整个节点树插入到页面中，再将旧的根节点移除。

## 28. Vue 路由

### hash 模式

- hash 模式是一种把前端路由的路径用井号 # 拼接在真实 URL 后面的模式。当井号 # 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 hashchange 事件。
- 优点：浏览器兼容性好，只需要前端支持
- 缺点：不好看

### history

- history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求
- 优点：路径规整，没有 #
- 缺点：兼容性不如 hash，且需要服务端支持，否则页面会404

## 29. Vue2 于 Vue3 响应式区别

### 如何拦截 GET 和 SET 操作

- Vue2 中，使用 ES5 的 Object.defineProperty() 函数
- Vue3 中，使用 ES6 的 Proxy 和 Reflect API 实现

### 如何使用 Reflect

- 三种方法读取一个对象的属性：
  - 使用 `.` 操作符，`leo.name`
  - 使用`[]`：`leo['name']`
  - 使用 `Reflect API`：`Reflect.get(leo, 'name')`

### 如何使用 Proxy

- Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```JS
const p = new Proxy(target, handler)
```

- target：要使用proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为

## 30. Vue 中的 $router 和 $route

### this.$router

- 是 router 实例
- 通过 `this.$router` 访问路由器，相当于获取了整个路由文件，在 `$router.option.routes` 中，或查看到当前项目的整个路由结构具有实例方法

```JS
router.beforeEach((to, from, next) => {
  // 必须使用next
})

router.beforeResolve((to, from, next) => {
  // 必须使用next
})

router.afterEach((to, from) => {
  
})

// 动态导航到新的路由
router.push()
router.replace()
router.go()
router.back()
router.forward()
```

### this.$route

- 当前激活的路由信息对象。这个属性是只读的，里面的属性是 `immutable不可变` 的，不过可以 watch 它
- 通过 `$route` 访问的是当前路由，获取和当前路由有关的信息

```JS
fullPath: '' // 当前路由完整路径，包含查询参数和hash的完整路径
hash: '' // 当前路由的hash值
matched: [] // 包含当前路由的所有嵌套路径片段的路由记录
meta: {} // 路由文件中自赋值的meta信息
name: '' // 路由名称
params: {} // 一个key/value 对象，包含了动态片段和全匹配片段就是一个空对象
path: '' // 字符串，对应当前的路由路径
query: {} // 一个key/value对象，表示 URL 查询参数。跟随在路径后用 ？ 带的参数
```

## 31. vite 的原理

### 共存的模块化标准

- CommonJS：现在主要用于Node.js 
- AMD：require.js 依赖前置，市场存量不建议使用
- CMD：sea.js 就近执行，市场存量不建议使用
- ES Module：ES 语言规范，标准，趋势，未来

### 构建工具

- 近些年前端工程化发展迅速，各种构建工具层出不穷，目前`Webpack`仍然占据统治地位，npm 每周下载量达到两千多万次。

### 当前工程化痛点

- 现在常用的构建工具如`Webpack`，主要是通过抓取-编译-构建整个应用的代码（也就是常说的打包过程），生成一份编译、优化后能良好兼容各个浏览器的的生产环境代码。在开发环境流程也基本相同，需要先将整个应用构建打包后，再把打包后的代码交给`dev server`（开发服务器）。

- Webpack等构建工具的诞生给前端开发带来了极大的便利，但随着前端业务的复杂化，js代码量呈指数增长，打包构建时间越来越久，`dev server`（开发服务器）性能遇到瓶颈：
  - 缓慢的服务启动：大型项目中的 `dev server` 启动时间达到几十秒甚至几分钟
  - 缓慢的HMR热更新：即使采用了HMR 模式，热更新速度也会随着应用规模的增长而显著下降，已经达到性能瓶颈，没有优化的空间

### 什么是 Vite

- 基于esbuild与Rollup，依靠浏览器自身ESM编译功能， 实现极致开发体验的新一代构建工具！
  - esbuild：是一个类似webpack构建工具。它的构建速度是 webpack 的几十倍。
    - js 是单线程串行，esbuild 时新开一个进程，然后多线程并行，充分发挥多核优势
    - go 是纯机器码，肯定比JIT快
    - 不使用AST（抽象语法树），优化了构建流程
  - rollup：`Rollup` 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。除了使用 ES6 模块之外，Rollup 还静态分析代码中的 import，并将排除任何未实际使用的代码。这允许您架构于现有工具和模块之上，而不会增加额外的依赖或使项目的大小膨胀，也就是实现了 `tree shaking`。

- 概念
  - 依赖：指开发不会变动的部分（npm 包，UI组件库），`esbuild` 进行预构建
  - 源码：浏览器不能直接执行的非js代码，vite只在浏览器请求相关源码时进行转换，以提供ESM源码。

- 开发环境
  - 利用浏览器原生的 `ES Module` 编译能力，省略费事的编译环节，直接给浏览器开发环境源码，`dev server` 只提供轻量服务
  - 浏览器执行ESM的import时，会向`dev server`发起该模块的ajax请求，服务器对源码做简单处理后返回给浏览器。
  - Vite中HMR是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块失活，使得无论应用大小如何，HMR 始终能保持快速更新。
  - 使用`esbuild`处理项目依赖，`esbuild`使用`go`编写，比一般`node.js`编写的编译器快几个数量级。

-  生产环境
  - 集成 `Rollup` 打包生产环境代码，依赖其成熟稳定的生态与更简洁的插件机制

- 处理流程对比
  - Webpack 通过先将整个应用打包，再将打包后的代码提供给 devServer ，开发者才能开始开发
  - Vite 直接将源码交给浏览器，实现 devServer 秒开，浏览器显示相关页面需要相关模块时，再向 devServer 发起请求，服务器简单处理后，将该模块返回给浏览器，实现真正意义的按需加载

### 实现原理

- ESbuild 编译

  - ESbuild 使用go编写，cpu 密集下更具性能优势，编译速度更快。
- 依赖预构建
  - 模块化兼容：现仍共存多种模块化标准代码，Vite在预构建阶段将依赖中各种其他模块化规范(CommonJS、UMD)转换 成ESM，以提供给浏览器。
  - 性能优化：npm包中大量的ESM代码，大量的import请求，会造成网络拥塞。Vite使用esbuild，将有大量内部模块的ESM关系转换成单个模块，以减少 import模块请求次数。

- 按需加载：服务器只在接受到import请求的时候，才会编译对应的文件，将ESM源码返回给浏览器，实现真正的按需加载。
- 缓存
  - HTTP缓存：充分利用http缓存做优化，依赖（不会变动的代码）部分用max-age,immutable 强缓存，源码部分用304协商缓存，提升页面打开速度。
  - 文件系统缓存：Vite在预构建阶段，将构建后的依赖缓存到node_modules/.vite ，相关配置更改时，或手动控制时才会重新构建，以提升预构建速度。

- 重写模块路径：浏览器import只能引入相对/绝对路径，而开发代码经常使用npm包名直接引入node_module中的模块，需要做路径转换后交给浏览器。
  - es-module-lexer 扫描 import 语法
  - magic-string 重写模块的引入路径

### 优势

- 快
- 高集成度
- 基于ESM急速热更新，无需打包编译
- 基于esbuild的依赖预处理，比 Webpack 等node编写的编译器快几个数量级
- 兼容rollup庞大的插件机制
- 不于Vue绑定，支持react等其他框架
- 内置SSR支持
- 天然支持TS

### 不足

- Vue 仍为第一支持，对react 支持不如 Vue
- 已推出2.0版，但目前市场上实践较少
- 生产环境集成Rollup打包，与开发环境最终执行的代码不一致

## 32. vue3 中怎么设置全局变量

### 使用 config.globalProperties

- Vue2 使用 Vue.prototype.$xxx = xxx 来挂载，然后通过 this.$xxx 来获取挂载到全局的变量或方法
- Vue3 中，等同于 config.globalProperties。

```js
// Vue2
Vue.prototype.$http = () => {}

// Vue3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

### Provide / Inject

- vue3新的 provide/inject 功能可以穿透多层组件，实现数据从父组件传递到子组件。可以将全局变量放在根组件的 provide 中，这样所有的组件都能使用到这个变量。如果需要变量是响应式的，就需要在 provide 的时候使用 ref 或者 reactive 包装变量。

## 33. Vue 中的 CSS Scope

- 我们知道 `<template></template>` 这个是模板，不是真实的 HTML，浏览器是不认识模板的，所以我们需要把它编译成浏览器认识的原生的 HTML
- 主要流程是
  - 提取出模板中的原生 HTML 和非原生 HTML，比如绑定的属性、事件、指令等等
  - 经过一些处理生成 render 函数
  - render 函数再将模板内容生成对应的 vnode
  - 再经过 patch 过程( Diff )得到要渲染到视图中的 vnode
  - 最后根据 vnode 创建真实的 DOM 节点，也就是原生 HTML 插入到视图中，完成渲染

## 34. Vue 中的 diff 算法

### 什么是 diff 算法

- diff 算法是一种通过同层的树节点进行比较的高效算法，其有两个特点：
  - 比较只会在同层级进行, 不会跨层级比较
  - 在diff比较的过程中，循环从两边向中间比较
- diff 算法的在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较

### 比较方式

- diff 整体策略为：深度优先，同层比较
  - 比较只会在同层级进行，不会跨层级比较
  - 比较的过程中，循环从两边向中间靠拢

### 小结

- 当数据发生改变时，订阅者 watcher 就会调用 patch 给真实的 DOM 打补丁
- 通过 isSameVnode 进行判断，相同则调用 patchVnode 方法
- patchVnode 做了以下操作
  - 找到对应的真实dom，称为el
  - 如果都有都有文本节点且不相等，将el文本节点设置为Vnode的文本节点
  - 如果oldVnode有子节点而VNode没有，则删除el子节点
  - 如果oldVnode没有子节点而VNode有，则将VNode的子节点真实化后添加到el
  - 如果两者都有子节点，则执行updateChildren函数比较子节点
- updateChildren主要做了以下操作
  - 设置新旧VNode的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用patchVnode进行patch重复流程、调用createElem创建一个新节点，从哈希表寻找 key一致的VNode 节点再分情况操作

## 35. Vue 性能优化

- 合理使用v-show和 v-if
- 合理使用computed(缓存)
- v-for中加key,避免和v-if同时使用
- 自定义事件和DOM事件及时销毁（否则会导致内存泄露）
- 合理使用异步组件（import）
- 合理使用缓存组件（keep-alive）
- 合理使用异步渲染（$nextTick）
- data层级不要太深（导致深度监听时递归的次数比较多）
- 使用vue-loader在开发环境做模板编译（预编译）
- 使用SSR(服务端渲染)
